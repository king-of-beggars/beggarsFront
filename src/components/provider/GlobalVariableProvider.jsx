import React, { createContext, useState, useEffect, useContext, useMemo } from "react"

import { contextValue } from "constants"
import { debounce } from 'functions'

// 1. create context
const GlobalVariableContext = createContext({
    windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    isMobile: /Mobi/i.test(window.navigator.userAgent),
    headerHeight: Math.ceil(window.innerHeight * 0.2) > 120 ? 120 : Math.ceil(window.innerHeight * 0.2),
    navHeight: Math.ceil(window.innerHeight * 0.1) > 80 ? 80 : Math.ceil(window.innerHeight * 0.1),
    mainHeight: Math.ceil(window.innerHeight) - ((Math.ceil(window.innerHeight * 0.2) > 120 ? 120 : Math.ceil(window.innerHeight * 0.2)) + (Math.ceil(window.innerHeight * 0.1) > 80 ? 80 : Math.ceil(window.innerHeight * 0.1))),
    screenWidth: /Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
                ? window.innerWidth // 그냥 window width 사용하기
                : window.innerWidth > 393 // mobile이 아니고 width가 393보다 크면
                    ? 393 // 393으로 크기 고정
                    : window.innerWidth, // 아니면 더 작은 화면 크기 사용하기
    ...contextValue
})

// 2. make provider
//// windowSize와 isMobile 및 그에 따른 기본 header, nav, main 렌더링 값은 window가 resize될 때마다 업데이트
//// 단, header / nav / main의 크기는 windowSize에 변경이 없으면 이전 값을 그대로 사용하기 (계산 스킵)
export const GlobalVariableProvider = ({ children }) => {
    // resize시마다 업데이트되는 값 state로 만들기
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const [isMobile, setIsMobile] = useState(/Mobi/i.test(window.navigator.userAgent))

    // useMemo를 이용해 조건부로 계산을 스킵할 값들
    const headerHeight = useMemo(() => Math.ceil(window.innerHeight * 0.2) > 120 ? 120 : Math.ceil(window.innerHeight * 0.2), [windowSize])
    const navHeight = useMemo(() => Math.ceil(window.innerHeight * 0.1) > 80 ? 80 : Math.ceil(window.innerHeight * 0.1), [windowSize])
    const mainHeight = useMemo(() => window.innerHeight - (headerHeight + navHeight), [windowSize])
    const screenWidth = useMemo(() =>  {
        if (/Mobi/i.test(window.navigator.userAgent)) {
            return window.innerWidth
        } else {
            if (window.innerWidth < 393) {
                return 393
            } else {
                return window.innerWidth
            }   
        }
    }, [windowSize, isMobile])

    useEffect(() => {
        // resize 될 때마다 변경되는 요소 업데이트
        // debouce 적용하여 400ms마다 한번씩 resize 업데이트
        const handleResize = debounce(_ => {
            const newWindowSize = {
                width: window.innerWidth,
                height: window.innerHeight
            }
            const newIsMobile = /Mobi/i.test(window.navigator.userAgent)

            setWindowSize(newWindowSize)
            setIsMobile(newIsMobile)
            // test code
            console.log('Window resized:', newWindowSize, newIsMobile) 
        }, 400)

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const value = { windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth, ...contextValue }


    return (
        <GlobalVariableContext.Provider value={value}>
            {children}
        </GlobalVariableContext.Provider>
    )
}

// consume하기 위한 Export
export const useGlobalVariables = () => useContext(GlobalVariableContext)