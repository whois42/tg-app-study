import { useState } from 'react'
import './App.css'

import WebApp from '@twa-dev/sdk'
import { MainButton, BottomBar } from '@twa-dev/sdk/react';

function App() {
  const [count, setCount] = useState(0)
  console.log(WebApp)

  const handleClick = () => {
    WebApp.showAlert(`AAAA`)
    console.log(WebApp.initData, WebApp.initDataUnsafe, 'aaaa');
    
  }

  return (
    <>
      <h1>Open headliner</h1>
      <div className="card">
        <MainButton
          text="Open headliner"
          onClick={handleClick}
        />
      </div>
      {/*  */}
      <BottomBar  bgColor='red'/>
    </>
  )
}

export default App
