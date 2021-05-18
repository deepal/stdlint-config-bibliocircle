const category = 'Security';

module.exports = {
  dependabotAlertsEnablled: ({ consts, gitClient }) => ({
    severity: consts.RULE_SEVERITY.ERROR,
    category,
    checkFunction: async () => {
      const alertsEnabled = await gitClient.checkDependabotAlerts();
      const message = alertsEnabled ? 'Dependabot alerts enabled' : 'Dependabot alerts are not enabled!';
      return {
        score: alertsEnabled * 100,
        passed: alertsEnabled,
        message,
      };
    },
  }),
};
