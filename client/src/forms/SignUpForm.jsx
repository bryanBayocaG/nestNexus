import { useState } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";

function SignUpForm() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backEndBaseURL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-dark p-3 rounded-lg focus:border-red-500 outline-none"
        placeholder="Username"
        id="userName"
        onChange={handleChange}
      />
      <input
        type="text"
        className="border border-dark p-3 rounded-lg focus:border-red-500 outline-none"
        placeholder="Email"
        id="email"
        onChange={handleChange}
      />
      <input
        type="password"
        className="border border-dark p-3 rounded-lg focus:border-red-500 outline-none"
        placeholder="Password"
        id="password"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-secondary text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary transition duration-300 ease-in-out"
      >
        Continue
      </button>
    </form>
  );
}

export default SignUpForm;
