import { FetchResponse, RequestOptions } from './types';

export async function fetchHandler<T>(url: string, options: RequestOptions = {} as RequestOptions): FetchResponse<T> {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;

    if (!ok) {
      // Create a custom error with additional context
      const error = new Error(`HTTP Error: ${status}`) as Error & {
        status?: number;
        statusText?: string;
      };
      error.status = status;
      error.statusText = response.statusText;
      throw error;
    }

    const contentType = headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData as T, null];
  } catch (error) {
    console.warn(`Fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`, error);
    return [null, error instanceof Error ? error : new Error('Unknown error')];
  }
}