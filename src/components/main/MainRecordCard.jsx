import React from "react";

import { getAssetSize, getKrDate } from "functions";
import { useGlobalVariables, MainRecordCardTag, MainRecordComment, MainWeather, MainRecordStatus, MainToggle } from "components";
import { layout, style } from "styles";


function MainRecordCard({ isToggleOnLeft, toggleSetter, data }) {

  // 마지막 streak를 판별하여 weatherCode를 결정하는 함수
  const getWeatherCode = () => {
    const yesterday = getKrDate(false)
    const yesterdayStreak = data.twoweek[getKrDate(false)]
    if (yesterdayStreak === 1 || yesterdayStreak === 2) {
      return yesterdayStreak
    } else {
      // 3일 이상 streak가 깨졌을 경우를 탐색
      const twoWeeks = Object.keys(data.twoweek)
      const yesterdayIdx = twoWeeks.indexOf(yesterday)
      const lastThreeDays = twoWeeks.slice(yesterdayIdx - 2, yesterdayIdx + 1)
      const filteredStreak = lastThreeDays.map((day) => data.twoweek[day]).filter((code) => code !== 1 && code !== 2)
      // 3일 이상 streak가 깨졌으면 -1을 리턴, 그렇지 않으면 0을 리턴
      return filteredStreak.length === 3 ? -1 : 0;
    }
  }

  const { frameSize, screenWidth, mainRecordCard } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainRecordCard);
  const ratio = width / mainRecordCard.width

  const weatherCode = getWeatherCode()
  const isSaved = weatherCode > 0


  return (
    <style.MainRecordCardBox width={`${width}px`} height={`${height}px`} ratio={ratio}>
      <layout.FlexColumn100 style={{gap: "5px", marginBottom: "20px"}}>
        <MainRecordCardTag weatherCode={weatherCode} />
        <MainRecordComment weatherCode={weatherCode} ratio={ratio} />
      </layout.FlexColumn100>
      {
        isToggleOnLeft ?
            <layout.Grid2Row style={{gridTemplateColumns: "1fr 2fr"}}>
              <MainWeather weatherCode={weatherCode} />
              <MainRecordStatus ratio={ratio} isSaved={isSaved} budget={data.total.cashbookGoalValue} spend={data.total.cashbookNowValue}/>
            </layout.Grid2Row>
          :
            <></>
      }

      {/* <layout.FlexCenter> */}
      <MainToggle isToggleOnLeft={isToggleOnLeft} toggleSetter={toggleSetter}/>
      {/* </layout.FlexCenter> */}
    </style.MainRecordCardBox>
  )


}

export default MainRecordCard;
