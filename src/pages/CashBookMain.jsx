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

import { useGlobalVariables } from "providers";
import { layout, style } from "styles";
import {
  DayPicker,
  Nav,
  CardBox,
  WriteReceipt,
  CashDetailModal,
  CashBookCard,
} from "components";
import "styles/css/customSwiper.css";
import {
  mainBackgroundMiddle,
  mainBackgroundTail,
  mainBackgroundTop,
} from "assets";
import { getDateBoxSize } from "functions/getAssetSize";
import {
  commentDataNone,
  commentDeleteCard,
  commentGray,
} from "constants/comment";
import { useEffect } from "react";
import * as sVar from "constants/styleVariables";


function CashBookMain() {
  // 작성된 context import
  //// 1. 화면 비율 렌더링에 필요한 요소
  const {
    isMobile,
    widthRatio,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();
  //// 2. 픽셀아트 적용 에셋
  const { cashbookDateBox, cashbookCard } = useGlobalVariables();

  const navigate = useNavigate();
  const dateBoxWidth = cashbookDateBox.width * widthRatio;
  const dateBoxHeight = cashbookDateBox.height * widthRatio;

  const cardHeight = cashbookCard.height * widthRatio;
  const cardWidth = cashbookCard.width * widthRatio;

  const CARD_RATIO = 0.9;

  console.log(mainHeight);
  console.log("widthRatio:::", widthRatio);
  // card 크기 결정
  //   const cardWidth = cashbookCard.width * CARD_RATIO;
  //   const cardHeight = cashbookCard.height * CARD_RATIO;

  // slidesPerView에 들어갈 카드 수
  let slidesPerViewValue = Math.round((mainHeight / cardHeight) * 10) / 10;
  // Math.round((mainHeight / cardHeight) * 10) / 10

  console.log("slidesPerViewValue:::", slidesPerViewValue);

  // activeSlide 상태 관리
  const [activeSlide, setActiveSlide] = useState(0);
  // swiper 저장
  const [swiper, setSwiper] = useState(null);
  // horizontal swipe 동작 여부
  const [horizontalSwipe, setHorizontalSwipe] = useState(false);

  // 가계부 date
  const param = useParams();
  const [selectDate, setSelectDate] = useState(moment(param.date));
  const [focused, setFocused] = useState(false);
  const isDiffDate = moment().diff(moment(selectDate), "days") >= 2;

  useEffect(() => {
    navigate(`/cash-book/${selectDate.format("YYYY-MM-DD")}`);
  }, [selectDate]);

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 게시글 작성 Modal
  const [isWriteModal, setIsWriteModal] = useState(false);
  const [isBoasting, setIsBoasting] = useState(null);
  const [clickedModal, setClickModal] = useState(null);

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
    onError: (err) => {
      console.log("장부 삭제 실패:::", err)
      alert("장부 삭제를 실패했습니다.")
    },
  });

  const onClickDeleteBtn = () => {
    if (!!clickedModal) {
      mutationDeleteCard.mutate(clickedModal);
    } else {
      alert("장부 삭제를 실패했습니다.");
    }
  };

  // 가계부 데이터 없을 때 Modal
  const [isDataNoneModal, setIsDataNoneModal] = useState(false);
  const changeDataNoneModal = (event) => {
    event.stopPropagation();
    setClickModal(event.target.id);
    console.log("clickedModal:::", clickedModal);
    setIsDataNoneModal(true)
    // const newIsDataNoneModal = !isDataNoneModal;
    // setIsDataNoneModal(newIsDataNoneModal);
  };
  const setDataNoneClose = () => {
    setIsDataNoneModal(false);
  };
  const onClickDataNone = () => {
    navigate(`/cash-book/${selectDate.format("YYYY-MM-DD")}/${clickedModal}`);
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
    navigate(`/cash-book/${selectDate.format("YYYY-MM-DD")}/${id}`);
  };

  // 카드 추가 박스로 이동
  const onClickAdd = () => {
    navigate("/cash-book/add");
  };

  const swiperRenderer = (
    mainHeight,
    cardHeight,
    setHorizontalSwipe,
    setActiveSlide,
    setSwiper,
    dataLength
  ) => {
    let slidePerView = Math.ceil((mainHeight / cardHeight) * 10) / 10;
    console.log(slidePerView);
    if (slidePerView > 1.5) {
      slidePerView =
        Math.ceil(((mainHeight - (10 * dataLength - 1)) / cardHeight) * 10) /
        10;
      return (
        <layout.SwiperWrap
          className="swiperWrap"
          cardHeight={`${cardHeight}px`}
          mainHeight={`${mainHeight}px`}
          // dateBoxHeight={`${dateBoxHeight}px`}
        >
          <Swiper
            // spaceBetween={30}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            style={{ width: `100%` }}
            resistance={true}
            resistanceRatio={1}
            onSliderMove={(swiper) => {
              setHorizontalSwipe(true);
            }}
            onTouchEnd={(swiper) => {
              setHorizontalSwipe(false);
            }}
            onTouchMove={(swiper) => {
              if (swiper.touches.diff < -160) {
                if (cashbookApiRes.length < 5) {
                  console.log("여기로 들어옴!")
                  window.location.href = "/cash-book/add";
                } else {
                  console.log("여기 들어옴!")
                  window.location.href = "/cash-book";
                }
              }
            }}
          >
            <SwiperSlide
              className="swiperSlide1"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
              }}
            >
              <Swiper
                className="mainSwiper"
                spaceBetween={20}
                modules={[Navigation, Scrollbar, Pagination, A11y]}
                slidesPerView={slidePerView}
                onSwiper={(swiper) => {
                  setSwiper(swiper);
                  console.log(swiper);
                }}
                direction="vertical"
                // pagination={{
                //   clickable: "true",
                // }}
                style={{
                  width: `${cardWidth}px`,
                  height: `${mainHeight}px`,
                }}
              >
                {cashbookApiRes.map((card, idx) => {
                  console.log("this cardHeight:::", cardHeight);
                  return (
                    <SwiperSlide
                      className={`slide_${idx}`}
                      key={idx}
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                      }}
                    >
                      <CashBookCard
                        horizontalSwipe={horizontalSwipe}
                        key={idx}
                        id={card.cashbookId}
                        budget={card.cashbookGoalValue}
                        spend={card.cashbookNowValue}
                        category={card.cashbookCategory}
                        title={card.cashbookName}
                        ratio={widthRatio}
                        onClickHandler={onClickCard}
                        changeWriteModal={changeWriteModal}
                        changeDeleteModal={changeDeleteModal}
                        changeDataNoneModal={changeDataNoneModal}
                        writeCheck={card.writeCheck}
                        isDiffDate={isDiffDate}
                        isDefault={true}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </SwiperSlide>
            <SwiperSlide>
              {dataLength < 5 ? (
                <div
                  style={{
                    height: `${mainHeight}px`,
                    width: `100%`,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    writingMode: "vertical-rl",
                    paddingLeft: "20px",
                    fontSize: `${25 * widthRatio}px`,
                  }}
                >
                  왼쪽으로 당겨 장부를 추가하게
                  <span style={{ writingMode: "horizontal-tb" }}>!</span>
                </div>
              ) : (
                <div
                  style={{
                    height: `${mainHeight}px`,
                    width: `${cardWidth}px`,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    writingMode: "vertical-rl",
                    paddingLeft: "20px",
                    fontSize: `${25 * widthRatio}px`,
                    color: `${sVar.darkGray}`,
                  }}
                >
                  이미 다섯개의 장부를 추가하였네
                  <span style={{ writingMode: "horizontal-tb" }}>!</span>
                </div>
              )}
            </SwiperSlide>
          </Swiper>
        </layout.SwiperWrap>
      );
    } else {
      return (
        <layout.SwiperWrap
          className="swiperWrap"
          cardHeight={`${cardHeight}px`}
          mainHeight={`${mainHeight}px`}
          // dateBoxHeight={`${dateBoxHeight}px`}
        >
          <Swiper
            className="swiperClassNo1"
            spaceBetween={20}
            modules={[Navigation, Scrollbar, Pagination, A11y]}
            slidesPerView={slidesPerViewValue}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex);
            }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => {
              setSwiper(swiper);
              console.log(swiper);
            }}
            direction="vertical"
            // style={{ height: `${mainHeight - 24}px` }}
            // loop={true} -> loop 속성 줄시 active가 제대로 동작하지 않음
            pagination={{
              clickable: "true",
            }}
          >
            {cashbookApiRes.map((card, idx) => {
              return (
                <>
                  <SwiperSlide
                    className={`slide_${idx}`}
                    key={idx}
                    style={{
                      height: `${cardHeight}px`,
                    }}
                    // style={{
                    //   height: `${cardHeight * widthRatio}px`,
                    //   width: `100%`,
                    //   marginLeft: "4%",
                    // }}
                  >
                    {" "}
                    {/* height를 CashBookCard와 동일하게 주어야 함*/}
                    {console.log("isActiveSlide:::", idx === activeSlide)}
                    <Swiper
                      key={activeSlide}
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      slidesPerView={1.3}
                      centeredSlides={true}
                      spaceBetween={10 * widthRatio}
                      direction="horizontal"
                      touchMoveStopPropagation={false}
                      allowSlideNext={idx === activeSlide}
                      allowSlidePrev={idx === activeSlide}
                      allowTouchMove={idx === activeSlide}
                      style={{
                        height: `${cardHeight}px`,
                      }}
                      resistance
                      resistanceRatio={1}
                      // style={{
                      //   height: `${mainHeight - dateBoxHeight - 24}px`,
                      // }}
                      onTouchMove={(swiper) => {
                        if (swiper.touches.diff < -90) {
                          if (cashbookApiRes.length < 5) {
                            console.log("111111")
                            window.location.href = "/cash-book/add";
                          } else {
                            console.log("222222")
                            window.location.href = "/cash-book";
                          }
                        }
                      }}


                    >
                      <SwiperSlide className={`${idx}`}>
                        <CashBookCard
                          id={card.cashbookId}
                          budget={card.cashbookGoalValue}
                          spend={card.cashbookNowValue}
                          category={card.cashbookCategory}
                          title={card.cashbookName}
                          ratio={widthRatio}
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
                      <SwiperSlide className="horizontalSlide">
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
      );
    }
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
        <layout.HeaderContent style={{ flexDirection: "column" }}>
          <layout.FlexCenter100>
            <style.CashBookHeader ratio={widthRatio}>
              가계부
            </style.CashBookHeader>
          </layout.FlexCenter100>
          <layout.Flex100 style={{}}>
            <style.DayPickerWrap
              dateBoxWidth={`${dateBoxWidth}px`}
              dateBoxHeight={`${dateBoxHeight}px`}
              ratio={widthRatio}
            >
              <DayPicker
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                focused={focused}
                setFocused={setFocused}
              />
            </style.DayPickerWrap>
          </layout.Flex100>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.CashBookMainContent className="thisCash">
          {!cashbookApiRes.length ? (
            <layout.FlexCenter>
              <style.CashBookDummyContainer
                cardWidth={`${cardWidth}px`}
                cardHeight={`${cardHeight}px`}
                style={{ justifyContent: "flex-start" }}
                onClick={onClickAdd}
              >
                클릭하여 카드 추가
              </style.CashBookDummyContainer>
            </layout.FlexCenter>
          ) : (
            swiperRenderer(
              mainHeight,
              cardHeight,
              setHorizontalSwipe,
              setActiveSlide,
              setSwiper,
              cashbookApiRes.length
            )
          )}
          {isWriteModal && (
            <WriteReceipt setClose={setWriteClose} cardId={clickedModal}>
              {isBoasting
                ?  "자랑하러 가기" : "혼쭐나러 가기"}
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
        <Nav selected="money" ratio={widthRatio} />
      </layout.Nav>
    </style.BackgroundPageLayout>

    // <style.BackgroundPageLayout
    //   screenWidth={`${screenWidth}px`}
    //   isMobile={isMobile}
    //   backPngTop={`url(${mainBackgroundTop})`}
    //   backPngMiddle={`url(${mainBackgroundMiddle})`}
    //   backPngTail={`url(${mainBackgroundTail})`}
    // >
    //   <layout.Header headerHeight={`${headerHeight}px`}>
    //     <div
    //       className="statusBarHeight"
    //       style={{ width: "inherit", height: "50px" }}
    //     ></div>
    //     <layout.HeaderContent style={{flexDirection: "column"}}>
    //       <layout.FlexCenter100>
    //         <style.CashBookHeader ratio={widthRatio}>가계부</style.CashBookHeader>
    //       </layout.FlexCenter100>
    //       <layout.Flex100 style={{}}>
    //         <style.DayPickerWrap
    //           dateBoxWidth={`${dateBoxWidth}px`}
    //           dateBoxHeight={`${dateBoxHeight}px`}
    //           ratio={widthRatio}
    //         >
    //           <DayPicker
    //             selectDate={selectDate}
    //             setSelectDate={setSelectDate}
    //             focused={focused}
    //             setFocused={setFocused}
    //           />
    //         </style.DayPickerWrap>
    //       </layout.Flex100>
    //     </layout.HeaderContent>
    //   </layout.Header>
    //   <layout.Main
    //     headerHeight={`${headerHeight}px`}
    //     mainHeight={`${mainHeight}px`}
    //   >
    //     <layout.CashBookMainContent className="thisCash">

    //       {!cashbookApiRes.length ? (
    //         <layout.FlexCenter>
    //           <style.CashBookDummyContainer
    //             cardWidth={`${cardWidth}px`}
    //             cardHeight={`${cardHeight}px`}
    //             style={{ justifyContent: "center" }}
    //             onClick={onClickAdd}
    //           >
    //             클릭하여 카드 추가
    //           </style.CashBookDummyContainer>
    //         </layout.FlexCenter>
    //       ) : (
    //         <layout.SwiperWrap
    //           className="swiperWrap"
    //           cardHeight={`${cardHeight}px`}
    //           mainHeight={`${mainHeight}px`}
    //           // dateBoxHeight={`${dateBoxHeight}px`}
    //         >
    //           <Swiper
    //             className="swiperClassNo1"
    //             // spaceBetween={20}
    //             modules={[Navigation, Scrollbar, Pagination, A11y]}
    //             slidesPerView={slidesPerViewValue}
    //             onSlideChange={(swiper) => {
    //               console.log("slide change");
    //               console.log("activeIndex:::", swiper.activeIndex);
    //               console.log("slides", swiper.slides)
    //               setActiveSlide(swiper.activeIndex);
    //             }}
    //             // loop={true}
    //             onTouchMove={(swiper) => {
    //               // const currentSlide = swiper.activeIndex
    //               // const slideLength = swiper.slides.length;
    //               // if (currentSlide === 3) {
    //               //   swiper.slideTo(4, 0)
    //               //   setTimeout(() => {
    //               //     console.log("timeout ended!")
    //               //     swiper.update()
    //               //     console.log("new activeIndex:::", swiper.activeIndex)
    //               //   }, 500)
    //               // }

    //               // if (swiper.touches.startY > swiper.touches.currentY) {
    //               //   if (currentSlide + 1 < slideLength) {
    //               //     swiper.slideTo(currentSlide + 1);
    //               //   }

    //               // } else if (swiper.touches.startY < swiper.touches.currentY) {
    //               //   swiper.slidePrev();
    //               // }

    //             }}
    //             // scrollbar={{ draggable: true }}
    //             onSwiper={(swiper) => {
    //               setSwiper(swiper);
    //               console.log(swiper);

    //             }}
    //             direction="vertical"
    //             // style={{ height: `${mainHeight - 24}px` }}
    //             // loop={true} -> loop 속성 줄시 active가 제대로 동작하지 않음
    //             pagination={{
    //               clickable: "true",
    //             }}
    //           >
    //             {cashbookApiRes.map((card, idx) => {
    //               return (
    //                 <>
    //                   <SwiperSlide
    //                     className={`slide_${idx}`}
    //                     key={idx}
    //                     style={{
    //                       height: `${cardHeight}px`
    //                     }}
    //                     // style={{
    //                     //   height: `${cardHeight * widthRatio}px`,
    //                     //   width: `100%`,
    //                     //   marginLeft: "4%",
    //                     // }}
    //                   >
    //                     {" "}
    //                     {/* height를 CashBookCard와 동일하게 주어야 함*/}
    //                     {console.log("isActiveSlide:::", idx === activeSlide)}
    //                     <Swiper
    //                       key={activeSlide}
    //                       modules={[Navigation, Pagination, Scrollbar, A11y]}
    //                       slidesPerView={1.3}
    //                       centeredSlides={true}
    //                       spaceBetween={10 * widthRatio}
    //                       direction="horizontal"
    //                       touchMoveStopPropagation={false}
    //                       allowSlideNext={idx === activeSlide}
    //                       allowSlidePrev={idx === activeSlide}
    //                       allowTouchMove={idx === activeSlide}
    //                       style={{
    //                         height: `${cardHeight}px`
    //                       }}
    //                       // style={{
    //                       //   height: `${mainHeight - dateBoxHeight - 24}px`,
    //                       // }}
    //                       onTouchMove={(swiper) => {
    //                         if (swiper.touches.diff < -90) {
    //                           if (cashbookApiRes.length < 5) {
    //                             window.location.href = "/cash-book/add";
    //                           } else {
    //                             window.location.href = "/cash-book";
    //                           }
    //                         }
    //                       }}
    //                     >
    //                       <SwiperSlide
    //                         className={`${idx}`}
    //                       >
    //                         <CashBookCard
    //                           id={card.cashbookId}
    //                           budget={card.cashbookGoalValue}
    //                           spend={card.cashbookNowValue}
    //                           category={card.cashbookCategory}
    //                           title={card.cashbookName}
    //                           ratio={widthRatio}
    //                           onClickHandler={onClickCard}
    //                           changeWriteModal={changeWriteModal}
    //                           changeDeleteModal={changeDeleteModal}
    //                           changeDataNoneModal={changeDataNoneModal}
    //                           writeCheck={card.writeCheck}
    //                           isDiffDate={isDiffDate}
    //                           isDefault={true}
    //                         />
    //                         {/* <CashBookCard
    //                                 id={card.id}
    //                                 budget={card.cashbookGoalValue}
    //                                 spend={card.cashbookNowValue}
    //                                 category={card.cashbookCategory}
    //                                 title={card.cashbookName}
    //                                 cardWidth={`${cardWidth}px`}
    //                                 cardHeight={`${cardHeight}px`}
    //                                 index={idx}
    //                               /> */}
    //                       </SwiperSlide>
    //                       <SwiperSlide>
    //                         {idx === activeSlide ? (
    //                           <style.CashBookDummyContainer
    //                             cardWidth={`${cardWidth}px`}
    //                             cardHeight={`${cardHeight}px`}
    //                           >
    //                             <style.CashBookAddExplain
    //                               cardWidth={`${cardWidth}px`}
    //                               cardHeight={`${cardHeight}px`}
    //                             >
    //                               {grayMent}
    //                             </style.CashBookAddExplain>
    //                           </style.CashBookDummyContainer>
    //                         ) : (
    //                           <div
    //                             style={{
    //                               width: `${cardWidth}px`,
    //                               height: `${cardHeight}px`,
    //                               background: "transparent",
    //                               display: "flex",
    //                               alignItems: "center",
    //                             }}
    //                           ></div>
    //                         )}
    //                       </SwiperSlide>
    //                     </Swiper>
    //                   </SwiperSlide>
    //                 </>
    //               );
    //             })}
    //           </Swiper>
    //         </layout.SwiperWrap>
    //       )}

    //       {isWriteModal && (
    //         <WriteReceipt setClose={setWriteClose} cardId={clickedModal}>
    //           {isBoasting ? "자랑하러 가기" : "혼쭐나러 가기"}
    //         </WriteReceipt>
    //       )}
    //       {isDeleteModal && (
    //         <CashDetailModal
    //           setClose={setDeleteClose}
    //           onClickHandler={onClickDeleteBtn}
    //         >
    //           {commentDeleteCard}
    //         </CashDetailModal>
    //       )}
    //       {isDataNoneModal && (
    //         <CashDetailModal
    //           setClose={setDataNoneClose}
    //           onClickHandler={onClickDataNone}
    //         >
    //           {commentDataNone}
    //         </CashDetailModal>
    //       )}
    //     </layout.CashBookMainContent>
    //   </layout.Main>
    //   <layout.Nav navHeight={`${navHeight}px`}>
    //     <Nav selected="money" ratio={widthRatio} />
    //   </layout.Nav>
    // </style.BackgroundPageLayout>
  );
}

export default CashBookMain;
