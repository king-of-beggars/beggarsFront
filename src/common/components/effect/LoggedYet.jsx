import React from 'react'
import styled from 'styled-components'

function LoggedYet() {
    const LoginOrSignup = styled.div`
        font-size: 0.8rem;
        margin-top: 20px;
  `
  return (
    <LoginOrSignup>
      <a href="/login">로그인</a> 또는 <a href="/signup">회원가입</a>
    </LoginOrSignup>
  )
}

export default LoggedYet