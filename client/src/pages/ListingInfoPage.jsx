import { useEffect, useState } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";
import { useParams } from "react-router-dom";
import { HashLoader, PulseLoader } from "react-spinners";

function ListingInfoPage() {
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fectchListing = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${backEndBaseURL}/api/listing/get/${params.listingId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          setIsLoading(false);
          return;
        }
        setListing(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fectchListing();
  }, [params.listingId]);
  console.log(listing);
  return (
    <main className="flex flex-grow flex-col">
      {isLoading ? (
        <div className="flex flex-col justify-center  items-center my-auto p-5">
          <HashLoader
            color="#D4AF37"
            loading={isLoading}
            size={60}
            aria-label="pulse loader"
            data-testid="loader"
          />
          <div className="flex items-center justify-center gap-1 mt-2">
            <p className="text-gray-500 text-center">Loading</p>
            <PulseLoader
              color="#D4AF37"
              loading={isLoading}
              size={10}
              aria-label="pulse loader"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        listing && (
          <div className="listing-info-page">
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>
            <p>Location: {listing.location}</p>
            <p>Category: {listing.category}</p>
            {listing.imageUrls.map((image, i) => (
              <p key={i}>{image}</p>
            ))}
          </div>
        )
      )}
    </main>
  );
}

export default ListingInfoPage;
