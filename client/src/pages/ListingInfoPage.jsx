import { useEffect, useState } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";
import { useParams } from "react-router-dom";
import { HashLoader, PulseLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { imageSrc } from "../utils/imageAppwriteUrl";
import { FaShare } from "react-icons/fa";
import Divider from "../components/Divider";

function ListingInfoPage() {
  const [copied, setCopied] = useState(false);
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
  console.log("fetched listing info", listing);
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
            <p className="text-center">Loading</p>
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
          <>
            <div className="p-2 md:p-5">
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {listing.imageUrls.map((image, index) => (
                  <SwiperSlide className="" key={index}>
                    <img
                      src={imageSrc(image)}
                      alt="listing"
                      className="w-full h-52 md:h-96 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1500);
                }}
                className="absolute border-2 border-secondary p-2 rounded-md top-12 right-12 text-secondary z-10 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
              >
                <FaShare />
              </div>
              {copied && (
                <div className="text-xs  ml-2 z-10 absolute top-24 right-12 bg-white p-2 rounded-md shadow-md">
                  <p>Copied to clipboard</p>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2  md:p-5 shadow-lg">
              <div className="flex flex-1 flex-col gap-2 w-full p-5 md:border-2 border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-xl md:text-4xl font-bold text-secondary">
                      ${" "}
                      {listing.offer
                        ? listing.discountPrice.toLocaleString("en-US")
                        : listing.regularPrice.toLocaleString("en-US")}
                    </h1>
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {listing.name}
                    </h2>
                    <p className="text-xs md:text-base">{listing.address}</p>
                  </div>
                  <div className="flex gap-2 md:gap-4">
                    <div className="flex flex-col justify-center items-center gap-1">
                      <div className="text-lg md:text-2xl">
                        {listing.bedroom}
                      </div>
                      <p className="text-sm md:text-lg">Bedrooms </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                      <div className="text-lg md:text-2xl">
                        {listing.bathroom}
                      </div>
                      <p className="text-sm md:text-lg">Bathrooms</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p>Type</p>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h3 className="text-md md:text-xl font-bold">Description</h3>
                  <p className="leading-relaxed text-xs md:text-base tracking-normal text-justify ">
                    {listing.description}
                  </p>
                </div>
              </div>
              <div className="border-2 bg-white w-full md:w-fit sticky bottom-0 md:top-20 border-gray-200 p-3 md:p-5 h-fit md:rounded-lg">
                <button className="bg-secondary text-white w-full md:px-10 lg:px-20 py-2 rounded-md hover:scale-105 transition duration-300 ease-in-out">
                  Contact Agent
                </button>
              </div>
            </div>
          </>
        )
      )}
    </main>
  );
}

export default ListingInfoPage;
