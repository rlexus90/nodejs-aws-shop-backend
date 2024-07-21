

module.exports = function (options, webpack) {
	const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

	const TerserPlugin = require('terser-webpack-plugin');


  return {
    ...options,
    entry: ['lambdas/cartService/index.ts'],
    externals: [],
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						keep_classnames: true,
					},
				}),
			],
		},
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          return lazyImports.includes(resource);
        },
      }),
    ],
  };
};