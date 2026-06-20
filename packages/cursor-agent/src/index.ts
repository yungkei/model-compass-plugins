/**
 * Cursor IDE Agent Plugin for Model Compass
 *
 * This plugin configures Cursor IDE to use Model Compass for MCP routing.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PluginType } from '@yungkei/model-compass-core';

export const plugin = {
  type: PluginType.AGENT,
  metadata: {
    id: '@yungkei/model-compass-cursor-agent',
    name: 'Cursor IDE Agent',
    version: '1.0.0',
    description: 'Cursor IDE MCP integration with Model Compass routing'
  },
  supportedTypes: ['cursor'],
  configFiles: [
    {
      path: '~/.cursor/mcp.json',
      template: {
        'model-compass': {
          command: 'node',
          args: ['$MC_PATH/router-mcp.js'],
          env: {
            MC_BASE_URL: 'http://localhost:8765/v1'
          }
        }
      },
      merge: true
    }
  ]
};

export { plugin as default };
