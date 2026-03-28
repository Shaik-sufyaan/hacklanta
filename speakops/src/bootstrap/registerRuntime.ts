import { coreToolDefinitions } from '../tool/definitions';
import { registerTool, toolRegistry } from '../tool/registry';

let bootstrapped = false;

export function registerRuntime(): void {
  if (bootstrapped) {
    return;
  }

  coreToolDefinitions.forEach(registerTool);
  bootstrapped = true;
}

export function getRuntimeSummary() {
  return {
    tools: toolRegistry.size
  };
}
