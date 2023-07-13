import React from "react";

import { getAssetSize } from "functions";
import { useGlobalVariables } from "components";
import { layout, style } from "styles";

function MainRecordCard() {
  const { frameSize, screenWidth, mainRecordCard } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainRecordCard);
  const ratio = width / mainRecordCard.width

  const data = {
    "signupDay": 14,
    "twoweek": {
      "2022-04-01": 0,
      "2022-04-02": 1
    },
    "groupByCategory": {
      "cashCategory": "식비",
      "cashbookNowValue": 5000,
      "cashbookGoalValue": 8000
    },
    "total": {
      "cashbookNowValue": 5000,
      "cashbookGoalValue": 8000
    }
  }

  const isSaved = data.total.cashbookGoalValue - data.total.cashbookNowValue <= 0
  
  return (
    <style.MainRecordCardBox width={`${width}px`} height={`${height}px`} ratio={ratio}>
        
    </style.MainRecordCardBox>
  )
}

export default MainRecordCard;
