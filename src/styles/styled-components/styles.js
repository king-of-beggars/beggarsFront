
import styled, { css } from "styled-components"
import { btn, pressedBtn, cashbookDateBox, cashbookCardYellow, mainLineLogo, mainLogo } from 'assets'
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
import { layout } from "styles";
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
  min-width: 10em;
  min-height: 10em;
  background-image: url(${mainLineLogo});
  object-fit: cover;
  margin-bottom: 0.5em;
  /* border: 1px solid black; */
`;

// LoginInputBox : 로그인 input 세트 (아이디, 비밀번호)
export const LoginInputBox = styled(FlexColumn)`
  width: 100%;
  margin: 20px;
  > input {
    width: auto;
    height: 2.6em;
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    margin-top: 0.8em;
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
  font-size: 1em;
`;

export const SocialLoginBtn = styled.button`
  width: 90%;
  border-radius: 0.9em;
  background: ${(props) => (props.site === "naver" ? `#4EBE44` : `#F8CD40`)};
  color: black;
  padding: 1em;
  font-size: 0.8em;
  border: none;
`;

// SignupInputBox : 회원가입 아이디, 닉네임, 비밀번호 입력 input
export const SignupInputBox = styled(FlexCenter)`
  height: 4em;
  border: none;
  border-bottom: 1px solid black;
  outline: none;

  > input {
    width: 100%;
    border: none;
    outline: none;
    height: 2.6em;
  }

  > button {
    width: 100px;
    height: 2.6em;
    font-size: 0.8em;
    background: black;
    color: white;
    border-radius: 5px;
  }
`;

// SigupInputWrap : 회원가입 input wrapper
export const SignupInputWrap = styled(FlexColumn)`
  align-content: space-between;
  width: inherit;
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
  width: 100%;
  height: 3em;
  margin-bottom: 1em;

  /* border: 1px solid ${bookSelectInputborderColor}; */
  border-radius: 0.6em;
`;

// Cashbook input, select box 앞머리
export const CashBookHead = styled(FlexCenter)`
  width: 25%;
  border-radius: 0.8em 0 0 0.8em;
  background-color: ${bookSelectInputHeadColor};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8em;
  border-left: 2px solid ${bookSelectInputborderColor};
  border-top: 2px solid ${bookSelectInputborderColor};
  border-bottom:2px solid ${bookSelectInputborderColor};
`;

// Cashbook Select box
export const CashBookSelect = styled.select`
  padding: 10px;
  width: 75%;
  border-radius: 0px 0.8em 0.8em 0px;
  font-size: 0.8em;
  border-top: 2px solid ${bookSelectInputborderColor};
  border-right: 2px solid ${bookSelectInputborderColor};
  border-bottom: 2px solid ${bookSelectInputborderColor};
  font-size: 0.8em;
  &:focus {
    outline: none;
  }
`;

// Cashbook Select Input
export const CashBookInput = styled.input`
  padding: 10px;
  width: 75%;
  border-radius: 0px 0.8em 0.8em 0px;
  border-top: 2px solid ${bookSelectInputborderColor};
  border-right: 2px solid ${bookSelectInputborderColor};
  border-bottom: 2px solid ${bookSelectInputborderColor};
  outline: none;
  font-size: 0.8em;
`;

// Cashbook Button
export const CashBookBtn = styled.button`
  width: 100%;
  height: 2.5em;
  margin-top: ${(props)=>props.marginTop};
  border-radius: 15px;
  background-color: ${bookAddExpendBtnColor};
  color: white;
`;

// Cashbook Detail Box
export const CashBookDetailBox = styled(layout.FlexCenter)`
  width: inherit;
  height: 4em;
  background-color: white;
  border: 2px solid ${bookDetailBorderColor};
  border-radius: 0.5em;
`;

// Cashbook Detail Add Box
export const CashBookDetailAddBox = styled(layout.FlexCenter)`
  width: 100%;
  height: 4em;
  background-color: ${bookDetailAddBoxColor};
  border: 2px dashed ${bookDetailAddBoxBorderColor};
  border-radius: 0.5em;
  margin-top: 0.4em;
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

// 회원가입의 제목 헤더를 감싸는 div입니다.
export const JoinHeader = styled.div`
    font-size: 1.5em;
    margin: 1em 0 2em 0;
`

// 조건 텍스트입니다.
export const ConditionText = styled.div`
  font-size: 0.5em;
  color: gray;
  border: none;
  text-align: left;
  margin: 0.8em 0;
`


// 조건에 따라 텍스트 컬러를 다르게 줄 수 있는 조건 텍스트입니다.
export const ConditionColorText = styled(ConditionText)`
  color: ${props => props.color}
`