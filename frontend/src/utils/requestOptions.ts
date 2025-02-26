import { RequestBody, RequestOptions } from './types';

export const getOptions: RequestOptions = {
  method: 'GET',
  credentials: 'include',
};

export const deleteOptions: RequestOptions = {
  method: 'DELETE',
  credentials: 'include',
};

export function postOptions<T extends RequestBody>(body?: T): RequestOptions {
  return {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  };
}

export function putOptions<T extends RequestBody>(body: T): RequestOptions {
  return {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

export function patchOptions<T extends RequestBody>(body: T): RequestOptions {
  return {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}