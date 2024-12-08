import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

// Components
import AppNavbar from './components/AppNavbar'
import CourseCard from './components/CourseCard'

// Pages
import AddCourse from './pages/AddCourse'
import Banner from './pages/Banner'
import Course from './pages/Course'
import Details from './pages/Details'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'

import { UserProvider } from './UserContext'

export default function App() {
  const [user, setUser] = useState({
    id      : null,
    isAdmin : null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch('http://localhost:4000/users/details', {
      method: 'POST',
      header: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(result => result.json())
    .then(data => {
      if(typeof data.result !== "undefined") {
        setUser({
          id: data.result._id,
          isAdmin: data.result.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
  })
  }, [])


  return (
    <>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
            <main className='main-container'>
              <AppNavbar/>
              <Routes>
                <Route path='/' element={<Banner/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/courses' element={<Course/>}/>
                <Route path='/add-course' element={<AddCourse/>}/>
                <Route path='/details' element={<Details/>}/>
                <Route path='*' element={<ErrorPage/>}/>
              </Routes>
            </main>
        </Router>
      </UserProvider>
    </>
  );
}