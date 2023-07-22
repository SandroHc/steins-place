from io import BytesIO
from PIL import Image

references = [
    ('template.png', (-720, 327))
]

canvas_width = 2000
canvas_height = 2000
canvas_scale = 3
canvas_shift = 500

unmasked_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))

for reference in references:
    file, coords = reference
    x, y = coords

    print(f'Preparing \'{file}\' at {coords}')

    img = open(file, "rb").read()
    img = Image.open(BytesIO(img))
    img = img.resize((img.size[0] * canvas_scale, img.size[1] * canvas_scale), Image.Resampling.NEAREST)
    pos = ((x + canvas_shift) * canvas_scale, (y + canvas_shift) * canvas_scale)  # top left corner

    unmasked_img.paste(img, pos)

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
