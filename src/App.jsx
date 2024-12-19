//import React from 'react'

import Navbar from "./componets/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from './componets/pages/HomePage'
import ProfilePage from './componets/pages/ProfilePage'
import SignupPage from './componets/pages/SignupPage'
import LoginPage from './componets/pages/LoginPage'
import SettingsPage from './componets/pages/SettingsPage'
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import {Toaster} from 'react-hot-toast'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()


  useEffect(()=>{
    checkAuth();
  },[]);

  console.log({authUser});

if(isCheckingAuth && !authUser) return(
  <div className="flex items-center justify-center h-screen">
    <Loader className=" size-10 animate-spin" />
  </div>
)
  return (
    <div>
    <Navbar/>
    <Routes>
     <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" /> }/>
     <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/" /> }/>
     <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" /> }/>
     <Route path="/settings" element={<SettingsPage/> }/>
     <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" /> }/>

    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
