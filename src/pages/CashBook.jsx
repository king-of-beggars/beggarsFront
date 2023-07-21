import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { CashBookAPI } from "api/api";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useGlobalVariables } from "providers"
import { layout, style } from "styles";
import {
  DayPicker,
  Nav,
  CardBox,
  WriteReceipt,
  CashDetailModal,
} from "components";
import "styles/css/customSwiper.css";
import {
  mainBackgroundMiddle,
  mainBackgroundTail,
  mainBackgroundTop,
} from "assets";
import { getDateBoxSize } from "functions/getAssetSize";
import { commentDataNone, commentDeleteCard, commentGray } from "constants/comment";
import { useEffect } from "react";
// import { commentGray } from "constants/styleVariables";

function CashBook() {
  // function CashBook({ isMobile, headerHeight, navHeight, mainHeight }) {
  const {
    windowSize,
    frameSize,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
    cashbookDateBox,
    boardBtnSleep,
    cashbookCard,
    widthRatio
  } = useGlobalVariables();
  console.log(
    "CashBook rendered:",
    windowSize,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight
  );
  const navigate = useNavigate();
  // // 화면 크기에 따라 header와 nav의 크기를 설정한 후, 나머지 부분을 main으로 잡아 렌더링하는 로직
  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // })

  // const handleResize = () => {
  //   setWindowSize({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   })
  // }

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])
  // const screenWidth = isMobile
  //   ? parseFloat(localStorage.getItem("screenWidth"))
  //   : parseFloat(localStorage.getItem("screenWidth")) > 393
  //   ? 393
  //   : parseFloat(localStorage.getItem("screenWidth"));

  // datepicker 박스 크기 결정
  // const dateBoxWidth =
  //   isMobile || screenWidth < 500
  //     ? ((screenWidth * 155) / 393) * 0.65
  //     : ((500 * 155) / 393) * 0.65;
  // const dateBoxHeight = dateBoxWidth * (36 / 155);
  const { dateBoxWidth, dateBoxHeight } = getDateBoxSize(
    isMobile,
    frameSize,
    screenWidth,
    cashbookDateBox,
    boardBtnSleep
  );
  const CARD_RATIO = 0.9;

  // card 크기 결정
  const cardWidth = cashbookCard.width * CARD_RATIO;
  const cardHeight = cashbookCard.height * CARD_RATIO;

  // slidesPerView에 들어갈 카드 수
  let slidesPerViewValue =
    Math.round((mainHeight / cardHeight) * 10) / 10 - 0.4;

  // activeSlide 상태 관리
  const [activeSlide, setActiveSlide] = useState(0);
  // swiper 저장
  const [swiper, setSwiper] = useState(null);

  // 가계부 date
  const param = useParams();
  const [selectDate, setSelectDate] = useState(moment(param.date));
  const [focused, setFocused] = useState(false);
  const isDiffDate = moment().diff(moment(selectDate),'days') >= 2;

  useEffect(()=>{
    navigate(`/cash-book/${selectDate.format('YYYY-MM-DD')}`)
  }, [selectDate])
  
  // 게시글 작성 Modal
  const [isWriteModal, setIsWriteModal] = useState(false);
  const [isBoasting, setIsBoasting] = useState(null);
  const [clickedModal, setClickModal] = useState(0);

  const changeWriteModal = (event) => {
    event.stopPropagation();
    setClickModal(event.target.id);
    event.target.innerText === "자랑하러 가기"
      ? setIsBoasting(true)
      : setIsBoasting(false);
    const newIsWrite = !isWriteModal;
    setIsWriteModal(newIsWrite);
  };
  const setWriteClose = () => {
    setIsWriteModal(false);
  };

  // 카드 삭제 Modal
  const [isDeleteModal, setDeleteModal] = useState(false);
  // const [clickedDeleteModal, setClickModal] = useState(0);

  const changeDeleteModal = (event) => {
    event.stopPropagation();
    setClickModal(event.target.id);

    const newIsDelete = !isDeleteModal;
    setDeleteModal(newIsDelete);
  };
  const setDeleteClose = () => {
    setDeleteModal(false);
  };
  // 카드 삭제 API
  const mutationDeleteCard = useMutation(CashBookAPI.deleteCard, {
    onSuccess: () => {
      alert(`장부 삭제가 완료되셨습니다.`);
      window.location.href = "/cash-book";
    },
    onError: () => alert("장부 삭제를 실패했습니다."),
  });

  const onClickDeleteBtn = () => {
    if (!!clickedModal) {
      mutationDeleteCard.mutate(clickedModal);
    } else {
      alert("장부 삭제를 실패했습니다.");
    }
  }

  // 가계부 데이터 없을 때 Modal
  const [isDataNoneModal, setIsDataNoneModal] = useState(false);
  const changeDataNoneModal = (event) => {
    event.stopPropagation();
    setClickModal(event.target.id);

    const newIsDataNoneModal = !isDataNoneModal;
    setIsDataNoneModal(newIsDataNoneModal);
  };
  const setDataNoneClose = () => {
    setIsDataNoneModal(false);
  };
  const onClickDataNone = () => {
    navigate(`/cash-book/${selectDate.format('YYYY-MM-DD')}/${clickedModal}`);
    // setIsDataNoneModal(false);
  };

  // 가계부 data
  const queryNode = {
    queryKey: [`cashCard${selectDate.format("YYYY-MM-DD")}`],
    queryFn: () => CashBookAPI.getCashCard(selectDate.format("YYYY-MM-DD")),
  };

  const { data, isLoading, error } = useQuery(queryNode);
  if (isLoading || error) {
    return <></>;
  }
  const cashbookApiRes = data.data.data;
  console.log(cashbookApiRes);
  const grayMent = commentGray(cashbookApiRes.length >= 5);

  // 카드 상세 박스로 이동
  const onClickCard = (id) => {
    navigate(`/cash-book/${selectDate.format('YYYY-MM-DD')}/${id}`);
  };

  // 카드 추가 박스로 이동
  const onClickAdd = () => {
    navigate("/cash-book/add");
  };

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${mainBackgroundTop})`}
      backPngMiddle={`url(${mainBackgroundMiddle})`}
      backPngTail={`url(${mainBackgroundTail})`}
    >
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div
          className="statusBarHeight"
          style={{ width: "inherit", height: "50px" }}
        ></div>
        <layout.HeaderContent
          ratio={widthRatio}  
        >
          <style.CashBookHeader>가계부</style.CashBookHeader>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.CashBookMainContent className="thisCash">
          <style.DayPickerWrap
            dateBoxWidth={`${dateBoxWidth}px`}
            dateBoxHeight={`${dateBoxHeight}px`}
          >
            <DayPicker
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              focused={focused}
              setFocused={setFocused}
            />
          </style.DayPickerWrap>
          {!cashbookApiRes.length ? (
            <layout.FlexCenter>
              <style.CashBookDummyContainer
                cardWidth={`${cardWidth}px`}
                cardHeight={`${cardHeight}px`}
                style={{ justifyContent: "center" }}
                onClick={onClickAdd}
              >
                클릭하여 카드 추가
              </style.CashBookDummyContainer>
            </layout.FlexCenter>
          ) : (
            <layout.SwiperWrap
              cardHeight={`${cardHeight}px`}
              mainHeight={`${mainHeight}px`}
              dateBoxHeight={`${dateBoxHeight}px`}
            >
              <Swiper
                modules={[Navigation, Scrollbar, Pagination, A11y]}
                slidesPerView={slidesPerViewValue}
                onSlideChange={(swiper) => {
                  console.log("slide change");
                  console.log("activeIndex:::", swiper.activeIndex);
                  setActiveSlide(swiper.activeIndex);
                }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => {
                  setSwiper(swiper);
                  console.log(swiper);
                }}
                direction="vertical"
                style={{ height: `${mainHeight - dateBoxHeight - 24}px` }}
                // loop={true} -> loop 속성 줄시 active가 제대로 동작하지 않음
                pagination={{
                  clickable: "true",
                }}
              >
                {cashbookApiRes.map((card, idx) => {
                  return (
                    <>
                      <SwiperSlide
                        key={idx}
                        style={{
                          height: `${cardHeight + 20}px`,
                          width: `100%`,
                          marginLeft: "4%",
                        }}
                      >
                        {" "}
                        {/* height를 CashBookCard와 동일하게 주어야 함*/}
                        {console.log("isActiveSlide:::", idx === activeSlide)}
                        <Swiper
                          key={activeSlide}
                          modules={[Navigation, Pagination, Scrollbar, A11y]}
                          slidesPerView={1.3}
                          centeredSlides={true}
                          direction="horizontal"
                          touchMoveStopPropagation={false}
                          allowSlideNext={idx === activeSlide}
                          allowSlidePrev={idx === activeSlide}
                          allowTouchMove={idx === activeSlide}
                          style={{
                            height: `${mainHeight - dateBoxHeight - 24}px`,
                          }}
                          onTouchMove={(swiper) => {
                            if (swiper.touches.diff < -90) {
                              if (cashbookApiRes.length < 5) {
                                window.location.href = "/cash-book/add";
                              } else {
                                window.location.href = "/cash-book";
                              }
                            }
                          }}
                        >
                          <SwiperSlide>
                            <CardBox
                              id={card.cashbookId}
                              budget={card.cashbookGoalValue}
                              spend={card.cashbookNowValue}
                              category={card.cashbookCategory}
                              title={card.cashbookName}
                              screenWidth={screenWidth}
                              ratio={CARD_RATIO}
                              onClickHandler={onClickCard}
                              changeWriteModal={changeWriteModal}
                              changeDeleteModal={changeDeleteModal}
                              changeDataNoneModal={changeDataNoneModal}
                              writeCheck={card.writeCheck}
                              isDiffDate={isDiffDate}
                              isDefault={true}
                            />
                            {/* <CashBookCard
                                id={card.id}
                                budget={card.cashbookGoalValue}
                                spend={card.cashbookNowValue}
                                category={card.cashbookCategory}
                                title={card.cashbookName}
                                cardWidth={`${cardWidth}px`}
                                cardHeight={`${cardHeight}px`}
                                index={idx}
                              /> */}
                          </SwiperSlide>
                          <SwiperSlide>
                            {idx === activeSlide ? (
                              <style.CashBookDummyContainer
                                cardWidth={`${cardWidth}px`}
                                cardHeight={`${cardHeight}px`}
                              >
                                <style.CashBookAddExplain
                                  cardWidth={`${cardWidth}px`}
                                  cardHeight={`${cardHeight}px`}
                                >
                                  {grayMent}
                                </style.CashBookAddExplain>
                              </style.CashBookDummyContainer>
                            ) : (
                              <div
                                style={{
                                  width: `${cardWidth}px`,
                                  height: `${cardHeight}px`,
                                  background: "transparent",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              ></div>
                            )}
                          </SwiperSlide>
                        </Swiper>
                      </SwiperSlide>
                    </>
                  );
                })}
              </Swiper>
            </layout.SwiperWrap>
          )}
          {isWriteModal && (
            <WriteReceipt setClose={setWriteClose} cardId={clickedModal}>
              {isBoasting ? "자랑하러 가기" : "혼쭐나러 가기"}
            </WriteReceipt>
          )}
          {isDeleteModal && (
            <CashDetailModal
              setClose={setDeleteClose}
              onClickHandler={onClickDeleteBtn}
            >
              {commentDeleteCard}
            </CashDetailModal>
          )}
          {isDataNoneModal && (
            <CashDetailModal
              setClose={setDataNoneClose}
              onClickHandler={onClickDataNone}
            >
              {commentDataNone}
            </CashDetailModal>
          )}
        </layout.CashBookMainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default CashBook;
