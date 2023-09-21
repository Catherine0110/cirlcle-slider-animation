import { Navigation, Pagination, EffectFade } from 'swiper'
import { NavigationOptions } from 'swiper/types/modules/navigation'
import { nanoid } from 'nanoid'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { FC, useRef, useContext } from 'react'

import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import SliderItem from '../SliderItem/SliderItem'
import cls from './SliderMain.module.scss'
import { MobileContext } from '../../../utils/MobileContextProvider'
import { classNames } from '../../../utils/ClassNames'
import SliderMobilePagination from '../SliderMobilePagination/SliderMobilePagination'

interface SliderProps {
  content: any[]
  saveSwiper: (swiper: SwiperClass) => void
  swiperEl: SwiperClass
  setActiveIndex: (num: number) => void
  activeIndex: number
}

const Slider: FC<SliderProps> = (props) => {
  const { content, saveSwiper, swiperEl, setActiveIndex, activeIndex } = props
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { isMobileXs } = useContext(MobileContext)

  return (
    <div className={classNames(cls.SliderBlock, { [cls.isMobile]: isMobileXs }, [])}>
      <Swiper
        className={cls.sliderWrap}
        modules={[Navigation, Pagination, EffectFade]}
        allowTouchMove={false}
        slidesPerView={1}
        navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
        pagination={{
          clickable: true,
          type: 'fraction',
          renderFraction: (currentClass, totalClass) => {
            return `<span class='${currentClass}'></span>/<span class='${totalClass}'></span>`
          },
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onInit={(swiper) => {
          const navigation = swiper.params.navigation as NavigationOptions
          saveSwiper(swiper)
          navigation.prevEl = navigationPrevRef.current
          navigation.nextEl = navigationNextRef.current
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
        {content?.map((slides, i) => (
          <SwiperSlide className={cls.SlideItemWrap} key={nanoid()}>
            <SliderItem sliderItems={slides} />
          </SwiperSlide>
        ))}
        <div className={cls.PrevBtn} ref={navigationPrevRef}>
          ❮
        </div>
        <div className={cls.NextBtn} ref={navigationNextRef}>
          ❯
        </div>
        {isMobileXs && (
          <SliderMobilePagination
            activeIndex={activeIndex}
            content={content}
            slider={swiperEl}
            className={cls.dots}
          />
        )}
      </Swiper>
    </div>
  )
}

export default Slider
