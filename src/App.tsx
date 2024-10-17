import './App.css'

import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk'
import { MainButton, BottomBar } from '@twa-dev/sdk/react';
import {ProfileForm} from "./components/ProfileForm";

function App() {
  // const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(WebApp);
    
  }, [])

  const handleClick = () => {
    WebApp.showAlert(`AAAA`)
    if(WebApp.initDataUnsafe.user){
      console.log(WebApp.initDataUnsafe.user);
      
    }
    
  }

  return (
    <>
      <h1>Open headliner</h1>
      <ProfileForm/>
      <div className="card">
        <MainButton
          text="Open headliner"
          onClick={handleClick}
        />
      </div>
      {/*  */}
      <BottomBar  bgColor='#4287f5'/>
    </>
  )
}

export default App
