import argparse
import re


def read_num(label: str) -> int:
    while True:
        i = input(f'{label}: ')
        try:
            return int(i)
        except ValueError:
            print(f'\'{i}\' is not a valid number!')


def update_file(filename: str, regex: str, value: str):
    if args.verbose:
        print(f'Replacing [{regex}] with [{value}] at: {filename}')

    with open(filename, 'r') as file:
        data = file.read()

    data = re.sub(regex, value, data)

    with open(filename, 'w', newline='\n') as file:
        file.write(data)


def update_files(x: int, y: int, x_offset: int, y_offset: int):
    print(f'Updating templates with coords ({x}, {y}), and ({x + x_offset}, {y + y_offset}) with offset ({x_offset}, {y_offset})')
    update_file('overlay.json',
                r'"x": \d+',
                f'"x": {x + x_offset}')
    update_file('overlay.json',
                r'"y": \d+',
                f'"y": {y + y_offset}')
    update_file('sync_overlay.py',
                r"\('template.png', \((\d|-)+, (\d|-)+\)\)",
                f"('template.png', ({x + x_offset}, {y + y_offset}))")
    update_file('index.html',
                r'data-reference="template.png" data-x="(\d|-)+" data-y="(\d|-)+"',
                f'data-reference="template.png" data-x="{x}" data-y="{y}"')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='Steins;Place coord updater',
                                     description='Updates the coordinates in all the right places, taking offsets into'
                                                 ' account, when appropriate.')
    parser.add_argument('-x', '--x', type=int)
    parser.add_argument('-y', '--y', type=int)
    parser.add_argument('-xo', '--x-offset', type=int, default=1000)
    parser.add_argument('-yo', '--y-offset', type=int, default=1000)
    parser.add_argument('-v', '--verbose', action='store_true')

    args = parser.parse_args()

    if not args.x:
        args.x = read_num('X coordinate')
    if not args.y:
        args.y = read_num('Y coordinate')

    update_files(args.x, args.y, args.x_offset, args.y_offset)
