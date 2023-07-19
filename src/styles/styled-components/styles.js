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
  mainExpBox,
  cardBtnPost,
  mainRecordCard,
  mainTagPositive,
  mainTagNegative,
  mainWeatherNormal,
  mainWeatherSunny,
  mainWeatherRainy,
  mainWeatherThunder,
  mainToggleBar,
  mainToggleBtn,
  mainJourneyTitle,
  mainJourneyBox
} from "assets";
import { SwiperSlide } from "swiper/react";
import { layout } from "styles";
import * as sVar from "constants/styleVariables.js";
import { FlexCenter } from 'styles/layouts';

const defaultFontRatio = 0.8

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: calc(${props => props.ratio} * 2.94rem); */
  bottom: 0;
  z-index: 1;
  background: white;
  height: 100%;
  font-size: calc(${props => props.ratio} * 1.125rem);
  padding: calc(${props => props.ratio} * 17px) calc(${props => props.ratio} * 43px) calc(${props => props.ratio} * 25px) calc(${props => props.ratio} * 43px);
  /* padding: calc(${props => props.ratio} * 1.06rem) calc(${props => props.ratio} * 2.69rem) calc(${props => props.ratio} * 1.56rem) calc(${props => props.ratio} * 2.69rem); */
`;

export const NavBtn = styled.button`
  display: flex;
  justify-content: center;
  color: ${(props) => (props.isSelected ? `${sVar.navBlack}` : `${sVar.navGray}`)};
  width: calc(${props => props.ratio} * 47px);
  height: calc(${props => props.ratio} * 47px);
  font-size: calc(${props => props.ratio} * 18px);
  outline: none;
  background: transparent;
  border: none;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
`

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
  width: calc(${props => props.ratio} * ${props => props.width});
  height: calc(${props => props.ratio} * ${props => props.height});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: calc(${(props) => props.ratio}* ${props => props.paddingTop});
  padding-bottom: calc(${(props) => props.ratio} * ${props => props.paddingBottom});
  padding-left: calc(${(props) => props.ratio} * ${props => props.paddingLeft});
  padding-right: calc(${(props) => props.ratio} * ${props => props.paddingRight});
`;

// 반응형으로 새로 생성된 Card의 카테고리 컨테이너입니다.
export const CardCategoryContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: calc(${(props) => props.ratio} * ${(props) => props.paddingBottom});
  padding-top: calc(${(props) => props.ratio} * ${(props) => props.paddingTop});
`;

// Card 대분류명으로 들어가는 스타일링입니다.
export const Card1stCategoryText = styled.div`
  font-size: calc(${(props) => props.ratio} * ${(props) => props.fontSize});
  padding-left: calc(${(props) => props.ratio} * ${props => props.paddingLeft});
  padding-right: calc(${(props) => props.ratio} * ${props => props.paddingRight});
  padding-top: calc(${(props) => props.ratio} * ${props => props.paddingTop});
  padding-bottom: calc(${(props) => props.ratio} * ${props => props.paddingBottom});
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
  font-size: calc(${(props) => props.ratio} * ${(props) => props.fontSize});
  color: ${(props) => (props.isDefault ? `${sVar.middleYellow}` : "white")};
  margin-bottom: calc(${props => props.ratio} * ${props => props.marginBottom});
`;

// Card에서 중간 border를 넣기 위한 div 스타일링입니다.
export const CardDivision = styled.div`
  width: 100%;
  border-bottom: 0.4px solid
    ${(props) =>
      props.isDefault ? `${sVar.middleYellow}` : `${sVar.lightGray}`};
  margin-bottom: calc(${(props) => props.ratio} * ${props => props.marginBottom});
`;

// 매일의 예산이 출력되는 div의 스타일링입니다.
export const CardBudgetText = styled.div`
  font-size: calc(${(props) => props.ratio} * ${props => props.fontSize});
  font-family: "DOSGothic";
  color: ${(props) => (props.isDefault ? `${sVar.middleYellow}` : "white")};
`;

// Card 내 프로그레스 바 컨테이너의 스타일링입니다.
export const CardProgressBarContainer = styled.div`
  width: calc(${(props) => props.ratio} * ${props => props.width});
  height: calc(${(props) => props.ratio} * ${props => props.height});
  /* margin-top: calc(${(props) => props.ratio} * 0.5em);
  margin-bottom: calc(${(props) => props.ratio} * 0.9em); */
  /* margin: calc(${(props) => props.ratio} * 0.8em); */
`;

// Card 내 예산 사용량 스타일링입니다.
export const CardSpendText = styled.div`
  color: ${(props) => (props.isDefault ? `${sVar.middleYellow}` : "white")};
  margin-top: calc(${(props) => props.ratio} * 1.1em);
  font-size: calc(${(props) => props.ratio} * ${(props) => props.fontSize});
`;

// Card 내 버튼 스타일링입니다.
export const CardBtn = styled.button`
  background-image: ${(props) =>
    props.isDefault
      ? props.isWrite ? `url(${cardBtnPost})` : `url(${cardBtnBoardYellow})`
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
  margin-top: calc(${(props) => props.ratio} * 1.5em);
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
  padding: calc(20px * ${(props) => props.ratio}) calc(8px * ${(props) => props.ratio});
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
  text-orientation: upright;
  text-align: center;
  line-height: 150%;
  span{
    writing-mode: horizontal-tb;
  }
`;

export const CustomedSwiperSlide = styled(SwiperSlide)`
  height: ${(props) => props.height}px;
  width: 100%;
`;

// Cashbook 카드 추가 & 지출 추가 & 게시글 작성 화면 input, select box 공통 프레임
export const CashBookCardWrap = styled(layout.FlexCenterRow)`
  width: 100%;
  height: ${props => props.height};
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

// Cashbook modal textarea
export const CashBookTextarea = styled.textarea`
  padding: 10px;
  width: 75%;
  border-radius: 0px 0.8em 0.8em 0px;
  border-top: 2px solid ${sVar.bookSelectInputborderColor};
  border-right: 2px solid ${sVar.bookSelectInputborderColor};
  border-bottom: 2px solid ${sVar.bookSelectInputborderColor};
  outline: none;
  font-size: 0.8em;
  line-height: 140%;
  resize: none;
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
export const CashBookDetailBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 6.5fr 2.5fr;
  width: 100%;
  min-height: 75px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid ${sVar.bookDetailBorderColor};
  border-radius: 0.5em;
  font-family: "DOSGothic";
`;

// Cashbook Detail Textbox
export const CashBookDetailTextBox = styled(layout.FlexDefault)`
  width: 100%;
  padding: 10px;
  margin-left: 10px;
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-all;
`

// Cashbook Detail numbox
export const CashBookDetailNumBox = styled(layout.FlexDefault)`
  margin-right: 20px;
  align-items: center;
  justify-content: flex-end;
`

// Cashbook Detail Add Box
export const CashBookDetailAddBox = styled(layout.FlexCenter)`
  width: 100%;
  height: 4em;
  background-color: ${sVar.bookDetailAddBoxColor};
  border: 2px dashed ${sVar.bookDetailAddBoxBorderColor};
  border-radius: 0.5em;
  margin-top: 0.4em;
  visibility: ${props=>props.visible};
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
  border-radius: calc(54.817px * ${props => props.ratio});
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

// 백그라운드가 있는 pageLayout 스타일링입니다. (변경 이전: 보존해주세요..!)
export const BackgroundPageLayout = styled(layout.PageLayout)`
  background-image: ${(props) => props.backPngTop},
    ${(props) => props.backPngTail}, ${(props) => props.backPngMiddle};
  background-repeat: no-repeat, no-repeat, repeat;
  background-position: top, bottom, center;
  background-size: ${(props) => props.screenWidth},
    ${(props) => props.screenWidth}, auto;
  transition: background 0.4s ease;
`;

// 백그라운드가 있는 pageLayout 스타일링입니다. (변경 이후: 전체 blur 가능하도록 변경됨)
// export const BackgroundPageLayout = styled(layout.PageLayout)`
//   position: relative;
//   overflow: hidden;
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0; right: 0; bottom: 0; left: 0;
//     background-image: ${(props) => props.backPngTop},
//       ${(props) => props.backPngTail}, ${(props) => props.backPngMiddle};
//     background-repeat: no-repeat, no-repeat, repeat;
//     background-position: top, bottom, center;
//     background-size: ${(props) => props.screenWidth},
//       ${(props) => props.screenWidth}, auto;
//     filter: ${(props) => props.blur ? "blur(5px)" : "none"};
//     z-index: -1;
//   }
// `;


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
  max-width: 360px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  z-index: 21;
  gap: 5px;
  span {font-size: 1.2em;}
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
  width: calc(${props => props.ratio} * ${props => props.width});
  height: calc(${props => props.ratio} * ${props => props.height});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${boardBtnActivate});
  background-color: transparent;
  border: none;
  transition: all 0.5s ease;
  &:focus {
    outline: none;
  }
`;

// 게시판 비활성화 버튼 렌더링
export const BoardBtnSleep = styled.button`
  width: calc(${props => props.ratio} * ${props => props.width});
  height: calc(${props => props.ratio} * ${props => props.height});
  background: transparent;
  /* background-image: ${(props) =>
    props.isBoasting ? `url(${boardBtnRight})` : `url(${boardBtnLeft})`}; */
  /* background-color: ${sVar.darkGray}; */
  border: none;
  transition: all 0.5s ease;
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
  width: calc(${props => props.ratio} * ${props => props.width});
  height: calc(${props => props.ratio} * ${props => props.height});
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${boardBtnBar});
  background-position: center;
  background-size: 100% 100%;
  font-size: calc(${props => props.ratio} * 16px);
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
  font-size: 16px;
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
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
      background-image: ${props => props.changedBackground};
    }
`

// Svg 아이콘에 hover 이펙트가 있는 경우 사용하는 스타일링
export const HoverSvgIcon = styled.svg`
  fill: currentColor;
  transition: color 0.3s;
  &:hover {
    color: black;
  }
`

// BoardCommentLikes의 likeCount 표시해주는 div
export const LikeCounts = styled.div`
  font-size: 12px;
  position: absolute;
  bottom: 0;
  color: ${props => props.isGray ? `${sVar.commentGray}` : "black"};
  visibility: ${props => props.visibility};
`

// BoardDetail의 input 컨테이너
export const BoardDetailInputContainer = styled(layout.FlexDefault)`
  width: 90%;
  height: 50px;
  box-shadow: 0 0 0 1px ${sVar.commentGray} inset;
  border-radius: 5px;
  background-color: ${sVar.commentGray50};
`

// BoardDetail의 input - 왼쪽의 실제 input 자리
export const BoardDetailInputLeft = styled.input`
  width: 85%;
  height: inherit;
  border: none;
  outline: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`

// BoardDetail의 input - 왼쪽의 실제 input 자리(비로그인)
export const BoardDetailBtnLeft = styled.button`
  width: 85%;
  height: inherit;
  border: none;
  outline: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`

// BoardDetail의 input - 오른쪽의 icon 자리
export const BoardDetailInputIcon = styled(FlexCenter)`
  width: 15%;
  max-width: 15%;
  height: inherit;
  border: none;
  &:focus {
    outline: none;
  }
`

// Main의 expBox 컨테이너
export const MainExpBox = styled.div`
  background-image: url(${mainExpBox});
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: center;
  padding: calc(${props => props.ratio} * 5px) calc(${props => props.ratio} * 20px);
  background-size: ${props => props.width} ${props => props.height};
  background-repeat: no-repeat;
  font-family: "DOSGothic";
  font-size: calc(${props => props.ratio} * 0.5em);
`

// Main의 RecordCard 컨테이너
export const MainRecordCardBox = styled.div`
  background-image: url(${mainRecordCard});
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: center;
  flex-direction: column;
  background-size: ${props => props.width} ${props => props.height};
  background-repeat: no-repeat;
  padding: 25px 20px;
  position: relative;
`

// Main의 RecordCard 속 태그 부분
export const MainRecordCardTagBox = styled.div`
  background-image: ${props => props.isSaved ? `url(${mainTagPositive})` : `url(${mainTagNegative})`};
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: ${props => props.width} ${props => props.height};
  background-repeat: no-repeat;
  font-size: calc(${props => props.ratio} * 16px);
  font-family: "DOSGothic";
`

// Main의 RecordCard 태그 아래 코멘트
export const MainRecordCardComment = styled.div`
  width: 100%;
  font-size: calc(${props => props.ratio} * 25px);
  word-break: keep-all;
  overflow-wrap: break-word;
`

// Main의 날씨 렌더링 박스
export const MainWeatherBox = styled(FlexCenter)`
  background-image: ${props => props.weatherCode === 2 ? `url(${mainWeatherSunny})`
                                : props.weatherCode === 1 ? `url(${mainWeatherNormal})`
                                : props.weatherCode === 0 ? `url(${mainWeatherRainy})`
                                : `url(${mainWeatherThunder})`};
  background-size: ${props => props.width} ${props => props.height};
  background-repeat: no-repeat;
  width: ${props => props.width};
  height: ${props => props.height};
`

// Main 날짜 렌더링 박스
export const MainRecordDateBox = styled.div`
  font-size: calc(${props => props.ratio} * 16px);
`

// Main 요일 렌더링 박스
export const MainRecordDayBox = styled.div`
  font-size: calc(${props => props.ratio} * 12px);
  font-family: "DOSGothic";
  margin-bottom: 1px;
`

// 디바이더 (선)
export const Divider = styled.div`
  width: 100%;
  border-bottom: ${props=> props.borderSize} solid ${props => props.color};
`

// Main의 RecordCard 하단 토글 컨테이너
export const MainToggleBar = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url(${mainToggleBar});
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-size: 100% 100%; 
  background-repeat: no-repeat;
  /* z-index: -1; */
  border: none;
  position: absolute;
  bottom: calc(25px * ${props => props.ratio});
`

// 게시판 비활성화 버튼 렌더링
export const MainToggleBtnSleep = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  background: transparent;
  /* background-image: ${(props) =>
    props.isBoasting ? `url(${boardBtnRight})` : `url(${boardBtnLeft})`}; */
  /* background-color: ${sVar.darkGray}; */
  border: none;
  font-family: "DOSGothic";
  font-size: calc(${props => props.ratio} * 0.75rem);
  &:focus {
    outline: none;
  }
`;

// 게시판 활성화 버튼 렌더링
export const MainToggleBtnActivate = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url(${mainToggleBtn});
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  /* z-index: 1; */
  font-family: "DOSGothic";
  font-size: calc(${props => props.ratio} * 0.75rem);
  &:focus {
    outline: none;
  }
`;

// Main의 RecordCard 예산 행 컨테이너
export const MainRecordCardTextRow = styled.div`
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    font-size: calc(${props => props.ratio} * 12px);
  }
  .expense {
    font-size: calc(${props => props.ratio} * 20px);
  }
`

// Main의 RecordCard 지출 결과 행 컨테이너
export const MainRecordCardResultRow = styled.div`
  width: 100%;
  font-size: calc(${props => props.ratio} * 25px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`

// Main의 그래프 아래 섹션 컨테이너
export const MainGraphSection = styled.div`
  font-size: calc(${props => props.ratio} * 14px);
`

// Main Journey 제목 컨테이너
export const MainJourneyTitleBox = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${mainJourneyTitle});
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  /* z-index: 1; */
  font-family: "DOSGothic";
  font-size: calc(${props => props.ratio} * 16px);
  &:focus {
    outline: none;
  }
`

// Main Journey streak 컨테이너
export const MainJourneyStreakBox = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url(${mainJourneyBox});
  background-color: transparent;
  background-size: 100% 100%;
  padding: calc(${props => props.ratio} * 1.12rem) calc(${props => props.ratio} * 1.41rem) calc(${props => props.ratio} * 1.4rem) calc(${props => props.ratio} * 1.41rem) ;
  background-repeat: no-repeat;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: calc(${props => props.ratio} * 16px);
  &:focus {
    outline: none;
  }
`

// Main Journey streak의 row box
export const MainJourneyStreakRowBox = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 4fr 5fr;
  grid-column-gap: calc(${props => props.ratio} * 1.06rem);
  grid-row-gap: calc(${props => props.ratio} * 0.19rem);
`

// Main Journey streak의 streak 컨테이너
export const MainJourneyStreak = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: calc(${props => props.ratio} * 0.625rem);
  background-color: #eee;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`