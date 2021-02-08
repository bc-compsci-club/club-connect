import { windowSupported } from 'utils/checkSupport';

/**
 * Writes a key-value pair to localStorage and preserves certain JS types
 * @param {string} key The key to save
 * @param {any} value The value to save
 */
export const setItemJson = (key, value) => {
  if (windowSupported()) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return null;
  }
};

/**
 * Gets a JS typed value (depending on how it was saved) from localStorage based on the key
 * @param {string} key The key to get
 * @return {any} The retrieved value, if it exists in localStorage
 */
export const getItemJson = (key) => {
  if (windowSupported()) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return null;
  }
};
