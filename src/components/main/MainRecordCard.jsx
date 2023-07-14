import React from "react";

import { getAssetSize, getKrDate } from "functions";
import { useGlobalVariables, MainRecordCardTag, MainRecordComment, MainWeather, MainRecordStatus, MainToggle } from "components";
import { layout, style } from "styles";


function MainRecordCard({ isToggleOnLeft, data }) {
 // const data = {
  //   "signupDay": 14,
  //   "twoweek": {
  //     "2022-04-01": 0,
  //     "2022-04-02": 1
  //   },
  //   "groupByCategory": {
  //     "cashCategory": "식비",
  //     "cashbookNowValue": 5000,
  //     "cashbookGoalValue": 8000
  //   },
  //   "total": {
  //     "cashbookNowValue": 5000,
  //     "cashbookGoalValue": 8000
  //   }
  // }
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

  const isSaved = data.total.cashbookGoalValue - data.total.cashbookNowValue <= 0
  const weatherCode = getWeatherCode()

  return (
    <style.MainRecordCardBox width={`${width}px`} height={`${height}px`} ratio={ratio}>
      <layout.FlexColumn100 style={{gap: "5px", marginBottom: "20px"}}>
        <MainRecordCardTag weatherCode={weatherCode} />
        <MainRecordComment weatherCode={weatherCode} ratio={ratio} />
      </layout.FlexColumn100>
      <layout.Grid2Row style={{gridTemplateColumns: "1fr 2fr"}}>
        <MainWeather weatherCode={weatherCode} />
        <MainRecordStatus ratio={ratio} isSaved={isSaved} budget={data.total.cashbookGoalValue} spend={data.total.cashbookNowValue}/>
      </layout.Grid2Row>
      {/* <layout.FlexCenter> */}
      <MainToggle isToggleOnLeft={isToggleOnLeft}/>
      {/* </layout.FlexCenter> */}
    </style.MainRecordCardBox>
  )


}

export default MainRecordCard;
