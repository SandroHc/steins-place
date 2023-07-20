from io import BytesIO
from PIL import Image

canvas_width = 2000
canvas_height = 2000
canvas_scale = 3

print('Preparing reference-starter.png')
starter_pos = (0 * canvas_scale, 0 * canvas_scale)  # top left corner
starter_img = open("reference-starter.png", "rb").read()
starter_img = Image.open(BytesIO(starter_img))
starter_img = starter_img.resize((starter_img.size[0] * canvas_scale, starter_img.size[1] * canvas_scale), Image.Resampling.NEAREST)

print('Preparing reference-titanfolk.png')
titanfolk_pos = (100 * canvas_scale, 641 * canvas_scale)  # top left corner
titanfolk_img = open("reference-titanfolk.png", "rb").read()
titanfolk_img = Image.open(BytesIO(titanfolk_img))
titanfolk_img = titanfolk_img.resize((titanfolk_img.size[0] * canvas_scale, titanfolk_img.size[1] * canvas_scale), Image.Resampling.NEAREST)

print('Joining all references')
unmasked_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
# unmasked_img.paste(starter_img, starter_pos)
unmasked_img.paste(titanfolk_img, titanfolk_pos)

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
