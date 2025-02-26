export type CommonOptions = {
    credentials: 'include';
    headers?: Record<string, string>;
};

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export type RequestBody = Record<string, unknown>;

export interface RequestOptions {
  method: string;
  credentials: RequestCredentials;
  headers?: Record<string, string>;
  body?: string;
}

export type FetchResponse<T> = Promise<[T | null, Error | null]>;
