import React, { createContext, useState, useEffect, useContext, useMemo } from "react"

import { contextValue } from "constants"
import { debounce, getIsMobile, getScreenWidth, getAssetRatio, getNewAssetSize } from 'functions'

// 1. create context
const GlobalVariableContext = createContext({
    windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    isMobile: getIsMobile(),
    screenWidth: getScreenWidth(),
    // screenWidth: /Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //         ? window.innerWidth // 그냥 window width 사용하기
    //         : 500,
    // widthRatio: /Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //             ? window.innerWidth / contextValue.frameSize.width
    //             : window.innerWidth > contextValue.frameSize.width
    //                 ? 1 
    //                 : window.innerWidth / contextValue.frameSize.width,
    widthRatio: getAssetRatio(),
    // headerHeight: (/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                 ? window.innerWidth / contextValue.frameSize.width
    //                 : window.innerWidth > contextValue.frameSize.width
    //                     ? 1 
    //                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight,
    headerHeight: getNewAssetSize(contextValue.frameHeaderHeight, getAssetRatio()),
    // headerHeight: (window.innerWidth >= contextValue.frameSize.width
    //                 ? 1
    //                 : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight,
    // navHeight: (/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //             ? window.innerWidth / contextValue.frameSize.width
    //             : window.innerWidth > contextValue.frameSize.width
    //                 ? 1 
    //                 : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight,
    navHeight: getNewAssetSize(contextValue.frameNavHeight, getAssetRatio()),
    // navHeight: (window.innerWidth >= contextValue.frameSize.width
    //             ? 1
    //             : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight,
    mainHeight: window.innerHeight - (getNewAssetSize(contextValue.frameHeaderHeight, getAssetRatio()) + getNewAssetSize(contextValue.frameNavHeight, getAssetRatio())),
    // mainHeight: window.innerHeight - (
    //             ((/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                 ? window.innerWidth / contextValue.frameSize.width
    //                 : window.innerWidth > contextValue.frameSize.width
    //                     ? 1 
    //                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight)
    //             +
    //             ((/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                 ? window.innerWidth / contextValue.frameSize.width
    //                 : window.innerWidth > contextValue.frameSize.width
    //                     ? 1 
    //                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight)
    //             ),
    // mainHeight: window.innerHeight - (
    //                 ((window.innerWidth >= contextValue.frameSize.width
    //                     ? 1
    //                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight)
    //                 +
    //                 ((window.innerWidth >= contextValue.frameSize.width
    //                     ? 1
    //                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight)
    //             ),
    // headerHeight: window.innerHeight >= contextValue.frameSize.height
    //                 ? contextValue.frameHeaderHeight
    //                 : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameHeaderHeight),
    // navHeight: window.innerHeight >= contextValue.frameNavHeight
    //             ? contextValue.frameNavHeight
    //             : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameNavHeight),
    // mainHeight: window.innerHeight - (
    //     window.innerHeight >= contextValue.frameNavHeight
    //         ? contextValue.frameNavHeight
    //         : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameNavHeight) 
    //     + 
    //     window.innerHeight >= contextValue.frameNavHeight
    //         ? contextValue.frameNavHeight
    //         : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameNavHeight)
    //     ),
    // headerHeight: Math.ceil(window.innerHeight * 0.2) > 120 ? 120 : Math.ceil(window.innerHeight * 0.2),
    // navHeight: Math.ceil(window.innerHeight * 0.12) > 90 ? 90 : Math.ceil(window.innerHeight * 0.12),
    // mainHeight: Math.ceil(window.innerHeight) - ((Math.ceil(window.innerHeight * 0.2) > 120 ? 120 : Math.ceil(window.innerHeight * 0.2)) + (Math.ceil(window.innerHeight * 0.1) > 110 ? 110 : Math.ceil(window.innerHeight * 0.1))),
    // mainHeight: window.innerHeight - (Math.ceil(window.innerHeight * 0.12) > 90 ? 90 : Math.ceil(window.innerHeight * 0.12) + contextValue.headerHeight),

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
    const [widthRatio, setWidthRatio] = useState(getAssetRatio())

    // useMemo를 이용해 조건부로 계산을 스킵할 값들
    const headerHeight = useMemo(() => widthRatio * contextValue.frameHeaderHeight, [windowSize])
    const navHeight = useMemo(() => widthRatio * contextValue.frameNavHeight, [windowSize])
    const mainHeight = useMemo(() => windowSize.height - (headerHeight + navHeight), [windowSize])
    // const headerHeight = useMemo(() => Math.ceil(window.innerHeight * 0.2) > 120 ? 120 : Math.ceil(window.innerHeight * 0.2), [windowSize])
    // const navHeight = useMemo(() => Math.ceil(window.innerHeight * 0.12) > 90 ? 90 : Math.ceil(window.innerHeight * 0.12), [windowSize])
    // const mainHeight = useMemo(() => window.innerHeight - (headerHeight + navHeight), [windowSize])
    // const headerHeight = useMemo(() => window.innerHeight >= contextValue.frameSize.height
    //                                 ? contextValue.frameHeaderHeight
    //                                 : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameHeaderHeight)
    //                                 , [windowSize])
    // const navHeight = useMemo(() => window.innerHeight >= contextValue.frameNavHeight
    //                                 ? contextValue.frameNavHeight
    //                                 : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameNavHeight)
    //                                 , [windowSize])
    // const mainHeight = useMemo(() => window.innerHeight - (
    //                                     window.innerHeight >= contextValue.frameNavHeight
    //                                         ? contextValue.frameNavHeight
    //                                         : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameNavHeight) 
    //                                     + 
    //                                     window.innerHeight >= contextValue.frameNavHeight
    //                                         ? contextValue.frameNavHeight
    //                                         : Math.ceil(window.innerHeight / contextValue.frameSize.height * contextValue.frameNavHeight)
    //                                     ), [windowSize])
    // const headerHeight = useMemo(() => 
    //                         (/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                                     ? window.innerWidth / contextValue.frameSize.width
    //                                     : window.innerWidth > contextValue.frameSize.width
    //                                         ? 1 
    //                                         : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight
    //                     , [windowSize])
    // const navHeight = useMemo(() => 
    //                         (/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                                     ? window.innerWidth / contextValue.frameSize.width
    //                                     : window.innerWidth > contextValue.frameSize.width
    //                                         ? 1 
    //                                         : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight
    //                     , [windowSize])
    // const mainHeight = useMemo(() => 
    //                         window.innerHeight - (
    //                             ((/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                                 ? window.innerWidth / contextValue.frameSize.width
    //                                 : window.innerWidth > contextValue.frameSize.width
    //                                     ? 1 
    //                                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight)
    //                             +
    //                             ((/Mobi/i.test(window.navigator.userAgent) // 만일 mobile이면
    //                                 ? window.innerWidth / contextValue.frameSize.width
    //                                 : window.innerWidth > contextValue.frameSize.width
    //                                     ? 1 
    //                                     : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight)
    //                             )
    //                     , [windowSize])
    // const widthRatio = useMemo(() => getAssetRatio(), [])
    // const widthRatio = useMemo(() => window.innerWidth >= contextValue.frameSize.width
    //                             ? 1
    //                             : window.innerWidth / contextValue.frameSize.width
    //                     , [windowSize])
    // const headerHeight = useMemo(() =>
    //                         (window.innerWidth >= contextValue.frameSize.width
    //                             ? 1
    //                             : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight
    //                     , [windowSize])
    // const navHeight = useMemo(() =>
    //                         (window.innerWidth >= contextValue.frameSize.width
    //                             ? 1
    //                             : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight
    //                     , [windowSize])
    // const mainHeight = useMemo(() =>
    //                         window.innerHeight - (
    //                             ((window.innerWidth >= contextValue.frameSize.width
    //                                 ? 1
    //                                 : window.innerWidth / contextValue.frameSize.width) * contextValue.frameHeaderHeight)
    //                             +
    //                             ((window.innerWidth >= contextValue.frameSize.width
    //                                 ? 1
    //                                 : window.innerWidth / contextValue.frameSize.width) * contextValue.frameNavHeight)
    //                         )
    //                     , [windowSize])      
    const screenWidth = useMemo(() => getScreenWidth(), [windowSize, isMobile])                     
    // const screenWidth = useMemo(() =>  {
    //     if (/Mobi/i.test(window.navigator.userAgent)) {
    //         return window.innerWidth
    //     } else {
    //         return 500
    //         // if (window.innerWidth > 393) {
    //         //     return 393
    //         // } else {
    //         //     return window.innerWidth
    //         // }   
    //     }
    // }, [windowSize, isMobile])
    useEffect(() => {
        // resize 될 때마다 변경되는 요소 업데이트
        // debouce 적용하여 400ms마다 한번씩 resize 업데이트
        const handleResize = debounce(_ => {
            const newWindowSize = {
                width: window.innerWidth,
                height: window.innerHeight
            }
            const newIsMobile = getIsMobile()
            const newWidthRatio = getAssetRatio()

            setWindowSize(newWindowSize)
            setIsMobile(newIsMobile)
            setWidthRatio(newWidthRatio)
            // test code
            // console.log('Window resized:', newWindowSize, newIsMobile) 
        }, 400)

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    // const value = { windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth, ...contextValue }
    const value = { windowSize, isMobile, widthRatio, headerHeight, mainHeight, navHeight, screenWidth, ...contextValue }

    return (
        <GlobalVariableContext.Provider value={value}>
            {children}
        </GlobalVariableContext.Provider>
    )
}

// consume하기 위한 Export
export const useGlobalVariables = () => useContext(GlobalVariableContext)