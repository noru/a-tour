import mdPlugin, { Mode } from 'vite-plugin-markdown'

module.exports = {
  plugins: [mdPlugin({ mode: [Mode.HTML] })],
  base: '',
  build: {
    outDir: '../docs'
  }
};
