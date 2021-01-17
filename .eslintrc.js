module.exports = {
  env: {
    node: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    indent: ['error', 2],
  },
}
