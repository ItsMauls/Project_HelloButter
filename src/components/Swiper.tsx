import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const Swiper = () => {
    return (
        <>
    <div className='m-8 mx-auto'>
        <div className='text-center my-8 mt-14'>
            <h1 className='font-bold text-4xl'>SEASONS EATING</h1>
            <h1 className='mt-4'>Stock your dessert table with Milk Bar and send treats to your whole gifting list - we’re delivering big on holiday cheer.</h1>
        </div>
    
        {/* <div className='text-4xl bg-red-500 absolute z-50'>
        <i className='bx bx-left-arrow-alt'></i>
        </div> */}
        <SwiperComponent
        className=''
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
        <SwiperSlide>
            <img src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 1" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 2" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600" alt="Image 3" className="w-full rounded-lg object-cover" />
        </SwiperSlide>
        </SwiperComponent>
    </div>
  
        </>
    )
}

export default Swiper