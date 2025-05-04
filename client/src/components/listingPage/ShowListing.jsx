import React, { useEffect, useState } from "react";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { useSelector } from "react-redux";

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
  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {userListing.length > 0 &&
        userListing &&
        userListing.map((listing) => (
          <div
            key={listing._id}
            className="border-2 border-gray-300 rounded-lg p-4 mb-4"
          >
            <h3 className="font-bold text-xl">{listing.name}</h3>
            <p>{listing.description}</p>
            <p className="text-gray-500">Price: ${listing.regularPrice}</p>
            <p className="text-gray-500">Location: {listing.address}</p>
          </div>
        ))}
    </>
  );
}

export default ShowListing;
