import React from 'react'
import styled from 'styled-components'

function LoggedYet() {
    const LoginOrSignup = styled.div`
        position: absolute;
        bottom: 42%;
        z-index: 2;
        font-size: 0.8rem;
  `
  return (
    <LoginOrSignup>
        <a href="/login">로그인</a> 또는 <a href="/signup">회원가입</a>
    </LoginOrSignup>
  )
}

export default LoggedYet