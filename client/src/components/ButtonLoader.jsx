import React from "react";
import { PulseLoader } from "react-spinners";

function ButtonLoader({ loading, size }) {
  return (
    <div className="whitespace-nowrap">
      <PulseLoader
        color="#ffffff"
        loading={loading}
        size={size}
        aria-label="pulse loader"
        data-testid="loader"
      />
    </div>
  );
}

export default ButtonLoader;
