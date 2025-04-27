import { useState } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";

function SignInForm() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${backEndBaseURL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        setError(error.message);
      }
    }
    setFormData({
      userName: "",
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
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <input
        type="text"
        value={formData.userName}
        className="border border-dark p-3 rounded-lg focus:border-secondary outline-none"
        placeholder="Username"
        id="userName"
        onChange={handleChange}
        required
      />
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
        className="border border-dark p-3 rounded-lg focus:border-secondaryoutline-none"
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
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignInForm;
