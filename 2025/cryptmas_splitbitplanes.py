# Split given image to bitplanes as b/w and display
from pathlib import Path
import numpy as np
from PIL import Image


def ensure_rgba(img: Image.Image) -> Image.Image:
    # If the PNG has no alpha, this will add A=255 everywhere.
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    return img


def show_bitplanes_rgba(in_path: str | Path, msb_first: bool = False):
    in_path = Path(in_path)
    img = Image.open(in_path)
    img = ensure_rgba(img)

    arr = np.array(img, dtype=np.uint8)  # H x W x 4
    h, w, _ = arr.shape

    channel_names = ["R", "G", "B", "A"]
    bit_indices = list(range(7, -1, -1)) if msb_first else list(range(0, 8))

    for c, cname in enumerate(channel_names):
        chan = arr[:, :, c]  # H x W uint8
        for b in bit_indices:
            plane = ((chan >> b) & 1).astype(np.uint8) * 255  # 0/255 visualization
            out_img = Image.fromarray(plane, mode="L")
            out_img.show(title=f"{cname}")

    return


def main():
    in_path = "cryptmas_card.png"
    msb_first = False
    show_bitplanes_rgba(in_path, msb_first=msb_first)
    return


if __name__ == "__main__":
    main()