import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper/modules";

import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";

function HomeSection({ thatListing, useFor }) {
  let title = "";
  let toFind = "";
  if (useFor === "offer") {
    title = "Recent Offer";
    toFind = "offer=true";
  } else if (useFor === "sale") {
    toFind = "type=sale";
    title = "Recent Sale";
  } else if (useFor === "rent") {
    title = "Recent Rent Posting";
    toFind = "type=rent";
  }
  return (
    <section
      id="recent_offer"
      className="flex flex-col gap-4 p-5 max-w-[1140px]"
    >
      <h2 className="font-extrabold text-1xl md:text-2xl lg:text-3xl flex flex-col md:flex-row md:gap-2">
        {title}
      </h2>

      <div>
        <Swiper
          navigation={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          spaceBetween={30}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {thatListing.map((listing, i) => (
            <SwiperSlide className="p-1" key={i}>
              <ListingCard listing={listing} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className=" w-full h-[320px] flex flex-col justify-center items-start">
              <Link
                to={`search?${toFind}`}
                className="border-2 border-secondary text-secondary px-4 py-2 rounded-full shadow-md hover:bg-secondary hover:text-white hover:shadow-lg transition-colors duration-300 ease-in-out"
              >
                See more &rarr;
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default HomeSection;
