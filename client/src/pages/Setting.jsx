import Divider from "../components/Divider";
import ChangePassword from "../components/settingsComponent/ChangePassword";
import ImageUpload from "../components/settingsComponent/ImageUpload";
import UserDelete from "../components/settingsComponent/UserDelete";
import UserNameAndEmailChange from "../components/settingsComponent/UserNameAndEmailChange";

function Setting() {
  return (
    <main className="flex justify-center">
      <div className="flex gap-6 w-[90%] md:w-[80%] lg:w-[55%]  mx-auto">
        <div className="hidden md:block h-fit shadow-md rounded-md p-5 pr-10">
          <h1 className="font-bold text-2xl">Settings</h1>
          <ul className="my-5 flex flex-col gap-2 cursor-pointer">
            <li className="w-full px-4 pl-1 text-start rounded-md hover:bg-gray-200">
              Profile settings
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
                <UserDelete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Setting;
