import React from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login/LOgin';
import SignUp from './pages/SignUp/SignUp';

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" exact element={<Home/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<SignUp/>}/>
    </Routes>
  </BrowserRouter>
)
function App() {
  return (
    <>
     {routes}
    </>
  )
}

export default App
