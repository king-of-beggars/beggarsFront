import styled, { css } from "styled-components"
import { btn, pressedBtn } from 'assets'
import { FlexColumn100, FlexColumnCenter, FlexCenter, FlexColumn } from 'styles/layouts'

export const CanvasContainer = styled.div`
    width: 98vw;
    height: 98vh;
    border: 2px solid lightgray;
    border-radius: 10px;
`

export const Button = styled.button`
    color: white;
    width: 190px;
    height: 49px;
    border: none;
    background: ${props => (props.isPressed ? `url(${pressedBtn}) no-repeat` : `url(${btn}) no-repeat`)};
`

export const LoginLogoWrap = styled(FlexColumnCenter)`
    width: 10em;
    height: 10em;
    border: 1px solid black;
`

// LoginInputBox : 로그인 input 세트 (아이디, 비밀번호) 
export const LoginInputBox = styled(FlexColumn)`
    margin: 20px;
    > input {
        width: ${props => props.isMobile ? `calc(100vw * 0.8)`: `calc(500px * 0.8)`};
        height: 2.6em;
        border: none;
        border-bottom: 2px solid black;
        outline: none;
    }
    > span {
        font-size: 12pt;
        text-align: left;
    }
`

// 로그인 및 여정시작 등 큰 검정 라운드 버튼 스타일링
export const BigBlackBtn = styled.button`
    width: 10em;
    height: 2.5em;
    border-radius: 6em;
    background: black;
    color: white;
    font-size: 1.3em;
`

export const SocialLoginBtn = styled.button`
    width: ${props => props.isMobile ? `calc(100vw * 0.8)`: `calc(500px * 0.8)`};
    height: 2.5em;
    border-radius: 6em;
    background: ${props => props.site === "naver" ? `#4EBE44` : `#F8CD40` };
    color: black;
    font-size: 1em;
    border: none;
`

// SignupInputBox : 회원가입 아이디, 닉네임, 비밀번호 입력 input
export const SignupInputBox = styled(FlexCenter)`
    height: 4em;
    border: none;
    border-bottom: 1px solid black;
    outline: none;

    > input {
        width: ${props => props.isInput ? `calc(100% - 90px)`: `100%`};
        border: none;
        outline: none;
    }

    > button {
        width: 100px;
        height: 30px;
        font-size: 16px;
        background: black;
        color: white;
        border-radius: 5px;
    }
`

// SigupInputWrap : 회원가입 input wrapper
export const SigupInputWrap = styled(FlexColumn100)`
    align-content: space-between;
    width: ${props => props.isMobile ? `calc(100vw * 0.8)`: `calc(500px * 0.8)`};
    margin-bottom: 60px;
`