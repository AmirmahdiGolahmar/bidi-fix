"""Generate the extension icons (icons/icon16.png, icon48.png, icon128.png).

Usage: python3 tools/make_icons.py   (requires Pillow)
"""
from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/truetype/vazirmatn/Vazirmatn-Bold.ttf"  # any bold font with Arabic + Latin glyphs
BG, FG = (30, 100, 220, 255), (255, 255, 255, 255)
S = 1024  # draw large, then downsample for smooth edges


def master():
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, S - 1, S - 1), radius=int(S * 0.22), fill=BG)
    font = ImageFont.truetype(FONT, int(S * 0.5))
    # Left: Persian "ب", divider bar, right: Latin "A"
    d.text((S * 0.27, S * 0.5), "ب", font=font, fill=FG, anchor="mm")
    d.rounded_rectangle((S * 0.495, S * 0.2, S * 0.525, S * 0.8), radius=S * 0.015, fill=FG)
    d.text((S * 0.74, S * 0.5), "A", font=font, fill=FG, anchor="mm")
    return img


if __name__ == "__main__":
    m = master()
    for size in (16, 48, 128):
        m.resize((size, size), Image.LANCZOS).save(f"icons/icon{size}.png")
        print("wrote", f"icons/icon{size}.png")
