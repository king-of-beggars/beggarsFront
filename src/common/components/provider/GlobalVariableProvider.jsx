import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';

import {
  getAssetRatio,
  getIsMobile,
  getScreenWidth,
} from 'common/utils/assetConditions';
import { getNewAssetSize } from 'common/utils/getAssetSize';
import debounce from 'common/utils/debounce';
import { STANDARD_SIZE } from 'common/constants';

/**
 * This is context that provides,
 * 1. windowSize
 */
const GlobalVariableContext = createContext({
  isMobile: getIsMobile(),
  widthRatio: getAssetRatio(),
  screenWidth: getScreenWidth(),
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  headerHeight: getNewAssetSize(
    STANDARD_SIZE.frameHeaderHeight,
    getAssetRatio()
  ),

  navHeight: getNewAssetSize(STANDARD_SIZE.frameNavHeight, getAssetRatio()),

  mainHeight:
    window.innerHeight -
    (getNewAssetSize(STANDARD_SIZE.frameHeaderHeight, getAssetRatio()) +
      getNewAssetSize(STANDARD_SIZE.frameNavHeight, getAssetRatio())),

  ...STANDARD_SIZE,
});

/**
 * @params children = React.ReactElement
 * Make provider
 * windowSize와 isMobile 및 그에 따른 기본 header,
 * nav, main 렌더링 값은 window가 resize될 때마다 업데이트
 * 단, header / nav / main의 크기는 windowSize에 변경이 없으면 이전 값을 그대로 사용하기 (계산 스킵)
 */

export const GlobalVariableProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(
    /Mobi/i.test(window.navigator.userAgent)
  );
  const [widthRatio, setWidthRatio] = useState(getAssetRatio());

  // useMemo를 이용해 조건부로 계산을 스킵할 값들
  const headerHeight = useMemo(
    () => widthRatio * STANDARD_SIZE.frameHeaderHeight,
    [widthRatio]
  );
  const navHeight = useMemo(
    () => widthRatio * STANDARD_SIZE.frameNavHeight,
    [widthRatio]
  );
  const mainHeight = useMemo(
    () => windowSize.height - (headerHeight + navHeight),
    [windowSize, headerHeight, navHeight]
  );

  const screenWidth = getScreenWidth();

  useEffect(() => {
    // resize 될 때마다 변경되는 요소 업데이트
    // debouce 적용하여 400ms마다 한번씩 resize 업데이트
    const handleResize = debounce((_) => {
      const newWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const newIsMobile = getIsMobile();
      const newWidthRatio = getAssetRatio();

      setWindowSize(newWindowSize);
      setIsMobile(newIsMobile);
      setWidthRatio(newWidthRatio);
    }, 400);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value = {
    windowSize,
    isMobile,
    widthRatio,
    headerHeight,
    mainHeight,
    navHeight,
    screenWidth,
    ...STANDARD_SIZE,
  };

  return (
    <GlobalVariableContext.Provider value={value}>
      {children}
    </GlobalVariableContext.Provider>
  );
};

// consume하기 위한 Export
export const useGlobalVariables = () => useContext(GlobalVariableContext);

// Refactoring

// - 폴더구조

// --------------
// - 컴포넌트 / 리액트 쿼리 / hooks --> best practice 적용해보기
// - 스타일 정리하기
//     - 상수 --> theme object (token 만들기)--> globalThemeProvider 사용하기
//     - 스타일 컴포넌트 진정 재사용 가능한가?
// - 에러 헨들링 (에러 바운더리 / suspense)

// --------------
// **Typescript**
