import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/modalState/modalSlice";
function Modal({ children, title, modalId }) {
  const dispatch = useDispatch();
  const { openModalId } = useSelector((state) => state.modal);
  const isOpen = openModalId === modalId;
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
        // onClick={onClose}
        onClick={() => dispatch(closeModal())}
        className={`fixed inset-0 flex items-center transition-colors z-50 bg-black/20 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* modal itself */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={` bg-white rounded-xl shadow-2xl p-6 transition-all transform w-full max-w-sm md:max-w-xl mx-auto my-4 ${
            isOpen
              ? "block scale-100 animate-[slideDown_0.5s_ease-out_forwards]"
              : "opacity-0 "
          }`}
        >
          <div>
            <button
              onClick={() => dispatch(closeModal())}
              className="absolute w-fit h-fit top-2 right-6 p-1 rounded-lg text-dark bg-white hover:bg-gray-200 hover:text-secondary transition duration-300 ease-in-out text-xl font-bold"
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
