import React, { FC, useRef, useState } from 'react'
import cls from './Dates.module.scss'
import { classNames } from '../../../utils/ClassNames'
import { MobileContext } from '../../../utils/MobileContextProvider'

interface IDatePeriod {
  start: number
  end: number
}

interface DatesProps {
  className: string
  activeIndex: number
  periods: IDatePeriod[]
}

const Dates: FC<DatesProps> = (props) => {
  const { className, activeIndex, periods } = props
  const { isMobile, isMobileXs } = React.useContext(MobileContext)
  const [datePeriodStart, setDatePeriodStart] = useState(periods[0].start)
  const [datePeriodEnd, setDatePeriodEnd] = useState(periods[0].end)
  let mounted = useRef(false)
  let startD = datePeriodStart
  let endD = datePeriodEnd

  const animateDate = (
    num: number,
    periodNext: number,
    datePeriod: number,
    setDate: (num: number) => void,
  ) => {
    let interval = setInterval(() => {
      if (periodNext > datePeriod) {
        num = num + 1
        if (num === periodNext) {
          clearInterval(interval)
        }
        setDate(num)
      }
      if (periodNext < datePeriod) {
        num = num - 1
        if (num === periodNext) {
          clearInterval(interval)
        }
        setDate(num)
      }
    }, 40)
  }

  React.useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  React.useEffect(() => {
    const nextPeriod = periods[activeIndex]

    if (mounted.current) {
      animateDate(startD, nextPeriod.start, datePeriodStart, setDatePeriodStart)
      animateDate(endD, nextPeriod.end, datePeriodEnd, setDatePeriodEnd)
    }
  }, [activeIndex])

  return (
    <p
      className={classNames(cls.date, { [cls.isMobile]: isMobile, [cls.isMobileXs]: isMobileXs }, [
        className,
      ])}>
      <span className={cls.start}>{datePeriodStart} </span>
      <span className={cls.end}> {datePeriodEnd}</span>
    </p>
  )
}

export default Dates
