export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 必填
      'always', // 必須符合下面列出的類型
      [
        'feat', // add new functions
        'fix', // fix BUGs
        'docs', // write documentation, ex. modified READEME.md
        'style', // only modified styles
        'test', // add test case
        'revert', // revert version
        'perf', // optimize
        'build', // build code
        'ci', // CI/CD related changes
        'chore', // develop env changes
        'refactor', // refactor functions
      ],
    ],
    'subject-case': [0], // 不強制 subject case 格式（預設會要求 lowercase）
  },
};
