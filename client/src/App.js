import React from 'react';
import Navbar from './components/user/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/SignUp' element={<SignUp/>} />
          <Route path='/auth/SignIn' element={<SignIn/>} />
          <Route path='/auth/verification' element={<EmailVerification />} />
          <Route path='/auth/forget-password' element={<ForgetPassword />} />
          <Route path='/auth/reset-password' element={<ConfirmPassword/>} />
          <Route path='*' element={<NotFound/>} />
        
      </Routes>
     
    </>
  );
}
