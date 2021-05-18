const category = 'IDE Configuration';

module.exports = {
  noIdeaWorkspace: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const workspaceExists = await gitClient.checkPathExists('.idea');
      const passed = !workspaceExists;
      const score = passed * 100;
      const message = passed ? 'No .idea workspace directory in the repository' : 'Unnecessary .idea workspace directory found in the repository';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
  noVSCodeWorkspace: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const workspaceExists = await gitClient.checkPathExists('.vscode');
      const passed = !workspaceExists;
      const score = passed * 100;
      const message = passed ? 'No .vscode workspace directory in the repository' : 'Unnecessary .vscode workspace directory found in the repository';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
};
