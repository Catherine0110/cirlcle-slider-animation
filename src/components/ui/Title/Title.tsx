import React from 'react'
import cls from './Title.module.scss'
import { MobileContext } from '../../../utils/MobileContextProvider'
import { classNames } from '../../../utils/ClassNames'

const Title = ({ children }: { children: string }) => {
  const { isMobileXs } = React.useContext(MobileContext)
  return <h1 className={classNames(cls.title, { [cls.isMobileXs]: isMobileXs }, [])}>{children}</h1>
}

export default Title
