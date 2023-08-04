import React from 'react';

import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';
import { style } from 'styles';
import { getAssetSize } from 'common/utils/getAssetSize';

function MainToggle({ isLoggedIn, isToggleOnLeft, toggleSetter }) {
  const { frameSize, screenWidth, mainToggleBar, mainToggleBtn } =
    useGlobalVariables();
  const { width: barWidth, height: barHeight } = getAssetSize(
    frameSize,
    screenWidth,
    mainToggleBar
  );
  const { width: btnWidth, height: btnHeight } = getAssetSize(
    frameSize,
    screenWidth,
    mainToggleBtn
  );

  const ratio = barWidth / mainToggleBar.width;

  return (
    <style.MainToggleBar
      ratio={ratio}
      width={`${barWidth}px`}
      height={`${barHeight}px`}
    >
      {isToggleOnLeft ? (
        <>
          <style.MainToggleBtnActivate
            width={`${btnWidth}px`}
            height={`${btnHeight}px`}
            ratio={ratio}
          >
            정보
          </style.MainToggleBtnActivate>
          <style.MainToggleBtnSleep
            {...(isLoggedIn ? {} : { disabled: true })}
            onClick={() => toggleSetter(false)}
            width={`${btnWidth}px`}
            height={`${btnHeight}px`}
            ratio={ratio}
          >
            상세
          </style.MainToggleBtnSleep>
        </>
      ) : (
        <>
          <style.MainToggleBtnSleep
            onClick={() => toggleSetter(true)}
            width={`${btnWidth}px`}
            height={`${btnHeight}px`}
            ratio={ratio}
          >
            정보
          </style.MainToggleBtnSleep>
          <style.MainToggleBtnActivate
            width={`${btnWidth}px`}
            height={`${btnHeight}px`}
            ratio={ratio}
          >
            상세
          </style.MainToggleBtnActivate>
        </>
      )}
    </style.MainToggleBar>
  );
}

export default MainToggle;
