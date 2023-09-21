import React from 'react'
import './styles/index.scss'
import { CirlcleThemes } from './components/Cirlcle/Cirlcle'
import History from './pages/History/History'
import { SliderContent, SliderContent4, SliderPeriods, SliderPeriods4 } from './data/data'

function App() {
  return (
    <>
      <History activeElem={2} dotsNumb={6} period={SliderPeriods} content={SliderContent} />
      <History
        activeElem={1}
        dotsNumb={4}
        period={SliderPeriods4}
        content={SliderContent4}
        cirlcleTheme={CirlcleThemes.FOUR_DOTS}
      />
    </>
  )
}

export default App
