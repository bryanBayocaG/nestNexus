import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(signOut());
    navigate("/");
  };
};

export default useSignOut;
