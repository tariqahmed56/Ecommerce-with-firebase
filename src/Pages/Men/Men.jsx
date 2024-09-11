import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import menHero from '../../assets/menswiper/men-fashion.jpg'
import menStyle from '../../assets/menswiper/men-style.webp'
import frag from '../../assets/menswiper/frag.webp'
import suits from '../../assets/menswiper/men-Suits.webp'
import trousers from '../../assets/menswiper/men-trousers.webp'
import shoes from '../../assets/menswiper/shoes.avif'
import nike from '../../assets/menswiper/nike-shoes.jpg'
import jacket from '../../assets/menswiper/jacket.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';  
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Men = () => {
  const location = useLocation();
  let swiperContainerRef = useRef()
  console.log(location.pathname.split('/')[1]);
  return (
    <div className='w-full '>
      <div className= "w-full md:px-4 py-5 overflow-hidden text-black">
       <Swiper
       className='flex p-3 overflow-hidden'
      spaceBetween={50}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}

      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className='shrink-0 w-[70%]  flex justify-center rounded-lg'>
              <img src={menStyle} alt="men-wearing" className='w-[100%] rounded-md h-[60vh] object-cover '/>
      </SwiperSlide>
      <SwiperSlide className='shrink-0 w-[70%]  flex justify-center rounded-lg'>
              <img src={nike} alt="men-wearing" className='w-[100%] rounded-md h-[60vh] object-cover '/>
      </SwiperSlide>
      <SwiperSlide className='shrink-0 w-full  flex justify-center rounded-lg'>
              <img src={trousers} alt="men-wearing" className='w-[100%] rounded-md h-[60vh] object-cover '/>
      </SwiperSlide>
      <SwiperSlide className='shrink-0 w-full  flex justify-center rounded-lg'>
              <img src={frag} alt="men-wearing" className='w-[100%] rounded-md h-[60vh] object-cover '/>
      </SwiperSlide>
      <SwiperSlide className='shrink-0 w-full  flex justify-center rounded-lg'>
              <img src={jacket} alt="men-wearing" className='w-[100%] rounded-md h-[60vh] object-cover '/>
      </SwiperSlide>
      <SwiperSlide className='shrink-0 w-full  flex justify-center rounded-lg'>
              <img src={shoes} alt="men-wearing" className='w-[100%] rounded-md h-[60vh] object-cover '/>
      </SwiperSlide>

    </Swiper>
      </div>
    
    </div>
  )
}

export default Men
