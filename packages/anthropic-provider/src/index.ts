/**
 * Anthropic Provider Plugin for Model Compass
 *
 * This plugin enables Model Compass to route requests to Anthropic's Claude API.
 */

import { BaseProvider, ChatCompletionRequest, ChatCompletionResponse } from '@yungkei/model-compass-core';

export class AnthropicProvider extends BaseProvider {
  buildRequestBody(req: ChatCompletionRequest): unknown {
    return {
      model: req.model,
      messages: req.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: req.temperature ?? 0.5,
      max_tokens: req.max_tokens ?? 4096,
      top_p: req.top_p ?? 1
    };
  }

  transformResponse(response: any): ChatCompletionResponse {
    return {
      id: response.id,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: response.model,
      choices: response.choices.map((choice: any) => ({
        index: choice.index,
        message: {
          role: choice.message.role,
          content: choice.message.content
        },
        finish_reason: choice.finish_reason
      })),
      usage: response.usage
    };
  }

  buildHeaders(apiKey: string): Record<string, string> {
    return {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    };
  }
}

export { AnthropicProvider };