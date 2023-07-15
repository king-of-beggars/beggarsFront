import React from 'react'

import { useGlobalVariables } from 'components'
import { getAssetSize } from 'functions'
import { MainFailCoin, MainGoldCoin, MainSilverCoin } from "assets"
import { layout, style } from 'styles'

function MainJourney({ twoWeeks }) {
  const { frameSize, screenWidth, mainJourneyBox, mainJourneyTitle, mainJourneyBoxRow, mainJourneyRoundBox } = useGlobalVariables()
  const { width: boxWidth, height: boxHeight } = getAssetSize(frameSize, screenWidth, mainJourneyBox);
  const { width: titleWidth, height: titleHeight } = getAssetSize(frameSize, screenWidth, mainJourneyTitle);
  const { width: rowWidth, height: rowHeight } = getAssetSize(frameSize, screenWidth, mainJourneyBoxRow);
  const { width: roundWidth, height: roundHeight } = getAssetSize(frameSize, screenWidth, mainJourneyRoundBox);

  const ratio = boxWidth / mainJourneyBox.width

  const days = Object.keys(twoWeeks).map((day) => day.split("-")[2])
  const streaks = Object.values(twoWeeks)
  const firstRowDays = days.slice(0, 7)
  const firstRowStreaks = streaks.slice(0, 7)
  const secondRowDays = days.slice(7)
  const secondRowStreaks = streaks.slice(7)

  return (
    <layout.FlexColumn100 style={{gap: "5px", marginBottom: "25px"}}>
      <style.MainJourneyTitleBox width={`${titleWidth}px`} height={`${titleHeight}px`} ratio={ratio}>
        여정 일지
      </style.MainJourneyTitleBox>
      <style.MainJourneyStreakBox width={`${boxWidth}px`} height={`${boxHeight}px`} ratio={ratio}>
        <style.MainJourneyStreakRowBox width={`${rowWidth}px`} height={`${rowHeight}px`} ratio={ratio}>
          {
            firstRowDays.map((day, idx) => {
              if (idx === 0) {
                return <div style={{color: "red", display: "flex", justifyContent: "center", alignItems: "center"}}>{day}</div>
              } else if (idx === 6) {
                return <div style={{color: "blue", display: "flex", justifyContent: "center", alignItems: "center"}}>{day}</div>
              } else {
                return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{day}</div>
              }
            })
          }
          {
            firstRowStreaks.map(streak => {
              if (streak === 2) {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                    <MainGoldCoin />
                  </style.MainJourneyStreak>
                )
              } else if (streak === 1) {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                    <MainSilverCoin />
                  </style.MainJourneyStreak>
                )
              } else if (streak === 0) {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                    <MainFailCoin />
                  </style.MainJourneyStreak>
                )
              } else {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                  </style.MainJourneyStreak>
                )
              }
            })
          }
        </style.MainJourneyStreakRowBox>
        <style.MainJourneyStreakRowBox width={`${rowWidth}px`} height={`${rowHeight}px`} ratio={ratio}>
        {
            secondRowDays.map((day, idx) => {
              if (idx === 0) {
                return <div style={{color: "red", display: "flex", justifyContent: "center", alignItems: "center"}}>{day}</div>
              } else if (idx === 6) {
                return <div style={{color: "blue", display: "flex", justifyContent: "center", alignItems: "center"}}>{day}</div>
              } else {
                return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{day}</div>
              }
            })
          }
          {
            secondRowStreaks.map(streak => {
              if (streak === 2) {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                    <MainGoldCoin />
                  </style.MainJourneyStreak>
                )
              } else if (streak === 1) {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                    <MainSilverCoin />
                  </style.MainJourneyStreak>
                )
              } else if (streak === 0) {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                    <MainFailCoin />
                  </style.MainJourneyStreak>
                )
              } else {
                return (
                  <style.MainJourneyStreak width={`${roundWidth}px`} height={`${roundHeight}px`} ratio={ratio}>
                  </style.MainJourneyStreak>
                )
              }
            })
          }
        </style.MainJourneyStreakRowBox>
      </style.MainJourneyStreakBox>

    </layout.FlexColumn100>
  )
}

export default MainJourney