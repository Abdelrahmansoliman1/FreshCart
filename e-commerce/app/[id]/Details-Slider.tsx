'use client'
import React from 'react'
import { SwiperSlide , Swiper  } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function DetailsSlider({images}:{images: string[]}) {
  return (
    
    <Swiper 
     autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
         pagination={{
          clickable: true,
        }}
        loop = {true}
        modules={[Autoplay, Pagination, Navigation]}>
        {images.map((img,i) => {
        return(<SwiperSlide key={i}>

            <Image src={img} alt='' width={350} height={200}/>
           
        </SwiperSlide>);
        })}
     </Swiper>
     
  
  )
}
