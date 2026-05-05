# Model Compass Plugins

Official plugins for [Model Compass](https://github.com/yungkei/model-compass) - A unified LLM routing and management system.

## 📦 Plugin Categories

### 🔌 Provider Plugins
Provider plugins enable Model Compass to connect with different LLM APIs.

| Plugin | Package | Description | Version |
|--------|---------|-------------|---------|
| OpenAI | `@yungkei/model-compass-openai-provider` | OpenAI GPT models | [![npm](https://img.shields.io/npm/v/@yungkei/model-compass-openai-provider.svg)](https://www.npmjs.com/package/@yungkei/model-compass-openapi-provider) |
| Anthropic | `@yungkei/model-compass-anthropic-provider` | Claude models | [![npm](https://img.shields.io/npm/v/@yungkei/model-compass-anthropic-provider.svg)](https://www.npmjs.com/package/@yungkei/model-compass-anthropic-provider) |
| Google AI | `@yungkei/model-compass-gemini-provider` | Gemini models | [![npm](https://img.shields.io/npm/v/@yungkei/model-compass-gemini-provider.svg)](https://www.npmjs.com/package/@yungkei/model-compass-gemini-provider) |
| Ollama | `@yungkei/model-compass-ollama-provider` | Local models via Ollama | [![npm](https://img.shields.io/npm/v/@yungkei/model-compass-ollama-provider.svg)](https://www.npmjs.com/package/@yungkei/model-compass-ollama-provider) |

### 🤖 Agent Plugins
Agent plugins integrate Model Compass with AI coding assistants and IDEs.

| Plugin | Description |
|--------|-------------|
| Claude | Integrates Claude Code with Model Compass |
| OpenCode | OpenCode IDE integration |
| Cursor | Cursor IDE with MCP routing |
| Windsurf | Windsurf/Codeium integration |
| Continue | VSCode Continue plugin |

### 🧭 Router Plugins
Custom routing logic for intelligent request routing.

| Plugin | Description |
|--------|-------------|
| smart-router | AI-powered smart routing based on request content |
| cost-based-router | Routes based on cost optimization |
| latency-router | Routes based on latency optimization |

## 📋 Plugin Registry

### Installing Plugins

```bash
# Install from npm
mc plugin install @yungkei/model-compass-openai-provider

# Install from GitHub
mc plugin install yungkei/model-compass-plugins/openai-provider

# Install specific version
mc plugin install @yungkei/model-compass-openai-provider@1.0.0

# List installed plugins
mc plugin list

# Get plugin info
mc plugin info @yungkei/model-compass-openai-provider
```

### Configuration

```json
// .model-compass/config.json
{
  "plugins": {
    "pluginDir": "~/.model-compass/plugins",
    "registryUrl": "https://raw.githubusercontent.com/yungkei/model-compass-plugins/main/registry.json",
    "autoUpdate": false
  },
  "providers": [
    {
      "name": "openai",
      "type": "openai",
      "priority": 1,
      "models": ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"]
    }
  ]
}
```

## 🔧 Developing Plugins

### Create a Provider Plugin

```typescript
// my-provider.ts
import { createProviderPlugin, BaseProvider } from '@yungkei/model-compass-core';

class MyProvider extends BaseProvider {
  buildRequestBody(req) {
    return {
      model: req.model,
      messages: req.messages,
      temperature: req.temperature
    };
  }
  
  transformResponse(response) {
    return {
      id: response.id,
      object: 'chat.completion',
      created: Date.now(),
      model: response.model,
      choices: response.choices
    };
  }
  
  buildHeaders(apiKey) {
    return {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }
}

export const plugin = createProviderPlugin({
  metadata: {
    id: '@yungkei/model-compass-my-provider',
    name: 'My LLM Provider',
    version: '1.0.0',
    description: 'Custom LLM provider for Model Compass',
    author: {
      name: 'Your Name',
      email: 'your@email.com'
    },
    license: 'MIT',
    tags: ['llm', 'custom']
  },
  createProvider: (config) => new MyProvider(config)
});
```

### Create an Agent Plugin

```typescript
// claude-plugin.ts
import { createAgentPlugin } from '@yungkei/model-compass-core';

export const plugin = createAgentPlugin({
  metadata: {
    id: '@yungkei/model-compass-claude',
    name: 'Claude Code',
    version: '1.0.0',
    description: 'Claude Code integration with Model Compass'
  },
  supportedTypes: ['claude-code'],
  configFiles: [
    {
      path: '~/.claude/settings.json',
      template: {
        env: {
          ANTHROPIC_BASE_URL: '{env:ANTHROPIC_BASE_URL}',
          ANTHROPIC_API_KEY: '{env:ANTHROPIC_API_KEY}'
        }
      }
    }
  ],
  onInstall: async (context) => {
    console.log('Configuring Claude to use Model Compass...');
  }
});
```

### Create a Router Plugin

```typescript
// smart-router.ts
import { createRouterPlugin, Router } from '@yungkei/model-compass-core';

class SmartRouter extends Router {
  determineRoute(request) {
    // Custom routing logic
    if (request.messages.some(m => m.content.includes('thinking'))) {
      return { provider: 'anthropic', model: 'claude-3.5-sonnet' };
    }
    return { provider: 'openai', model: 'gpt-4o' };
  }
}

export const plugin = createRouterPlugin({
  metadata: {
    id: '@yungkei/model-compass-smart-router',
    name: 'Smart Router',
    version: '1.0.0',
    description: 'Intelligent routing based on request content'
  },
  createRouter: () => new SmartRouter(),
  priority: 100
});
```

## 📁 Repository Structure

```
packages/
├── @yungkei/model-compass-openai-provider/    # OpenAI integration
├── @yungkei/model-compass-anthropic-provider/ # Anthropic Claude integration
├── @yungkei/model-compass-gemini-provider/      # Google Gemini integration
├── @yungkei/model-compass-ollama-provider/      # Ollama local models
├── @yungkei/model-compass-claude-agent/        # Claude Code integration
├── @yungkei/model-compass-cursor-agent/        # Cursor IDE integration
├── @yungkei/model-compass-continue-agent/      # Continue IDE integration
└── @yungkei/model-compass-smart-router/       # Smart routing plugin
docs/
├── development.md     # Plugin development guide
├── publishing.md    # Publishing guide
└── api-reference.md # API documentation
registry.json        # Plugin registry
README.md            # This file
LICENSE              # MIT License
```

## 🚀 Publishing Plugins

### Publish to npm

```bash
cd packages/@yungkei/model-compass-my-plugin
npm version patch
npm publish --access public
```

### Adding to Registry

Update `registry.json`:

```json
{
  "name": "Model Compass Official Plugins",
  "version": "1.0.0",
  "plugins": [
    {
      "id": "@yungkei/model-compass-my-plugin",
      "name": "My Plugin",
      "description": "Plugin description",
      "version": "1.0.0",
      "author": "Your Name",
      "npm": "@yungkei/model-compass-my-plugin",
      "repository": "https://github.com/yungkei/model-compass-plugins",
      "tags": ["custom", "feature"]
    }
  ]
}
```

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch
3. Implement your plugin
4. Add tests
5. Update documentation
6. Submit a pull request

### Plugin Requirements

- TypeScript recommended
- Proper error handling
- Unit tests
- Documentation
- Follow naming convention: `@yungkei/model-compass-plugin-name`

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

## 🔗 Related Links

- [Model Compass Core](https://github.com/yungkei/model-compass)
- [Plugin Documentation](https://github.com/yungkei/model-compass/docs/plugins.md)
- [Issues](https://github.com/yungkei/model-compass-plugins/issues)
- [Discussions](https://github.com/yungkei/model-compass-plugins/discussions)

---

**Model Compass** - Intelligent LLM Routing & Management
