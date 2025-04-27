import { useState } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { store } from "../redux/store";
import OAuth from "../components/OAuth";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${backEndBaseURL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("API Response:", data); // Log the API response
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      console.log("Dispatching signInSuccess with data:", data); // Log the data being dispatched
      dispatch(signInSuccess(data));
      console.log("Updated store:", store.getState()); // Log the updated store state
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signInFailure(error.message));
      }
    }
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {error && (
        <div
          className="bg-red-100 text-red-700 border border-red-500 rounded-lg p-4 mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{" " + error}</span>
        </div>
      )}
      <input
        type="text"
        value={formData.email}
        className="border border-dark p-3 rounded-lg focus:border-secondary outline-none"
        placeholder="Email"
        id="email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        value={formData.password}
        className="border border-dark p-3 rounded-lg focus:border-secondary outline-none"
        placeholder="Password"
        id="password"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-secondary text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary transition duration-300 ease-in-out disabled:opacity-80  disabled:hover:bg-dark disabled:bg-dark  disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
      <OAuth />
    </form>
  );
}

export default SignInForm;
