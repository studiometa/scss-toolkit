# SCSS Toolkit

- [Usage](#usage)
  + [Installation](#installation)
  + [Recommended usage](#recommended-usage)
- [Documentation](#documentation)
  + [Framework](#framework)
  + [Components](#components)

## Usage

### Installation

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

### Recommended usage

The best way to use the micro framework in your application is to create a separate `_config.scss` file in your project which will override the configurations of the framework.

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
  $font-name-serif 'meta-serif-bold' 700 normal,
  $font-name-sans 'meta-ot-regular' 400 normal,
  $font-name-sans 'meta-or-bold' 700 normal,
);

// Colors definition
$colors: (
  'white': #fff,
  'black': #000,
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

TODO

#### [`framework/_colors.scss`](https://github.com/studiometa/scss-toolkit/blob/master/src/framework/_colors.scss)

TODO

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
