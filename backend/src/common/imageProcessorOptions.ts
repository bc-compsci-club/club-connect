import { ImageProcessorOptions } from '../types';

export const rectangularImageOptions: ImageProcessorOptions = {
  crop: {
    cropUsing: 'ratio',
    horizontal: 16,
    vertical: 9,
  },
  resize: {
    ignoreAspectRatio: false,
    width: 1920,
    height: 1080,
  },
  optimize: {
    quality: 85,
  },
};

export const memberImageOptions: ImageProcessorOptions = {
  crop: {
    cropUsing: 'ratio',
    horizontal: 1,
    vertical: 1,
  },
  resize: {
    ignoreAspectRatio: false,
    width: 512,
    height: 512,
  },
  optimize: {
    quality: 85,
  },
};
