import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  if (typeof request.headers.user === 'string') return request.headers.user;
  return '';
}
