import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useEffect } from "react";
import SignUp from "./components/Signup"
import Login from './components/Login';
import Profile from "./components/Profile";
import { useAuth } from "./hooks/useAuth.js";
import LoaderComponent from "./components/Loader";
import HomePage from "./components/HomePage";

function App() {
  const {AuthenticatedUser, checkandSetAuth, isLoadingUser, onlineUsers} = useAuth();

  useEffect(() => {
      checkandSetAuth()      
  }, [checkandSetAuth]) 

  if (isLoadingUser && !AuthenticatedUser ) {
      return <LoaderComponent/>
  }

  return (
    <>  
    <Navbar/>
    <Routes>
      <Route element={AuthenticatedUser ? <HomePage/> : <Navigate to={"/login"}/>} path="/"/>
      <Route element={!AuthenticatedUser ? <SignUp/> : <Navigate to={"/"}/>} path="/signup"/>
      <Route element={!AuthenticatedUser ? <Login/> : <Navigate to={"/"}/>} path="/login"/>
      <Route element={AuthenticatedUser ?  <Profile/> : <Navigate to={"/login"}/>} path="/profile"/>

    </Routes>
    </>
  )
}

export default App