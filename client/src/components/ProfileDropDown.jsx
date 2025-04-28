import React from "react";

function ProfileDropDown({ imgSrc, userName }) {
  return (
    <button className="group relative p-1 ">
      <img
        src={imgSrc}
        alt=""
        className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
      />
      <div className="absolute  md:w-48 bg-white border-2 border-gray-200 top-full right-0 rounded-lg p-3 mt-1 shadow-md scale-y-0 group-focus:scale-y-100 origin-top duration-200">
        <div className="flex flex-col items-start mb-4">
          <p className="text-md text-gray-500">Signed in as</p>
          <p className="text-sm">{userName}</p>
        </div>
        <div className="h-px bg-gray-200 w-full" />
        <ul className="py-2 gap-1 flex flex-col items-start">
          <li className="w-full pl-1 text-start rounded-md hover:bg-gray-100 cursor-pointer">
            Profile
          </li>
          <li className="w-full pl-1 text-start rounded-md hover:bg-gray-100 cursor-pointer">
            Settings
          </li>
          <div className="h-px bg-gray-200 w-full mb-2" />
          <li className="w-full pl-1 text-start rounded-md hover:bg-primary hover:text-white cursor-pointer">
            Logout
          </li>
        </ul>
      </div>
    </button>
  );
}

export default ProfileDropDown;
