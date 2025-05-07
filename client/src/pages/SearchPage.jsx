import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
function SearchPage() {
  return (
    <main className="flex flex-col gap-4">
      <div className="bg-gray-200 p-4">
        <form className="flex flex-col items-center justify-center">
          {/* search bar */}
          <div className="flex items-center bg-white justify-center p-1 md:w-[75vw] gap-2 shadow-lg rounded-md">
            <div className="flex w-full  justify-center items-center gap-2 grow-7">
              <div className="flex w-full  items-center px-2">
                <FaSearch />
                <input
                  type="text"
                  className="bg-transparent p-2 focus:outline-none w-full"
                />
              </div>
              |
              <div className="flex w-full items-center px-2">
                <FaLocationDot />
                <input
                  type="text"
                  className="bg-transparent p-2 focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="grow-3">
              <button className="bg-secondary lg:w-36 px-4 py-4 lg:py-2 text-white rounded-md">
                <div className="lg:hidden">
                  <FaSearch />
                </div>
                <p className="hidden lg:block">Find it now!</p>
              </button>
            </div>
          </div>
          {/* sorting option */}
          <div className="flex items-center justify-center p-1 md:w-[75vw] gap-4">
            <div className="flex flex-col gap-2">
              <label>Type</label>
              <select name="" id="">
                <option value="">Rent & Sale</option>
                <option value="">Rent</option>
                <option value="">Sale</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Sort by:</label>
              <select name="" id="">
                <option value="">Latest</option>
                <option value="">Descending</option>
                <option value="">Ascending</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Amenities:</label>
              <div className="flex gap-2">
                <div className="flex">
                  <input type="checkbox" />
                  <p>Parking</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Furnished</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="opacity-0">Clear button</label>
              <button>Clear all</button>
            </div>
          </div>
        </form>
      </div>
      <div className="p-4">cards</div>
    </main>
  );
}

export default SearchPage;
