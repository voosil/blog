import { UserConfig } from '@commitlint/types';

import Consistency from './plugins/consistency.plugin';
import RepoScopePlugin from './plugins/repo-scope.plugin';

interface Env {
  cwd: string;
  config: UserConfig;
}

// order sensitive
const usedPlugins = (env: Env) => [
  new RepoScopePlugin(env.config, {
    cwd: env.cwd,
    workspaceConfig: 'pnpm-workspace.yaml',
  }),
  new Consistency(env.config, null),
];

const plugin = (commitlintConfig: UserConfig, workspaceDir: string) => {
  const plugins = usedPlugins({ cwd: workspaceDir, config: commitlintConfig });
  for (const plugin of plugins) {
    plugin.run();
  }
};

export default plugin;
