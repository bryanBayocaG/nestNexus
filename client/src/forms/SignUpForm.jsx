import React from "react";

function SignUpForm() {
  return (
    <form className="flex flex-col gap-4" action="">
      <input
        type="text"
        className="border border-dark p-3 rounded-lg focus:border-red-500 outline-none"
        placeholder="Username"
        id="username"
      />
      <input
        type="text"
        className="border border-dark p-3 rounded-lg focus:border-red-500 outline-none"
        placeholder="Email"
        id="email"
      />
      <input
        type="password"
        className="border border-dark p-3 rounded-lg focus:border-red-500 outline-none"
        placeholder="Password"
        id="password"
      />
      <button className="bg-secondary text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary transition duration-300 ease-in-out">
        Continue
      </button>
    </form>
  );
}

export default SignUpForm;
