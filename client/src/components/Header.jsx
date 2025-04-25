import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-md rounded-2xl  mx-2 md:mx-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <Link to="/">
            <h1 className="font-bold  text-sm sm:text-xl lg:text-2xl flex items-center flex-wrap">
              <img className="w-12" src="/Noxus_Crest.png" alt="" />
              <span className="text-primary">Nests</span>
              <span className="text-secondary">Nexus</span>
            </h1>
          </Link>
          <form className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-40 md:w-50 lg:w-60"
            />

            <FaSearch className="text-secondary cursor-pointer" />
          </form>
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
            <li
              className="bg-secondary text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary transition duration-300 ease-in-out"
              onClick={() => setOpen(true)}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h1>Hello</h1>
      </Modal>
    </>
  );
};

export default Header;
