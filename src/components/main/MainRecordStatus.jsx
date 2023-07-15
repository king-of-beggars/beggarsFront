import React from 'react'

import { commaOnThree, getKrDate } from 'functions'
import { layout, style } from 'styles'
import * as sVar from "constants/styleVariables"

function MainRecordStatus({ isSaved, budget, spend, ratio }) {

    const getDateString = () => {
        const basicDateString = getKrDate(false)
        const changedDateString = basicDateString.split("-").slice(1).join("/")
        return changedDateString
        }
    const getDayString = () => {
        const days = ["일", "월", "화", "수", "목", "금", "토"]
        const basicDateString = getKrDate(false)
        return `(${days[new Date(basicDateString).getDay()]})`
    }


    const dateString = getDateString() // date로 넣을 string 생성
    const dayString = getDayString() // day로 넣을 string 생성

  return (
    <layout.FlexCenterColumn style={{gap: "5px"}}>
        <layout.Flex100 style={{justifyContent: "flex-end", alignItems: "center", height: "fit-content", padding: "0 10px", gap: "5px"}}>
            <style.MainRecordDateBox ratio={ratio}>{dateString}</style.MainRecordDateBox>
            <style.MainRecordDayBox ratio={ratio}>{dayString}</style.MainRecordDayBox>
        </layout.Flex100>
        <style.MainRecordCardTextRow ratio={ratio}>
            <div className="text">예산</div>
            <div className="expense">{commaOnThree(budget)}원</div>
        </style.MainRecordCardTextRow>
        <style.MainRecordCardTextRow ratio={ratio}>
            <span className="text">소비</span>
            <span className="expense">{commaOnThree(spend)}원</span>
        </style.MainRecordCardTextRow >
        <style.Divider color={`${sVar.mainBorderGray}`}/>
        <style.MainRecordCardResultRow ratio={ratio}>
            <div>{`${isSaved ? "+" : "-"} ${commaOnThree(budget - spend)}`}원</div>
        </style.MainRecordCardResultRow>
    </layout.FlexCenterColumn>
  )
}

export default MainRecordStatus