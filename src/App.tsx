import './App.css'

import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

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


  return (
    <>
      
    </>
  )
}

export default App
