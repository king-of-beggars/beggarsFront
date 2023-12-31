import React from 'react';
import { AutoTextSize } from 'auto-text-size';

import { getAssetSize } from 'common/utils/getAssetSize';
import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';
import { COMMENT } from 'common/constants';
import { layout, style } from 'styles';

function MainExp({ dayCount }) {
  // console.log(decodeURIComponent(localStorage.getItem("nickname")))
  const userName =
    !!decodeURIComponent(localStorage.getItem('nickname')) &&
    decodeURIComponent(localStorage.getItem('nickname')) !== 'null'
      ? decodeURIComponent(localStorage.getItem('nickname'))
      : '여유로운 바다사자';

  // console.log('userName:::', userName)
  const { frameSize, screenWidth, mainExpBox } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainExpBox);
  const comment = `${userName}${COMMENT.commentDayAfter[0]} ${dayCount}${COMMENT.commentDayAfter[1]}`;
  const ratio = width / mainExpBox.width;

  return (
    <style.MainExpBox width={`${width}px`} height={`${height}px`} ratio={ratio}>
      {/* {comment} */}
      <div style={{ width: `${width * 0.88}px`, fontFamily: 'DOSGothic' }}>
        <AutoTextSize mode="oneline" minFontSizePx={1} maxFontSizePx={24}>
          {comment}
        </AutoTextSize>
      </div>
    </style.MainExpBox>
  );
}

export default MainExp;
