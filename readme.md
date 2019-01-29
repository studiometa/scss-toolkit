# SCSS Toolkit

- [Installation](#installation)
- [Usage](#usage)
  + [Simple usage](#simple-usage)
  + [Advanced usage](#advanced-usage)
- [Documentation](#documentation)
  + [Framework](#framework)
  + [Components](#components)

## Installation

Install it with your favorite package manager:

```bash
yarn add @studiometa/scss-toolkit
# OR
npm install @studiometa/scss-toolkit
```

## Usage

### Simple Usage

Import the toolkit in your project to have access to all helpers functions, mixins, variables and classes:

```scss
@import '~@studiometa/scss-toolkit';
```

If you need some mixins or functions of a specific framework file, you can import it separately:

```scss
@import '~@studiometa/scss-toolkit/src/framework/breakpoints';
@import '~@studiometa/scss-toolkit/src/framework/easings';
```

> If your current Sass implementation does not support `@import`s from Node modules, have a look at the [`node-sass-magic-importer`](https://www.npmjs.com/package/node-sass-magic-importer) custom importer.

### Advanced usage

If you need to specify a custom configuration — you probably will, the best way to use the micro framework in your application is to create a separate `_config.scss` file which will override the configurations of the framework.

**_config.scss**
```scss
/*==========================================================================*\
   Global SCSS configuration
\*==========================================================================*/

// Assets directories configuration
$img-dir: '/assets/img/';
$svg-dir: '/assets/svg/';
$font-dir: '/assets/fonts/';

// Typography configuration
$font-name-serif: 'Meta Serif';
$font-name-sans: 'Meta OT';
$font-faces: (
  $font-name-serif 'meta-serif-regular' 400 normal,
  $font-name-sans 'meta-ot-regular' 400 normal,
);

// Colors definition
$colors: (
  'red': #f00,
  'green': #0f0,
  'blue': #00f,
);

// Import SCSS Toolkit after the configuration overrides
@import '~@studiometa/scss-toolkit';
```

You can then import your `_config.scss` file wherever you need to access a function, mixin or variable from the toolkit. You can import both your configuration file and the SCSS Toolkit package in your main SCSS file with a variable `$has-classes` set to `true` to import all the class helpers from the toolkit.

**app.scss**
```scss
/*==========================================================================*\
   Main styles
\*==========================================================================*/

// Import dependencies:
// - _config.scss to override the SCSS toolkit's defaults
// - @studiometa/scss-toolkit/components/reset to get some nice defaults
// - @studiometa/scss-toolkit with the `$has-classes` variable set to `true`
//   for the functions, mixins and classes helpers
@import './config';
@import '~@studiometa/scss-toolkit/components/reset';
$has-classes: true;
@import '~@studiometa/scss-toolkit';
$has-classes: false;

// ...
```

> ⚠️ We reset the `$has-classes` variable to `false` right after the toolkit import to make sure future import in any SCSS file will only import the mixins, functions and variables declarations without the class helpers.

## Documentation

### Framework

The micro-framework is composed of 8 different files which defines each a set of variables, mixins, functions and classes. Find below what each file is responsible for.

#### [`framework/_breakpoints.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_breakpoints.scss)

In this file are defined a `$breapoints` map a `media($breakpoint, $type, $unit)` function and its alias `md($breakpoint, $type, $unit)`.

**Defaults**

```scss
$breakpoints: (
  'xxs': 0,
  'xs': 480,
  's': 768,
  'm': 1024,
  'l': 1280,
  'xl': 1440,
  'xxl': 1920,
) !default;
```

**Usage**

```scss
.foo {
  display: none;

  // Media queries
  @media #{media('s')} { // @media (min-width: 48em) { ... }
    display: block;
  }

  @media #{md('xs', 'max')} { // @media not all and (min-width: 48em) { ... }
    display: flex;
  }
}
```

#### [`framework/_colors.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_colors.scss)

In this file are defined the following:

- `$colors`: a map of name and values for your projet's colors
- `@function color($color)`: a function to get a color value by its name defined in the previous map
- `@function c($color)`: an alias for the `color($color)` function
- Class helpers:
  + `.color-#{$colorName}`: set the `color` property to the color's value 
  + `.color-#{$colorName}--force`: set the `color` property with the `!important` flag
  + `.fill-#{$colorName}`: set the `fill` property to the color's value
  + `.fill-#{$colorName}--force`: set the `fill` property with the `!important` flag
  + `.stroke-#{$colorName}`: set the `stroke` property to the color's value
  + `.stroke-#{$colorName}--force`: set the `stroke` property with the `!important` flag

**Defaults**

```scss
$colors: (
  'white': #fff,
  'black': #000,
) !default;
```

**Usage**

Example usage for the `color($color)` function:

```scss
.foo {
  color: color('white');
}

.bar {
  background-color: c('black');
  color: c('white');
}
```

Example usage of the helper classes:

```html
<p class="color-white">
  Eveniet neque velit <span class="color-black">asperiores</span>. Dolores…
</p>
```

#### [`framework/_displays.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_displays.scss)

TODO

#### [`framework/_easings.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_easings.scss)

TODO

#### [`framework/_index.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_index.scss)

TODO

#### [`framework/_layers.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_layers.scss)

TODO

#### [`framework/_spaces.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_spaces.scss)

TODO

#### [`framework/_typography.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_typography.scss)

TODO


### Components

This toolkit come with some useful components : a grid, a reset and a debug helper.

#### [`components/debug.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/debug.scss)

TODO

#### [`components/grid.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/grid.scss)

TODO

#### [`components/reset.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/reset.scss)

TODO
