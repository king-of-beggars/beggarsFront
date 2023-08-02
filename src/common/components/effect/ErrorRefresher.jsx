import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Refresh } from 'assets'
import * as sVar from 'constants/styleVariables'

// 에러시 페이지 새로고침 버튼 컴포넌트
function ErrorRefresher() {
    const navigate = useNavigate()

    const RefreshBtnContainer = styled.div`
        height: 40px;
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 30px;
        z-index: 2;
        font-size: 0.8rem;
    `
    const RefreshBtn = styled.button`
        height: inherit;
        width: inherit;
        display: flex;
        align-items: center;
        justify-content: space-around;
        outline: none;
        border-radius: 5px;
        transition: transform 0.1s;
        &:focus {
            outline: none;
        }
        &:active {
            background-color: ${sVar.darkGray};
            color: ${sVar.lightGray};
            transform: scale(0.97);
        }
    `
    const RefreshIconContainer = styled.div`
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const CommentStyle = styled.div`
        font-family: "DOSGothic";
        font-weight: bold;
        font-size: 11px;
    `
  return (
    <RefreshBtnContainer>
        <RefreshBtn onClick={() => navigate(window.location.pathname)}>
            <RefreshIconContainer>
                <Refresh />
            </RefreshIconContainer>
            <CommentStyle>새..새로고침!</CommentStyle>
        </RefreshBtn>
    </RefreshBtnContainer>


  )
}

export default ErrorRefresher