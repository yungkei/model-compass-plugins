/**
 * Continue IDE Agent Plugin for Model Compass
 *
 * This plugin configures Continue IDE to use Model Compass for model routing.
 */

import { PluginType } from '@yungkei/model-compass-core';

export const plugin = {
  type: PluginType.AGENT,
  metadata: {
    id: '@yungkei/model-compass-continue-agent',
    name: 'Continue IDE Agent',
    version: '1.0.0',
    description: 'Continue IDE integration with Model Compass routing'
  },
  supportedTypes: ['continue'],
  configFiles: [
    {
      path: '~/.continue/config.json',
      template: {
        models: [
          {
            title: 'Model Compass',
            model: 'claude-3.5-sonnet',
            provider: 'openai',
            apiBase: 'http://localhost:3456/v1',
            apiKey: 'sk-dummy'
          }
        ]
      },
      merge: true
    }
  ]
};

export { plugin as default };
