type CommonOptions = {
  credentials: 'include';
  headers?: Record<string, string>;
};

type OptionsWithBody<T> = CommonOptions & {
  method: 'POST' | 'PATCH';
  body: string;
};

type OptionsWithoutBody = CommonOptions & {
  method: 'DELETE';
};

type RequestBody = Record<string, unknown>;

export const deleteOptions: OptionsWithoutBody = {
  method: 'DELETE',
  credentials: 'include',
};

export function getPostOptions<T extends RequestBody>(body: T): OptionsWithBody<T> {
  return {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function getPatchOptions<T extends RequestBody>(body: T): OptionsWithBody<T> {
  return {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

// Could probably establish an interface for the request body in the adapters later on