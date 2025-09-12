/**
 * Performance monitoring utilities for development and production
 */

export const PerformanceMonitor = {
  /**
   * Measure component render performance
   */
  measureRender: (componentName: string, renderFn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      renderFn();
      const end = performance.now();
      const duration = end - start;
      
      if (duration > 16) { // More than one frame at 60fps
        console.warn(`🐌 Slow render in ${componentName}: ${duration.toFixed(2)}ms`);
      }
    } else {
      renderFn();
    }
  },

  /**
   * Measure async operation performance
   */
  measureAsync: async <T>(operationName: string, operation: () => Promise<T>): Promise<T> => {
    const start = performance.now();
    try {
      const result = await operation();
      const end = performance.now();
      const duration = end - start;
      
      if (process.env.NODE_ENV === 'development' && duration > 1000) {
        console.warn(`⏰ Slow async operation ${operationName}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const end = performance.now();
      const duration = end - start;
      
      if (process.env.NODE_ENV === 'development') {
        console.error(`❌ Failed operation ${operationName} after ${duration.toFixed(2)}ms:`, error);
      }
      
      throw error;
    }
  },

  /**
   * Monitor memory usage (development only)
   */
  logMemoryUsage: (componentName?: string) => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memory = (performance as any).memory;
      const prefix = componentName ? `[${componentName}]` : '[Memory]';
      console.info(`${prefix} Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`);
    }
  },

  /**
   * Monitor largest contentful paint
   */
  observeLCP: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        
        if (process.env.NODE_ENV === 'development') {
          console.info(`🎯 Largest Contentful Paint: ${lcp.startTime.toFixed(2)}ms`);
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      return () => observer.disconnect();
    }
  },

  /**
   * Monitor first input delay
   */
  observeFID: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          if (process.env.NODE_ENV === 'development') {
            console.info(`⚡ First Input Delay: ${fid.toFixed(2)}ms`);
          }
        });
      });
      
      observer.observe({ type: 'first-input', buffered: true });
      return () => observer.disconnect();
    }
  },

  /**
   * Monitor cumulative layout shift
   */
  observeCLS: () => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            
            if (process.env.NODE_ENV === 'development' && clsValue > 0.1) {
              console.warn(`📐 High Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
            }
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      return () => observer.disconnect();
    }
  },

  /**
   * Initialize all performance monitoring
   */
  init: () => {
    if (typeof window !== 'undefined') {
      const cleanup = [
        PerformanceMonitor.observeLCP(),
        PerformanceMonitor.observeFID(),
        PerformanceMonitor.observeCLS(),
      ].filter(Boolean) as (() => void)[];
      
      return () => cleanup.forEach(fn => fn());
    }
  }
};

/**
 * React hook for performance monitoring
 */
export const usePerformanceMonitor = (componentName: string) => {
  const measureRender = (renderFn: () => void) => {
    PerformanceMonitor.measureRender(componentName, renderFn);
  };

  const measureAsync = <T>(operationName: string, operation: () => Promise<T>) => {
    return PerformanceMonitor.measureAsync(`${componentName}.${operationName}`, operation);
  };

  const logMemory = () => {
    PerformanceMonitor.logMemoryUsage(componentName);
  };

  return { measureRender, measureAsync, logMemory };
};