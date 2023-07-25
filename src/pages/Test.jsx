import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { CashBookCard } from "components";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

function Test() {
  const [swiper, setSwiper] = useState(null)
  // const slideTo = (index) => {
  //   swiper && swiper.slideTo(index)
  //   console.log("activeIndex:::", swiper.activeIndex)
  // }

  useEffect (() => {
    if (swiper) {
      // console.log("oh, there's a swiper:::")
      // console.log(swiper)
      // console.log(swiper.activeIndex)
    } else {
      // console.log("there's no swiper in state!")
    }
  }, [swiper])
  return (
    <>
      <Swiper
        className="mySwiper swiper-v"
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={{height:"1000px", backgroundColor: "lavender"}}
        onSwiper={setSwiper}
        slidesPerView={2}
        direction={"vertical"}
        // centeredSlides={true}
      >
        {/* <SwiperSlide style={{border: "1px solid black"}}>Horizontal Slide 1</SwiperSlide> */}
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-h"
            direction={"horizontal"}
            // spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{height:"500px", backgroundColor: "lightblue"}}
            onSwiper={setSwiper}
            slidesPerView={1.3}
          >
            <SwiperSlide style={{border: "1px solid black", backgroundColor:"blue"}}>Vertical Slide 1</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            {/* <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide> */}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-h"
            direction={"horizontal"}
            // spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{height:"500px", backgroundColor: "lightblue"}}
            onSwiper={setSwiper}
            slidesPerView={1.3}
          >
            <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 1</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            {/* <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide> */}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-h"
            direction={"horizontal"}
            // spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{height:"500px", backgroundColor: "lightblue"}}
            onSwiper={setSwiper}
            slidesPerView={1.3}
            
          >
            <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 1</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            {/* <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide> */}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-h"
            direction={"horizontal"}
            // spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{height:"500px", backgroundColor: "lightblue"}}
            onSwiper={setSwiper}
            slidesPerView={1.3}
          >
            <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            {/* <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide> */}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-h"
            direction={"horizontal"}
            // spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{height:"500px", backgroundColor: "lightblue"}}
            onSwiper={setSwiper}
            slidesPerView={1.3}
          >
            <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            {/* <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide> */}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="mySwiper2 swiper-h"
            direction={"horizontal"}
            // spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{height:"500px", backgroundColor: "lightblue"}}
            onSwiper={setSwiper}
            slidesPerView={1.3}
          >
            <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            {/* <SwiperSlide style={{border: "1px solid black"}}>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide> */}
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>Horizontal Slide 4</SwiperSlide>
      </Swiper>
    </>

    // <Swiper
    //   spaceBetween={50}
    //   pagination={{ clickable: true }}
    //   className="mySwiper"
    //   direction="vertical"
    //   slidesPerView="2"
    //   observer={true}
    //   observeParents={true}
    // >
    // <Swiper
    //   modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   spaceBetween={50}
    //   slidesPerView={2}
    //   onSlideChange={() => console.log("slide change")}
    //   // scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   direction="vertical"
    //   style={{ height: "300px", width: "300px"}}
    // >
    //   <Swiper
    //     modules={[Navigation, Pagination, Scrollbar, A11y]}
    //     className="mySwiper swiper-h"
    //     spaceBetween={50}
    //     pagination={{
    //       clickable: true
    //     }}
    //     direction='horizontal'
    //   >
    //   {cashbookApiRes.data.map((card, idx) => {
    //     console.log()
    //     return (
    //       <SwiperSlide key={idx}>
    //         <div style={{ padding: "30px 20px", border: "1px solid black" }}>
    //           <p>{card.id}</p>
    //           <p>{card.cashbookGoalValue}</p>
    //           <p>{card.cashbookNowValue}</p>
    //           <p>{card.cashbookCategory}</p>
    //           <p>{card.cashbookName}</p>
    //         </div>
    //       </SwiperSlide>
    //     );
    //   })}
    //   </Swiper>
    // </Swiper>
  );
}

export default Test;
