import { useEffect } from "react";
import { backEndBaseURL } from "../utils/backendBaseURL";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import ButtonLoader from "../components/ButtonLoader";
function SearchPageSearchForm({
  setListings,
  loading,
  setLoading,
  searchData,
  setSearchData,
  useFor,
}) {
  const navigate = useNavigate();

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
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const addressFromUrl = urlParams.get("address");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      addressFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        address: addressFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${backEndBaseURL}/api/listing/get?${searchQuery}`
      );
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };
    if (useFor === "home") {
      return;
    }
    fetchListing();
  }, [location.search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("address", searchData.address);
    urlParams.set("type", searchData.type);
    urlParams.set("parking", searchData.parking);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("offer", searchData.offer);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
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
            {loading ? (
              <>
                <ButtonLoader size={6} loading={loading} />
              </>
            ) : (
              <>
                <div className="lg:hidden">
                  <FaSearch />
                </div>
                <p className="hidden lg:block">Find it now!</p>
              </>
            )}
          </button>
        </div>
      </div>
      {/* sorting option */}
      <div
        className={`${
          useFor === "home" ? "text-white" : ""
        } flex items-center justify-center p-1 w-[95vw] md:w-[75vw] gap-1 md:gap-4 text-xs`}
      >
        <div className="flex flex-col gap-2 basis-1/4 ">
          <label>Type</label>
          <select
            onChange={handleChange}
            value={searchData.type}
            id="type"
            className="w-full text-gray-600"
          >
            <option value="all">Rent & Sale</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>
        {useFor != "home" && (
          <div className="flex flex-col gap-2 basis-1/4 ">
            <label>Sort by:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="w-full text-gray-600"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
            </select>
          </div>
        )}

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
  );
}

export default SearchPageSearchForm;
