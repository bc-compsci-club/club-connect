// Checks if window is supported for use
export const windowSupported = () => {
  return typeof window !== 'undefined';
};

// Checks if navigator is supported for use
export const navigatorSupported = () => {
  return typeof navigator !== 'undefined';
};
