const esbuild = require('esbuild');

const devMode = process.argv.indexOf('--dev') > -1;

const props = {
  entryPoints: ['./src/index.js'],
  bundle: true,
  loader: {
    '.ts': 'ts',
    '.js': 'jsx',
    '.svg': 'dataurl',
    '.png': 'dataurl',
    '.jpg': 'dataurl',
  },
  platform: 'browser',
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  external: [],
  outfile: './public/scripts/bundle.js',
};

if (devMode) {
  const port = 8080;

  esbuild
    .serve({
      servedir: 'public',
      port,
    }, props)
    .then(() => {
      console.log(`Serving on http://localhost:${port}`);
    })
    .catch(() => process.exit(1));
} else {
  props.bundle = true;
  props.minify = true;

  esbuild.build(props).catch(() => process.exit(1));
}
