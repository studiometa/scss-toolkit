const { create } = require('@studiometa/gulp-config');

module.exports = create({
  styles: {
    src: 'tests/src',
    dist: 'tests/dist',
  },
});
