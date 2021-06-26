export default {
  extends: 'lighthouse:default',
  logLevel: 'info',
  output: 'json',
  onlyCategories: [
    'accessibility',
    'best-practices'
  ]
};