/**
 * Claude Agent Plugin for Model Compass
 *
 * This plugin configures Claude Code CLI to use Model Compass for API routing.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PluginType } from '@yungkei/model-compass-core';

export const plugin = {
  type: PluginType.AGENT,
  metadata: {
    id: '@yungkei/model-compass-claude-agent',
    name: 'Claude Code Agent',
    version: '1.0.0',
    description: 'Claude Code CLI integration with Model Compass routing'
  },
  supportedTypes: ['claude-code'],
  configFiles: [
    {
      path: '~/.claude/settings.json',
      template: {
        env: {
          ANTHROPIC_BASE_URL: 'http://localhost:3456/v1',
          ANTHROPIC_API_KEY: 'sk-dummy'
        }
      }
    }
  ],
  onInstall: async (_context: any) => {
    console.log(`Configuring Claude Code to use Model Compass...`);
  },
  onUninstall: async (_context: any) => {
    console.log(`Removing Claude Code configuration...`);
  }
};

export { plugin as default };
