/**
 * Axios instance configured for the AI Workflow Builder API.
 * Handles request/response interceptors, error normalization, and auth headers.
 */

import axios from 'axios';
import env from '../config/env';

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor — attach auth token if available.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor — normalize responses to the standard format.
 * Success: { success: true, data: {} }
 * Failure: { success: false, error: { code, message } }
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const normalized = {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred.',
      },
    };

    if (error.response) {
      const { status, data } = error.response;
      normalized.error.code = data?.error?.code || `HTTP_${status}`;
      normalized.error.message =
        data?.error?.message || getDefaultMessage(status);
    } else if (error.code === 'ECONNABORTED') {
      normalized.error.code = 'TIMEOUT';
      normalized.error.message = 'Request timed out. Please try again.';
    } else if (!error.response) {
      normalized.error.code = 'NETWORK_ERROR';
      normalized.error.message = 'Network error. Check your connection.';
    }

    return Promise.reject(normalized);
  }
);

function getDefaultMessage(status) {
  const messages = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required.',
    403: 'You do not have permission to perform this action.',
    404: 'Resource not found.',
    422: 'Validation failed. Please check the data.',
    429: 'Too many requests. Please slow down.',
    500: 'Server error. Please try again later.',
    502: 'Service temporarily unavailable.',
    503: 'Service is under maintenance.',
  };
  return messages[status] || `Request failed with status ${status}.`;
}

export default api;
