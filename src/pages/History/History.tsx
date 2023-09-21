import React, { useState } from 'react'
import cls from './History.module.scss'
import Layout from '../../components/Layout/Layout'
import Title from '../../components/ui/Title/Title'
import Cirlcle, { CirlcleThemes } from '../../components/Cirlcle/Cirlcle'
import Slider from '../../components/Slider/SliderMain/SliderMain'
import { SwiperClass } from 'swiper/react'
import Dates from '../../components/ui/Dates/Dates'
import { MobileContext } from '../../utils/MobileContextProvider'
import { classNames } from '../../utils/ClassNames'
import { Period, Slide } from '../../data/types'

interface IHistory {
  dotsNumb: number
  activeElem: number
  period: Period[]
  content: Slide[][]
  cirlcleTheme?: CirlcleThemes
}

const History: React.FC<IHistory> = (props) => {
  const { activeElem, dotsNumb, content, period, cirlcleTheme = CirlcleThemes.CURRENT } = props
  const dotsNum = dotsNumb
  const activeEl = activeElem
  const { isMobile } = React.useContext(MobileContext)
  const [swiperEl, setSwiperEl] = useState<SwiperClass>()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Layout>
      <div className={classNames(cls.block, { [cls.isMobile]: isMobile }, [])}>
        <Title>Исторические даты</Title>
        {!isMobile && (
          <Cirlcle
            theme={cirlcleTheme}
            activeIndex={activeIndex}
            swiperEl={swiperEl as SwiperClass}
            className={cls.circle}
            dotsNum={dotsNum}
            activeEl={activeEl}>
            <Dates periods={period} activeIndex={activeIndex} className={cls.date} />
          </Cirlcle>
        )}
        {isMobile && <Dates periods={period} activeIndex={activeIndex} className={cls.date} />}
      </div>

      <Slider
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        swiperEl={swiperEl as SwiperClass}
        saveSwiper={setSwiperEl}
        content={content}
      />
    </Layout>
  )
}

export default History
