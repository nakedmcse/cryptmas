import struct, gzip, tarfile
from pathlib import Path

data = Path("cryptmas_card.png").read_bytes()
pos = 8
iend_end = None
while pos + 12 <= len(data):
    length = struct.unpack(">I", data[pos:pos+4])[0]
    ctype  = data[pos+4:pos+8]
    pos += 8
    pos += length  # chunk data
    pos += 4       # CRC
    if ctype == b"IEND":
        iend_end = pos
        break

if iend_end is None:
    raise ValueError("No iend found")

tail = data[iend_end:]
if not tail.startswith(b"\x1f\x8b\x08"):
    raise SystemExit("Data after IEND is not gzip (missing 1f 8b 08)")

tar_bytes = gzip.decompress(tail)
Path("payload.tar").write_bytes(tar_bytes)

with tarfile.open("payload.tar") as tf:
    tf.extractall("extracted")