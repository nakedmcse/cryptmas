# Solve recovering private key from public key and modulus
import zlib
import base64
import re
from math import gcd
from pathlib import Path
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes

# Concatenate Data from crashlog
b64data = "eJwBgAB__zgCkaQmUD-ypvCfXwss8Z4MAIIx0d-TbgoZcKu5kvVmj8KW1lPtDI8LDsksHTb-4VvHjowmJAbRXITOL_pXTNt_EuNwKcxGjGvJmqnJjAQFlyyTVzZ5OjVYqP-Pq2jRQuyEwv2mdbgrAXPiP8GbRIZYY3XbSvja3JCRBqasF1LjNYo-vg=="

# Modulus extracted from public key with 'openssl pkey -pubin -in public.pem -text -noout'
mod_text = """00:c8:2d:1e:05:c1:06:80:a4:87:dd:a1:e1:d7:d8:
ed:dd:c4:5e:9b:d7:3c:a6:6f:f7:81:39:f8:92:4b:
bc:ba:a1:43:19:dc:e5:67:fd:b0:89:68:a5:8f:c6:
e7:6c:c6:00:7a:29:bb:25:54:71:35:25:c5:4f:22:
e2:78:b0:4c:0a:f0:ab:f3:eb:f2:7a:46:4b:45:a7:
57:ae:1d:b9:36:76:68:07:c2:15:95:09:2b:99:bc:
b3:9d:99:64:86:35:3d:e7:88:6e:0f:8e:7b:fc:aa:
7b:c1:dc:ef:3d:2c:ad:45:bf:d3:9c:22:bb:a3:03:
d0:64:4c:4c:16:c2:8c:4e:aa:93:e2:16:b7:7e:23:
b7:f4:60:f7:ea:b3:16:cd:f4:37:bd:5f:1f:1b:b5:
99:5e:24:3a:1b:3e:72:af:1f:54:0b:b7:5c:c2:40:
d4:60:ef:05:8e:26:25:04:2e:9c:b2:c0:da:42:7e:
cc:77:b4:52:44:57:b8:eb:65:e1:95:b5:0f:f5:cb:
8c:eb:4f:85:76:50:b7:72:b8:5f:ee:2b:c7:da:a2:
80:bd:38:af:cd:4c:69:21:16:a0:24:94:ca:08:ba:
73:4f:d1:67:63:e7:07:9f:ee:70:58:e2:55:e8:eb:
a4:6f:8e:34:38:92:3e:b7:a1:7d:37:61:f4:1a:0e:
d5:bf"""

# Given dp and n - solve for q
def get_q_factor(dp: int, n: int) -> tuple[int, int]:
    k = 65537 * dp - 1
    p = 0
    for a in range(2, 100):
        p = gcd(pow(a, k, n) - 1, n)
        if 1 < p < n:
            print("Found factor:", p)
            break
    return p, n // p

# Recover private key from p and q
def recover_private_key(p: int, q: int, n: int) -> str:
    if p > q:
        p, q = q, p

    phi = (p - 1) * (q - 1)
    d = pow(65537, -1, phi)

    dp = d % (p - 1)
    dq = d % (q - 1)
    qi = pow(q, -1, p)

    priv_numbers = rsa.RSAPrivateNumbers(
        p=p,
        q=q,
        d=d,
        dmp1=dp,     # dp
        dmq1=dq,     # dq
        iqmp=qi,     # qInv
        public_numbers=rsa.RSAPublicNumbers(e=65537, n=n),
    )

    private_key = priv_numbers.private_key()

    pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption(),
    )

    return pem.decode()

# Decrypt file using RSA/OAEP
def rsa_oaep_decrypt_file(private_key_pem: str, ciphertext_path: str) -> str:
    private_key = serialization.load_pem_private_key(private_key_pem.encode(), password=None)
    ciphertext = Path(ciphertext_path).read_bytes()

    plaintext = private_key.decrypt(
        ciphertext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )

    return plaintext.decode('ascii')

# Main program
rawdata = base64.urlsafe_b64decode(b64data)
finaldata = zlib.decompress(rawdata)
n = int(re.sub(r'[^0-9a-f]', '', mod_text)[2:],16)

pp, qp = get_q_factor(int.from_bytes(finaldata, 'big'), n)
private_key = recover_private_key(pp, qp, n)
print("Private key:", private_key)
print()
print(rsa_oaep_decrypt_file(private_key, "sealed.bin"))
