export type CommonOptions = {
    credentials: 'include';
    headers?: Record<string, string>;
};

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type RequestOptions<T = void> = CommonOptions & {
    method: HttpMethod;
    body?: string;
};

export type RequestBody = Record<string, unknown>;

export type FetchResponse<T> = Promise<[T | null, Error | null]>;