import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Carousel = ({images}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 
  return (
    <div className="w-full md:px-0 mb-2 -top-2 relative  overflow-hidden z-20">
    <Swiper
      className="flex p-3 overflow-hidden"
      spaceBetween={20}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: windowWidth >= 758,
      }}
      navigation={windowWidth >= 758}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
    >
        {
            images.map((img,idx)=>(
      <SwiperSlide className="shrink-0 w-full md:w-[70%] flex justify-center" key={idx}>
        <img
          src={img.url}
          alt="men-style"
          className="w-full md:h-[70vh] h-[40vh] object-cover "
        />
      </SwiperSlide>
            ))

        }
     
    </Swiper>
  </div>
  )
}

export default Carousel
