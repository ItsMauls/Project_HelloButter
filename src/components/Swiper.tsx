'use client'

import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';


const Swiper = () => {
    return (
    <div className='p-8'>
        <div className='text-center my-8 mt-14'>
            <h1 className='font-bold text-4xl'>SEASONS EATING</h1>
            <h1 className='mt-4'>Stock your dessert table with Milk Bar and send treats to your whole gifting list - we’re delivering big on holiday cheer.</h1>
        </div>
        <SwiperComponent
        className='swiper-slide'
        modules={[Autoplay]}
        loop={true}
        autoplay={{
            delay:3000
        }}
        breakpoints={{
            320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 40
              }
        }}
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
        <SwiperSlide>
            <Image width={500} height={500}  src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 1" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <Image width={500} height={500} src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 2" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <Image width={500} height={500} src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <Image width={500} height={500} src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <Image width={500} height={500} src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <Image width={500} height={500} src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        </SwiperComponent>
    </div>
    )
}

export default Swiper