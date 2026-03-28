import type { ToolDefinition } from './registry';

export const coreToolDefinitions: ToolDefinition[] = [
  {
    name: 'navigate_to_page',
    description: 'Moves the EVA assistant UI to a requested dashboard view.',
    inputSchema: { view: 'string' }
  },
  {
    name: 'lookup_usage_summary',
    description: 'Fetches the latest usage metrics for the active organization.',
    inputSchema: { period: ['daily', 'monthly'] }
  },
  {
    name: 'open_agent',
    description: 'Loads an existing agent detail view inside the dashboard.',
    inputSchema: { agentId: 'string' }
  }
];
