import fs from 'fs';
import path from 'path';

import yaml from 'yaml';
import { globSync } from 'glob';
import { set } from 'lodash-es';
import { UserConfig } from '@commitlint/types';

import BasePlugin from './base.plugin.js';

export interface RepoScopePluginConfig {
  /** monorepo root path */
  cwd: string;
  /** workspace config file path */
  workspaceConfig: string;
}

export default class RepoScopePlugin extends BasePlugin<RepoScopePluginConfig> {
  constructor(
    commitlintConfig: UserConfig,
    pluginConfig: RepoScopePluginConfig,
  ) {
    super(commitlintConfig, pluginConfig);
  }
  getWorkspaces(cwd: string, workspaceConfig: string) {
    const workspaceConfigYaml = fs.readFileSync(
      path.resolve(cwd, workspaceConfig),
      'utf-8',
    );

    const pkgs = yaml.parse(workspaceConfigYaml)['packages'] as string[];
    return pkgs.map((pkg) => pkg.replace(/\/\S*/g, ''));
  }

  getAllPkgNames(cwd: string, workspaces: string[]) {
    return workspaces
      .map((workspace) => {
        const absPath = path.resolve(cwd, workspace);
        return globSync('**/package.json', {
          cwd: absPath,
          ignore: '**/node_modules/**',
        }).map((targetPath) => {
          const pkgPath = path.resolve(absPath, targetPath);
          const name = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))['name'];
          return { cls: workspace, name };
        });
      })
      .flat();
  }

  run() {
    const { cwd, workspaceConfig } = this.pluginConfig;
    const nxScopeEnum: Record<string, { title: string; description: string }> =
      {};

    const workspacesRelativePaths = this.getWorkspaces(cwd, workspaceConfig);
    const nameAndCls = this.getAllPkgNames(cwd, workspacesRelativePaths);

    nameAndCls.forEach(({ cls, name }) => {
      nxScopeEnum[name] = {
        title: cls,
        description: '',
      };
    });

    set(this.commitlintConfig, 'prompt.questions.scope.enum', {
      ...(this.commitlintConfig.prompt?.questions?.scope?.enum ?? {}),
      ...nxScopeEnum,
    });
  }
}
