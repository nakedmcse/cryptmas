import struct
from pathlib import Path

# JPEG markers
SOI  = 0xD8
EOI  = 0xD9
SOS  = 0xDA
DQT  = 0xDB
DHT  = 0xC4
COM  = 0xFE

# APP0..APP15 are E0..EF
RST0 = 0xD0
RST7 = 0xD7

def u16be(b: bytes) -> int:
    return struct.unpack(">H", b)[0]

def hexdump(b: bytes, width: int = 16, limit: int = 256) -> str:
    b = b[:limit]
    out = []
    for i in range(0, len(b), width):
        chunk = b[i:i+width]
        hx = " ".join(f"{x:02x}" for x in chunk)
        asc = "".join(chr(x) if 32 <= x <= 126 else "." for x in chunk)
        out.append(f"{i:04x}  {hx:<{width*3}}  {asc}")
    if len(b) == limit:
        out.append("... (truncated)")
    return "\n".join(out)

def iter_markers(data: bytes):
    # Yield (marker, payload_bytes, start_offset, end_offset)
    n = len(data)
    i = 0

    if n < 2 or data[0] != 0xFF or data[1] != SOI:
        raise ValueError("Not a JPEG (missing SOI)")

    yield (SOI, b"", 0, 2)
    i = 2

    while i < n:
        # Find 0xFF marker prefix
        if data[i] != 0xFF:
            raise ValueError(f"Unexpected byte 0x{data[i]:02x} at {i}, expected marker prefix 0xFF")

        # Skip fill bytes 0xFF 0xFF ...
        while i < n and data[i] == 0xFF:
            i += 1
        if i >= n:
            break

        marker = data[i]
        i += 1

        # Standalone markers (no length/payload)
        if marker in (SOI, EOI) or (RST0 <= marker <= RST7):
            yield (marker, b"", i-2, i)
            if marker == EOI:
                return
            continue

        # All other markers have a 2-byte length (includes the length field)
        if i + 2 > n:
            raise ValueError("Truncated marker length")
        seglen = u16be(data[i:i+2])
        i += 2
        if seglen < 2:
            raise ValueError(f"Invalid segment length {seglen} for marker 0xFF{marker:02x}")
        payload_len = seglen - 2
        if i + payload_len > n:
            raise ValueError("Truncated marker payload")
        payload = data[i:i+payload_len]
        seg_start = i - (2 + 2)  # ff + marker + length(2)
        seg_end = i + payload_len
        i += payload_len
        yield (marker, payload, seg_start, seg_end)

        # SOS: after this comes entropy-coded data until EOI (with possible RST markers)
        if marker == SOS:
            return

def parse_dqt(payload: bytes):
    tables = []
    i = 0
    while i < len(payload):
        if i + 1 > len(payload):
            break
        pq_tq = payload[i]
        i += 1
        pq = (pq_tq >> 4) & 0xF
        tq = pq_tq & 0xF
        if pq == 0:
            need = 64
            if i + need > len(payload): break
            vals = list(payload[i:i+need])
            i += need
        elif pq == 1:
            need = 64 * 2
            if i + need > len(payload): break
            vals = [u16be(payload[i+j:i+j+2]) for j in range(0, need, 2)]
            i += need
        else:
            break
        tables.append((tq, pq, vals))
    return tables

def parse_dht(payload: bytes):
    tables = []
    i = 0
    while i < len(payload):
        if i + 1 + 16 > len(payload):
            break
        tc_th = payload[i]
        i += 1
        tc = (tc_th >> 4) & 0xF
        th = tc_th & 0xF
        L = list(payload[i:i+16])
        i += 16
        total = sum(L)
        if i + total > len(payload):
            break
        symbols = list(payload[i:i+total])
        i += total
        tables.append((tc, th, L, symbols))
    return tables

def extract_scan_data(data: bytes):
    # Locate SOS segment via iter_markers
    n = len(data)
    i = 0
    if data[0] != 0xFF or data[1] != SOI:
        raise ValueError("Not JPEG")
    i = 2

    sos_payload = None
    sos_end = None

    # Walk markers until SOS
    for (m, payload, start, end) in iter_markers(data):
        if m == SOS:
            sos_payload = payload
            sos_end = end
            break

    if sos_end is None:
        return None, b"", b""

    # Scan data goes from sos_end until EOI marker 0xFFD9 (not byte-stuffed)
    raw = bytearray()
    clean = bytearray()

    j = sos_end
    while j < n - 1:
        b = data[j]
        if b != 0xFF:
            raw.append(b)
            clean.append(b)
            j += 1
            continue

        # b == 0xFF: could be stuffed 0x00, could be RST marker, could be EOI
        if j + 1 >= n:
            break
        nxt = data[j+1]

        if nxt == 0x00:
            # stuffed byte: represents 0xFF data
            raw.extend([0xFF, 0x00])
            clean.append(0xFF)
            j += 2
            continue

        if RST0 <= nxt <= RST7:
            # restart marker: keep in raw, strip from clean
            raw.extend([0xFF, nxt])
            j += 2
            continue

        if nxt == EOI:
            # end of image
            return sos_payload, bytes(clean), bytes(raw)

        raw.extend([0xFF, nxt])
        # Do not include in clean
        j += 2

    return sos_payload, bytes(clean), bytes(raw)

def main():
    path = Path("extracted/heavy_snowfall.jpg")
    data = path.read_bytes()

    print(f"[+] File: {path}")
    print(f"[+] Size: {len(data)} bytes")

    dqts = []
    dhts = []
    comments = []
    apps = []

    # Iterate markers until SOS
    for (m, payload, start, end) in iter_markers(data):
        if m == SOI:
            continue
        if m == DQT:
            dqts.extend(parse_dqt(payload))
        elif m == DHT:
            dhts.extend(parse_dht(payload))
        elif m == COM:
            comments.append(payload)
        elif 0xE0 <= m <= 0xEF:
            apps.append((m, payload))
        elif m == SOS:
            print(f"[+] Found SOS at offset 0x{start:x}..0x{end:x} (payload {len(payload)} bytes)")
            break
        else:
            pass

    # Dump COM
    if comments:
        print(f"\n[+] COM segments: {len(comments)}")
        for idx, c in enumerate(comments):
            print(f"--- COM #{idx} ({len(c)} bytes) ---")
            try:
                print(c.decode("utf-8", errors="replace"))
            except Exception:
                print(hexdump(c))

    # Dump APPs
    if apps:
        print(f"\n[+] APP segments: {len(apps)}")
        for (m, p) in apps[:5]:
            tag = f"APP{m-0xE0}"
            sig = p[:16]
            print(f"  - {tag}: {len(p)} bytes, first16: {sig!r}")
        if len(apps) > 5:
            print("  ... (truncated)")

    # Dump DQT
    if dqts:
        print(f"\n[+] DQT tables: {len(dqts)}")
        for (tq, pq, vals) in dqts:
            prec = 8 if pq == 0 else 16
            print(f"--- DQT id={tq} precision={prec}-bit ---")
            # Show as a 8x8 matrix
            for r in range(8):
                row = vals[r*8:(r+1)*8]
                print(" ".join(f"{v:4d}" for v in row))
    else:
        print("\n[!] No DQT tables found? (unusual)")

    # Dump DHT
    if dhts:
        print(f"\n[+] DHT tables: {len(dhts)}")
        for (tc, th, L, symbols) in dhts:
            cls = "DC" if tc == 0 else "AC"
            print(f"--- DHT class={cls} id={th} ---")
            print("Code lengths (L1..L16):", L)
            print(f"Symbols ({len(symbols)}):", symbols[:64], "..." if len(symbols) > 64 else "")
    else:
        print("\n[!] No DHT tables found? (unusual)")

    # Extract scan data
    sos_payload, clean_scan, raw_scan = extract_scan_data(data)
    if sos_payload is None:
        print("\n[!] No SOS/scan data found.")
        return

    print(f"\n[+] Entropy-coded scan data:")
    print(f"    raw scan region bytes (with stuffing & restarts): {len(raw_scan)}")
    print(f"    clean scan stream (stuffing removed, restarts stripped): {len(clean_scan)}")

    # Write outputs
    out_base = path.with_suffix("")
    (out_base.with_suffix(".dqt.bin")).write_bytes(b"".join(bytes([v & 0xFF]) for _, pq, vals in dqts for v in vals))
    (out_base.with_suffix(".scan.clean.bin")).write_bytes(clean_scan)
    (out_base.with_suffix(".scan.raw.bin")).write_bytes(raw_scan)
    print(f"\n[+] Wrote:")
    print(f"    {out_base.with_suffix('.dqt.bin')}")
    print(f"    {out_base.with_suffix('.scan.clean.bin')}")
    print(f"    {out_base.with_suffix('.scan.raw.bin')}")

if __name__ == "__main__":
    main()
