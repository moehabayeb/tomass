/**
 * Optimized logger utility to reduce console noise in production
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  debug(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  log(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.log(`[LOG] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    } else {
      // In production, only log critical warnings
      if (message.includes('CRITICAL') || message.includes('FATAL')) {
        console.warn(`[WARN] ${message}`, ...args);
      }
    }
  }

  error(message: string, ...args: any[]): void {
    // Always log errors
    console.error(`[ERROR] ${message}`, ...args);
  }

  info(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }
}

export const logger = new Logger();