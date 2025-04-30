import { useSelector } from "react-redux";
import Divider from "../components/Divider";
import { useRef, useState, useEffect } from "react";
import { storage, ID } from "../config/appWrite";

function Setting() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = async () => {
    try {
      const res = await storage.createFile(
        import.meta.env.VITE_nestNexusProfile,
        ID.unique(),
        file
      );
      if (res) {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: currentUser._id,
            avatar: res.$id,
          }),
        });
        const data = response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="flex gap-6 w-[90%] md:w-[80%] lg:w-[55%]  mx-auto">
        <div className="hidden md:block h-fit shadow-md rounded-md p-5 pr-10">
          <h2 className="font-bold text-2xl">Settings</h2>
          <ul className="my-5 flex flex-col gap-2 cursor-pointer">
            <li className="w-full px-4 pl-1 text-start rounded-md hover:bg-gray-200">
              Profile settings
            </li>
            <li className="w-full pl-1 text-start rounded-md hover:bg-gray-200">
              Listing
            </li>
          </ul>
        </div>
        <div className="flex-1 shadow-lg rounded-md">
          <div className="p-5">
            <h2 className="font-bold text-1xl">Profile Settings</h2>
          </div>
          <Divider />
          <div className="flex gap-3 md:gap-6 lg:gap-10 items-center p-5">
            <div className="relative p-1 shadow-lg bg-white rounded-full hover:scale-105 transition-all duration-300 ease-in-out">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img
                src={currentUser?.avatar}
                alt={currentUser?.userName}
                className="rounded-full"
              />
              <div
                onClick={() => fileRef.current.click()}
                className="opacity-0 hover:opacity-60 hover:cursor-pointer bg-slate-900  absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center"
              >
                <p className="text-white text-center">Change image</p>
              </div>
            </div>
            <div className="flex w-[60%] gap-2 flex-col">
              <div className="flex flex-col">
                <label>Username</label>
                <input
                  defaultValue={currentUser?.userName}
                  className="border border-gray-200 p-1 rounded-lg focus:border-secondary outline-none"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label>Email</label>
                <input
                  defaultValue={currentUser?.email}
                  className="border border-gray-200 p-1 rounded-lg focus:border-secondary outline-none"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <button className="w-full bg-secondary text-white rounded-lg p-1 hover:opacity-90 hover:scale-105 transition-all duration-300">
                Apply
              </button>
            </div>
          </div>
          <Divider />
          <div className="my-3">
            <div className="p-5">
              <h2 className="text-2xl mb-2">Danger Zone</h2>
              <div className="border-2 border-primary rounded-lg">
                <div className="p-5">
                  <input
                    className="w-full border border-gray-200 p-1 rounded-lg focus:border-secondary outline-none"
                    type="text"
                    placeholder="Password"
                  />
                </div>
                <Divider />
                <div className="p-5">
                  <button className="bg-primary rounded-lg round-lg text-white p-1 w-full hover:opacity-90 hover:scale-105 transition-all duration-300">
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
