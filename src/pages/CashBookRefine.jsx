import React, { useState, useEffect } from 'react'
import { layout, style } from 'styles'
import { DayPicker, Nav, CashBookCard, CashBookCardTemp } from 'components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import moment from "moment"
import "styles/css/customSwiper.css"

// dummy data
const cashbookApiRes = {
  data: [
    {
      id: 0,
      cashbookCategory: "식비",
      cashbookName: "아침",
      cashbookNowValue: 4000,
      cashbookGoalValue: 8000,
      cashbookOrder: 0,
    },
    {
      id: 1,
      cashbookCategory: "식비",
      cashbookName: "점심",
      cashbookNowValue: 12000,
      cashbookGoalValue: 15000,
      cashbookOrder: 1,
    },
    {
      id: 2,
      cashbookCategory: "식비",
      cashbookName: "저녁",
      cashbookNowValue: 0,
      cashbookGoalValue: 12000,
      cashbookOrder: 2,
    },
    {
      id: 3,
      cashbookCategory: "간식비 / 카페",
      cashbookName: "",
      cashbookNowValue: 3000,
      cashbookGoalValue: 5000,
      cashbookOrder: 3,
    },
  ],
};

function CashBookRefine({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 화면 크기에 따라 header와 nav의 크기를 설정한 후, 나머지 부분을 main으로 잡아 렌더링하는 로직
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  // 아래 설정은 Router로 옮김
  // const headerHeight = Math.ceil(windowSize.height * 0.15)
  // const navHeight = Math.ceil(windowSize.height * 0.1)
  // const mainHeight = Math.ceil(windowSize.height - (headerHeight + navHeight))

  // datepicker 박스 크기 결정
  const dateBoxWidth = isMobile || windowSize.width < 500 ? ((windowSize.width * 155) / 393) * 0.65 : ((500 * 155) / 393) * 0.65
  const dateBoxHeight = dateBoxWidth * (36 / 155)

  // card 크기 결정
  // const cardWidth = isMobile || windowSize.width < 500 ? ((windowSize.width * 301) / 393) * 0.65 : ((500 * 301) / 393) * 0.65
  // const cardHeight = cardWidth * (356 / 301)
  const cardWidth = 301 * 0.9
  const cardHeight = 356 * 0.9

  // slidesPerView에 들어갈 카드 수
  let slidesPerViewValue = Math.round((mainHeight / cardHeight) * 10) / 10 - 0.4
  // let slidesPerViewValue = Math.floor(mainHeight / cardHeight)
  // activeSlide 상태 관리
  const [activeSlide, setActiveSlide] = useState(0)

  // 가계부 date
  const [selectDate, setSelectDate] = useState(moment);
  const [focused, setFocused] = useState(false);

  const [swiper, setSwiper] = useState(null)

  // Daypicker width & height 계산
  console.log("slidesperview:::", slidesPerViewValue)
  return (
    <layout.PageLayout>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
            <style.CashBookHeader>가계부</style.CashBookHeader>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.CashBookMainContent className='thisCash'>
            <style.DayPickerWrap dateBoxWidth={`${dateBoxWidth}px`} dateBoxHeight={`${dateBoxHeight}px`}>
                <DayPicker
                    selectDate={selectDate}
                    setSelectDate={setSelectDate}
                    focused={focused}
                    setFocused={setFocused}
                />
            </style.DayPickerWrap>
            <layout.SwiperWrap cardHeight={`${cardHeight}px`} mainHeight={`${mainHeight}px`} dateBoxHeight={`${dateBoxHeight}px`}>
                <Swiper
                    modules={[Navigation, Scrollbar, Pagination, A11y]}
                    slidesPerView={slidesPerViewValue}
                    onSlideChange={(swiper) => {
                        console.log("slide change");
                        console.log("activeIndex:::", swiper.activeIndex)
                        setActiveSlide(swiper.activeIndex)
                        console.log("activeSlideInOnSlide:::", activeSlide)
                    }}
                    // scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => {
                      setSwiper(swiper)
                      console.log(swiper)
                    }}
                    direction="vertical"
                    style={{height: `${mainHeight-dateBoxHeight-24}px`, backgroundColor:"tomato"}}
                    // loop={true}
                    pagination={{
                      clickable: "true",
                    }}
                >
                    {cashbookApiRes.data.map((card, idx) => {
                        return (
                            <SwiperSlide key={idx} style={{height: `${cardHeight + 20}px`, width: `100%`, marginLeft: "4%"}}> {/* height를 CashBookCard와 동일하게 주어야 함*/}
                            {console.log("isActiveSlide:::", idx===activeSlide)}
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
                                style={{height: `${mainHeight-dateBoxHeight-24}px`}}
                            >
                                <SwiperSlide>
                                    <CashBookCardTemp
                                        id={card.id}
                                        budget={card.cashbookGoalValue}
                                        spend={card.cashbookNowValue}
                                        category={card.cashbookCategory}
                                        title={card.cashbookName}
                                        cardWidth={`${cardWidth}px`}
                                        cardHeight={`${cardHeight}px`}
                                        index={idx}
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                  { idx === activeSlide ?
                                    <style.CashBookDummyContainer cardWidth={`${cardWidth}px`} cardHeight={`${cardHeight}px`}>
                                      <style.CashBookAddExplain cardWidth={`${cardWidth}px`} cardHeight={`${cardHeight}px`}>
                                        왼쪽으로 스와이프하여<br />카드 추가
                                      </style.CashBookAddExplain>
                                    </style.CashBookDummyContainer> : 
                                    <div style={{width: `${cardWidth}px`, height: `${cardHeight}px`, background: "transparent", display: "flex", alignItems: "center"}}>
                                    </div>
                                  }
                                    {/* <div style={{width: `${cardWidth}px`, height: `${cardHeight}px`, background: "gray"}}>
                                        test
                                    </div> */}
                                </SwiperSlide>
                              </Swiper>
                        </SwiperSlide>
                        );
                    })}
                </Swiper>
            </layout.SwiperWrap>
        </layout.CashBookMainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.Nav>
    </layout.PageLayout>
  )
}

export default CashBookRefine