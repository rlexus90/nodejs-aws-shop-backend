

module.exports = function (options, webpack) {
	const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

	const TerserPlugin = require('terser-webpack-plugin');
	const nodeExternals = require('webpack-node-externals');
	const CopyPlugin = require('copy-webpack-plugin')


  return {
    ...options,
    entry: ['lambdas/cartService/index.ts'],
    externals: [nodeExternals()],
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
			new CopyPlugin({
				patterns: [
					{ from: './node_modules/.prisma/client/schema.prisma', to: './' }, 
				],
			}),
    ],
  };
};