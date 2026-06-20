/**
 * Ollama Provider Plugin for Model Compass
 *
 * This plugin enables Model Compass to route requests to a local Ollama instance.
 */

import { BaseProvider, ChatCompletionRequest, ChatCompletionResponse } from '@yungkei/model-compass-core';

export class OllamaProvider extends BaseProvider {
  buildRequestBody(req: ChatCompletionRequest): unknown {
    return {
      model: req.model,
      messages: req.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: req.temperature ?? 0.7,
      max_tokens: req.max_tokens ?? 2048,
      top_p: req.top_p ?? 0.9
    };
  }

  transformResponse(response: any): ChatCompletionResponse {
    return {
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: response.model,
      choices: response.choices.map((choice: any) => ({
        index: choice.index,
        message: {
          role: choice.message?.role || 'assistant',
          content: choice.message?.content || ''
        },
        finish_reason: choice.finish_reason || 'stop'
      })),
      usage: {
        prompt_tokens: response.prompt_eval_count || 0,
        completion_tokens: response.eval_count || 0,
        total_tokens: (response.prompt_eval_count || 0) + (response.eval_count || 0)
      }
    };
  }

  buildHeaders(apiKey: string): Record<string, string> {
    return {
      'Content-Type': 'application/json'
    };
  }
}
