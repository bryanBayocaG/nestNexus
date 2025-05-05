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

export default function App() {
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
