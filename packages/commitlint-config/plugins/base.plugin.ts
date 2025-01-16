import { UserConfig } from '@commitlint/types';

export default class BasePlugin<C = null> {
  commitlintConfig: UserConfig;
  pluginConfig: C;

  constructor(commitlintConfig: UserConfig, pluginConfig: C) {
    this.commitlintConfig = commitlintConfig;
    this.pluginConfig = pluginConfig;
  }

  run() {
    throw Error('abstract method, must be implemented');
  }
}
