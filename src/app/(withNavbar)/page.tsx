// 'use client'
import FeaturedProducts from '@/components/FeaturedProducts'

import PromoBanner from '@/components/Promo'
import CarouselComponent from '@/components/RunningText.'


export default async function Home() {
  
  return (<>
      <PromoBanner/>
      {/* < Swiper /> */}
      <CarouselComponent />
      <FeaturedProducts />
      </>
    
  )
}
