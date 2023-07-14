import React from 'react'

import { useGlobalVariables } from 'components';
import { getAssetSize } from 'functions';
import { style } from 'styles'

function MainWeather({ weatherCode }) {
  const { frameSize, screenWidth, mainWeather } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainWeather);
  const ratio = width / mainWeather.width

  return (
    <>
        <style.MainWeatherBox weatherCode={weatherCode} width={`${width * ratio}px`} height={`${height * ratio}px`} />
    </>
  )
}

export default MainWeather