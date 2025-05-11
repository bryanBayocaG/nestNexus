import { useState } from "react";

import SearchPageSearchForm from "../forms/SearchPageSearchForm";
import SearchResultDisplay from "../components/SearchResultDisplay";
import Pagination from "../components/Pagination";
function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage] = useState(6);

  const lastListingIndex = currentPage * listPerPage;
  const firstListingIndex = lastListingIndex - listPerPage;

  const currentListing = listings.slice(firstListingIndex, lastListingIndex);
  return (
    <main className="flex flex-col gap-4 pb-4">
      <div className="bg-gray-200 p-4">
        <SearchPageSearchForm
          setListings={setListings}
          loading={loading}
          setLoading={setLoading}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>
      <SearchResultDisplay loading={loading} listings={currentListing} />
      <Pagination
        totalLists={listings.length}
        listPerPage={listPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}

export default SearchPage;
