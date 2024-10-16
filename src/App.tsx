import './App.css'

import { useEffect, useState } from 'react';
import { WebAppUser } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk'
import { MainButton, BottomBar } from '@twa-dev/sdk/react';
import {ProfileForm} from "./components/ProfileForm";

type User = WebAppUser & { added_to_attachment_menu?: boolean; allows_write_to_pm?: boolean } | null

function App() {
  const [user, setUser] = useState<User>(null)
  useEffect(() => {
    if(WebApp.initDataUnsafe.user){
      console.log(WebApp.initDataUnsafe.user.photo_url);
      setUser(WebApp.initDataUnsafe.user)
    }
    
  }, [])

  const handleClick = () => {
    WebApp.showAlert(`AAAA`)

    
  }

  return (
    <>
      <h1>Open headliner</h1>
      <ProfileForm user={user}/>
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
