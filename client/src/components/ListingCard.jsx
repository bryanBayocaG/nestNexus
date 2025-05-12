import { imageSrc } from "../utils/imageAppwriteUrl";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaBath, FaBed } from "react-icons/fa";

function ListingCard({ listing }) {
  return (
    <Link
      to={`/listing-info/${listing._id}`}
      className="shadow-md hover:shadow-lg flex flex-col rounded-xl overflow-hidden h-[320px] cursor-pointer group  transition-all duration-300 ease-in-out grow"
    >
      <div className="h-[170px] overflow-hidden">
        <img
          src={imageSrc(listing.imageUrls[0])}
          className="object-contain group-hover:scale-105 transition-all duration-300 ease-in-out"
          alt={listing.name}
        />
      </div>
      <div className="p-4 h-[150px] gap-2">
        <div className="flex justify-between">
          <p className="font-bold text-secondary text-xl whitespace-nowrap">
            $ {listing.regularPrice.toLocaleString("en-US")}
          </p>
          <div className="flex text-sm gap-1 items-center flex-wrap">
            <div className="flex gap-1 text-white items-center px-2 py-1 bg-green-700 rounded-sm">
              <p className="  ">{listing.bedroom}</p>
              <FaBed />
            </div>

            <div className="flex gap-1 text-white items-center px-2 py-1 bg-green-700 rounded-sm">
              <p className="">{listing.bathroom}</p>
              <FaBath />
            </div>

            <p
              className={`${
                listing.furnished ? "bg-green-700" : "bg-red-700"
              } whitespace-nowrap px-2 py-1 text-white rounded-sm`}
            >
              {listing.furnished ? "Furnished" : "Unfurnished"}
            </p>

            <p
              className={`${
                listing.parking ? "bg-green-700" : "bg-red-700"
              } whitespace-nowrap px-2 py-1 text-white rounded-sm`}
            >
              {listing.parking ? "Parking" : "No Parking"}
            </p>
          </div>
        </div>
        <p className="text-lg">{listing.name}</p>
        <div className="flex justify-start gap-2 items-center my-1">
          <FaLocationDot className="text-red-700" />
          <p className="truncate text-sm">{listing.address}</p>
        </div>

        <p className="line-clamp-2 text-xs my-2">{listing.description}</p>
      </div>
    </Link>
  );
}

export default ListingCard;
