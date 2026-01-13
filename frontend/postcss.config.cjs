const plugins = [];
try {
  // include Tailwind if it's installed in the environment
  // this allows building without Tailwind present (graceful fallback)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins.push(require('tailwindcss'));
} catch (e) {}
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins.push(require('autoprefixer'));
} catch (e) {}

module.exports = { plugins };
