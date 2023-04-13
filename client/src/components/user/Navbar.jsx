import React from 'react';

export default function Navbar() {
  return <div className="bg-secondary">
    <div className=" max-w-screen-xl mx-auto p-2">
        <div className="flex justify-between items-center">
        <img src="./logo.png" alt="logo" className='h-10' />
        <ul>
            <li className='text-white'>Log in</li>
        </ul>

        </div>
       
    </div>
  </div>
}
