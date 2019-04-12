# SCSS Toolkit

[![NPM Version](https://img.shields.io/npm/v/@studiometa/scss-toolkit.svg?style=flat-square)](https://www.npmjs.com/package/@studiometa/scss-toolkit)
[![NPM Beta Version](https://img.shields.io/npm/v/@studiometa/scss-toolkit/beta.svg?style=flat-square)](https://www.npmjs.com/package/@studiometa/scss-toolkit/v/beta)
[![Dependency Status](https://img.shields.io/david/studiometa/scss-toolkit.svg?label=deps&style=flat-square)](https://david-dm.org/studiometa/scss-toolkit)
[![devDependency Status](https://img.shields.io/david/dev/studiometa/scss-toolkit.svg?label=devDeps&style=flat-square)](https://david-dm.org/studiometa/scss-toolkit?type=dev)

> A small and configurable SCSS Toolkit to boost your project! 🚀

## Table of contents

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
- [Contributing](#contributing)

## Installation

Install it with Yarn:

```bash
$ yarn add @studiometa/scss-toolkit
```
Or with NPM:

```bash
$ npm install @studiometa/scss-toolkit
```

## Usage

### Simple Usage

Import the toolkit in your project to have access to all helpers functions, mixins, variables and classes:

```sass
@import '~@studiometa/scss-toolkit';
```

> If your current Sass implementation does not support `@import`s from Node modules, have a look at the [`node-sass-magic-importer`](https://www.npmjs.com/package/node-sass-magic-importer) custom importer.

### Advanced usage

If you need to specify a custom configuration — you probably will, the best way to use the micro framework in your application is to create a separate `_config.scss` file which will override the configurations of the framework.

**_config.scss**
```sass
/*==========================================================================*\
   Global SCSS configuration
\*==========================================================================*/

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
```sass
/*==========================================================================*\
   Main styles
\*==========================================================================*/

// Import dependencies:
// - _config.scss to override the SCSS toolkit's defaults
// - @studiometa/scss-toolkit/components/reset to get some nice defaults
@import './config';
@import '~@studiometa/scss-toolkit/components/reset';

// Import your project files
@import './components/foo';
@import './components/bar';
// ...

// Import the toolkit latst with the `$has-classes` variable set to `true`
// for the functions, mixins and classes helpers. Importing it last will let
// you use the classes without the `--force` modifier to override some
// of your components behaviours.
$has-classes: true;
@import '~@studiometa/scss-toolkit';
$has-classes: false;
```

> ⚠️ We reset the `$has-classes` variable to `false` right after the toolkit import to make sure future import in any SCSS file will only import the mixins, functions and variables declarations without the class helpers.

## Documentation

### Framework

The micro-framework is composed of 8 different files which defines each a set of variables, mixins, functions and classes. Find below what each file is responsible for.

#### [`framework/_breakpoints.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_breakpoints.scss)

**Definitions**

- `$breakpoints`: a map of names and values (in pixels) of breakpoints
- `$breakpoints-height`: a map of names and values (in pixels) of height based breakpoints
- `@function media($breakpoint, $type, $unit, $orientation)`: a function to get a breakpoint declaration given a name
- `@function md($breakpoint, $type, $unit, $orientation)`: an alias for the `media(...)` function

**Defaults**

```sass
$breakpoints: (
  'xxs': 0,
  'xs': 480,
  's': 768,
  'm': 1024,
  'l': 1280,
  'xl': 1440,
  'xxl': 1920,
) !default;

$breakpoints-height: (
  'xxs': 0,
  'xs': 360,
  's': 576,
  'm': 768,
  'l': 960,
  'xl': 1080,
  'xxl': 1440,
) !default;
```

**Usage**

```sass
.foo {
  display: none;

  // Media queries
  @media #{media('s')} { // @media (min-width: 48em) { ... }
    display: block;
  }

  @media #{md('xs', 'max')} { // @media not all and (min-width: 48em) { ... }
    display: flex;
  }

  @media #{md('s', 'min', 'em', 'height')} { // @media (min-height: 36em) { ... }
    min-height: 50vh;
  }

  // Using Sass ArgList
  @media #{md((breakpoint: 's', orientation: 'height')...)} { // @media (min-height: 36em) { ... }
    min-height: 50vh;
  }
}
```

#### [`framework/_colors.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_colors.scss)

**Definitions**

- `$colors-with-force`: wether to create `…--force` modifiers with the `!important` flag or not
- `$colors-with-breakpoints`: wether to create `…--<breakpoint>` modifiers or not
- `$colors`: a map of names and values of colors
- `@function color($color)`: a function to get a color value by its name defined in the previous map
- `@function c($color)`: an alias for the `color(...)` function
- `@mixin for-each-colors($excludes)`: a mixin to abstract the loop over the `$colors` map, with the color name and its value as mixin props
- Class helpers:
  + `.<property>-<color>[--force]`: set the given `<property>` to the given `<color>`'s value, with the `--force` modifier adding an `!important` flag
    * `<property>`: `background`, `color`, `fill`, `stroke`
    * `<color>`: one of the [defined colors](#framework_colorsscss)

**Defaults**

```sass
/** @type {Boolean} Do we need the `--force` modifiers? */
$colors-with-force: false !default;

/** @type {Boolean} Do we need the `--<breakpoint>` modifiers? */
$colors-with-breakpoints: false !default;

/**
 * Map of color names and values
 *
 * @type {Map}
 */
$colors: (
  'white': #fff,
  'black': #000,
) !default;
```

**Usage**

Example usage for the `color($color)` function:

```sass
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

- `$displays-with-force`: wether to create `…--force` modifiers with the `!important` flag or not
- `$displays-with-breakpoints`: wether to create `…--<breakpoint>` modifiers or not
- `$displays`: a list of display value from which to create helper classes
- `@mixin hidden-accessible`: a set of properties to hide an element while keeping it accessible
- Class helpers:
  + `.display-<type>[--<breakpoint>|--force[-<breakpoint>]]` : classes setting the property `display` to the given `<type>`, with the `--force` modifier adding the `!important` flag to the declaration, and the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<type>`: `none`, `block`, `flex`, `inline`, `inline-block`
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)
  + `.display-hidden-accessible` : a class using the `display-hidden-accessible()` mixin

**Defaults**

```sass
/** @type {Boolean} Do we need the `--force` modifiers? */
$displays-with-force: false !default;

/** @type {Boolean} Do we need the `--<breakpoint>` modifiers? */
$displays-with-breakpoints: false !default;

/** @type {List} List of display values to use */
$displays: (none, block, inline, inline-block) !default;
```

**Usage**

Example usage for the `display-hidden-accessible` mixin:

```sass
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

```sass
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

```sass
.foo {
  transition: transform 0.6s $in-out-expo;
}
```

#### [`framework/index.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/index.scss)

**Definitions**

Imports all the framework files with the `$has-classes` variable set to `false !default`.

**Usage**

```sass
// Import all the framework files at once
@import '@studiometa/scss-toolkit';
```

#### [`framework/_layers.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_layers.scss)

**Definitions**

- `$layers-with-force`: wether to create `…--force` modifiers with the `!important` flag or not
- `$layers-with-breakpoints`: wether to create `…--<breakpoint>` modifiers or not
- `$layers`: a map of names and values of layers
- `@function layer($layer, $modifier)`: a function to get a layer value by its name defined in the previous map
- `@function l($layer, $modifier)`: an alias for the `layer(...)` function
- `@function z($layer, $modifier)`: a legacy alias for the `layer(...)` function
- `@mixin for-each-layers($excludes)`: a mixin to abstract the loop over the `$colors` map, with the color name and its value as mixin props
- Class helpers:
  + `.layer-<layer>[--<breakpoint>|--force[-<breakpoint>]]`: classes setting the `z-index` property to the corresponding value, with the `--force` modifier adding an `!important` flag, and the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<layer>`: one of the [defined layers](#framework_layersscss)
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)

**Defaults**

```sass
/** @type {Boolean} Do we need the `--force` modifiers? */
$layers-with-force: false !default;

/** @type {Boolean} Do we need the `--<breakpoint>` modifiers? */
$layers-with-breakpoints: false !default;

/**
 * Map of layer names and values to use
 *
 * @type {Map}
 */
$layers: (
  goku: 9000,
  default: 1,
  limbo: -999,
) !default;
```

**Usage**

Example usage of the functions:

```sass
.foo {
  z-index: layer('goku');

  &[aria-hidden="true"] {
    z-index: l('limbo');
  }
}

.bar {
  z-index: l('default', 2); // z-index: 3;
}
```

Example usage of the helper classes:

```html
<!-- Apply the `modal` layer value -->
<div class="modal layer-modal"></div>
```

#### [`framework/_spaces.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_spaces.scss)

**Definitions**

- `$spaces-base`: the base value of your spaces, can be of any unit, but `rem` is advised
- `$spaces`: a list of factor of the base value for the different spaces value in your project
- `@function space($space)`: a function returning the computed value for a given `$space` defined in the `$spaces` list
- `@function s($space)`: alias for the above `space($space)` function
- `@mixin for-each-spaces($excludes)`: a mixin to abstract the loop over the `$spaces` list with the space name and its value passed as props
- Class helpers:
  + `.space-<direction>-<size>[--<breakpoint>]` : classes setting the property defined by `<direction>` to the given `<size>`, with the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<direction>`: one of `m`, `my`, `mx`, `mt`, `mr`, `mb`, `ml`, `p`, `py`, `px`, `pt`, `pr`, `pb` and `pl`
    * `<size>`: any of the [defined spaces](#framework_spacesscss)
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)


**Defaults**

The default spaces values are based on the power of two, with a base unit starting at 8px (0.5rem).

```sass
/** @type {Number} The base value of all spacings */
$spaces-base: 8px / 16px * 1rem !default;

/** @type {List} List of all space factors */
$spaces: (0, 1, 2, 4, 8, 16, auto) !default;
```

**Usage**

```sass
$spaces-base: 0.5rem;
$spaces: (0, 1, 2, 4, 8, 16, auto);

// SCSS
.foo {
  margin: space(4); // 4 * 0.5rem
}

// CSS
.foo {
  margin: 2rem;
}

// SCSS
.baz {
  margin-right: s(auto);
  margin-left: s(auto);
}
```

```html
<!-- Horizontal padding of 2 times the base unit and 4 times on bigger screens -->
<div class="space-px-2 space-px-4--s"></div>

<!-- Centering an element -->
<div class="space-mx-auto"></div>
```

#### [`framework/_typography.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_typography.scss)

**Definitions**

- `@mixin reponsize-type($min-width: 0, $max-width: 2560, $min-size: 12, $max-size: 16)`: a mixin to generate declaration for responsive font-sizes
- `@mixin type-antialiased`: a mixin to generate properties for antialiased font rendering
- `$type-sizes`: a map of font-sizes lists to be used in your project structured as `<name>: ( size: <font-size>[, line-height: <line-height>][, weight: <font-weight>])`
  + `<name>`: the name of the size
  + `<font-size>`: the `font-size` value in pixels
  + `<line-height>`: the `line-height` value in pixels
  + `<font-weight>`: the unitless `font-weight` value
- `@mixin font-size($font-size, $unit: 'em')`: a mixin to get CSS properties of the given name defined in the `$font-size` map
- `@mixin fz($font-size, $unit: 'em')`: alias for the `@include font-size($font-size, $unit)` mixin
- `$type-webfont-dir`: path to the folder of your webfont files (which must be of `*.woff` and `*.woff2` formats)
- `$type-webfont-display`: the `font-display` property that will be applied to the `@font-faces` declarations
- `$type-fonts: (<identifier>: <definition>)`: a map of font identifiers
  + `<identifier>`: a unique font name, will be used to generate helper classes
  + `<definition>: (stack: <font-family>, [name: <font-name>, webfonts: <webfonts>)`: a map defining the font stack and its webfonts if needed
    * `<stack>`: the full stack of fonts and their fallbacks, will be used to declare the `font-family` property
    * `<font-name>`: the name of the font, used to set the `font-family` property in the `@font-faces` declaration
    * `<webfonts>: (filename: <filename>, weight: <font-weight>, style: <font-style>)`: a list of maps containing the filename, weight and style of each wbefont to declare in an `@font-faces` statement
      - `<filename>`: the name of the `woff` and `woff2` files of your webfont, without extension
      - `<font-weight>`: the weight corresponding to the given filename (a number from `100` to `900`)
      - `<font-style>`: the style of the given filename (`normal`, `italic`, etc.)
- `@function font-family($type-font)`: a function to get a `font-family` stack by a given identifier
- `@function ff($type-font)`: alias for the above `font-family($type-font)` function
- Class helpers:
  + `.type-antialiased`: a class implementing the `type-antialiased` mixin
  + `.type[-rem]-<size>[--<breakpoint>]`: set the `font-size` in `em` and `line-height` properties to the given `<size>` defined values, with the `-rem` variation setting the `font-size` unit in `rem` and the `<breakpoint>` modifier applying the styles to the corresponding breakpoint
    * `<size>`: a name defined in the `$font-sizes` map
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-<font-name>`: set the `font-family` property to the corresponding stack in the `$type-fonts` map
    * `<font-name>`: the unique identifier given to the font
  + `.type-align-<alignment>[--<breakpoint>]`: set the `text-align` property, with the `<breakpoint>` modifier applying the styles to the corresponding breakpoint
    * `<alignment>`: one of the value defined in the `$type-alignments` map, `center`, `left`, or `right` by defaults
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-<weight>[--<breakpoint>]`: set the `font-weight` property to the given `<weight>`, with the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<weight>`: one of the value defined in the `$type-weights` map, `300`, `400` or `700` by defaults
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-spacing-<value>[--<breakpoint>]`: set the `letter-spacing` property to the given value, with the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<value>`: one of the value defined in the `$type-spacings` map, `25`, `50`, `100`, `200` by defaults
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-transform-<transform>`: set the `text-transform` property to the given `<transform>`
    * `<transform>`: one of the value defined in the `$type-transforms` map, `uppercase`, `lowercase` or `capitalize` by defaults
  + `.typ-decoration-<decoration>`: set the `text-decoration` property to the given `<decoration>` value
    * `<decoration>`: one of the value defined in the `$type-decorations` map, `none` or `underline` by defaults

**Defaults**

```scss
/**
 * A map to define all type-sizes and their corresponding line-heights, the
 * first value is the font-size, the seconde the line-height.
 *
 * @type {Map}
 */
$type-sizes: (
  display-1: (
    size: 32px,
    line-height: 48px,
    weight: 700,
  ),
  display-2: (
    size: 24px,
    line-height: 36px,
    weight: 700,
  ),
  body: (
    size: 16px,
  ),
  small: (
    size: 12px,
  ),
) !default;


/** @type {String} The path to the webfonts directory */
$type-webfont-dir: '/static/fonts/' !default;

/** @type {String} The value for all `font-display` properties */
$type-webfont-display: auto !default;

/**
 * A map to define all font-families specifications which we might refer to by a
 * named identifier. The map is formatted as follow:
 *
 * (
 *   <identifier>: (
 *     name: <font-family-name>,
 *     stack: <font-family-stack>,
 *     webfonts: (
 *       (
 *         filename: <webfont-filename>,
 *         weight: <webfont-weight>,
 *         style: <webfont-style>,
 *       ),
 *     ),
 *   ),
 * )
 *
 * @type {Map}
 */
$type-fonts: (
  serif: (
    name: Georgia,
    stack: 'Georgia, serif',
    webfonts: (
      (
        filename: 'georgia-regular',
        weight: 400,
        style: normal,
      ),
    ),
  ),
  sans-serif: (
    name: Arial,
    stack: 'Arial, sans-serif',
    webfonts: (
      (
        filename: 'arial-regular',
        weight: 400,
        style: normal,
      ),
    ),
  ),
) !default;

/** @type {List} List of alignment values to use */
$type-alignments: (left, center, right) !default;

/** @type {List} List of font weights values to use */
$type-weights: (300, 400, 700) !default;

/** @type {List} List of letter spacings values to use */
$type-spacings: (25, 50, 100, 200) !default;

/** @type {List} List of text transform values to use */
$type-transforms: (uppercase, lowercase, capitalize) !default;

/** @type {List} List of text decoration values to use */
$type-decorations: (none, underline) !default;
```

**Usage**

```scss
.title {
  @include fz('display-1');
  @include type-antialiased;
}
```

```html
<!-- Adjust the size of a title on different breakpoints -->
<h1 class="type-display-1--xxs type-display-2--s">Foo Bar</h1>

<!-- Center a text -->
<p class="type-align-center">Lorem ipsum dolor…</p>
```


### Components

This toolkit come with some useful components : a grid, a reset and a debug helper.

#### [`components/debug.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/debug.scss)

**Definitions**

This component defines colored outlines on every HTML element, useful to debug layout on a page.

**Usage**

To use it, simply import the component in your project:

```sass
// You can import it globally
@import '@studiometa/scss-toolkit/src/components/debug';

// Or locally to enable debug only on a component
.my-component {
  @import '@studiometa/scss-toolkit/src/components/debug';
}
```

#### [`components/grid.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/grid.scss)

**Definitions**

- `$grid-columns`: the number of columns your grid should have, default is `12`
- `$grid-gutters`: a map defining the gutter for each breakpoint of your grid component
- `$grid-breakoints`: a map defining all breakpoints available for your grid, default to the value of [`$breakpoints`](#framework_spacesscss) defined in the framework
- Component classes:
  + `.grid[--<modifier>]`: the component's BEM block, with modifier being one of `nested` or `no-gutter`
    * `.grid--nested`: modifier used to nest grid components
    * `.grid--no-gutter`: modifier used to have a grid without any gutter
  + `.grid__row[--<modifier>]`: used to set up a row in you grid, with some `<modifier>` to take advantage of some flex alignment properties
    * `.grid__row--end`: apply the property `align-items` with the value `flex-end` to the row, used to align all columns in a row to the bottom
    * `.grid__row--center`: apply the property `align-items` with the value `center` to the row, used to center all columns in a row
    * `.grid__row--stretch`: apply the property `align-items` withe the value `stretch` to the row, used to stretch all columns in a row to the same height
  + `.grid__col-<columns>--<breakpoint>`: the component's column classes
    * `<columns>`: a number from 1 to the total number of columns defined in the `$grid-columns` variable
    * `<breakpoin>`: name of one of the breakpoint defined in the `$grid-breakpoints` variable
  + `grid__pull-<columns>--<breakpoint>`: negative offset classes, used to pull columns to the left by the given `<columns>` count
    * `<columns>`: a number from 1 to the total number of columns defined in the `$grid-columns` variable
    * `<breakpoint>`: name of one of the breakpoint defined in the `$grid-breakpoints` variable
  + `grid__push-<columns>--<breakpoint>`: offset classes, used to push columns from the left by the given `<columns>` count
    * `<columns>`: a number from 1 to the total number of columns defined in the `$grid-columns` variable
    * `<breakpoint>`: name of one of the breakpoint defined in the `$grid-breakpoints` variable
  + `.grid__col-<type>--<breakpoint>`
    * `<type>`:
      - `.grid__col-center--<breakpoint>`: center the column in its row
      - `.grid__col-clear--<breakpoint>`: clear the float of the previous column, creates a line-break in your grid
      - `.grid__col-no-clear--<breakpoint>`: reverse the effect of the previous class
      - `.grid__col-left--<breakpoint>`: float a column to the left from the given breakpoint and up
      - `.grid__col-right--<breakpoint>`: float a column to the right from the given breakpoint and up
      - `.grid__col-0--<breakpoint>`: hide a column from the given breakpoint and up
    * `<breakpoint>`: name of one of the breakpoint defined in the `$grid-breakpoints` variable

**Defaults**

```sass
$grid-columns: 12 !default;
$grid-gutter: space(4) !default;
$grid-breakpoints: $breakpoints !default;
```

**Usage**

```html
<!-- One column on mobile, two on tablets and three on desktop -->
<div class="grid">
  <div class="grid__row">
    <div class="grid__col-12--xxs grid__col-6--s grid__col-4--l">…</div>
    <div class="grid__col-12--xxs grid__col-6--s grid__col-4--l">…</div>
  </div>
</div>

<!-- A nested grid in a centered main column -->
<div class="grid">
  <div class="grid__row">
    <div class="
      grid__col-12--xxs
      grid__col-10--xs
      grid__push-1--xs
      grid__col-8--m
      grid__push-2--m
      grid__col-6--l
      grid__push-3--l
    ">
      <div class="grid grid--nested">
        <div class="grid__row">
          <div class="grid__col-6--xxs">…</div>
          <div class="grid__col-6--xxs">…</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### [`components/reset.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/reset.scss)

**Definitions**

The reset component only import the classic [reset.css](https://meyerweb.com/eric/tools/css/reset/).

## Contributing

This project uses [Git Flow](https://github.com/petervanderdoes/gitflow-avh) as a branching model and a combo of [Stylelint](https://stylelint.io/) and [Prettier](https://prettier.io/) to lint the SCSS files. You can lint your modifications when contributing with the following commands:

```bash
# Lint all files in the src/ folder
$ yarn lint
# or
$ npm run lint

# Try to fix all lint errors/warnings
$ yarn fix
# or
$ npm run fix
```
