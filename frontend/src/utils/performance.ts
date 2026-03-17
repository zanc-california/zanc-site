// Performance monitoring utility
export const performanceMonitor = {
  startTimer: (name: string) => {
    const startTime = performance.now();
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`⏱️ ${name} took ${duration.toFixed(2)}ms`);
        return duration;
      }
    };
  },

  measureAsync: async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    const timer = performanceMonitor.startTimer(name);
    try {
      const result = await fn();
      timer.end();
      return result;
    } catch (error) {
      timer.end();
      throw error;
    }
  }
};
