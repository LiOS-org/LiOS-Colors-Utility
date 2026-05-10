import Color from "./color.js/color.js";

const colorUtil = {};
const smoothStep = (t) => {
    return t * t * (3 - 2 * t);
};
colorUtil.newPalette = (hex, options) => {
    const color = new Color(hex).to("oklch");
    const {l,c,h} = color.oklch;
    const steps = options?.steps || 7;
    const palette = [];
    const L_min = Math.min(0.95, l + 0.25);
    const L_max = Math.max(0.2, l - 0.35);

    for (let i = 0; i < steps; i++){
        let t = i / (steps - 1);
        // Lightness (smooth curve)
        let L_i = L_min + (L_max - L_min) * smoothStep(t);
        // Chroma (bell curve)
        let C_i = Math.max(0, c * (1 - 0.7 * Math.pow(2 * t - 1, 2)));
        // Hue (subtle drift)
        let H_i = (h + 8 * (t - 0.5) + 360) % 360;

        let col = new Color("oklch", [L_i, C_i, H_i])

        .to("srgb", { inGamut: true });

        palette.push(col.toString({ format: "hex" }));
    };

    return palette;

};
function hexToRgba(hex, opacity = 0.5) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = opacity;

    return `rgba(${r},${g},${b},${a})`;

};
colorUtil.frostify = (paletteArray) => {
    const newPalette = [];
    paletteArray.forEach((color) => {
        const newColor = hexToRgba(color);
        newPalette.push(newColor);
    });
    return newPalette;
}
colorUtil.CSS = (baseColor) => {
    const normal = colorUtil.newPalette(baseColor);
    const frosted = colorUtil.frostify(normal);
    const normalLength = normal.length;
    const frostedLength = frosted.length;
    const returnObject = {};

    for (let i = 0; i < normalLength; i++) {
        returnObject[`--color-${i + 1}`] = normal[i];
    };
    for (let i = 0; i < frostedLength; i++) {
        returnObject[`--frosted-color-${i + 1}`] = frosted[i];
    };
    return returnObject;
};
colorUtil.CSSRegister = (CSSObject) => {
    const root = document.querySelector(":root");
    
    for (const [key, value] of Object.entries(CSSObject)) {
        root.style.setProperty(key, value);
    };
};
const a = colorUtil.CSS("#c92351");
const b = colorUtil.CSSRegister(a);

export {colorUtil};

