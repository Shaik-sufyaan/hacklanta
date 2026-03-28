export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly path: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}${path}`,
      {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...(init?.headers ?? {}),
        },
      },
    );
  } catch (err) {
    throw new ApiError(0, path, `Network error: unable to reach API at ${path}`);
  }

  if (!response.ok) {
    let detail = '';
    try {
      const body = await response.json();
      detail = body?.message ?? body?.error ?? '';
    } catch {}
    throw new ApiError(
      response.status,
      path,
      `API error ${response.status} for ${path}${detail ? `: ${detail}` : ''}`,
    );
  }

  return response.json() as Promise<T>;
}
