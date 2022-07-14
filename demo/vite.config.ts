import mdPlugin, { Mode } from 'vite-plugin-markdown'

module.exports = {
  plugins: [mdPlugin({ mode: [Mode.HTML] })],
  build: {
    outDir: '../docs'
  }
};
