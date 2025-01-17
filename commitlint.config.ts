import { UserConfig, RuleConfigSeverity as Severity } from '@commitlint/types';

import plugin from '@repo/commitlint-config/plugin.js';

const config: UserConfig = {
  // extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
      breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
      revertPattern:
        /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
      revertCorrespondence: ['header', 'hash'],
      issuePrefixes: ['#'],
    },
  },
  /**
   * https://commitlint.js.org/#/reference-rules
   * 0 disables the rule. For 1 it will be considered a warning for 2 an error.
   */
  rules: {
    'scope-empty': [Severity.Error, 'never'],
    'scope-enum': [Severity.Error, 'always', []],
    'type-enum': [Severity.Error, 'always', []],
    'header-max-length': [Severity.Error, 'always', 249],
    'body-max-line-length': [Severity.Error, 'always', 300],
    'body-leading-blank': [Severity.Warning, 'always'],
    'footer-leading-blank': [Severity.Warning, 'always'],
    'footer-max-line-length': [Severity.Error, 'always', 100],
    'header-trim': [Severity.Error, 'always'],
    'subject-case': [
      Severity.Error,
      'never',
      [],
      // ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [Severity.Error, 'never'],
    'subject-full-stop': [Severity.Error, 'never', '.'],
    'type-case': [Severity.Error, 'always', 'lower-case'],
    'type-empty': [Severity.Error, 'never'],
  },
  prompt: {
    settings: {
      enableMultipleScopes: true,
      scopeEnumSeparator: ',',
    },
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      // emoji: https://gitmoji.dev/
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          '✨ feat': {
            description: 'A new feature',
            title: 'Features',
          },
          '🐛 fix': {
            description: 'A bug fix',
            title: 'Bug Fixes',
          },
          '🚧 wip': {
            description: 'Work in progress, reset head to continue',
            title: 'Wip',
          },
          '🚀 perf': {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
          },
          '📝 docs': {
            description: 'Documentation only changes',
            title: 'Documentation',
          },
          '💎 style': {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
          },
          '🔧 chore': {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
          },
          '🎨 refactor': {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
          },
          '🤖 ci/cd': {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. name of project or library)',
        enum: {
          '🔮UI': {
            description: '主要修改样式',
          },
          '👌simple': {
            description: 'Simple fix or feature for a non-critical issue.',
          },
          '🎯milestone': {
            description: '完成了阶段性的工作',
          },
          '🧑‍💻✨refine': {
            description: '代码优化',
          },
          '🧩components/ui': {
            description: '组件变更',
          },
          '🎉birth': {
            description: 'Begin a project.',
          },
          '🔖release': {
            description: 'Release version.',
          },
          '⬆️upgrade': {
            description: 'Upgraded dependencies.',
          },
          '🚚rename': {
            description:
              'Move or rename resources (e.g.: files, paths, routes).n',
          },
          '🔥remove': {
            description: 'Remove code or files.',
          },
          '⚙️configuration': {
            description: 'Change configuration file.',
          },
          '🧑‍💻workflow': {
            description: 'Changes for workflow & Improve developer experience.',
          },
          '🍱assets': {
            description: 'Add or update assets.',
          },
          '🌐localization': {
            description: 'Internationalization and localization.',
          },
          '⚡️improve-perf': {
            description: 'Improve performance.',
          },
          '🔇rm-logs': {
            description: 'Remove logs.',
          },
          '🍻': {
            description: 'Write code drunkenly.',
          },
        },
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};

plugin(config, __dirname);

export default config;
