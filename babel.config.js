module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  babelrcRoots: [
    // Keep the root as a root
    '.',
    './apps/*',
    './libs/*',
  ],
  overrides: [
    {
      test: ['./apps/*'],
      presets: [
        [
          '@babel/env',
          {
            // @note: we use "entry" here so that polyfills are available to vendor code that is otherwise not run through babel
            useBuiltIns: 'entry',
            corejs: 3,
          },
        ],
      ],
    },
  ],
};
