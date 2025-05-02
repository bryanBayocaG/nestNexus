import React from "react";
import FileUpload from "../components/listingCreateComponent/FileUpload";

function ListingPage() {
  return (
    <main className="w-[95vw] m-auto mt-6 flex gap-4">
      <div className="shadow-lg p-4 rounded-lg border-2 border-gray-100">
        <h1 className="font-bold text-2xl pl-1">Listing</h1>
        <ul className="space-y-2 my-5 flex flex-col">
          <li className="w-full md:pr-2 lg:pr-10 p-2 text-start rounded-md hover:bg-gray-200">
            Create Listing
          </li>
          <li className="w-full md:pr-2 lg:pr-10 p-2 text-start rounded-md hover:bg-gray-200">
            Show Listing
          </li>
        </ul>
      </div>
      <div className="flex-1 shadow-lg p-4 rounded-lg border-2 border-gray-100">
        <h3 className="font-bold text-1xl pl-1">Create Listing</h3>
        <form className="flex flex-col md:flex-row">
          <div className="flex-1  p-5">
            <div className="flex flex-col gap-4 md:gap-2">
              <div className="flex flex-col">
                <label className="hidden md:block">Name</label>
                <input
                  className="border border-gray-200 p-3 rounded-lg focus:border-secondary outline-none"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="hidden md:block">Description</label>
                <textarea
                  className="border border-gray-200 p-3 rounded-lg focus:border-secondary outline-none"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="flex flex-col">
                <label className="hidden md:block">Address</label>
                <input
                  className="border border-gray-200 p-3 rounded-lg focus:border-secondary outline-none"
                  type="text"
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 p-5">
            <FileUpload />
            <button
              type="submit"
              className="w-full bg-secondary text-white rounded-lg p-1 hover:opacity-90 hover:scale-105 transition-all duration-300"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ListingPage;
