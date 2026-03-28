export interface RoutedModel {
  provider: 'anthropic' | 'openai';
  model: string;
  temperature: number;
}

export function routeModel(task: 'agent' | 'eva' | 'analysis'): RoutedModel {
  if (task === 'eva') {
    return {
      provider: 'anthropic',
      model: 'claude-sonnet-4',
      temperature: 0.3
    };
  }

  if (task === 'analysis') {
    return {
      provider: 'openai',
      model: 'gpt-4.1-mini',
      temperature: 0.1
    };
  }

  return {
    provider: 'anthropic',
    model: 'claude-sonnet-4',
    temperature: 0.4
  };
}
