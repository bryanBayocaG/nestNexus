import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import useSignOut from "../hooks/signOut";

function ProfileDropDown({ imgSrc, userName }) {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="p-1">
        <img
          src={imgSrc}
          alt="profile"
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
        />
      </button>

      {isOpen && (
        <div className="absolute md:w-48 bg-white border-2 border-gray-200 top-full right-0 rounded-lg p-3 mt-1 shadow-md z-50">
          <div className="flex flex-col items-start mb-4">
            <p className="text-md text-gray-500">Signed in as</p>
            <p className="text-sm">{userName}</p>
          </div>
          <Divider />
          <ul className="py-2 flex flex-col items-start">
            <Link
              to="/listing"
              className="w-full mb-2 pl-1 text-start rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Listing
            </Link>
            <Link
              to="/settings"
              className="w-full mb-2 pl-1 text-start rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <Divider />
            <button
              className="w-full pl-1 text-start rounded-md hover:bg-primary hover:text-white"
              onClick={signOut}
            >
              Sign out
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
