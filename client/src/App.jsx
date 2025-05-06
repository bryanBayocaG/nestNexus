import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import SignIn from "./pages/signIn";
import AboutPage from "./pages/AboutPage";
import ListingPage from "./pages/ListingPage";
import SignOut from "./pages/SignOut";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import Setting from "./pages/Setting";
import UpdateListingPage from "./pages/UpdateListingPage";
import ListingInfoPage from "./pages/ListingInfoPage";
import { useEffect } from "react";
import { backEndBaseURL } from "./utils/backendBaseURL";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "./redux/user/userSlice";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${backEndBaseURL}/api/auth/check-session`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          console.log("Session expire", data.message);
          dispatch(signOut());
          return;
        }
      } catch (error) {
        console.log(error);
        dispatch(signOut());
      }
    };
    if (currentUser) {
      checkSession();
    }
  }, [currentUser, dispatch]);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/sign-in" element={<SignIn />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route
            path="/listing-info/:listingId"
            element={<ListingInfoPage />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<Setting />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route
              path="/listing-update/:listingId"
              element={<UpdateListingPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
