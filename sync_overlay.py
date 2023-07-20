from io import BytesIO
from PIL import Image

canvas_width = 2000
canvas_height = 2000
canvas_scale = 3

print('Preparing reference-simple.png')
simple_pos = (248 * canvas_scale, 709 * canvas_scale)  # top left corner
simple_img = open("reference-simple.png", "rb").read()
simple_img = Image.open(BytesIO(simple_img))
simple_img = simple_img.resize((simple_img.size[0] * canvas_scale, simple_img.size[1] * canvas_scale), Image.Resampling.NEAREST)

print('Joining all references')
unmasked_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
unmasked_img.paste(simple_img, simple_pos)

print('Preparing mask')
mask_img = open("mask.png", "rb").read()
mask_i = Image.open(BytesIO(mask_img))
mask = Image.new("1", (canvas_width * canvas_scale, canvas_height * canvas_scale), 0)
mask.paste(mask_i)

print('Applying mask to image')
final_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
final_img = Image.composite(final_img, unmasked_img, mask)

# Compress the image by reducing the color palette from 32-bit color to 8-bit
print('Compressing image')
final_img = final_img.quantize()

print('Saving image')
final_img.save("overlay.png", optimize=True)
