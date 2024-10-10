import { useState } from 'react'
import './App.css'

import WebApp from '@twa-dev/sdk'

function App() {
  const [count, setCount] = useState(0)
  console.log(WebApp)

  const handleClick = () => {
    WebApp.showAlert(`AAAA`)
    console.log(WebApp.initData, WebApp.initDataUnsafe, 'aaaa');
    
  }

  return (
    <>
      <h1>TWA + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/*  */}
      <div className="card">
        <button onClick={handleClick}>
            Show Alert
        </button>
      </div>
    </>
  )
}

export default App
