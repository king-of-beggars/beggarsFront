import React, { createContext, useState, useEffect, useContext, useMemo } from "react"

import { contextValue, mainContextValue } from "constants"
import { useGlobalVariables } from './GlobalVariableProvider'
import { debounce, getAssetSize } from "functions"

// 1. create context
const MainAssetContext = createContext()

// 2. make provider
// window resize될 때, screenWidth가 변하면 context의 내용 모두 업데이트하여 적용
export const MainAssetProvider = ({ children }) => {
  const { frameSize, screenWidth, mainExpBox, mainRecordCard, mainJourneyTitle, mainJourneyBox, mainWeather, mainLogo, mainTag, mainToggleBar, mainToggleBtn } = useGlobalVariables()
  const [mainAssetSizes, setMainAssetSizes] = useState({
    mainExpBox: getAssetSize(frameSize, screenWidth, mainExpBox),
    mainRecordCard: getAssetSize(frameSize, screenWidth, mainRecordCard),
    mainJourneyTitle: getAssetSize(frameSize, screenWidth, mainJourneyTitle),
    mainJourneyBox: getAssetSize(frameSize, screenWidth, mainJourneyBox),
    mainWeather: getAssetSize(frameSize, screenWidth, mainWeather),
    mainLogo: getAssetSize(frameSize, screenWidth, mainLogo),
    mainTag: getAssetSize(frameSize, screenWidth, mainTag),
    mainToggleBar: getAssetSize(frameSize, screenWidth, mainToggleBar),
    mainToggleBtn: getAssetSize(frameSize, screenWidth, mainToggleBtn)
  })
  const recalculateAssetSizes = () => {
    console.log("recalculating....")
    console.log("recal / screenWidth:::", screenWidth)
    setMainAssetSizes({
      mainExpBox: getAssetSize(frameSize, screenWidth, mainExpBox),
      mainRecordCard: getAssetSize(frameSize, screenWidth, mainRecordCard),
      mainJourneyTitle: getAssetSize(frameSize, screenWidth, mainJourneyTitle),
      mainJourneyBox: getAssetSize(frameSize, screenWidth, mainJourneyBox),
      mainWeather: getAssetSize(frameSize, screenWidth, mainWeather),
      mainLogo: getAssetSize(frameSize, screenWidth, mainLogo),
      mainTag: getAssetSize(frameSize, screenWidth, mainTag),
      mainToggleBar: getAssetSize(frameSize, screenWidth, mainToggleBar),
      mainToggleBtn: getAssetSize(frameSize, screenWidth, mainToggleBtn)
    })
  }

  useEffect(() => {
    // resize 될 때마다 변경되는 요소 업데이트
    // debounce 적용하여 400ms마다 한번씩 resize 업데이트
    console.log("mainAssetProvider: screenWidth changed:::", screenWidth)
    const handleResize = debounce(_ => {
      recalculateAssetSizes()

    }, 400)
    handleResize()
  }, [screenWidth])

  return (
    <MainAssetContext.Provider value={mainAssetSizes}>
      {children}
    </MainAssetContext.Provider>
  )
}

export const useMainAssetContext = () => {
  const context = useContext(MainAssetContext)

  if (!context) {
    throw new Error("useMainAssetContext is not used within MainAssetProvider")
  }

  return context
}




