import React, { createContext, useEffect, useState } from 'react'

interface IMobileContext {
  isMobile: boolean
  isMobileTablet: boolean
  isMobileXs: boolean
}

export const MobileContext = createContext<IMobileContext>({
  isMobile: false,
  isMobileTablet: false,
  isMobileXs: false,
})

const MobileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setMobile] = useState(false)
  const [isMobileTablet, setMobileTablet] = useState(false)
  const [isMobileXs, setMobilexS] = useState(false)

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onResize = () => {
    setMobile(window.innerWidth <= 1280)
    setMobileTablet(window.innerWidth <= 1440)
    setMobilexS(window.innerWidth <= 766)
  }
  return (
    <MobileContext.Provider value={{ isMobile, isMobileTablet, isMobileXs }}>
      {children}
    </MobileContext.Provider>
  )
}

export default MobileContextProvider
