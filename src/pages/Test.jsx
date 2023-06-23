import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { CashBookCard } from "components";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Test() {
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
    // <Swiper
    //   spaceBetween={50}
    //   pagination={{ clickable: true }}
    //   className="mySwiper"
    //   direction="vertical"
    //   slidesPerView="2"
    //   observer={true}
    //   observeParents={true}
    // >
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      onSlideChange={() => console.log("slide change")}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      direction="vertical"
      style={{ height: "50vh"}}
    >
      {cashbookApiRes.data.map((card, idx) => {
        return (
          <SwiperSlide key={idx}>
            <div style={{ padding: "30px 20px", border: "1px solid black" }}>
              <p>{card.id}</p>
              <p>{card.cashbookGoalValue}</p>
              <p>{card.cashbookNowValue}</p>
              <p>{card.cashbookCategory}</p>
              <p>{card.cashbookName}</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Test;
