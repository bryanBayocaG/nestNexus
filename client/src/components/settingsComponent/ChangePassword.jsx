import React from "react";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modalState/modalSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-5">
        <label>Change password</label>
        <div className="relative flex gap-2 rounded-md border-2 border-gray-200">
          <input
            className="w-full p-2 bg-transparent focus:outline-none outline-none"
            type="password"
            placeholder="Password"
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
        <p>hello</p>
      </Modal>
    </>
  );
}

export default ChangePassword;
