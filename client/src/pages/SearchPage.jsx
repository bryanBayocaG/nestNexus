import { useState } from "react";

import SearchPageSearchForm from "../forms/SearchPageSearchForm";
import SearchResultDisplay from "../components/SearchResultDisplay";
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

  return (
    <main className="flex flex-col gap-4">
      <div className="bg-gray-200 p-4">
        <SearchPageSearchForm
          setListings={setListings}
          loading={loading}
          setLoading={setLoading}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>
      <SearchResultDisplay loading={loading} listings={listings} />
    </main>
  );
}

export default SearchPage;
