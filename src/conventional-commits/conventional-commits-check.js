const { default: lint } = require('@commitlint/lint');
const { default: load } = require('@commitlint/load');

module.exports = class ConventionalCommitsCheck {
  constructor() {
    this.config = {};
  }

  async init() {
    this.config = await load({ extends: [require.resolve('@commitlint/config-conventional')] });
  }

  async isValid(commitMessage) {
    const result = await lint(commitMessage, this.config.rules, this.config.parserPreset ? { parserOpts: this.config.parserPreset.parserOpts } : {});
    return result.valid;
  }
};
