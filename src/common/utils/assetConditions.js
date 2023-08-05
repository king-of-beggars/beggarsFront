import { STANDARD_SIZE } from '../constants/contextValue';

export const getIsMobile = () => {
  return /Mobi/i.test(window.navigator.userAgent);
};

export const getScreenWidth = () => {
  const isMobile = getIsMobile();
  const width = window.innerWidth;

  if (isMobile) {
    return width;
  } else {
    return STANDARD_SIZE.frameSize.width;
  }
};

export const getAssetRatio = () => {
  const isMobile = getIsMobile();
  const screenWidth = getScreenWidth();

  if (isMobile) {
    if (screenWidth >= STANDARD_SIZE.frameSize.width) {
      return 1;
    } else {
      return screenWidth / STANDARD_SIZE.frameSize.width;
    }
  } else {
    return 1;
  }
};

export const getHeaderHeight = () => {};
