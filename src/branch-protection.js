const category = 'Branch Protection Configuration';

module.exports = {
  branchProtection: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      const score = !!defaultBranchProtectionConfig * 100;
      const passed = !!defaultBranchProtectionConfig;
      const message = passed
        ? `Branch protection is enabled on the default branch: ${defaultBranch}`
        : `Branch protection is not enabled on the default branch: ${defaultBranch}`;
      return {
        score,
        passed,
        message,
      };
    },
  }),
  minPRReviewers: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      const passed = defaultBranchProtectionConfig?.required_pull_request_reviews?.required_approving_review_count >= 1;
      const score = passed * 100;
      const message = passed
        ? `Pull requests to ${defaultBranch} require minimum of 1 approval`
        : `Pull requests to ${defaultBranch} do not require minimum of 1 approval`;

      return {
        score,
        passed,
        message,
      };
    },
  }),
  requireCodeOwnerReview: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      const passed = !!defaultBranchProtectionConfig?.required_pull_request_reviews?.require_code_owner_reviews;
      const score = passed * 100;
      const message = passed
        ? `Pull requests to ${defaultBranch} require approvals from code owners`
        : `Pull requests to ${defaultBranch} do not require approvals from code owners`;

      return {
        score,
        passed,
        message,
      };
    },
  }),
  branchProtectionAppliedToAdmins: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      const passed = !!defaultBranchProtectionConfig?.enforce_admins?.enabled;
      const score = passed * 100;
      const message = passed
        ? `Branch protection rules on ${defaultBranch} applies to admins`
        : `Branch protection rules on ${defaultBranch} does not apply to admins`;

      return {
        score,
        passed,
        message,
      };
    },
  }),
  noForcePush: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      const passed = !defaultBranchProtectionConfig?.allow_force_pushes?.enabled;
      const score = passed * 100;
      const message = passed ? `Force pushes to ${defaultBranch} is disabled` : `Force pushes to ${defaultBranch} is allowed`;

      return {
        score,
        passed,
        message,
      };
    },
  }),
  noDefaultBranchDeletion: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      const passed = !defaultBranchProtectionConfig?.allow_deletions?.enabled;
      const score = passed * 100;
      const message = passed ? `Deletion of ${defaultBranch} branch is not allowed` : `Deletion of ${defaultBranch} branch is allowed`;

      return {
        score,
        passed,
        message,
      };
    },
  }),
  prsRequireChecks: ({ consts, repoConfig, defaultBranchProtectionConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const defaultBranch = repoConfig.default_branch;
      // context name for common PR merge check is continuous-integration/jenkins/pr-merge
      const requiredChecks = defaultBranchProtectionConfig?.required_status_checks?.contexts;
      const passed = Array.isArray(requiredChecks) && requiredChecks.length > 0;
      const score = passed * 100;
      const message = passed ? `PRs to ${defaultBranch} require github checks to pass` : `PRs to ${defaultBranch} do not require any checks to pass`;

      return {
        score,
        passed,
        message,
      };
    },
  }),
};
