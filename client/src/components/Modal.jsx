import React from "react";

function Modal({ open, onClose, children, title }) {
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
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 flex items-center transition-colors  bg-black/20 ${
          open ? "block" : "hidden"
        }`}
      >
        {/* modal itself */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={` bg-white rounded-xl shadow-2xl p-6 transition-all transform w-full max-w-sm md:max-w-xl mx-auto my-4 ${
            open
              ? "block scale-100 animate-[slideDown_0.5s_ease-out_forwards]"
              : "opacity-0 "
          }`}
        >
          <div>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 rounded-lg text-dark bg-white hover:bg-gray-50 hover:text-gray-600"
            >
              &#x2715;
            </button>
            <h2 className="text-lg font-semibold text-center mb-4 text-dark">
              {title}
            </h2>
            <div className="h-px bg-dark w-full -mt-3 mb-4" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
