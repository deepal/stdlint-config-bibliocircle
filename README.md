# stdlint-config-bibliocircle

This repository contains a rule set for [stdlint](https://github.com/deepal/stdlint) used by bibliocircle.com

Rules in this set are as follows:

- `conventionalCommits`: Commits messages on the default branch should follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
- `noIdeaWorkspace`: No `.idea` directory should be committed to the repository
- `noVSCodeWorkspace`: No `.vscode` directory should be committed to the repository
- `requireEngines`: "engines" field should exist in package.json
- `noBlacklistedPackages`: Repository does not use any blacklisted packages (Please refer to the rule source to see the list of packages)
- `prettierEslint`: Repository only uses eslint `prettier` config for linting
- `pullRequestTemplate`: Repository contains a `.github/PULL_REQUEST_TEMPLATE.md` file
- `codeOwnersFile`: Repository contains a `.github/CODEOWNERS` file
- `deleteHeadBranchOnMerge`: Head branches should be deleted after the PR is merged
- `noMergeCommit`: Merge commits should not be allowed on the default branch
- `noRebaseMerge`: Rebase Merge should be disabled
- `squashMerge`: Squash Merge should be enabled
- `branchProtection`: Branch protection rules must be enabled on the default branch
- `minPRReviewers`: Pull requests to the default branch should require at least 2 approvals
- `requireCodeOwnerReview`: Pull requests to the default branch should require approvals from code owners
- `branchProtectionAppliedToAdmins`: Branch protection rules must be applied to admin users
- `noForcePush`: Force push to the default branch should be disabled
- `noDefaultBranchDeletion`: Deletion of the default branch should be disabled
- `prsRequireChecks`: PRs to the default branch should require github checks to pass
- `dependabotAlertsEnablled`: Dependabot alerts must be enabled on the repository
