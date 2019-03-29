# SCSS Toolkit

A small and configurable SCSS Toolkit to boost your project! 🚀

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
- `$breakpoints-height`: a map of names and values (in pixels) of height based breakpoints
- `@function media($breakpoint, $type, $unit, $orientation)`: a function to get a breakpoint declaration given a name
- `@function md($breakpoint, $type, $unit, $orientation)`: an alias for the `media(...)` function

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

  @media #{md('s', 'min', 'em', 'height')} { // @media (min-height: 36em) { ... }
    min-height: 50vh;
  }

  // Using SASS arglist
  @media #{md((breakpoint: 's', orientation: 'height')...)} { // @media (min-height: 36em) { ... }
    min-height: 50vh;
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
    * `<direction>`: `m`, `my`, `mx`, `mt`, `mr`, `mb`, `ml`, `p`, `py`, `px`, `pt`, `pr`, `pb` and `pl`
    * `<size>`: any of the [defined spaces](#framework_spacesscss)
    * `<breakpoint>`: any of the [defined breakpoints](#framework_breakpointsscss)


**Defaults**

The default spaces values are based on the power of two, with a base unit starting at 8px (0.5rem).

```scss
// Default unit is 8px, often used by designers as a basic unit
$spaces-base: 8px / 16px * 1rem !default;
// All spaces
$spaces: (0, 1, 2, 4, 8, 16, auto) !default;
```

**Usage**

```scss
.foo {
  margin: space(2);
}

.bar {
  padding-bottom: s(4);
}

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

- `$font-dir`: path to the folder of your webfont files, must be of `*.woff` and `*.woff2` formats
- `$font-name-serif`: the name of the serif font, to be used in `font-family` property
- `$font-name-sans`: the name of the sans-serif font, to be used in `font-family` property
- `$font-family-serif`: the serif `font-family` declaration
- `$font-family-sans`: the sans-serif `font-family` declaration
- `$font-faces`: a map of font-faces declaration structured as `<font-name> <filename> <font-weight> <font-style>`
  + `<font-name>`: can be one of the `$font-name-serif` or `$font-name-sans` variables
  + `<filename>`: the name of the file stored in the `$font-dir` folder
  + `<font-weight>`: the weight of the font, from `100` to `900`
  + `<font-style>`: a `font-style` value
- `$font-sizes`: a map of font-sizes lists to be used in your project structured as `<name>: (<font-size> <line-height>)`
  + `<name>`: the name of the size
  + `<font-size>`: the `font-size` value in pixels
  + `<line-height>`: the `line-height` value in pixels
- `@function font-size($font-size, $unit: 'em')`: a function to get a font-size value in the given unit by its name defined in the `$font-sizes` map
- `@function fz($font-size, $unit)`: alias for the `font-size($font-size, $unit)` function
- `@function line-height($font-size)`: a function to get a unitless line-height value by its name defined in the `$font-sizes` map
- `@function lh($font-size)`: alias for the `line-height($font-size)` function
- `@mixin font-size($font-size, $unit: 'em')`: a mixin to get both font-size in the given unit and line-height for a given name defined in the `$font-size` map
- `@mixin fz($font-size, $unit)`: alias for the `@include font-size($font-size, $unit)` mixin
- `@mixin reponsize-type($min-width: 0, $max-width: 2560, $min-size: 12, $max-size: 16)`: a mixin to generate declaration for responsive font-sizes
- `@mixin type-antialiased`: a mixin to generate properties for antialiased font rendering
- Class helpers:
  + An `@font-face` declaration based on the `$font-faces` list
  + `.type-antialiased`: a class implementing the `type-antialiased` mixin
  + `.type[-rem]-<size>[--<breakpoint>]`: set the `font-size` in `em` and `line-height` properties to the given `<size>` defined values, with the `-rem` variation setting the `font-size` unit in `rem` and the `<breakpoint>` modifier applying the styles to the corresponding breakpoint
    * `<size>`: a name defined in the `$font-sizes` map
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-<position>[--<breakpoint>]`: set the `text-align` property, with the `<breakpoint>` modifier applying the styles to the corresponding breakpoint
    * `<position>`: one of `center`, `left`, `right`
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-serif`: set the font-family property to the `$font-family-serif` value
  + `.type-sans`: set the font-family property to the `$font-family-sans` value
  + `.type-<weight>[--<breakpoin>]`: set the `font-weight` property to the given `<weight>`, with the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<weight>`: one of `thin`, `extralight`, `light`, `regular`, `medium`, `semibold`, `bold`, `extrabold`, `black`
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-spacing-<value>[--<breakpoint>]`: set the `letter-spacing` property to the given value, with the `<breakpoint>` modifier applying the style to the corresponding breakpoint
    * `<value>`: one of `25`, `50`, `100`, `200`
    * `<breakpoint>`: a breakpoint's name defined in the `$breakpoints` map
  + `.type-uppercase`: set the `text-transform` property to `uppercase`
  + `.type-lowercase`: set the `text-transform` property to `lowercase`
  + `.type-capitalize`: set the `text-transform` property to `capitalize`
  + `.type-no-underline`: set the `text-decoration` property to `none`
  + `.type-underline`: set the `text-decoration` property to `underline`
  + `body`: set the `font-family` property on the `body` to the value of the `$font-family-sans` variable
  + `h1, h2, h3, h4`: set the `font-family` property on the first 4 levels of heading to the value of the `$font-family-serif` variable
  + `a`: set the `color` property on the `a` HTML element to `inherit`

**Defaults**

```scss
$font-dir: '/source/fonts/' !default;
$font-name-serif: Georgia !default;
$font-name-sans: Arial !default;
$font-family-serif: $font-name-serif, serif !default;
$font-family-sans: $font-name-sans, sans-serif !default;

$font-faces: (
  $font-name-serif 'type-serif-regular' 400 normal,
  $font-name-sans 'type-sans-regular' 400 normal
) !default;

$font-sizes: (
  display-3: ( 44px, 66px ),
  display-2: ( 36px, 54px ),
  display-1: ( 24px, 32px ),
  display-0: ( 18px, 27px ),
  body:      ( 16px, 30px ),
  medium:    ( 14px, 26px ),
  small:     ( 12px, 22px ),
  smaller:   ( 10px, 18px ),
) !default;
```

**Usage**

```scss
.foo__title {
  @include fz('display-3');
  @include type-antialiased;
}
```

```html
<!-- Adjust the size of a title on different breakpoints -->
<h1 class="type-display-1--xxs type-display-2--s type-display-3--l">Foo Bar</h1>

<!-- Center a text -->
<p class="type-center">Lorem ipsum dolor…</p>
```


### Components

This toolkit come with some useful components : a grid, a reset and a debug helper.

#### [`components/debug.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/components/debug.scss)

**Definitions**

This component defines colored outlines on every HTML element, useful to debug layout on a page.

**Usage**

To use it, simply import the component in your project:

```scss
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

```scss
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
