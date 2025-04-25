import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="bg-slate-200 shadow-md ">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl lg:text-2xl flex flex-wrap">
              <span className="text-blue-600">Nests</span>
              <span className="text-blue-700">Nexus</span>
            </h1>
          </Link>
          <form className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-full"
            />

            <FaSearch className="text-blue-600 cursor-pointer" />
          </form>
          <ul className="flex gap-4 text-sm sm:text-lg">
            <Link to="/">
              <li className="hidden sm:inline">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline">About</li>
            </Link>
            <li onClick={() => setOpen(true)}>Sign In</li>
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
