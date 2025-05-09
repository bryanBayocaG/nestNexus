import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function SearchPage() {
  const navigate = useNavigate();
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
  const handleChange = (e) => {
    if (e.target.id === "searchTerm" || e.target.id === "address") {
      setSearchData({ ...searchData, [e.target.id]: e.target.value });
    }
    if (e.target.id === "type") {
      console.log("type is change to", e.target.value);
      setSearchData({
        ...searchData,
        [e.target.id]: e.target.value,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "clear_all") {
      setSearchData({
        searchTerm: "",
        address: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("address", searchData.address);
    urlParams.set("type", searchData.type);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    urlParams.set("parking", searchData.parking);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("offer", searchData.offer);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <main className="flex flex-col gap-4">
      <div className="bg-gray-200 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          {/* search bar */}
          <div className="flex items-center bg-white justify-center p-1 w-[95vw] md:w-[75vw] gap-2 shadow-lg rounded-md">
            <div className="flex w-full  justify-center items-center gap-2 grow-7">
              <div className="flex w-full  items-center px-2">
                <FaSearch />
                <input
                  type="text"
                  id="searchTerm"
                  className="bg-transparent p-2 focus:outline-none w-full"
                  value={searchData.searchTerm}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              |
              <div className="flex w-full items-center px-2">
                <FaLocationDot />
                <input
                  type="text"
                  id="address"
                  className="bg-transparent p-2 focus:outline-none w-full"
                  value={searchData.address}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grow-3">
              <button
                type="submit"
                className="bg-secondary lg:w-36 px-4 py-4 lg:py-2 text-white rounded-md hover:opacity-90"
              >
                <div className="lg:hidden">
                  <FaSearch />
                </div>
                <p className="hidden lg:block">Find it now!</p>
              </button>
            </div>
          </div>
          {/* sorting option */}
          <div className="flex items-center justify-center p-1 w-[95vw] md:w-[75vw] gap-1 md:gap-4 text-xs ">
            <div className="flex flex-col gap-2 basis-1/4 ">
              <label>Type</label>
              <select
                onChange={handleChange}
                value={searchData.type}
                id="type"
                className="w-full"
              >
                <option value="all">Rent & Sale</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 basis-1/4 ">
              <label>Sort by:</label>
              <select
                onChange={handleChange}
                defaultValue={"created_at_desc"}
                id="sort_order"
              >
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 basis-1/4 ">
              <label>Amenities:</label>
              <div className="flex gap-1  md:gap-2">
                <div className="flex flex-1 ">
                  <input
                    type="checkbox"
                    id="parking"
                    checked={searchData.parking}
                    onChange={handleChange}
                  />
                  <p>Parking</p>
                </div>
                <div className="flex flex-1 ">
                  <input
                    type="checkbox"
                    id="furnished"
                    checked={searchData.furnished}
                    onChange={handleChange}
                  />
                  <p>Furnished</p>
                </div>
              </div>
            </div>
            <div className="flex basis-1/4 md:gap-2 ">
              <div className="flex gap-2 flex-col basis-[60%] justify-center items-center ">
                <label className="opacity-0">Is offered:</label>
                <div className="flex">
                  <input
                    type="checkbox"
                    id="offer"
                    checked={searchData.offer}
                    onChange={handleChange}
                  />
                  <p>Offer</p>
                </div>
              </div>

              <div className="flex flex-col basis-[40%] items-center justify-center ">
                <button
                  id="clear_all"
                  type="button"
                  onClick={handleChange}
                  className="whitespace-nowrap"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="p-4">
        <p className="">28 listing result</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
          {/* card */}

          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="shadow-lg flex flex-col rounded-xl overflow-hidden h-[300px] cursor-pointer"
            >
              <div className="flex-[3] h-[160px] overflow-hidden">
                <img src="test.webp" className="object-contain" alt="" />
              </div>
              <div className="flex-[2] p-2 h-[140px]">
                <p className="font-bold text-secondary text-lg">$ 155000</p>
                <p>{i}</p>
                <div className="flex gap-1">
                  <p>2 beds</p>|<p>2 baths</p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet quae hic quaerat nihil, blanditiis delectus rem ullam
                  quas est modi iste laudantium animi sed nulla dicta quasi
                  optio veritatis mollitia.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
