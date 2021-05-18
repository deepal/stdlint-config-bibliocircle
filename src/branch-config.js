const category = 'Github Repository Configuration';

module.exports = {
  deleteHeadBranchOnMerge: ({ consts, repoConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const passed = repoConfig.delete_branch_on_merge;
      const score = passed * 100;
      const message = passed ? 'Head branches are deleted on PR merge' : 'Head branches are not deleted on PR merge';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
  noMergeCommit: ({ consts, repoConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const passed = !repoConfig.allow_merge_commit;
      const score = passed * 100;
      const message = passed ? 'Merge commits are not allowed' : 'Merge commits are allowed';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
  squashMerge: ({ consts, repoConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const passed = repoConfig.allow_squash_merge;
      const score = passed * 100;
      const message = passed ? 'Squash merge is enabled' : 'Squash merge is not enabled';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
  noRebaseMerge: ({ consts, repoConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const passed = !repoConfig.allow_rebase_merge;
      const score = passed * 100;
      const message = passed ? 'Rebase merge is disabled' : 'Rebase merge is enabled';
      return {
        score,
        passed: score === 100,
        message,
      };
    },
  }),
};
