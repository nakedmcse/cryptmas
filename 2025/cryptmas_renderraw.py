import numpy as np
from PIL import Image

# Load raw steg output
with open("extracted/result", "rb") as f:
    data = f.read()

# Convert bytes -> bits
bits = np.unpackbits(np.frombuffer(data, dtype=np.uint8))

# Split into two interleaved bitplanes
plane0 = bits[0::2]   # even bits
plane1 = bits[1::2]   # odd bits

# Width choice
WIDTH = 0x494

def render(bits, width, name):
    h = len(bits) // width
    img = (bits[:h * width].reshape((h, width)) * 255).astype(np.uint8)
    Image.fromarray(img, mode="L").show(title=name)

render(plane0, WIDTH, "bitplane 0 (even bits)")
render(plane1, WIDTH, "bitplane 1 (odd bits)")
xor = plane0 ^ plane1
render(xor, WIDTH, "xor planes")
render(bits, WIDTH, "full send")
