import React from 'react';

import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';

import { style } from 'styles';
import { getAssetSize } from 'common/utils/getAssetSize';

function MainWeather({ weatherCode }) {
  const { frameSize, screenWidth, mainWeather } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainWeather);
  const ratio = width / mainWeather.width;

  return (
    <>
      <style.MainWeatherBox
        weatherCode={weatherCode}
        width={`${width * ratio}px`}
        height={`${height * ratio}px`}
      />
    </>
  );
}

export default MainWeather;
