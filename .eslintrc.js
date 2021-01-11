module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
  }
}
