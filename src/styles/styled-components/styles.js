
import styled, { css } from "styled-components"
import { btn, pressedBtn, cashbookDateBox, cashbookCardYellow } from 'assets'
import { SwiperSlide } from "swiper/react"
import {
  FlexColumn100,
  FlexCenterColumn,
  FlexCenter,
  FlexColumn,
  FlexDefault,
  FlexCenterEven100,
  FlexCenterRow,
} from "styles/layouts";
import { layout, style } from "styles";
import { bookAddExpendBtnColor, bookDetailAddBoxBorderColor, bookDetailAddBoxColor, bookDetailBorderColor, bookModalBordorColor, bookSelectInputHeadColor, bookSelectInputborderColor } from "constants/styleVariables";

export const CanvasContainer = styled.div`
  width: 98vw;
  height: 98vh;
  border: 2px solid lightgray;
  border-radius: 10px;
`;

export const Button = styled.button`
  color: white;
  width: 190px;
  height: 49px;
  border: none;
  background: ${(props) =>
    props.isPressed ? `url(${pressedBtn}) no-repeat` : `url(${btn}) no-repeat`};
`;

export const LoginLogoWrap = styled(FlexCenterColumn)`
  width: 10em;
  height: 10em;
  border: 1px solid black;
`;

// LoginInputBox : 로그인 input 세트 (아이디, 비밀번호)
export const LoginInputBox = styled(FlexColumn)`
  margin: 20px;
  > input {
    width: ${(props) =>
      props.isMobile ? `calc(100vw * 0.8)` : `calc(500px * 0.8)`};
    height: 2.6em;
    border: none;
    border-bottom: 2px solid black;
    outline: none;
  }
  > span {
    font-size: 12pt;
    text-align: left;
  }
`;

// 로그인 및 여정시작 등 큰 검정 라운드 버튼 스타일링
export const BigBlackBtn = styled.button`
  width: 10em;
  height: 2.5em;
  border-radius: 6em;
  background: black;
  color: white;
  font-size: 1.3em;
`;

export const SocialLoginBtn = styled.button`
  width: ${(props) =>
    props.isMobile ? `calc(100vw * 0.8)` : `calc(500px * 0.8)`};
  height: 2.5em;
  border-radius: 6em;
  background: ${(props) => (props.site === "naver" ? `#4EBE44` : `#F8CD40`)};
  color: black;
  font-size: 1em;
  border: none;
`;

// SignupInputBox : 회원가입 아이디, 닉네임, 비밀번호 입력 input
export const SignupInputBox = styled(FlexCenter)`
  height: 4em;
  border: none;
  border-bottom: 1px solid black;
  outline: none;

  > input {
    width: ${(props) => (props.isInput ? `calc(100% - 90px)` : `100%`)};
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
`;

// SigupInputWrap : 회원가입 input wrapper
export const SigupInputWrap = styled(FlexColumn100)`
  align-content: space-between;
  width: ${(props) =>
    props.isMobile ? `calc(100vw * 0.8)` : `calc(500px * 0.8)`};
  margin-bottom: 60px;
`;

// ProfilePicWrap : 프로필 사진
export const ProfilePicWrap = styled(FlexCenterColumn)`
  width: 10em;
  height: 10em;
  border: 1px solid black;
  border-radius: 50%;
`;

// MidBlackBtn : 프로필 정보수정 버튼
export const MidBlackBtn = styled.button`
  width: 10em;
  height: 2em;
  border-radius: 6em;
  background: black;
  color: white;
  font-size: 1em;
`;

// Nav바 컨테이너
export const NavWrap = styled(FlexCenterEven100)`
    position: absolute;
    bottom: 0;
    z-index: 1;
    background: white;
    height: 100%;
`

export const CashBookHeader = styled(FlexCenter)`
    height: inherit;
    font-size: 1em;
`

export const DayPickerWrap = styled(FlexCenter)`
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(${cashbookDateBox});
    width: ${props => props.dateBoxWidth};
    height: ${props => props.dateBoxHeight};
    margin: 0.5em 1em 1em 1em;
`

// cashBookCard의 Card 부분 스타일링입니다.
export const CashBookCardContainer = styled.div`
    background-image: url(${cashbookCardYellow});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: ${props => props.cardWidth};
    height: ${props => props.cardHeight};
`
// 회색 dummyCard의 스타일링입니다.
export const CashBookDummyContainer = styled.div`
    background-image: url();
`

export const CustomedSwiperSlide = styled(SwiperSlide)`
    height: ${props => props.height}px;
    width: 100%;
`

// Cashbook 카드 추가 & 지출 추가 화면 input, select box 공통 프레임
export const CashBookCardWrap = styled(FlexCenterRow)`
  width: 330px;
  height: 50px;
  margin-bottom: 2em;

  border: 1px solid ${bookSelectInputborderColor};
  border-radius: 15px;
`;

// Cashbook input, select box 앞머리
export const CashBookHead = styled(FlexCenter)`
  width: 80px;
  border-radius: 15px 0px 0px 15px;

  background-color: ${bookSelectInputHeadColor};
  color: white;
`;

// Cashbook Select box
export const CashBookSelect = styled.select`
  padding: 10px;
  width: 250px;
  border-radius: 0px 15px 15px 0px;
  
  font-size: 14px;
`;

// Cashbook Select Input
export const CashBookInput = styled.input`
  padding: 10px;
  width: 250px;
  border-radius: 0px 15px 15px 0px;
  border: 1px solid ${bookSelectInputborderColor};
  outline: none;
  font-size: 14px;
`;

// Cashbook Button
export const CashBookBtn = styled.button`
  width: 330px;
  height: 44px;
  margin-top: ${(props)=>props.marginTop};
  border-radius: 15px;
  background-color: ${bookAddExpendBtnColor};
  color: white;
`;

// Cashbook Detail Box
export const CashBookDetailBox = styled(layout.FlexCenter)`
  width: 340px;
  height: 75px;
  background-color: white;
  border: 2px solid ${bookDetailBorderColor};
  border-radius: 10px;
`;

// Cashbook Detail Add Box
export const CashBookDetailAddBox = styled(layout.FlexCenter)`
  width: 340px;
  height: 75px;
  background-color: ${bookDetailAddBoxColor};
  border: 2px dashed ${bookDetailAddBoxBorderColor};
  border-radius: 10px;
`;

// Cashbook Detail Add Modal 배경 (어둡게)
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #D9D9D9;  /* 수정 필요 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

// Cashbook Detail Add Modal
export const Modal = styled.div`
  background-color: white;
  position: relative;
  width: 340px;
  min-height: 320px;
  border-radius: 10px;
  border: 1px solid ${bookModalBordorColor};
`
