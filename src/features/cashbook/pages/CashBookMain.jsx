import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { CashBookAPI } from 'common/utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { layout, style } from 'styles';

import 'styles/css/customSwiper.css';
import { bgCloud100, bgMountain100, bgSky100 } from 'assets';

import * as sVar from 'common/constants/styleVariables';
import { useAuthContext } from 'features/auth/contexts/AuthProvider';
import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';
import { COMMENT } from 'common/constants';
import CashBookCard from '../components/CashBookCard';
import DayPicker from '../components/DayPicker';
import WriteReceipt from '../components/WriteReceipt';
import CashDetailModal from 'features/board/components/CashDetailModal';

function CashBookMain() {
  // 작성된 context import
  const { isLoggedIn } = useAuthContext();
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

  // slidesPerView에 들어갈 카드 수
  let slidesPerViewValue = Math.round((mainHeight / cardHeight) * 10) / 10;
  // Math.round((mainHeight / cardHeight) * 10) / 10

  // console.log("slidesPerViewValue:::", slidesPerViewValue);

  // activeSlide 상태 관리
  const [activeSlide, setActiveSlide] = useState(0);
  // swiper 저장
  const [, setSwiper] = useState(null);
  // horizontal swipe 동작 여부
  const [horizontalSwipe, setHorizontalSwipe] = useState(false);

  // 가계부 date
  const param = useParams();
  const [selectDate, setSelectDate] = useState(moment(param.date));
  const [focused, setFocused] = useState(false);
  const isDiffDate = moment().diff(moment(selectDate), 'days') >= 2;

  useEffect(() => {
    navigate(`/cash-book/${selectDate.format('YYYY-MM-DD')}`);
  }, [selectDate, navigate]);

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 게시글 작성 Modal
  const [isWriteModal, setIsWriteModal] = useState(false);
  const [isBoasting, setIsBoasting] = useState(null);
  const [clickedModal, setClickModal] = useState(null);

  const changeWriteModal = (event) => {
    event.stopPropagation();
    setClickModal(event.target.id);
    event.target.innerText === '자랑하러 가기'
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
      window.location.href = '/cash-book';
    },
    onError: (err) => {
      // console.log("장부 삭제 실패:::", err)
      alert('장부 삭제를 실패했습니다.');
    },
  });

  const onClickDeleteBtn = () => {
    if (!!clickedModal) {
      mutationDeleteCard.mutate(clickedModal);
    } else {
      alert('장부 삭제를 실패했습니다.');
    }
  };

  // 가계부 데이터 없을 때 Modal
  const [isDataNoneModal, setIsDataNoneModal] = useState(false);
  const changeDataNoneModal = (event) => {
    event.stopPropagation();
    setClickModal(event.target.id);
    // console.log("clickedModal:::", clickedModal);
    setIsDataNoneModal(true);
  };
  const setDataNoneClose = () => {
    setIsDataNoneModal(false);
  };
  const onClickDataNone = () => {
    navigate(`/cash-book/${selectDate.format('YYYY-MM-DD')}/${clickedModal}`);
  };

  // 가계부 data
  const queryNode = {
    queryKey: [`cashCard${selectDate.format('YYYY-MM-DD')}`],
    queryFn: () => CashBookAPI.getCashCard(selectDate.format('YYYY-MM-DD')),
    enabled: isLoggedIn,
    select: (data) => data.data.data,
  };

  const { data, isLoading, error } = useQuery(queryNode);
  // console.log("cashbook data:::", data);
  if (isLoading || error) {
    return <></>;
  }
  const dataLength = data !== undefined && data.length > 0 ? data.length : 0;

  // 카드 상세 박스로 이동
  const onClickCard = (id) => {
    navigate(`/cash-book/${selectDate.format('YYYY-MM-DD')}/${id}`);
  };

  // 카드 추가 박스로 이동
  const onClickAdd = () => {
    navigate('/cash-book/add');
  };

  const swiperRenderer = (
    mainHeight,
    cardHeight,
    setHorizontalSwipe,
    setActiveSlide,
    setSwiper,
    data
  ) => {
    const [over5, under5] = COMMENT.commentGray;
    const grayComment = dataLength >= 5 ? over5 : under5;

    let slidePerView = Math.ceil((mainHeight / cardHeight) * 10) / 10;
    // console.log(slidePerView);
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
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            style={{ width: `100%` }}
            resistance={true}
            resistanceRatio={1}
            onSliderMove={(swiper) => {
              setHorizontalSwipe(true);
            }}
            onTouchEnd={(swiper) => {
              setHorizontalSwipe(false);
              if (swiper.touches.diff < -90) {
                if (dataLength < 5) {
                  // console.log("여기로 들어옴!")
                  window.location.href = '/cash-book/add';
                } else {
                  // console.log("여기 들어옴!")
                  window.location.href = '/cash-book';
                }
              }
            }}
            // onTouchMove={(swiper) => {
            //   if (swiper.touches.diff < -160) {
            //     if (dataLength < 5) {
            //       // console.log("여기로 들어옴!")
            //       window.location.href = "/cash-book/add";
            //     } else {
            //       // console.log("여기 들어옴!")
            //       window.location.href = "/cash-book";
            //     }
            //   }
            // }}
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
                  // console.log(swiper);
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
                {data !== undefined &&
                  dataLength > 0 &&
                  data.map((card, idx) => {
                    // console.log("this cardHeight:::", cardHeight);
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
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    writingMode: 'vertical-rl',
                    paddingLeft: '20px',
                    fontSize: `${25 * widthRatio}px`,
                  }}
                >
                  왼쪽으로 당겨 장부를 추가하게
                  <span style={{ writingMode: 'horizontal-tb' }}>!</span>
                </div>
              ) : (
                <div
                  style={{
                    height: `${mainHeight}px`,
                    width: `${cardWidth}px`,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    writingMode: 'vertical-rl',
                    paddingLeft: '20px',
                    fontSize: `${25 * widthRatio}px`,
                    color: `${sVar.darkGray}`,
                  }}
                >
                  이미 다섯개의 장부를 추가하였네
                  <span style={{ writingMode: 'horizontal-tb' }}>!</span>
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
              // console.log(swiper);
            }}
            direction="vertical"
            // style={{ height: `${mainHeight - 24}px` }}
            // loop={true} -> loop 속성 줄시 active가 제대로 동작하지 않음
            pagination={{
              clickable: 'true',
            }}
          >
            {data !== undefined &&
              dataLength > 0 &&
              data.map((card, idx) => {
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
                      {' '}
                      {/* height를 CashBookCard와 동일하게 주어야 함*/}
                      {/* {console.log("isActiveSlide:::", idx === activeSlide)} */}
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
                        onTouchEnd={(swiper) => {
                          console.log(swiper.touches.diff);
                          if (swiper.touches.diff < -90) {
                            if (dataLength < 5) {
                              // console.log("111111")
                              window.location.href = '/cash-book/add';
                            } else {
                              // console.log("222222")
                              window.location.href = '/cash-book';
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
                                {grayComment}
                              </style.CashBookAddExplain>
                            </style.CashBookDummyContainer>
                          ) : (
                            <div
                              style={{
                                width: `${cardWidth}px`,
                                height: `${cardHeight}px`,
                                background: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
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
      backPngTop={`url(${bgSky100})`}
      backPngMiddle={`url(${bgCloud100})`}
      backPngTail={`url(${bgMountain100})`}
    >
      <layout.Header
        headerHeight={`${headerHeight}px`}
        style={{ zIndex: '10' }}
      >
        <div
          className="statusBarHeight"
          style={{ width: 'inherit', height: '50px' }}
        ></div>
        <layout.HeaderContent style={{ flexDirection: 'column' }}>
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
          {data !== undefined && !dataLength ? (
            <layout.FlexCenter>
              <style.CashBookDummyContainer
                cardWidth={`${cardWidth}px`}
                cardHeight={`${cardHeight}px`}
                style={{
                  justifyContent: 'center',
                  lineHeight: '160%',
                  textAlign: 'center',
                  fontSize: `${widthRatio * 16}px`,
                }}
                onClick={onClickAdd}
              >
                클릭하여
                <br />
                장부를 추가할 수 있네!
              </style.CashBookDummyContainer>
            </layout.FlexCenter>
          ) : (
            swiperRenderer(
              mainHeight,
              cardHeight,
              setHorizontalSwipe,
              setActiveSlide,
              setSwiper,
              data
            )
          )}
          {isWriteModal && (
            <WriteReceipt setClose={setWriteClose} cardId={clickedModal}>
              {isBoasting ? '자랑하러 가기' : '혼쭐나러 가기'}
            </WriteReceipt>
          )}
          {isDeleteModal && (
            <CashDetailModal
              setClose={setDeleteClose}
              onClickHandler={onClickDeleteBtn}
            >
              {COMMENT.commentDeleteCard}
            </CashDetailModal>
          )}
          {isDataNoneModal && (
            <CashDetailModal
              setClose={setDataNoneClose}
              onClickHandler={onClickDataNone}
            >
              {COMMENT.commentDataNone}
            </CashDetailModal>
          )}
        </layout.CashBookMainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Navigation selected="money" ratio={widthRatio} />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default CashBookMain;
