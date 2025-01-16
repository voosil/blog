import { ParserPreset } from '@commitlint/types';

import BasePlugin from './base.plugin';

interface PromptCliParserPreset extends ParserPreset {
  parserOpts: {
    headerPattern: RegExp;
    breakingHeaderPattern: RegExp;
  };
}

export default class Consistency extends BasePlugin {
  // 只有这两个有枚举
  enums = ['type', 'scope'] as const;

  /**
   * 将prompt中的enums同步到rules中的enums中去
   * 保持rules中的[type/scope]-enum与prompt中的[type/scope]:enum一致，commitlint本身不会做这个事情
   */
  consistentEnum() {
    for (const ruleItem of this.enums) {
      const target = this.commitlintConfig?.prompt?.questions?.[ruleItem]?.enum;
      if (!target) return;

      const targetEnums = Array.from(Object.keys(target ?? {}));
      if (
        this.commitlintConfig.rules &&
        this.commitlintConfig.rules[`${ruleItem}-enum`]
      )
        // @ts-expect-error skip check
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.commitlintConfig.rules[`${ruleItem}-enum`]![2] = [...targetEnums];
    }
  }

  /**
   * Support emoji for commit types
   */
  consistentHeaderPattern() {
    const types = this.commitlintConfig.prompt?.questions?.type?.enum;
    if (!types) return;

    const allTypes = Array.from(Object.keys(types ?? {}))
      .map((type) => type.trim().split(/\s/)[0])
      .join('');
    const { parserOpts } = this.commitlintConfig
      .parserPreset as PromptCliParserPreset;
    parserOpts.headerPattern = new RegExp(
      `^([\\w\\s${allTypes}]*)(?:\\((.*)\\))?!?: (.*)$`,
    );
    parserOpts.breakingHeaderPattern = new RegExp(
      `^([\\w\\s${allTypes}]*)(?:\\((.*)\\))?!: (.*)$`,
    );
  }

  run() {
    this.consistentEnum();
    this.consistentHeaderPattern();
  }
}
