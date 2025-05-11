import { Link } from "react-router-dom";
import Modal from "./Modal";
import HeaderSearch from "../forms/HeaderSearch";
import CombineSignInandUp from "../forms/CombineSignInandUp";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../redux/modalState/modalSlice";
import ProfileDropDown from "./ProfileDropDown";
import { imageSrc } from "../utils/imageAppwriteUrl";
import { useMotionValueEvent, useScroll } from "motion/react";
const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { openModalId } = useSelector((state) => state.modal);
  const myImage = imageSrc(currentUser?.avatar);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", Math.ceil(latest));
  });

  return (
    <>
      <header className="bg-white shadow-md z-50 boder-2 border-b-gray-400">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <Link to="/">
            <h1 className="font-bold  text-sm sm:text-xl lg:text-2xl flex items-center flex-wrap">
              <img className="w-12" src="/Noxus_Crest.png" alt="" />
              <span className="text-primary">Nest</span>
              <span className="text-secondary">Nexus</span>
            </h1>
          </Link>
          <HeaderSearch />
          <ul className="flex items-center gap-4 md:gap-6 text-sm sm:text-lg">
            <Link to="/">
              <li className="hidden sm:inline hover:text-primary transition duration-300 ease-in-out">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:text-primary transition duration-300 ease-in-out">
                About
              </li>
            </Link>
            {currentUser ? (
              <ProfileDropDown
                imgSrc={myImage}
                userName={currentUser?.userName}
              />
            ) : (
              <li
                className="bg-secondary text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-primary transition duration-300 ease-in-out"
                onClick={() => dispatch(openModal("authModal"))}
              >
                Sign Up
              </li>
            )}
          </ul>
        </div>
      </header>
      <Modal title={"Welcome to NestNexus"} modalId="authModal">
        <CombineSignInandUp isVisible={openModalId === "authModal"} />
      </Modal>
    </>
  );
};

export default Header;
