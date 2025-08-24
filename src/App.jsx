import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import authServise from './appwrite/auth'
import { login,logout } from './store/appwriteSlice'
import Footer from './components/footer'
import Header from './components/header'
import Login from './components/login'
import LogoutBtn from './components/logoutBtn'
import SignUp from './components/signUp'
import AllPost from './pages/allPost'
import AddPost from './pages/addPost'
import AuthenticationCheck from './components/authenticationCheck'
import RTE from './components/RTE'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Post from './pages/post'
import MyPosts from './pages/myPosts'
import PostForm from './components/postForm'
import EditPost from './pages/editPost'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{

    authServise.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        // console.log("login");
        dispatch(login({userData}))
      }
      else{
        // console.log("logout");
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
  },[])
    
  return !loading ? (
    <>
        <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={
                (
                  <AuthenticationCheck authentication={false}>
                      <Login />
                  </AuthenticationCheck>
                )
              }/>
              <Route path="/signUp" element={
                <AuthenticationCheck authentication={false}>
                      <SignUp />
                  </AuthenticationCheck>
              }/>
              <Route path="/allPost" element={
                <AuthenticationCheck authentication>
                      <AllPost />
                  </AuthenticationCheck>
              }/>
              <Route path="/addPost" element={
                <AuthenticationCheck authentication>
                      <AddPost />
                  </AuthenticationCheck>
              }/>
              {/* <Route path="/logoutBtn" element={
                <AuthenticationCheck authentication>
                      <LogoutBtn />
                  </AuthenticationCheck>
              }/> */}
              <Route path="/post" element={
                <AuthenticationCheck authentication>
                      <Post />
                  </AuthenticationCheck>
              }/>
              <Route path="/myPost" element={
                <AuthenticationCheck authentication>
                      <MyPosts />
                  </AuthenticationCheck>
              }/>
              <Route path="/editpost" element={
                <AuthenticationCheck authentication>
                      <EditPost />
                  </AuthenticationCheck>
              }/>
            </Routes>

        <Footer/>
    </>
  ) : null
}

export default App
