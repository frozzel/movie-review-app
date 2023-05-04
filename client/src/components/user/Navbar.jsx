import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import {Link} from "react-router-dom"
import { useTheme } from "../../hooks";
import { useAuth } from "../../hooks";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";


export default function Navbar() {
  const {toggleTheme} = useTheme();
  const {authInfo, handleLogout} = useAuth()
  const {isLoggedIn} = authInfo;
  
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-1">
        <div className="flex justify-between items-center">
          <Link to="/">
          <h1 className="text-2xl font-semibold dark:text-white text-dark-subtle font-Anton"> WOKE <span className="dark:bg-white bg-dark-subtle dark:text-secondary text-primary"> ADVISORY </span></h1>
          {/* <img src="./logo.png" alt="" className="h-12" /> */}
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button onClick={toggleTheme} className="dark:bg-white bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-secondary" size={22} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-sm outline-none focus:border-white transition text-white"
                placeholder="search..."
              />
            </li>
            <li>
            {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                ><FiLogOut />
                  <span>
                    Logout
                  </span>
                </button>
              ) : (
                <Link
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                  to="/auth/signIn"
                ><FiLogIn />
                <span>
                  Login     
                </span>
                  
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
