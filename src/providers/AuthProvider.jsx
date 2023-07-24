import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom" // 페이지가 이동할 때마다 로그인 여부 확인하기 위함

import { chkLoggedIn } from 'functions'
import { BlurOverlay, Loader } from 'components'


export const AuthContext = React.createContext(null)

export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    // const { pathname } = useLocation()


    useEffect(() => {
        chkLoggedIn().then((res) => {
            setIsLoggedIn(res)
            setLoading(false)
        })
    }, [])

    // useEffect(() => {
    //     chkLoggedIn().then((res) => {
    //         setIsLoggedIn(res)
    //     })
    // }, [pathname]) // 새 페이지로 이동할 때마다 로그인 여부 확인

    if (loading) {
        return <BlurOverlay>
                    <Loader>잠깐만 기다려주게</Loader>
                </BlurOverlay>
    }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
  )
}
