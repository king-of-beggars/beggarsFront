import styled from "styled-components";
import {
  btn,
  pressedBtn,
  cashbookDateBox,
  cardBgYellow,
  mainLineLogo,
  mainLogo,
  cardBgGray,
  cardBtnYellow,
  cardBgBlack,
  cardBtnBoardYellow,
  cardBtnBoardBlack,
  boardBtnActivate,
  boardBtnLeft,
  boardBtnRight,
  boardBtnBar,
  cashbookNone,
} from "assets";
import { SwiperSlide } from "swiper/react";
import { layout } from "styles";
import * as sVar from "constants/styleVariables.js";

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

export const LoginLogoWrap = styled(layout.FlexCenterColumn)`
  min-width: 10em;
  min-height: 10em;
  background-image: url(${mainLineLogo});
  object-fit: cover;
  margin-bottom: 0.5em;
  /* border: 1px solid black; */
`;

// LoginInputBox : 로그인 input 세트 (아이디, 비밀번호)
export const LoginInputBox = styled(layout.FlexColumn)`
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
// 작은 라운드 버튼 스타일링
export const SmallBtn = styled.button`
  width: 5em;
  height: 2.5em;
  border-radius: 1.5em;
  background-color: ${(props) => props.backcolor};
  color: ${(props) => props.color};
  font-size: 1em;
  border: ${(props) => props.border};
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
export const SignupInputBox = styled(layout.FlexCenter)`
  height: 4em;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  align-items: flex-end;

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
export const SignupInputWrap = styled(layout.FlexColumn)`
  align-content: space-between;
  width: inherit;
  margin-bottom: 60px;
`;

// ProfilePicWrap : 프로필 사진
export const ProfilePicWrap = styled(layout.FlexCenterColumn)`
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
export const NavWrap = styled(layout.FlexCenterEven100)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  background: white;
  height: 100%;
`;

export const CashBookHeader = styled(layout.FlexCenter)`
  height: inherit;
  font-size: 1em;
`;

export const DayPickerWrap = styled(layout.FlexCenter)`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${cashbookDateBox});
  width: ${(props) => props.dateBoxWidth};
  height: ${(props) => props.dateBoxHeight};
  margin: 0.5em 1em 1em 1em;
`;

// 반응형으로 새로 생성된 CardBox의 컨테이너 스타일링입니다.
export const CardBoxContainer = styled.div`
  background-image: ${(props) =>
    props.isDefault ? `url(${cardBgYellow})` : `url(${cardBgBlack})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: ${(props) => props.cardWidth};
  height: ${(props) => props.cardHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: calc(${(props) => props.ratio}* 1em);
  padding-bottom: calc(${(props) => props.ratio} * 1em);
  padding-left: calc(${(props) => props.ratio} * 0.8em);
  padding-right: calc(${(props) => props.ratio} * 0.8em);
`;

// 반응형으로 새로 생성된 Card의 카테고리 컨테이너입니다.
export const CardCategoryContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: calc(${(props) => props.ratio} * 1em);
`;

// Card 대분류명으로 들어가는 스타일링입니다.
export const Card1stCategoryText = styled.div`
  font-size: calc(${(props) => props.ratio} * 0.9em);
  padding-top: calc(${(props) => props.ratio} * 0.3em);
  padding-bottom: calc(${(props) => props.ratio} * 0.3em);
  padding-left: calc(${(props) => props.ratio} * 0.6em);
  padding-right: calc(${(props) => props.ratio} * 0.6em);
  background-color: ${(props) =>
    props.isDefault ? `${sVar.middleYellow}` : `${sVar.white70}`};
  color: ${(props) =>
    props.isDefault ? `${sVar.lightYellow}` : `${sVar.nightyBlue}`};
  font-family: "DOSGothic";
  border-radius: calc(${(props) => props.ratio} * 0.6em);
  margin-bottom: calc(${(props) => props.ratio} * 0.5em);
`;

// Card 소분류명으로 들어가는 스타일링입니다.
export const Card2ndCategoryText = styled.div`
  font-size: calc(${(props) => props.ratio} * 1.2em);
  color: ${(props) => (props.isDefault ? `${sVar.middleYellow}` : "white")};
  margin-bottom: calc(${(props) => props.ratio} * 0.5em);
`;

// Card에서 중간 border를 넣기 위한 div 스타일링입니다.
export const CardDivision = styled.div`
  width: 100%;
  border-bottom: 0.4px solid
    ${(props) =>
      props.isDefault ? `${sVar.middleYellow}` : `${sVar.lightGray}`};
  margin-bottom: calc(${(props) => props.ratio} * 1em);
`;

// 매일의 예산이 출력되는 div의 스타일링입니다.
export const CardBudgetText = styled.div`
  font-size: calc(${(props) => props.ratio} * 1em);
  font-family: "DOSGothic";
  color: ${(props) => (props.isDefault ? `${sVar.middleYellow}` : "white")};
`;

// Card 내 프로그레스 바 컨테이너의 스타일링입니다.
export const CardProgressBarContainer = styled.div`
  width: calc(${(props) => props.ratio} * 9em);
  height: calc(${(props) => props.ratio} * 3em);
  margin: calc(${(props) => props.ratio} * 0.8em);
`;

// Card 내 예산 사용량 스타일링입니다.
export const CardSpendText = styled.div`
  color: ${(props) => (props.isDefault ? `${sVar.middleYellow}` : "white")};
  margin-top: calc(${(props) => props.ratio} * 1em);
  font-size: calc(${(props) => props.ratio} * 1em);
`;

// Card 내 버튼 스타일링입니다.
export const CardBtn = styled.button`
  background-image: ${(props) =>
    props.isDefault
      ? `url(${cardBtnBoardYellow})`
      : `url(${cardBtnBoardBlack})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: ${(props) =>
    props.isDefault ? `${sVar.lightYellow}` : `${sVar.darkGray}`};
  width: ${(props) => props.btnWidth};
  height: ${(props) => props.btnHeight};
  color: ${(props) => (props.isDefault ? `${sVar.lightYellow}` : "white")};
  border: none;
  outline: none;
  margin-top: calc(${(props) => props.ratio} * 1em);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(${(props) => props.ratio} * 1em);

  &:focus {
    outline: none;
  }
`;

// cashBookCard의 Card 부분 스타일링입니다.
export const CashBookCardContainer = styled.div`
  background-image: url(${cardBgYellow});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: ${(props) => props.cardWidth};
  height: ${(props) => props.cardHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em 0.8em;
`;
// 회색 dummyCard의 스타일링입니다.
export const CashBookDummyContainer = styled.div`
  background-image: url(${cardBgGray});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: ${(props) => props.cardWidth};
  height: ${(props) => props.cardHeight};
  display: flex;
  align-items: center;
`;
// dummyCard 안의 안내 문구 스타일링입니다.
export const CashBookAddExplain = styled(layout.FlexCenter)`
  position: relative;
  left: calc(${(props) => props.cardWidth} * 0.08);
  width: calc(${(props) => props.cardWidth} * 0.2);
  height: calc(${(props) => props.cardWidth} * 0.8);
  writing-mode: vertical-lr;
  text-align: center;
  line-height: 150%;
`;

export const CustomedSwiperSlide = styled(SwiperSlide)`
  height: ${(props) => props.height}px;
  width: 100%;
`;

// Cashbook 카드 추가 & 지출 추가 화면 input, select box 공통 프레임
export const CashBookCardWrap = styled(layout.FlexCenterRow)`
  width: 100%;
  height: 3em;
  margin-bottom: 1em;

  /* border: 1px solid ${sVar.bookSelectInputborderColor}; */
  border-radius: 0.6em;
`;

// Cashbook input, select box 앞머리
export const CashBookHead = styled(layout.FlexCenter)`
  width: 25%;
  border-radius: 0.8em 0 0 0.8em;
  background-color: ${sVar.bookSelectInputHeadColor};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8em;
  border-left: 2px solid ${sVar.bookSelectInputborderColor};
  border-top: 2px solid ${sVar.bookSelectInputborderColor};
  border-bottom: 2px solid ${sVar.bookSelectInputborderColor};
`;

// Cashbook Select box
export const CashBookSelect = styled.select`
  padding: 10px;
  width: 75%;
  border-radius: 0px 0.8em 0.8em 0px;
  font-size: 0.8em;
  border-top: 2px solid ${sVar.bookSelectInputborderColor};
  border-right: 2px solid ${sVar.bookSelectInputborderColor};
  border-bottom: 2px solid ${sVar.bookSelectInputborderColor};
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
  border-top: 2px solid ${sVar.bookSelectInputborderColor};
  border-right: 2px solid ${sVar.bookSelectInputborderColor};
  border-bottom: 2px solid ${sVar.bookSelectInputborderColor};
  outline: none;
  font-size: 0.8em;
`;

// Cashbook Button
export const CashBookBtn = styled.button`
  width: 100%;
  height: 2.5em;
  margin-top: ${(props) => props.marginTop};
  border-radius: 15px;
  background-color: ${sVar.bookAddExpendBtnColor};
  color: white;
`;

// Cashbook Detail Box
export const CashBookDetailBox = styled(layout.FlexCenter)`
  width: inherit;
  height: 4em;
  background-color: white;
  border: 2px solid ${sVar.bookDetailBorderColor};
  border-radius: 0.5em;
`;

// Cashbook Detail Add Box
export const CashBookDetailAddBox = styled(layout.FlexCenter)`
  width: 100%;
  height: 4em;
  background-color: ${sVar.bookDetailAddBoxColor};
  border: 2px dashed ${sVar.bookDetailAddBoxBorderColor};
  border-radius: 0.5em;
  margin-top: 0.4em;
`;

// Cashbook Detail 무지출 버튼
export const CashBookDetailNoneBtn = styled(layout.FlexCenter)`
  margin-top: 3px;
  width: 100%;
  height: 3em;
  background-image: url(${cashbookNone});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  visibility: ${props=>props.visible};
`;

// Cashbook 모달 Button
export const CashBookNoneBtn = styled.button`
  width: 40%;
  height: 2.5em;
  margin-top: 10px;
  border-radius: 15px;
  background-color: ${props => props.background};
  border-color: ${sVar.bookModalNoBtn};
  color: white;
`;

// Cashbook Detail Add Modal 배경 (어둡게)
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #d9d9d9; /* 수정 필요 */
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
  border: 1px solid ${sVar.bookModalBordorColor};
`;

// 회원가입의 제목 헤더를 감싸는 div입니다.
export const JoinHeader = styled.div`
  font-size: 1.5em;
  margin: 1em 0 2em 0;
`;

// 조건 텍스트입니다.
export const ConditionText = styled.div`
  font-size: 0.5em;
  color: gray;
  border: none;
  text-align: left;
  margin: 0.8em 0;
`;

// 조건에 따라 텍스트 컬러를 다르게 줄 수 있는 조건 텍스트입니다.
export const ConditionColorText = styled(ConditionText)`
  color: ${(props) => props.color};
`;

// 가계부 카드 내 대분류명으로 들어가는 스타일링입니다.
export const FirstCategoryText = styled.div`
  font-size: 0.8em;
  padding: 0.3em 0.6em;
  background-color: ${sVar.middleYellow};
  color: ${sVar.lightYellow};
  border-radius: 0.6em;
  margin: 0.3em 0;
`;
// 가계부 카드 내 소분류명으로 들어가는 스타일링입니다. 소분류명이 없을 때는 대분류가 여기에 들어갑니다.
export const SecondCategoryText = styled.div`
  font-size: 1.2em;
  color: ${sVar.middleYellow};
`;

// 가계부의 소분류명 및 대분류명을 감싸는 컨테이너입니다.
export const CashbookCategoryContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 1em 0;
  border-bottom: 0.4px solid ${sVar.middleYellow};
  margin: 0 0 1em 0;
`;

// 가계부의 자랑하러 가기 또는 혼쭐나러 가기 버튼 스타일링
export const CashbookBtn = styled.button`
  background-image: url(${cardBtnYellow});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: ${sVar.lightYellow};
  width: ${(props) => props.btnWidth};
  height: ${(props) => props.btnHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${sVar.lightYellow};
  border: none;
  margin-top: "1em";
  outline: none;
  &:focus {
    outline: none;
  }
`;

// 백그라운드가 있는 pageLayout 스타일링입니다.
export const BackgroundPageLayout = styled(layout.PageLayout)`
  background-image: ${(props) => props.backPngTop},
    ${(props) => props.backPngTail}, ${(props) => props.backPngMiddle};
  background-repeat: no-repeat, no-repeat, repeat;
  background-position: top, bottom, center;
  background-size: ${(props) => props.screenWidth},
    ${(props) => props.screenWidth}, auto;
`;

// modal의 검은 background 속성입니다.
export const ModalOverlay = styled(layout.FlexCenter)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

// 모달 기본 스타일링입니다.
export const ModalDefault = styled(layout.FlexCenterColumn)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-width: 320px;
  max-width: 400px;
  background: white;
  padding: 50px;
  border-radius: 10px;
  z-index: 21;
`;

// 모달 제목 스타일링입니다.
export const ModalHeader = styled.header`
  font-weight: bold;
  font-size: 1.2em;
`;

// 게시판 댓글 프로필 사진
export const BoardProfilePhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
`;

// 게시판 활성화 버튼 렌더링
export const BoardBtnActivate = styled.button`
  width: 160px;
  height: 38px;
  background-image: url(${boardBtnActivate});
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

// 게시판 비활성화 버튼 렌더링
export const BoardBtnSleep = styled.button`
  width: 154px;
  height: 36px;
  background: transparent;
  /* background-image: ${(props) =>
    props.isBoasting ? `url(${boardBtnRight})` : `url(${boardBtnLeft})`}; */
  /* background-color: ${sVar.darkGray}; */
  border: none;
  &:focus {
    outline: none;
  }
`;

// 게시판 버튼 컨테이너 스타일링
export const BoardBtnContainer = styled.div`
  width: 310px;
  height: 38px;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

export const BoardBtnBar = styled.div`
  width: 307px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${boardBtnBar});
  background-position: center;
  background-size: auto;
  /* z-index: -1; */
  border: none;
`

// 영수증 내부의 컨테이너 스타일링입니다.
export const ReceiptInnerContainer = styled(layout.FlexCenterColumn100)`
  padding: ${props => props.padding};
  font-family: "DOSGothic";
  font-size: ${props => props.fontSize};
  border-bottom: 2px dashed ${sVar.darkGray};
`

// 영수증 내부의 게시글 부분 컨테이너 스타일링입니다.
export const ReceiptPostContainer = styled.div`
  font-size: 0.8em;
`

// 영수증 내부의 게시글 스타일링입니다.
export const ReceiptPost = styled.div`
  padding: 0.8em;
`

// 20px 아이콘 스타일링입니다.
export const Comment20 = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Board의 comment 아이콘 스타일링입니다.
export const BoardCommentIcon = styled(Comment20)`
    background-image: ${props => props.background};
    &:hover {
      background-image: ${props => props.changedBackground};
    }
`