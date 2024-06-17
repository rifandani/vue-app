import type { TestRunnerConfig } from '@storybook/test-runner'

// see: https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
const config: TestRunnerConfig = {
  // async preVisit(page) {
  //   await injectAxe(page);
  // },
  // async postVisit(page) {
  //   await checkA11y(page, '#storybook-root', {
  //     detailedReport: true,
  //     detailedReportOptions: {
  //       html: true,
  //     },
  //   });
  // },
  tags: {
    exclude: ['exclude-test'],
    skip: ['skip-test'],
  },
}

export default config
