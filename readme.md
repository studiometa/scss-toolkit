# SCSS Toolkit

## Usage

Install it with your favorite package manager:

```bash
yarn add @studiometa/scss-toolkit
# OR
npm install @studiometa/scss-toolkit
```

Import the `index.scss` file in your project to have access to all helpers functions, mixins, variables and classes:

```scss
@import "@studiometa/scss-toolkit/index";
```

If you need some mixins or functions of a specific framework file, you can import it separately:

```scss
@import "@studiometa/scss-toolkit/src/framework/breakpoints";
@import "@studiometa/scss-toolkit/src/framework/easings";
```

## TODO

- Write documentation
- Improve configuration 
- Improve the grid component
  + Add some flex helpers or create a flex grid component
- Improve the typography configuration
  + Add keys to the font-sizes map
  + Add font-weight to the font-sizes map
- Rename the visibility class prefix to `display-`
- Rename functions with a more comprehensive name and create one letter aliases
- Add a reset component
