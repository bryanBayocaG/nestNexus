import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
function SearchPage() {
  return (
    <main className="flex flex-col md:flex-row gap-4">
      <div className="bg-gray-200 p-4">
        <form>
          {/* search bar */}
          <div className="flex items-center bg-white justify-center p-1  gap-2 shadow-lg rounded-md">
            <div className="flex justify-center items-center gap-2 grow-[75vw]">
              <div className="flex items-center px-2">
                <FaSearch />
                <input type="text" className="p-2 focus:outline-none w-full" />
              </div>
              |
              <div className="flex items-center px-2">
                <FaLocationDot />
                <input type="text" className="p-2 focus:outline-none w-full" />
              </div>
            </div>
            <div className="grow-[25vw]">
              <button className="bg-secondary w- px-4 py-4 text-white rounded-md">
                <div className="lg:hidden">
                  <FaSearch />
                </div>
                <p className="hidden lg:block">Find it now!</p>
              </button>
            </div>
          </div>
          {/* sorting option */}
          <div></div>
        </form>
      </div>
      <div className="p-4">cards</div>
    </main>
  );
}

export default SearchPage;
