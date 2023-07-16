import React from "react";

import { useGlobalVariables } from "providers"
import { getAssetSize, getKrDate } from "functions";
import { MainRecordCardTag, MainRecordComment, MainWeather, MainRecordStatus, MainToggle, Bar } from "components";
import { layout, style } from "styles";

const sampleData = [
  {
      cashbookCategory: "식비",
      cashbookNowValue: 1200,
      // cashbookGoalValue: 10000
  },
  {
      cashbookCategory: "군것질",
      cashbookNowValue: 1200,
      // cashbookGoalValue: 10000
  },
  {
      cashbookCategory: "교통비",
      cashbookNowValue: 3200,
      // cashbookGoalValue: 3000
  },
  {
      cashbookCategory: "생필품",
      cashbookNowValue: 10000,
      // cashbookGoalValue: 4000
  },
  {
      cashbookCategory: "쇼핑",
      cashbookNowValue: 2990,
      // cashbookGoalValue: 12000
  }
]


function MainRecordCard({ isLoggedIn, isToggleOnLeft, toggleSetter, data }) {

  // 마지막 streak를 판별하여 weatherCode를 결정하는 함수
  const getWeatherCode = () => {
    const substracted = data.total.cashbookGoalValue - data.total.cashbookNowValue
    if (substracted > 0) {
      return 2
    } else if (substracted === 0) {
      return 1
    } else {
      const yesterday = getKrDate(false)
      // 3일 이상 streak가 깨졌을 경우를 탐색
      const twoWeeks = Object.keys(data.twoweek)
      const yesterdayIdx = twoWeeks.indexOf(yesterday)
      const lastThreeDays = twoWeeks.slice(yesterdayIdx - 2, yesterdayIdx + 1)
      const filteredStreak = lastThreeDays.map((day) => data.twoweek[day]).filter((code) => code !== 1 && code !== 2)
      return filteredStreak.length === 3 ? -1 : 0;
    }

    // const yesterday = getKrDate(false)
    // const yesterdayStreak = data.twoweek[getKrDate(false)]
    // if (yesterdayStreak === 1 || yesterdayStreak === 2) {
    //   return yesterdayStreak
    // } else {
    //   // 3일 이상 streak가 깨졌을 경우를 탐색
    //   const twoWeeks = Object.keys(data.twoweek)
    //   const yesterdayIdx = twoWeeks.indexOf(yesterday)
    //   const lastThreeDays = twoWeeks.slice(yesterdayIdx - 2, yesterdayIdx + 1)
    //   const filteredStreak = lastThreeDays.map((day) => data.twoweek[day]).filter((code) => code !== 1 && code !== 2)
    //   // 3일 이상 streak가 깨졌으면 -1을 리턴, 그렇지 않으면 0을 리턴
    //   return filteredStreak.length === 3 ? -1 : 0;
    // }
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
          <>
            <div style={{height: "40%", width: "90%"}}>
              <Bar data={sampleData} />
            </div>
            <style.Divider borderSize="1px" color={"#3c3c3c"} style={{width: "100%"}}></style.Divider>
            <layout.FlexDefault style={{width: "90%", justifyContent: "space-around", padding: "5px 6px 0 6px"}}>
              {
                sampleData.length > 0 ?
                sampleData.map((item, idx) => {
                  return (
                    <style.MainGraphSection key={idx} ratio={ratio}>{item.cashbookCategory}</style.MainGraphSection>
                  )
                }) : 
                null
              }
            </layout.FlexDefault>
          </>

          
            





      }

      {/* <layout.FlexCenter> */}
      <MainToggle isLoggedIn={isLoggedIn} isToggleOnLeft={isToggleOnLeft} toggleSetter={toggleSetter}/>
      {/* </layout.FlexCenter> */}
    </style.MainRecordCardBox>
  )


}

export default MainRecordCard;
