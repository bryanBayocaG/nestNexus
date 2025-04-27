import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../config/fireBase";

function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Result:", result);
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <>
      <div className="relative flex items-center justify-center w-full my-4 bg-red-700">
        <div className="h-px bg-dark w-full " />

        <span className="absolute bg-white px-2 text-dark font-semibold">
          or
        </span>
      </div>
      <div>
        <button
          type="button"
          onClick={handleGoogleClick}
          className="bg-primary text-white rounded-lg px-4 py-2 cursor-pointer  hover:scale-105 transition duration-300 ease-in-out flex items-center gap-2 justify-center w-full disabled:hover:bg-dark disabled:bg-dark disabled:cursor-not-allowed"
        >
          <FcGoogle />
          Sign in with Google
        </button>
      </div>
    </>
  );
}

export default OAuth;
