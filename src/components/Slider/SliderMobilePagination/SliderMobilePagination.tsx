import React from 'react'
import { SwiperClass } from 'swiper/react'
import { nanoid } from 'nanoid'
import cls from './SliderMobilePagination.module.scss'
import { classNames } from '../../../utils/ClassNames'
import { Slide } from '../../../data/types'

interface SliderMobilePaginationProps {
  content: Slide[][]
  slider?: SwiperClass
  className?: string
  activeIndex: number
}
const SliderMobilePagination = ({
  content,
  slider,
  className,
  activeIndex,
}: SliderMobilePaginationProps) => {
  const handleClick = (idx: number) => {
    slider?.slideTo(idx)
  }

  return (
    <div className={classNames(cls.PaginatonWrap, {}, [className!])}>
      {content.map((el, i) => (
        <div
          key={nanoid()}
          onClick={() => handleClick(i)}
          className={classNames(cls.dot, { [cls.active]: activeIndex === i }, [])}></div>
      ))}
    </div>
  )
}

export default SliderMobilePagination
