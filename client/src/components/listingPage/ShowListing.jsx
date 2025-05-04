import React, { useEffect, useState } from "react";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { useSelector } from "react-redux";
import { imageSrc } from "../../utils/imageAppwriteUrl";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

function ShowListing({ isActive }) {
  const [error, setError] = useState(null);
  const [userListing, setUserListing] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (isActive) {
      fetchListings();
    }
  }, [isActive]);
  const fetchListings = async () => {
    try {
      const res = await fetch(
        `${backEndBaseURL}/api/user/listings/${currentUser._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(userListing);
  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {userListing.length > 0 ? (
        userListing &&
        userListing.map((listing) => (
          <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
            <div className="relative mb-4">
              <img
                className="h-48 w-full object-cover rounded-lg mb-4"
                src={imageSrc(listing.imageUrls[0])}
                alt={listing.name}
              />
              <div
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 hover:opacity-100 absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full h-full p-2 shadow-md gap-2 transition-all duration-300 ease-in-out"
              >
                <div className="relative w-full h-full">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="bg-blue-500 text-white rounded-md p-2 flex items-center gap-1">
                      <FaRegEdit /> <span>Edit</span>
                    </button>
                    <button className="bg-red-500 text-white rounded-md p-2 flex items-center gap-1">
                      <FaRegTrashAlt /> <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-bold text-xl">{listing.name}</h3>
            <p className="text-gray-500">Price: ${listing.regularPrice}</p>
            <p className="text-gray-500">Location: {listing.address}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl font-bold">No Listings Found</h1>
          <p className="text-gray-500">
            You have not created any listings yet.
          </p>
        </div>
      )}
    </>
  );
}

export default ShowListing;
