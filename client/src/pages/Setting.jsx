import Divider from "../components/Divider";
import ChangePassword from "../components/settingsComponent/ChangePassword";
import ImageUpload from "../components/settingsComponent/imageUpload";
import UserNameAndEmailChange from "../components/settingsComponent/UserNameAndEmailChange";

function Setting() {
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
            <ImageUpload />
            <UserNameAndEmailChange />
          </div>
          <Divider />
          <div className="my-3">
            <div className="p-5">
              <h2 className="text-2xl mb-2">Danger Zone</h2>
              <div className="border-2 border-primary rounded-lg">
                <ChangePassword />
                <Divider />
                <div className="p-5 flex flex-col gap-2">
                  <div className="border-2 border-red-700 rounded-lg bg-gray-100 p-1">
                    <p className="text-primary text-sm text-center">
                      <strong>Warning! </strong>
                      Deleting your account will permanently remove all your
                      data and cannot be undone.
                    </p>
                  </div>
                  <button className="bg-primary py-2 rounded-lg round-lg text-white p-1 w-full hover:opacity-90 hover:scale-105 transition-all duration-300">
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
