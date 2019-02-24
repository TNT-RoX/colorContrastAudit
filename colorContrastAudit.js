const lumina = rgb =>
  Array.isArray(rgb) &&
  rgb
    .slice(0, 3)
    .map(color => parseFloat(color) / 255)
    .map(color =>
      color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
    )
    .reduce(
      (res, color, idx) => (res += color * [0.2126, 0.7152, 0.0722][idx]),
      0
    ) * 0.05;

// WCAG 2 level AA
const auditContrast = element =>
  [
    lumina(
      window
        .getComputedStyle(element, null) //
        .getPropertyValue("background-color")
        .match(/[0-9.]+/g)
    ),
    lumina(
      window
        .getComputedStyle(element, null)
        .getPropertyValue("color")
        .match(/[0-9.]+/g)
    )
  ]
    .sort()
    .reverse()
    .reduce((acc, val) => (acc = acc > 0 ? acc / val : val), 0) > 4.5;
