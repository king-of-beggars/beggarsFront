import { contextValue } from 'constants';

export const getIsMobile = () => {
    return /Mobi/i.test(window.navigator.userAgent)
}

export const getScreenWidth = () => {
    const isMobile = getIsMobile();
    const width = window.innerWidth;

    if (isMobile) {
        return width
    } else {
        return contextValue.frameSize.width
    }
}

export const getAssetRatio = () => {
    const isMobile = getIsMobile();
    const screenWidth = getScreenWidth();

    if (isMobile) {
        if (screenWidth >= contextValue.frameSize.width) {
            return 1
        } else {
            return screenWidth / contextValue.frameSize.width
        }
    } else {
        return 1
    }
}

export const getHeaderHeight = () => {
    
}