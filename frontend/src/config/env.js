/**
 * Environment configuration with defaults and validation.
 * Centralizes all env variable access to prevent scattered import.meta.env usage.
 */

const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'AI Workflow Builder',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export default env;
