import React, { useEffect, useState } from "react";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { useSelector } from "react-redux";
import { imageSrc } from "../../utils/imageAppwriteUrl";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modalState/modalSlice";
import { closeModal } from "../../redux/modalState/modalSlice";
import { Link } from "react-router-dom";

function ShowListing({ isActive }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [userListing, setUserListing] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
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
    if (isActive) {
      fetchListings();
    }
  }, [isActive, currentUser._id]);

  const handleClickDelete = async (listingId) => {
    console.log("Delete listing with ID:", listingId);
    try {
      const res = await fetch(
        `${backEndBaseURL}/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
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
      setUserListing(() => {
        return userListing.filter((listing) => listing._id !== listingId);
      });
      setError(null);
      dispatch(closeModal());
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center bg-white p-2">
        <h3 className="font-bold text-1xl">My Listing</h3>
        <div className="flex items-center gap-4 md:gap-6 text-sm sm:text-lg">
          <p>
            Total number of listing(s): <span>{userListing.length}</span>
          </p>
        </div>
      </div>
      {error ? (
        <div className="text-red-500 border-2 border-primary rounded-lg p-3 bg-gray-100">
          <p className="text-center">{error}</p>
        </div>
      ) : userListing.length > 0 ? (
        userListing &&
        userListing.map((listing) => (
          <div
            key={listing._id}
            // onClick={() => (window.location.href = `/listing/${listing._id}`)}
            onClick={() => console.log("Listing clicked")}
            className="border-2 border-gray-200 shadow-lg rounded-lg p-4 mb-4"
          >
            <div className="relative mb-4">
              <img
                className="h-48 w-full object-cover rounded-lg mb-4"
                src={imageSrc(listing.imageUrls[0])}
                alt={listing.name}
              />
              <div
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 rounded-lg hover:opacity-100 absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full h-full p-2 shadow-md gap-2 transition-all duration-300 ease-in-out"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full h-full flex flex-col justify-center items-center"
                >
                  <p className="text-gray-100">Edit or delete this listing.</p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Link to={`/listing-update/${listing._id}`}>
                      <button
                        onClick={() => console.log("button edi clicked")}
                        className="bg-blue-500 text-white rounded-md p-2 flex items-center gap-1 hover:scale-105 transition-all duration-300 ease-in-out"
                      >
                        <FaRegEdit /> <span>Edit</span>
                      </button>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedListingId(listing._id);
                        dispatch(openModal("deleteListingModal"));
                      }}
                      className="bg-red-500 text-white rounded-md p-2 flex items-center gap-1 hover:scale-105 transition-all duration-300 ease-in-out"
                    >
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
      <Modal title={"Delete this Listing"} modalId="deleteListingModal">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl font-bold">Are you sure?</h1>
          <p className="text-gray-500">
            This action cannot be undone. Do you want to proceed?
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleClickDelete(selectedListingId)}
              className="bg-red-500 text-white rounded-md p-2 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
            <button
              onClick={() => dispatch(closeModal())}
              className="bg-gray-500 text-white rounded-md p-2 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShowListing;
