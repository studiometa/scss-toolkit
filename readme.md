# SCSS Toolkit

- [Installation](#installation)
- [Usage](#usage)
  + [Simple usage](#simple-usage)
  + [Advanced usage](#advanced-usage)
- [Documentation](#documentation)
  + [Framework](#framework)
    * [Breakpoints](#framework_breakpointsscss)
    * [Colors](#framework_colorsscss)
    * [Displays](#framework_displaysscss)
    * [Easings](#framework_easingsscss)
    * [Index](#framework_indexscss)
    * [Layers](#framework_layersscss)
    * [Spaces](#framework_spacesscss)
    * [Typography](#framework_typographyscss)
  + [Components](#components)
    * [Debug](#componentsdebugscss)
    * [Grid](#componentsgridscss)
    * [Reset](#componentsresetscss)

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

**Definitions**

- `$breakpoints`: a map of names and values (in pixels) of breakpoints
- `@function media($breakpoint, $type, $unit)`: a function to get a breakpoint declaration given a name
- `@function md($breakpoint, $type, $unit)`: an alias for the `media(...)` function

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

**Definitions**

- `$colors`: a map of names and values of colors
- `@function color($color)`: a function to get a color value by its name defined in the previous map
- `@function c($color)`: an alias for the `color(...)` function
- Class helpers:
  + `.<property>-<color>[--force]`: set the given `<property>` to the given `<color>`'s value, with the `--force` modifier adding an `!important` flag
    * `<property>`: `background`, `color`, `fill`, `stroke`
    * `<color>`: one of the [defined colors](#framework_colorsscss)

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

<svg version="1.0" xmlns="http://www.w3.org/2000/svg">
  <path d="M…" class="fill-white stroke-black" />
</svg>
```

#### [`framework/_displays.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_displays.scss)

**Definitions**

- `@mixin hidden-accessible`: a set of properties to hide an element while keeping it accessible
- Class helpers:
  + `.display-<type>[--<breakpoint>|--force[-<breakpoint>]]` : classes setting the property `display` to the given `<type>`, with the `--force` modifier adding the `!important` flag to the declaration, and the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<type>`: `none`, `block`, `flex`, `inline`, `inline-block`
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)
  + `.display-hidden-accessible` : a class using the `display-hidden-accessible()` mixin

**Usage**

Example usage for the `display-hidden-accessible` mixin:

```scss
.foo {
  @include display-hidden-accessible; // Hide this element while keeping it accessible
}
```

Example usage for the helper classes:

```html
<!-- Display an inline element as a block -->
<span class="display-block"></span>

<!-- Force an inline display on an element -->
<div class="display-inline--force"></div>

<!-- Hide an element on small screen, display it as a block on bigger ones -->
<div class="display-none--xxs display-block--m"></div>
```

#### [`framework/_easings.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_easings.scss)

**Definitions**

Defines a set of defaults easing variables, from `$in-quad` to `$in-out-back`.

**Defaults**

```scss
$in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53) !default;
$out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94) !default;
$in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955) !default;

$in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19) !default;
$out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1) !default;
$in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1) !default;

$in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22) !default;
$out-quart: cubic-bezier(0.165, 0.84, 0.44, 1) !default;
$in-out-quart: cubic-bezier(0.77, 0, 0.175, 1) !default;

$in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06) !default;
$out-quint: cubic-bezier(0.23, 1, 0.32, 1) !default;
$in-out-quint: cubic-bezier(0.86, 0, 0.07, 1) !default;

$in-sine: cubic-bezier(0.47, 0, 0.745, 0.715) !default;
$out-sine: cubic-bezier(0.39, 0.575, 0.565, 1) !default;
$in-out-sine: cubic-bezier(0.445, 0.05, 0.55, 0.95) !default;

$in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035) !default;
$out-expo: cubic-bezier(0.19, 1, 0.22, 1) !default;
$in-out-expo: cubic-bezier(1, 0, 0, 1) !default;

$in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335) !default;
$out-circ: cubic-bezier(0.075, 0.82, 0.165, 1) !default;
$in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86) !default;

$in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045) !default;
$out-back: cubic-bezier(0.175, 00.885, 0.32, 1.275) !default;
$in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55) !default;
```

**Usage**

```scss
.foo {
  transition: transform 0.6s $in-out-expo;
}
```

#### [`framework/_index.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_index.scss)

**Definitions**

Imports all the framework files with the `$has-classes` variable set to `false !default`.

**Usage**

```scss
// Import all the framework files at once
@import '@studiometa/scss-toolkit/src/framework/index';
```

#### [`framework/_layers.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_layers.scss)

**Definitions**

- `$layers`: a map of names and values of layers 
- `@function layer($layer, $modifier)`: a function to get a layer value by its name defined in the previous map
- `@function l($layer, $modifier)`: an alias for the `layer(...)` function
- `@function z($layer, $modifier)`: a legacy alias for the `layer(...)` function
- Class helpers:
  + `.layer-<layer>[--<breakpoint>|--force[-<breakpoint>]]`: classes setting the `z-index` property to the corresponding value, with the `--force` modifier adding an `!important` flag, and the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<layer>`: one of the [defined layers](#framework_layersscss)
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)

**Defaults**

```scss
$layers: (
  'goku': 9000,
  'modal': 6000,
  'sticky': 2000,
  'menu': 300,
  'tooltip': 200,
  'dropdown': 100,
  'default': 1,
  'limbo': -999,
) !default;
```

**Usage**

Example usage of the functions:

```scss
.foo {
  z-index: layer('goku');

  &[aria-hidden="true"] {
    z-index: l('limbo');
  }
}

.bar {
  z-index: z('default', 2);
}
```

Example usage of the helper classes:

```html
<!-- Apply the `modal` layer value -->
<div class="modal layer-modal"></div>
```

#### [`framework/_spaces.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_spaces.scss)

**Definitions**

- `$spaces-base`
- `$spaces`
- `@function space($space)`
- `@function s($space)`
- Class helpers:
  + `.space-<direction>-<size>[--<breakpoint>]` : classes setting the property defined by `<direction>` to the given `<size>`, with the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<direction>`: `my`, `mx`, `mt`, `mr`, `mb`, `ml`, `py`, `px`, `pt`, `pr`, `pb` and `pl`
    * `<size>`: any of the [defined spaces](#framework_spacesscss)
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)


**Defaults**

**Usage**

#### [`framework/_typography.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_typography.scss)

**Definitions**

- `$font-dir`
- `$font-name-serif`
- `$font-name-sans`
- `$font-family-serif`
- `$font-family-sans`
- `$font-faces`
- `$font-sizes`
- `@function font-size($font-size, $unit)`
- `@function fz($font-size, $unit)`
- `@function line-height($font-size)`
- `@function lh($font-size)`
- `@mixin font-size($font-size, $unit)`
- `@mixin fz($font-size, $unit)`
- `@mixin reponsize-type($min-width, $max-width, $min-size, $max-size)`
- `@mixin type-antialiased`
- Class helpers:
  + An `@font-face` declaration based on the `$font-faces` list

**Defaults**

**Usage**


### Components

This toolkit come with some useful components : a grid, a reset and a debug helper.

#### [`components/debug.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/debug.scss)

TODO

#### [`components/grid.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/grid.scss)

TODO

#### [`components/reset.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/reset.scss)

TODO
