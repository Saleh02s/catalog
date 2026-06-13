# Catalog images

Drop your photos in this folder using the exact filenames below. They appear
automatically on the contents cards, the category opener pages, and the service
rows. If a file is missing, the catalog falls back to the line icon, so you can
add photos one at a time.

| Filename            | Category                    |
| ------------------- | --------------------------- |
| `furniture.jpg`     | Furniture Services          |
| `plumbing.jpg`      | Plumbing Services           |
| `ac.jpg`            | Air Conditioner Services    |
| `appliance.jpg`     | Small Household Appliances  |
| `electrical.jpg`    | Electrical Services         |
| `boiler.jpg`        | Combi Boiler Services       |
| `packing.jpg`       | Packing / Boxing Services   |

Tips:

- Landscape photos around 1200x800 px (or larger) look best on the opener pages.
- `.jpg`, `.png`, and `.webp` all work — just keep the filename's base the same
  and update the extension in the `image:` field inside `script.js` if needed.
- To use a different photo for a single service row, change that service in
  `script.js` from a string to an object, e.g.
  `{ name: 'Furniture repair', img: 'images/furniture-repair.jpg' }`.
