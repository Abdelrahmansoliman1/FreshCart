'use client'
import React from 'react'
import Link from 'next/link'


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { ICategory } from '@/lib/interfaces/category';
import CategoryCard from '@/app/_Components/CategoryCard/page';


export default function CategorySlider({ data }:{ data: ICategory[] }) {


  return (
    <div className='p-3'>
     
      <Swiper
        slidesPerView={5}
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
       

       
      
        {data.map((category)=>(
           <SwiperSlide key={category._id} >
           <CategoryCard category={category} key={category._id}/>
          
        </SwiperSlide>
           
        ))}
        </Swiper>
    </div>
  )
}
