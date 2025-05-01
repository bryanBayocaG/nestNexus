import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
} from "../../redux/user/userSlice";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { PulseLoader } from "react-spinners";

function UserNameAndEmailChange() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  console.log("settings", formData);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const id = e.target.id.replace(/^settings-/, "");
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };
  const { error, loading } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${backEndBaseURL}/api/user/user_update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-[60%] gap-2 flex-col">
      <div className="flex flex-col">
        {error && (
          <div
            className="bg-red-100 text-red-700 border border-red-500 rounded-lg p-4 mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{" " + error}</span>
          </div>
        )}
        <label>Username</label>
        <input
          defaultValue={currentUser?.userName}
          className="border border-gray-200 p-1 rounded-lg focus:border-secondary outline-none"
          type="text"
          placeholder="Username"
          id="settings-userName"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <label>Email</label>
        <input
          defaultValue={currentUser?.email}
          className="border border-gray-200 p-1 rounded-lg focus:border-secondary outline-none"
          type="text"
          placeholder="Email"
          id="settings-email"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-secondary text-white rounded-lg p-1 hover:opacity-90 hover:scale-105 transition-all duration-300"
      >
        {loading ? (
          <PulseLoader
            color="#ffffff"
            loading={loading}
            size={10}
            aria-label="pulse loader"
            data-testid="loader"
          />
        ) : (
          "Apply"
        )}
      </button>
    </form>
  );
}

export default UserNameAndEmailChange;
