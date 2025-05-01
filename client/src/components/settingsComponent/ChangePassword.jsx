import React, { useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/modalState/modalSlice";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import useSignOut from "../../hooks/signOut";

function ChangePassword() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const signOut = useSignOut();
  console.log(password);
  const handleProceed = async () => {
    try {
      await fetch(`${backEndBaseURL}/api/user/user_update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      signOut();
    } catch (error) {
      console.log("change password failed", error);
    }
  };
  return (
    <>
      <div className="p-5">
        <label>Change password</label>
        <div className="relative flex gap-2 rounded-md border-2 border-gray-200">
          <input
            className="w-full p-2 bg-transparent focus:outline-none outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => dispatch(openModal("editPassword"))}
            className="absolute scale-105 top-0 right-0 bottom-0 border-2 border-primary bg-primary hover:opacity-90 hover:scale-110 transition-all duration-300 text-white rounded-r-md p-2 px-4"
          >
            Apply
          </button>
        </div>
      </div>

      <Modal title="Changing Password" modalId="editPassword">
        <div className="p-2 flex flex-col gap-4">
          <div className="border-2 border-red-700 rounded-lg bg-gray-100 p-1">
            <p className="text-primary text-sm text-center">
              <strong>Note: </strong>
              For your security, changing your password will end your current
              session and log you out from all devices.
            </p>
          </div>
          <div className="flex gap-6 justify-center">
            <button
              onClick={handleProceed}
              className="p-2 px-4 rounded-md bg-primary text-white hover:opacity-90 hover:scale-105 transition-all duration-300"
            >
              Proceed
            </button>
            <button
              onClick={() => dispatch(closeModal())}
              className="p-2 px-4 rounded-md border-2 border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
            >
              Decline
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ChangePassword;
