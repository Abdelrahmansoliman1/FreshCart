'use client'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import banner1 from '../../../../../public/images/slider-image-1.jpeg'
import banner2 from '../../../../../public/images/slider-image-2.jpeg'
import banner3 from '../../../../../public/images/slider-image-3.jpeg'


export default function MainSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Image alt='banner1' src={banner1} width={1200} height={1000} className='mx-auto'/>
        </SwiperSlide>

        <SwiperSlide>
            <Image alt='banner2' src={banner2} width={1200} height={1000} className='mx-auto'/>
        </SwiperSlide>

        
        <SwiperSlide>
            <Image alt='banner3' src={banner3} width={1200} height={1000} className='mx-auto'/>
        </SwiperSlide>
        
      </Swiper>
    </>
  )
}
