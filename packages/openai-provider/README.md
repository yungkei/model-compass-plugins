# @yungkei/model-compass-openai-provider

OpenAI provider plugin for [Model Compass](https://github.com/yungkei/model-compass) - Connect to OpenAI's GPT models including GPT-4, GPT-3.5, and more.

## Installation

```bash
npm install @yungkei/model-compass-openai-provider
```

Or via Model Compass CLI:

```bash
mc plugin install @yungkei/model-compass-openai-provider
```

## Configuration

### Environment Variables

Set your OpenAI API key:

```bash
export OPENAI_API_KEY=sk-your-api-key-here
```

### Model Compass Config

Add to your `.model-compass/config.json`:

```json
{
  "providers": [
    {
      "name": "openai",
      "type": "openai",
      "api_base_url": "https://api.openai.com/v1",
      "api_key": "${OPENAI_API_KEY}",
      "models": [
        "gpt-4o",
        "gpt-4-turbo",
        "gpt-3.5-turbo"
      ],
      "priority": 1,
      "weight": 100
    }
  ]
}
```

### Via CLI

```bash
mc provider add openai --type openai --url https://api.openai.com/v1 --key $OPENAI_API_KEY --models gpt-4o,gpt-4-turbo,gpt-3.5-turbo --priority 1
```

## Usage

Once configured, Model Compass will automatically route requests to OpenAI. You can also manually specify the provider:

```bash
curl http://localhost:3456/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "openai,gpt-4o",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7
  }'
```

## Available Models

- **gpt-4o** - GPT-4 Omni (fast, capable)
- **gpt-4-turbo** - GPT-4 Turbo (optimized for speed)
- **gpt-3.5-turbo** - GPT-3.5 Turbo (cost-effective)

Check [OpenAI Documentation](https://platform.openai.com/docs/models) for the latest models.

## Development

```bash
git clone https://github.com/yungkei/model-compass-plugins
cd model-compass-plugins/packages/openai-provider
npm install
npm run build
```

## License

Apache-2.0 - see [LICENSE](https://github.com/yungkei/model-compass-plugins/blob/main/LICENSE) for details.

## Contributing

Please read the main [CONTRIBUTING.md](https://github.com/yungkei/model-compass-plugins/blob/main/CONTRIBUTING.md) for guidelines.

## Support

- Issues: [GitHub Issues](https://github.com/yungkei/model-compass-plugins/issues)
- Discussions: [GitHub Discussions](https://github.com/yungkei/model-compass-plugins/discussions)
