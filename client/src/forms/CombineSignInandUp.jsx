import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SwitchingTabs from "../components/SwitchingTabs";

function CombineSignInandUp({ isVisible }) {
  const tabs = [
    { id: "signIn", name: "Sign In" },
    { id: "signUp", name: "Sign Up" },
  ];
  const tabContent = {
    signIn: <SignInForm />,
    signUp: <SignUpForm />,
  };

  return (
    <SwitchingTabs tabs={tabs} tabContent={tabContent} isVisible={isVisible} />
  );
}

export default CombineSignInandUp;
