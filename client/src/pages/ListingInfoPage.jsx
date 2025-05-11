import { useEffect, useState } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { imageSrc } from "../utils/imageAppwriteUrl";
import { FaBath, FaBed, FaChair, FaShare } from "react-icons/fa";
import Divider from "../components/Divider";
import { BiSolidCarGarage } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { openModal } from "../redux/modalState/modalSlice";
import ContactLandordFrom from "../forms/ContactLandordFrom";
import PageLoader from "../components/PageLoader";
function ListingInfoPage() {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
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
        <PageLoader loading={isLoading} />
      ) : (
        listing && (
          <>
            <div className="p-2 md:p-5 relative">
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
                className="absolute bg-white/30 backdrop-blur-sm border-2 border-secondary p-2 rounded-md top-6 md:top-12 right-6 md:right-12 text-secondary z-10 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
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
                    <div className="text-xl md:text-2xl font-bold text-secondary">
                      {listing.offer ? (
                        <div className="flex gap-1 items-center">
                          <h1>
                            $ {listing.discountPrice.toLocaleString("en-US")}
                          </h1>
                          <p className="text-sm md:text-md px-2 p-1 bg-secondary text-white rounded-md">
                            Discounted Price
                          </p>
                        </div>
                      ) : (
                        <h1>
                          $ {listing.regularPrice.toLocaleString("en-US")}
                        </h1>
                      )}
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold">
                      {listing.name}
                    </h2>
                    <p className="text-xs lg:text-base">{listing.address}</p>
                  </div>
                  <div className="flex gap-2 md:gap-4 text-xs md:text-sm flex-wrap">
                    <div className="flex justify-center items-center gap-1 bg-green-700 p-2 px-2 text-white rounded-md">
                      <FaBed />
                      <div className="">{listing.bedroom}</div>
                      <p className="">
                        Bed<span>{listing.bedroom ? "s" : ""}</span>
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1 bg-green-700 p-2 px-2 text-white rounded-md">
                      <FaBath />
                      <div className="">{listing.bathroom}</div>
                      <p className="">
                        Bath<span>{listing.bathroom > 1 ? "s" : ""}</span>
                      </p>
                    </div>
                    <div
                      className={`flex justify-center items-center gap-1 p-2 px-2 text-white rounded-md ${
                        listing.parking ? "bg-green-700" : "bg-red-700"
                      }`}
                    >
                      <FaChair />
                      <p className="">
                        {listing.furnished ? "Furnished" : "Unfurnished"}
                      </p>
                    </div>
                    <div
                      className={`flex justify-center items-center gap-1 p-2 px-2 text-white rounded-md ${
                        listing.parking ? "bg-green-700" : "bg-red-700"
                      }`}
                    >
                      <BiSolidCarGarage />
                      <p className="">
                        {listing.parking ? "Parking spot" : "No parking"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 md:gap-4 items-center">
                  <p className="text-sm md:text-lg font-semibold text-white bg-secondary px-4 md:px-6 py-1 rounded-md">
                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                  </p>
                  {listing.offer && (
                    <p className="text-sm md:text-lg font-semibold text-white bg-green-600 px-4 md:px-6 py-1 rounded-md">
                      $
                      {(
                        listing.regularPrice - listing.discountPrice
                      ).toLocaleString("en-US")}{" "}
                      discount
                    </p>
                  )}
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h3 className="text-md md:text-xl font-bold">Description</h3>
                  <p className="leading-relaxed text-xs md:text-base tracking-normal text-justify ">
                    {listing.description}
                  </p>
                </div>
              </div>
              {currentUser && listing.userRef !== currentUser._id && (
                <div className="border-2 bg-white w-full md:w-fit sticky bottom-0 md:top-20 border-gray-200 p-2 lg:p-4 h-fit md:rounded-lg">
                  <button
                    onClick={() => dispatch(openModal("contactLandlordModal"))}
                    className="bg-secondary text-white w-full md:px-10 lg:px-20 py-2 rounded-md hover:opacity-80 transition duration-300 ease-in-out"
                  >
                    Contact Landlord
                  </button>
                </div>
              )}
            </div>
            <Modal
              title={`Contact landlord of "${listing.name}"`}
              modalId="contactLandlordModal"
            >
              <ContactLandordFrom
                email={currentUser.email}
                listing={listing.name}
                poster_email={listing.contact_email}
              />
            </Modal>
          </>
        )
      )}
    </main>
  );
}

export default ListingInfoPage;
