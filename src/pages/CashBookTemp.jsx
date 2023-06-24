import React, { useState, useEffect } from 'react'
import { layout, style } from 'styles'
import { DayPicker, Nav, CashBookCard, CashBookCardTemp } from 'components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import moment from "moment"

function CashBookTemp({ isMobile }) {
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

  const headerHeight = Math.ceil(windowSize.height * 0.15)
  const navHeight = Math.ceil(windowSize.height * 0.1)
  const mainHeight = Math.ceil(windowSize.height - (headerHeight + navHeight))
  // datepicker 박스 크기 결정
  const dateBoxWidth = isMobile || windowSize.width < 500 ? ((windowSize.width * 155) / 393) * 0.65 : ((500 * 155) / 393) * 0.65
  const dateBoxHeight = dateBoxWidth * (36 / 155)
  // card 크기 결정
  const cardWidth = isMobile || windowSize.width < 500 ? ((windowSize.width * 301) / 393) * 0.65 : ((500 * 301) / 393) * 0.65
  const cardHeight = cardWidth * (356 / 301)
  // slidesPerView에 들어갈 카드 수
  let slidesPerViewValue = Math.floor(mainHeight / cardHeight)
  // activeSlide 상태 관리
  const [activeSlide, setActiveSlide] = useState(0)

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

  // 가계부 date
  const [selectDate, setSelectDate] = useState(moment);
  const [focused, setFocused] = useState(false);

  // Daypicker width & height 계산
  console.log("slidesperview:::", Math.round(mainHeight / cardHeight))
  return (
    <layout.PageLayoutTemp>
      <layout.HeaderTemp headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
            <style.CashBookHeader>가계부</style.CashBookHeader>
        </layout.HeaderContent>
      </layout.HeaderTemp>
      <layout.MainTemp headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
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
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={slidesPerViewValue}
                    onSlideChange={(swiper) => {
                        console.log("slide change");
                        console.log("activeIndex:::", swiper.activeIndex)
                        setActiveSlide(swiper.activeIndex)
                    }}
                    // scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    direction="vertical"
                    loop="infinite"
                >
                    {cashbookApiRes.data.map((card, idx) => {
                        return (
                            <SwiperSlide key={idx} style={{height: `${mainHeight}px`, width: `${cardWidth}px`}}> {/* height를 CashBookCard와 동일하게 주어야 함*/}
                              <CashBookCardTemp
                                  id={card.id}
                                  budget={card.cashbookGoalValue}
                                  spend={card.cashbookNowValue}
                                  category={card.cashbookCategory}
                                  title={card.cashbookName}
                                  cardWidth={`${cardWidth}px`}
                                  cardHeight={`${cardHeight}px`}
                              />
                        </SwiperSlide>
                        );
                    })}
                </Swiper>
            </layout.SwiperWrap>
        </layout.MainContent>
      </layout.MainTemp>
      <layout.NavTemp navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.NavTemp>
    </layout.PageLayoutTemp>
  )
}

export default CashBookTemp