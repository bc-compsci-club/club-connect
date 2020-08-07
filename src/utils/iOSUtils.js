// Checks if the device is an iOS device.
export const isUsingiOS = () => {
  return /iP(hone|od touch|ad)/.test(navigator.platform);
};

// Gets the iOS version. Returns null if the device isn't an iOS device.
export const getiOSVersion = () => {
  if (/iP(hone|od touch|ad)/.test(navigator.platform)) {
    const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(version[1], 10);
  }

  return null;
};
