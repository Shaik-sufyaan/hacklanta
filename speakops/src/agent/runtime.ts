import { routeModel } from '../llm/router';
import { listTools } from '../tool/registry';

export async function executeAgentTurn(input: {
  prompt: string;
  agentName: string;
}) {
  const routed = routeModel('eva');

  return {
    model: routed,
    tools: listTools().map((tool) => tool.name),
    output: `${input.agentName} heard: "${input.prompt}". I would acknowledge the user, answer directly, and escalate only if a policy is triggered.`
  };
}
