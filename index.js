const conventionalCommitRules = require('./src/conventional-commits');
const branchConfigRules = require('./src/branch-config');
const branchProtectionRules = require('./src/branch-protection');
const dependabotAlertRules = require('./src/dependabot-alerts');
const ideDirsRules = require('./src/ide-dirs');
const packageJsonLintRules = require('./src/package-json-lint');
const templateFilesRules = require('./src/template-files');

module.exports = {
  ...conventionalCommitRules,
  ...branchConfigRules,
  ...branchProtectionRules,
  ...dependabotAlertRules,
  ...ideDirsRules,
  ...packageJsonLintRules,
  ...templateFilesRules,
};
