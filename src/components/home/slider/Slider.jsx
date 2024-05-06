import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./slider.module.css";
import { sliderData } from "../../../data/home/slider";

export default function Slider() {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        /* slidesPerView={4}
        spaceBetween={90} */

        // minwidth
        breakpoints={{
          576: {
            slidesPerView: 3,
            spaceBetween: 50,
            coverflowEffect: {
              rotate: 40,
            },
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 50,
            coverflowEffect: {
              rotate: 40,
            },
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 90,
            coverflowEffect: {
              rotate: 50,
            },
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 15,
            coverflowEffect: {
              rotate: 30,
            },
          },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          // rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        className={styles.swiper}
      >
        {sliderData?.map((item, index) => (
          <SwiperSlide className={styles.swiperSlide} key={index}>
            <div className={styles.imageContainer}>
              <img src={item.img} alt="silderImg" />
            </div>
            <div className={styles.slideContent}>
              <h2>Prompt</h2>
              <p>{item.prompt}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
