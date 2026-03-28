import type { StreamEvent } from '../types';

const encoder = new TextEncoder();

function encodeEvent(event: StreamEvent) {
  return encoder.encode(`event: ${event.event}\ndata: ${JSON.stringify(event.data)}\n\n`);
}

export function createSseResponse(events: StreamEvent[], intervalMs = 250): Response {
  const stream = new ReadableStream({
    async start(controller) {
      for (const event of events) {
        controller.enqueue(encodeEvent(event));
        await Bun.sleep(intervalMs);
      }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    }
  });
}
