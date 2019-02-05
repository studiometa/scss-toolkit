const { create } = require('@studiometa/gulp-config');

module.exports = create({
  styles: {
    src: 'tests/src',
    dist: 'tests/dist',
    gulpSassOptions: {
      outputStyle: 'expanded',
    },
    cleanCssOptions: {
      format: 'beautify',
    },
  },
});
