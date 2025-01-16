/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['dist/**', 'node_modules/**', '.nx/**'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      extends: ['./base/import', './base/javascript'],
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['./base/typescript'],
    },
    {
      files: [
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*-e2e/*.js',
        '**/*-e2e/*.ts',
        '**/*-e2e/*.jsx',
        '**/*-e2e/*.tsx',
      ],
      extends: ['./base/spec'],
    },
  ],
};
