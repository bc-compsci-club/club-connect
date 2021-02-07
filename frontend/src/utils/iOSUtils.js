import { navigatorSupported } from 'utils/checkSupport';

// Checks for iOS using navigator.platform
export const isIosPlatform = () => {
  if (!navigatorSupported()) {
    return false;
  } else {
    return /iP(hone|od touch|ad)/.test(navigator.platform);
  }
};

// Checks for iOS using navigator.userAgent
export const isIosUserAgent = () => {
  if (!navigatorSupported()) {
    return false;
  } else {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }
};

// Gets the iOS version. Returns null if the device isn't an iOS device.
export const getIosVersion = () => {
  if (!navigatorSupported() && isIosPlatform()) {
    const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(version[1], 10);
  } else {
    return null;
  }
};
