/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['import'],
  extends: ['plugin:import/recommended'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          ['object', 'type'],
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '~**/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@repo/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', '@repo/**', '~**/**'],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'off',
  },
};
