import React, { useEffect } from 'react'
import cls from './Cirlcle.module.scss'
import { classNames } from '../../utils/ClassNames'
import { SwiperClass } from 'swiper/react'
import { nanoid } from 'nanoid'

export enum CirlcleThemes {
  CURRENT = 'current',
  FIVE_DOTS = 'dotFive',
  FOUR_DOTS = 'dotFour',
  THREE_DOTS = 'dotThree',
  TWO_DOTS = 'dotTwoo',
}

interface CirlcleProps {
  dotsNum: number
  activeEl: number
  className?: string
  theme?: CirlcleThemes
  swiperEl: SwiperClass
  activeIndex: number
  children?: React.ReactNode
}

const Cirlcle: React.FC<CirlcleProps> = (props) => {
  const {
    dotsNum,
    activeEl,
    className,
    theme = CirlcleThemes.CURRENT,
    activeIndex,
    swiperEl,
    children,
  } = props

  const styleProperties = (num: number) => {
    return { '--i': num } as React.CSSProperties
  }

  const initialContainerStyle = `calc(360/${dotsNum} * ${activeEl}deg)`
  const initialDotsStyle = `calc(-360/${dotsNum} * ${activeEl}deg)`

  const containerRef = React.useRef<HTMLDivElement>(null)
  let numberRef = React.useRef<HTMLSpanElement[]>([])

  const animationOnClick = (index: number, elIdx: number) => {
    containerRef!.current!.style.rotate = `calc(360/${dotsNum} * ${index}deg)`
    numberRef!.current!.map((el) => (el.style.rotate = `calc(-360/${dotsNum} * ${index}deg)`))
  }

  useEffect(() => {
    animationOnClick(activeEl - activeIndex, activeIndex)
  }, [activeIndex])

  return (
    <div className={classNames(cls.wrap, {}, [className!])}>
      <div
        style={{ rotate: initialContainerStyle }}
        ref={containerRef}
        className={classNames(cls.container, {}, [cls[theme]])}>
        {[...Array(dotsNum)].map((el, idx) => (
          <div
            key={nanoid()}
            onClick={() => swiperEl?.slideTo(idx)}
            className={classNames(cls.dot, { [cls.active]: activeIndex === idx }, [])}
            data-num={activeEl - idx}
            data-dot={idx + 1}
            style={styleProperties(idx)}>
            <span
              style={{ rotate: initialDotsStyle }}
              ref={(el) => {
                const numb = numberRef.current
                numb[idx] = el as HTMLSpanElement
              }}
              className={cls.numbers}>
              {idx + 1}
            </span>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

export default Cirlcle
