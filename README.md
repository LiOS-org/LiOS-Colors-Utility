<div align = "center">
    <a href="#">
        <img alt = "LiOS Colors" src = "assets/favicon/favicon-squircle.svg" width = "25%"/>
    </a>
    <h1>LiOS Colors Utility</h1>
</div>

A deterministic, client-side utility that generates a complete color palette from a single base color — no database, no API, just maths.

## Installation 

You can install it using `git submodule`.

```bash
git submodule add https://github.com/LiOS-Org/LiOS-Colors-Utility.git
```
then do this to initialize the submodule

```bash
git submodule update --init --recursive
```

If for some reason you can't or don't wanna use `git submodule` you can download it from the [releases](https://github.com/LiOS-Org/LiOS-Colors-Utility/releases) page and extract the `zip` file into your project root directory.

## Usage

> Note: Example showcases `ES6` import, you can also use it directly in the browser using `script` tag.

> ⚠️ Incompatible with `nodeJS` or any non browser environment, this utility is designed to work only in the browser.

### Importing the utility

```JS
import {colorUtil} from "${path_to_installation}/colorUtil.js";
```
### Generating a color palette

```JS
const baseColor = "#3498db"; // Base color in hex format
const palette = colorUtil.newPalette(baseColor);
console.log(palette); // Output: An array of color in hex format (String) with various shades and tints based on the base color
```

### This utility can also generate `translucent` color palette, which is a palette with the same colors but with varying levels of transparency. Useful for frosted glass design.

> It needs a color palette from previous step to generate the translucent palette.

```JS
const translucentPalette = colorUtil.frostify(palette);
console.log(translucentPalette); // Output: An array of color in rgba format (String) with the same colors as the original palette but with varying levels of transparency.
```

### This utility can also automatically generate `CSS` variables for the generated color palette, which can be used directly in your CSS files.

```JS
const CSS = colorUtil.CSS(baseColor);
console.log(CSS); // Output: A Object containing CSS variables for the generated color palette,
```
> You will need to pass an actual color in hex format to the `CSS` function, not the palette, this is because the CSS variables are generated based on the base color and not the palette.

> This function generates both normal and translucent CSS variables, the normal variables are in the format `--color-{index}` and the translucent variables are in the format `--frosted-color-{index}`, where `{index}` is the index of the color in the palette.

> Default index is 7, and currently there is no way to change it, but it will be added in the future.

> The index does not represent semantic roles (e.g., primary, secondary). That means `--color-1`, doesn't mean it is the `primary` color, this feature will be added in the future, for now you can assign the CSS variables to the color roles you want in your CSS files.

### You can also automatically inject the generated CSS variables into the `:root` of your document, this will make the CSS variables available globally in your CSS files.

```JS
colorUtil.CSSRegister(CSS); // The CSS object generated from the previous step is passed to this function to inject the CSS variables into the :root of the document.
```
> Pro tip: Make sure to tweak your CSS object to your needs before registering it, for example you can change the variable names or remove some variables you don't need, this will help you to keep your CSS clean and organized.

## License

This project is licensed under the Apache License 2.0.

This project uses [Color.js](https://colorjs.io/), which is licensed under the MIT License.