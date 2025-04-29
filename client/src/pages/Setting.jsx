import React from "react";
import { useSelector } from "react-redux";
import Divider from "../components/Divider";

function Setting() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto w-1/2 mt-10 ">
      <div className="flex gap-6">
        <div className="h-fit shadow-md rounded-md p-5 pr-10">
          <h2 className="font-bold text-2xl">Settings</h2>
          <ul className="my-5 flex flex-col gap-2 cursor-pointer">
            <li className="w-full px-4 pl-1 text-start rounded-md hover:bg-gray-200">
              Public profile
            </li>
            <li className="w-full pl-1 text-start rounded-md hover:bg-gray-200">
              Listing
            </li>
          </ul>
        </div>
        <div className="flex-1 shadow-lg rounded-md">
          <div className="p-5">
            <h2 className="font-bold text-1xl">Public Profile</h2>
          </div>
          <Divider />
          <div className="flex gap-4 items-center p-5">
            <div className="p-3 shadow-lg bg-white rounded-full">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.userName}
                className="rounded-full"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <button className="border-2 text-sm rounded-lg border-gray-200 p-2 hover:opacity-90 hover:scale-105 transition-all duration-300">
                Change picture
              </button>
              <button className="border-2 text-sm rounded-lg bg-primary text-white border-gray-200 p-2 hover:opacity-90 hover:scale-105 transition-all duration-300">
                Delete picture
              </button>
            </div>
          </div>
          <Divider />
          <div className="my-3">
            <div className="mb-5 p-5">
              <div className="flex gap-5 mb-5">
                <div className="flex-1 flex-col">
                  <label htmlFor="">Username</label>
                  <input
                    value={currentUser?.userName}
                    className="border border-gray-200 p-3 rounded-lg focus:border-secondary outline-none"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="flex-1 flex-col">
                  <label>Email</label>
                  <input
                    value={currentUser?.email}
                    className="border border-gray-200 p-3 rounded-lg focus:border-secondary outline-none"
                    type="text"
                    placeholder="Email"
                  />
                </div>
              </div>
              <button className="w-full bg-secondary text-white rounded-lg p-3 hover:opacity-90 hover:scale-105 transition-all duration-300">
                Apply
              </button>
            </div>
            <Divider />
            <div className="p-5">
              <h2 className="text-2xl mb-2">Danger Zone</h2>
              <div className="border-2 border-primary rounded-lg">
                <div className="p-5">
                  <input
                    className="w-full border border-gray-200 p-3 rounded-lg focus:border-secondary outline-none"
                    type="text"
                    placeholder="Password"
                  />
                </div>
                <Divider />
                <div className="p-5">
                  <button className="bg-primary rounded-lg round-lg text-white p-3 w-full hover:opacity-90 hover:scale-105 transition-all duration-300">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
