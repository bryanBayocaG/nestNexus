import { Link } from "react-router-dom";
import Modal from "./Modal";
// import { useState } from "react";
import HeaderSearch from "../forms/HeaderSearch";
import CombineSignInandUp from "../forms/CombineSignInandUp";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../redux/modalState/modalSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <header className="bg-white shadow-md rounded-2xl mx-2 md:mx-10 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <Link to="/">
            <h1 className="font-bold  text-sm sm:text-xl lg:text-2xl flex items-center flex-wrap">
              <img className="w-12" src="/Noxus_Crest.png" alt="" />
              <span className="text-primary">Nest</span>
              <span className="text-secondary">Nexus</span>
            </h1>
          </Link>
          <HeaderSearch />
          <ul className="flex items-center gap-4 md:gap-6 text-sm sm:text-lg">
            <Link to="/">
              <li className="hidden sm:inline hover:text-primary transition duration-300 ease-in-out">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:text-primary transition duration-300 ease-in-out">
                About
              </li>
            </Link>
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
              />
            ) : (
              <li
                className="bg-secondary text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary transition duration-300 ease-in-out"
                onClick={() => dispatch(openModal())}
              >
                Sign Up
              </li>
            )}
          </ul>
        </div>
      </header>
      <Modal title={"Welcome to NestNexus"}>
        <CombineSignInandUp />
      </Modal>
    </>
  );
};

export default Header;
