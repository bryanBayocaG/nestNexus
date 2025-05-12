import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import { useTailwindBreakpoint } from "../hooks/monitorScreenSizel";
import { useEffect, useState } from "react";

function HomeSection({ thatListing, useFor }) {
  const breakpoint = useTailwindBreakpoint();
  const [listToView, setListToView] = useState(1);
  useEffect(() => {
    if (["md", "lg", "xl", "2xl"].includes(breakpoint)) {
      setListToView(2);
    } else {
      setListToView(1);
    }
  }, [breakpoint]);
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
    <section id="recent_offer" className="flex flex-col gap-4 p-5">
      <h2 className="font-extrabold text-1xl md:text-2xl lg:text-3xl flex flex-col md:flex-row md:gap-2">
        {title}
      </h2>

      <Swiper
        slidesPerView={listToView}
        spaceBetween={30}
        // centeredSlides={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination]}
        className="mySwiper w-[95vw] md:max-w-[75vw] rounded-md"
      >
        {thatListing.map((listing, i) => (
          <SwiperSlide className="p-1 " key={i}>
            <ListingCard listing={listing} />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className=" h-[320px] flex flex-col justify-center items-start p-5 md:p-0">
            <Link
              to={`search?${toFind}`}
              className="border-2 border-secondary text-secondary px-4 py-2 rounded-full shadow-md hover:bg-secondary hover:text-white hover:shadow-lg transition-colors duration-300 ease-in-out"
            >
              See more &rarr;
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HomeSection;
