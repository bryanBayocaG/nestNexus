import React from "react";

function ListingPage() {
  return (
    <section className="p-5 flex gap-4">
      <div className="shadow-lg p-4 rounded-lg border-2 border-gray-100">
        <h2 className="font-bold text-2xl pl-1">Listing</h2>
        <ul className="space-y-2 pr-10 my-5 flex flex-col">
          <li className="w-full pr-10 p-2 px-8 pl-1 text-start rounded-md hover:bg-gray-200">
            Create Listing
          </li>
          <li className="w-full pr-10 p-2 px-8 pl-1 text-start rounded-md hover:bg-gray-200">
            Show Listing
          </li>
        </ul>
      </div>
      <div className="flex-1 shadow-lg p-4 rounded-lg border-2 border-gray-100">
        <h3 className="font-bold text-1xl pl-1">Create Listing</h3>
      </div>
    </section>
  );
}

export default ListingPage;
