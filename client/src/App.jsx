import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import SignIn from "./pages/signIn";
import AboutPage from "./pages/AboutPage";
import SignOut from "./pages/SignOut";
import Profile from "./pages/Profile";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 flex flex-col min-h-screen ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/sign-in" element={<SignIn />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
