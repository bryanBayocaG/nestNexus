import React from "react";

function Modal({ open, onClose, children }) {
  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            0% {
              transform: translateY(-300px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex items-center transition-colors  bg-black/20 ${
          open ? "block" : "hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={` bg-white rounded-xl shadow-lg p-6 transition-all transform w-full max-w-sm md:max-w-xl mx-auto my-4 ${
            open
              ? "block scale-100 animate-[slideDown_0.5s_ease-out_forwards]"
              : "opacity-0 "
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
