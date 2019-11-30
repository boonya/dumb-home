module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    meteor: true,
    jest: true,
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      meteor: true,
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    'max-len': [
      'warn',
      120,
      2,
      {
        ignoreComments: true,
      },
    ],
    'react/sort-comp': [
      1,
      {
        order: ['static-methods', 'lifecycle', 'render', '/^on.+$/', 'everything-else'],
      },
    ],
    'consistent-return': 0,
    'react/jsx-props-no-spreading': 0,
    'object-curly-newline': ['warn', { ObjectPattern: { multiline: true } }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_data'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.jsx', '**/*.stories.jsx'] }],
    'no-restricted-globals': [
      'warn',
      {
        name: 'confirm',
        message: 'Try to avoid confirm alert',
      },
    ],
    'jsx-a11y/media-has-caption': 0,
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: false }],
  },
};
