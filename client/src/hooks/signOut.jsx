import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { backEndBaseURL } from "../utils/backendBaseURL";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    try {
      await fetch(`${backEndBaseURL}/api/auth/signout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
    dispatch(signOut());
    navigate("/");
  };
};

export default useSignOut;
