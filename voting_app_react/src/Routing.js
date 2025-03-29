import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import { Login, RedirectLogin } from './pages/login'
import Admin_dashboard  from './pages/admin_dashboard'
import { Voting } from './pages/voting'

export const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<RedirectLogin />}  ></Route>
            <Route path='/login' element={<Login />}  ></Route>
            <Route path='/admin-dashboard' element={<Admin_dashboard />}  ></Route>
            <Route path='/votings' element={<Voting />}  ></Route>
        </Routes>
    </Router>
  )
}
