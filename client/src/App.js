import React from 'react';
import Navbar from './components/user/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

export default function App() {
  return (
    <>
      <Navbar />
      {/* <SignIn /> */}
      <SignUp />
    </>
  );
}
