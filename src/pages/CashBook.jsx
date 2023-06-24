import React, { useState, useRef, useLayoutEffect } from "react";
import moment from "moment";

import { layout, style } from "styles";
import { CashBookCard, DayPicker, DayWrapper } from "components";
import { Nav } from 'components';
import { cashbookDateBox } from 'assets';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function CashBook({ isMobile }) {
  // 가계부 date
  const [selectDate, setSelectDate] = useState(moment);
  const [focused, setFocused] = useState(false);
  // header와 nav의 높이를 받아 main의 높이를 계산
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  const getScreenSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };

  const [swiper, setSwiper] = useState(null);
  // 스와이퍼 인스턴스를 받아 상태로 저장하는 함수
  // const onSwiper = (swiper) => {
  //   setSwiper(swiper);
  // };

  
  useLayoutEffect(() => {
    setHeaderHeight(headerRef.current ? headerRef.current.offsetHeight : 0);
    setNavHeight(navRef.current ? navRef.current.offsetHeight : 0);
  }, []);

  const screenHeight = parseFloat(sessionStorage.getItem("screenHeight"))
  const screenWidth = parseFloat(sessionStorage.getItem("screenWidth"))

  // Header와 Nav의 높이 가져오기
  console.log(screenHeight);
  console.log(headerHeight);
  console.log(navHeight);
  console.log(screenHeight - (headerHeight + navHeight));

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

  return (
    <layout.PageLayout isMobile={!!sessionStorage.getItem("isMobile")}>
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: "0px",
          display: "flex",
          alignItems: "center",
          padding: "20px 40px",
          display: "flex",
          width: "inherit",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="heading" style={{ fontSize: "1.56em" }}>
          가계부
        </div>
      </header>
      <main
        style={{
          height: `${screenHeight - (headerHeight + navHeight)}px`,
          width: "inherit",
          background: "gray",
          overflow: "hidden"
        }}
      >
        <div
          className="dayWrapper"
          style={{
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            width: "155px",
            height: "36px",
            backgroundImage: `url(${cashbookDateBox})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "2em",
          }}
        >
          <DayPicker
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            focused={focused}
            setFocused={setFocused}
          />
        </div>
        <div
          className="cashBookContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid black",
            alignItems: "center",
            height: "inherit"
            // overflow: "hidden"
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={2}
            onSlideChange={() => console.log("slide change")}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            direction="vertical"
            loop="infinite"
            // style={{ height: "50vh"}}
          >
            {cashbookApiRes.data.map((card, idx) => {
              // const isActive = swiper ? swiper.activeIndex === idx : false
              // console.log(isActive)
              return (
                <SwiperSlide key={idx} style={{height: `${screenHeight - (headerHeight + navHeight)}px`}}>
                  <CashBookCard
                    id={card.id}
                    budget={card.cashbookGoalValue}
                    spend={card.cashbookNowValue}
                    category={card.cashbookCategory}
                    title={card.cashbookName}
                  />
                </SwiperSlide>

              );
            })}
          </Swiper>

          {/* <div className="cashBookWrapper">

          </div>
          <CardSwiper dataList={cashbookApiRes.data} /> */}
        </div>
      </main>
      <Nav ref={navRef} selected="money" />
    </layout.PageLayout>
  );
}

export default CashBook;
