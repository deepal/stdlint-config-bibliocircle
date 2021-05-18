const category = 'NPM Package Configuration';

module.exports = {
  requireEngines: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const fileContent = await gitClient.getPathContent('package.json');
      try {
        const packageContent = JSON.parse(fileContent);
        const passed = !!packageContent?.engines?.node;
        const score = passed * 100;
        const message = passed ? '"engines" field found in package.json' : 'No engines field in package.json';
        return {
          score,
          passed: score === 100,
          message,
        };
      } catch (err) {
        return {
          score: 0,
          passed: false,
          message: 'package.json not found or could not be parsed',
        };
      }
    },
  }),
  noBlacklistedPackages: ({ consts, gitClient, ruleConfig }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const blacklistedPackages = ['request', 'request-promise', 'kafka-node', ...(ruleConfig?.packages || [])];
      const fileContent = await gitClient.getPathContent('package.json');
      try {
        const packageContent = JSON.parse(fileContent);
        const usedPackages = [...new Set([...Object.keys(packageContent.dependencies || {}), ...Object.keys(packageContent.devDependencies || {})])];
        const passed = !blacklistedPackages.some((packageName) => usedPackages.includes(packageName));
        const score = passed * 100;
        const message = passed
          ? 'Project does not use any blacklisted NPM packages'
          : `Project uses one or more of ${blacklistedPackages.join()} which are blacklisted NPM packages`;
        return {
          score,
          passed: score === 100,
          message,
        };
      } catch (err) {
        return {
          score: 0,
          passed: false,
          message: 'package.json not found or could not be parsed',
        };
      }
    },
  }),
  prettierEslint: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const fileContent = await gitClient.getPathContent('package.json');
      try {
        const packageContent = JSON.parse(fileContent);
        const usedPackages = [...new Set([...Object.keys(packageContent.dependencies || {}), ...Object.keys(packageContent.devDependencies || {})])];
        const usesPrettier = usedPackages.includes('eslint-config-prettier');
        const usesAirbnb = usedPackages.includes('eslint-config-airbnb-base');
        const passed = !usesAirbnb && usesPrettier;
        const message = passed
          ? 'Repository uses prettier for linting'
          : usesPrettier && usesAirbnb
          ? 'Repository uses both airbnb and prettier for linting, which could cause conflicts'
          : 'Repository does not use prettier for linting';
        return {
          score: passed * 100,
          passed,
          message,
        };
      } catch (err) {
        return {
          score: 0,
          passed: false,
          message: 'package.json not found or could not be parsed',
        };
      }
    },
  }),
};
