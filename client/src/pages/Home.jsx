import { useState } from "react";
import SearchPageSearchForm from "../forms/SearchPageSearchForm";

const Home = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    address: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [setListings] = useState([]);
  return (
    <main>
      <section className="relative h-[75vh] bg-[url(/heroBG.jpg)] bg-cover bg-center flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(158,28,28,0.8)] to-[rgba(212,175,55,0.8)] z-10" />
        <div className="relative z-20 flex flex-col">
          <div className="text-white flex flex-col justify-center items-center gap-2 ">
            <h1 className="font-extrabold text-center text-4xl md:text-5xl lg:text-6xl flex flex-col md:flex-row md:gap-2">
              Find Your <span>Perfect Home</span>
            </h1>
            <p className="text-xs md:text-sm text-center p-2 max-w-sm">
              NestNexus will help you find the best residence you dream of,
              let’s discuss for your dream house?
            </p>
          </div>
          <div className="bg-white/30 backdrop-blur-none p-4 rounded-md">
            <SearchPageSearchForm
              useFor="home"
              setListings={setListings}
              loading={loading}
              setLoading={setLoading}
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
