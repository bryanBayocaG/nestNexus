import React from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import useSignOut from "../../hooks/signOut";
import { closeModal, openModal } from "../../redux/modalState/modalSlice";
import { backEndBaseURL } from "../../utils/backendBaseURL";
function UserDelete() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const signOut = useSignOut();
  const handleProceed = async () => {
    try {
      const res = await fetch(
        `${backEndBaseURL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (res) {
        signOut();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-5 flex flex-col gap-2">
        <div className="border-2 border-red-700 rounded-lg bg-gray-100 p-1">
          <p className="text-primary text-sm text-center">
            <strong>Warning! </strong>
            Deleting your account will permanently remove all your data and
            cannot be undone.
          </p>
        </div>
        <button
          onClick={() => dispatch(openModal("deleteUser"))}
          className="bg-primary py-2 rounded-lg round-lg text-white p-1 w-full hover:opacity-90 hover:scale-105 transition-all duration-300"
        >
          Delete Account
        </button>
      </div>
      <Modal title="Delete this account?" modalId="deleteUser">
        <div className="p-2 flex flex-col gap-4">
          <div className="border-2 border-red-700 rounded-lg bg-gray-100 p-1">
            <p className="text-primary text-sm text-center">
              <strong>Warning:</strong>
              Deleting your account is permanent and cannot be undone. All your
              data will be lost, and you will be logged out immediately.
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

export default UserDelete;
