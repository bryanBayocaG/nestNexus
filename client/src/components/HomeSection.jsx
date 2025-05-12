import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import ListingCard from "./ListingCard";

function HomeSection({ thatListing, useFor }) {
  let title = "";
  if (useFor === "offer") {
    title = "Recent Offer";
  } else if (useFor === "sale") {
    title = "Recent Sale";
  } else if (useFor === "rent") {
    title = "Recent Rent Posting";
  }
  return (
    <section id="recent_offer" className="flex flex-col gap-4 p-5">
      <h2 className="font-extrabold text-1xl md:text-2xl lg:text-3xl flex flex-col md:flex-row md:gap-2">
        {title}
      </h2>
      <div>
        <Swiper
          breakpoints={{
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {thatListing.map((listing, i) => (
            <SwiperSlide key={i}>
              <ListingCard listing={listing} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="bg-blue-700 w-full h-[320px] flex flex-col justify-center items-center">
              <button>See more</button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default HomeSection;
