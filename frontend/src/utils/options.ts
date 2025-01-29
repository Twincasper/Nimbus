import { RequestBody, RequestOptions } from './types';

export const getOptions: RequestOptions = {
  method: 'GET',
  credentials: 'include',
};

export const deleteOptions: RequestOptions = {
  method: 'DELETE',
  credentials: 'include',
};

export function getPostOptions<T extends RequestBody>(body: T): RequestOptions<T> {
  return {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function getPatchOptions<T extends RequestBody>(body: T): RequestOptions<T> {
  return {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}