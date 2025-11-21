/**
 * Development-only Logger
 * Only logs in development mode - silent in production
 * Apple App Store compliance: no excessive logging in production builds
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },

  info: (...args: any[]) => {
    if (isDev) console.info(...args);
  },

  warn: (...args: any[]) => {
    if (isDev) console.warn(...args);
  },

  error: (...args: any[]) => {
    if (isDev) console.error(...args);
  },

  debug: (...args: any[]) => {
    if (isDev) console.debug(...args);
  },
};

export default logger;
