import React, { useContext } from 'react'
import { Navigation, Pagination } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

import cls from './SliderItem.module.scss'
import { MobileContext } from '../../../utils/MobileContextProvider'
import { classNames } from '../../../utils/ClassNames'

export interface SliderItemProps {
  id: number
  text?: string
  title?: string
}

const SliderItem = ({ sliderItems }: { sliderItems: SliderItemProps[] }) => {
  const { isMobileXs } = useContext(MobileContext)
  return (
    <div className={classNames(cls.sliderItem, { [cls.isMobile]: isMobileXs }, [])}>
      <Swiper
        className={cls.sliderSwiperWrap}
        breakpoints={{
          320: {
            slidesPerView: 1.4,
            spaceBetween: 25,
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
        modules={[Navigation, Pagination]}
        navigation={!isMobileXs}
        slidesPerView={3}>
        {sliderItems.map((slide) => (
          <SwiperSlide className={isMobileXs && cls.slide} key={slide.id}>
            <h3 className={cls.title}>{slide.title}</h3>
            <p className={cls.text}>{slide.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderItem
