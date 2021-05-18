const category = 'Template Files';

module.exports = {
  pullRequestTemplate: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const prTemplatePaths = ['.github/PULL_REQUEST_TEMPLATE.md', '.github/pull_request_template.md'];
      const [prTemplate, prTemplateAlt] = await Promise.all(prTemplatePaths.map(gitClient.getPathContent.bind(gitClient)));
      const passed = !!(prTemplate || prTemplateAlt)?.length;
      const templateFileName = (prTemplate || prTemplateAlt)?.name || prTemplatePaths[0];
      const score = passed * 100;
      const message = passed ? `${templateFileName} file found` : `No ${templateFileName} file found`;
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
  codeOwnersFile: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const codeOwnersFile = await gitClient.getPathContent('.github/CODEOWNERS');
      const passed = !!codeOwnersFile?.length;
      const score = passed * 100;
      const message = passed ? '.github/CODEOWNERS file found' : 'No .github/CODEOWNERS file found';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
};
