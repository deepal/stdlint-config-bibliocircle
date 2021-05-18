const ConventionalCommitsCheck = require('./conventional-commits-check');
const ccCheck = new ConventionalCommitsCheck();

module.exports = {
  conventionalCommits: ({ consts, gitClient, ruleConfig }) => ({
    severity: consts.RULE_SEVERITY.WARN,
    category: 'Commit Message Conventions',
    checkFunction: async () => {
      const noOfCommitsToCheck = ruleConfig?.noOfCommitsToCheck || 10;
      await ccCheck.init();
      const recentCommits = await gitClient.getRecentCommits(noOfCommitsToCheck);
      const validityResult = await Promise.all(
        recentCommits.map(async (commitMessage) => {
          const isCommitMessageValid = await ccCheck.isValid(commitMessage);
          return {
            message: commitMessage,
            valid: isCommitMessageValid,
          };
        }),
      );
      const validCommentsCount = validityResult.filter(({ valid }) => valid).length;
      const score = (validCommentsCount / noOfCommitsToCheck) * 100;
      const passed = score === 100;
      const message = passed
        ? `Most recent ${noOfCommitsToCheck} commits follow the conventional commits format`
        : `${noOfCommitsToCheck - validCommentsCount} out of ${noOfCommitsToCheck} most recent commits do not follow the conventional commits format`;
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
};
