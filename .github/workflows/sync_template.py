from io import BytesIO
from PIL import Image

canvas_width = 2000
canvas_height = 1000
canvas_scale = 3

top_left = (1508 * canvas_scale, 2 * canvas_scale)  # top left corner

reference_img = open("reference.png", "rb").read()
img = Image.open(BytesIO(reference_img))
img = img.resize((img.size[0] * canvas_scale, img.size[1] * canvas_scale), Image.Resampling.NEAREST)

mask_img = open("mask.png", "rb").read()
mask_i = Image.open(BytesIO(mask_img))
mask = Image.new("1", (canvas_width * canvas_scale, canvas_height * canvas_scale), 0)
mask.paste(mask_i)

unmasked_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
unmasked_img.paste(img, top_left)
final_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
final_img = Image.composite(final_img, unmasked_img, mask)
final_img.save("overlay.png")
