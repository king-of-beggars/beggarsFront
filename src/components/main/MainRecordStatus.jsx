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
    const dateString = getDateString()
    const dayString = getDayString()
  return (
    <layout.FlexCenterColumn>
        <layout.Flex100 style={{justifyContent: "flex-end", alignItems: "center", height: "fit-content"}}>
            <style.MainRecordDateBox ratio={ratio}>{dateString}</style.MainRecordDateBox>
            <style.MainRecordDayBox ratio={ratio}>{dayString}</style.MainRecordDayBox>
        </layout.Flex100>
        <div>
            <span>예산</span>
            <span>{commaOnThree(budget)}원</span>
        </div>
        <div>
            <span>소비</span>
            <span>{commaOnThree(spend)}원</span>
        </div>
        <style.Divider color={`${sVar.mainBorderGray}`}/>
        <div>{`${isSaved ? "+" : "-"} ${commaOnThree(budget - spend)}`}원</div>
    </layout.FlexCenterColumn>
  )
}

export default MainRecordStatus