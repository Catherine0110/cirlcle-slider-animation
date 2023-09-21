import React, { ReactNode } from 'react'
import cls from './Layout.module.scss'
import { MobileContext } from '../../utils/MobileContextProvider'
import { classNames } from '../../utils/ClassNames'

const Layout = ({ children }: { children: ReactNode }) => {
  const { isMobile, isMobileXs, isMobileTablet } = React.useContext(MobileContext)

  return (
    <div
      className={classNames(
        cls.container,
        {
          [cls.isMobile]: isMobile,
          [cls.isMobileXs]: isMobileXs,
          [cls.isMobileTablet]: isMobileTablet,
        },
        [],
      )}>
      <div className={cls.block}>{children}</div>
    </div>
  )
}

export default Layout
