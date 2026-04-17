import React from 'react'
import Home from './pages/Home'
import colors from './theme/colors'


const App = () => {
  return (
    <div
      style={{
        '--color-background': colors.background,
        '--color-surface': colors.surface,
        '--color-text': colors.text,
        '--color-border': colors.border,
      }}
    >
      <Home />
    </div>
  )
}

export default App
