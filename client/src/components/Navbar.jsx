import React, { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import logo from "../../images/logoNoBackground.png";

const NavbarItem = ({ title, classProps }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    const formatTitle = title.toLowerCase().replace(" ", "");
    if ((formatTitle === "history" || formatTitle === "mywallet") && (localStorage.getItem('user') == null)) {
      alert("Please login!");
    } else {
      navigate(`/${formatTitle}`);
    }
  };

  return (
    <div
      onClick={handleItemClick}
      className={`mx-4 cursor-pointer ${classProps}`}
    >
      {title}
    </div>
  );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLogined(!!user);
  }, []);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <a href="/"><img src={logo} alt="logo" className='w-32 cursor-pointer' /></a>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["My Wallet", "History"].map((item, index) =>
          <NavbarItem key={item + index} title={item} />
        )}
        {!isLogined ? (
          <Link
            to="/Login"
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem('user');
              googleLogout();
              setIsLogined(false);
            }}
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            Logout
          </button>
        )}
      </ul>
      <div className="flex relative">
        {toggleMenu
          ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} />
          : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <ul
            className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
          >
            <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["My Wallet", "History"].map((item, index) =>
              <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
