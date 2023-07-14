import React from 'react'

import { commaOnThree, getKrDate } from 'functions'
import { style } from 'styles'

function MainRecordStatus({ isSaved, budget, spend }) {
const getDateString = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"]
    const basicDateString = getKrDate(false)
    const changedDateString = basicDateString.split("-").slice(1).join("/")
    const dayString = `(${days[new Date(basicDateString).getDay()]})`

    return `${changedDateString} ${dayString}`
    }

    const dateString = getDateString()
  return (
    <div style={{width: "60%"}}>
        <div>{dateString}</div>
        <div>
            <span>예산</span>
            <span>{commaOnThree(budget)}원</span>
        </div>
        <div>
            <span>소비</span>
            <span>{commaOnThree(spend)}원</span>
        </div>
        <style.Divider color="black"/>
        <div>{`${isSaved ? "+" : "-"} ${commaOnThree(budget - spend)}`}원</div>
    </div>
  )
}

export default MainRecordStatus