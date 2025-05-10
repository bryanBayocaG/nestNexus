import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HeaderSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm); // Set the search term in the URL parameters
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl); // Set the search term from the URL parameters
    }
  }, []);
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="bg-slate-100 rounded-lg p-3 flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-40 md:w-50 lg:w-60"
        value={searchTerm}
        autoComplete="off"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button type="submit">
        <FaSearch className="text-secondary cursor-pointer" />
      </button>
    </form>
  );
}

export default HeaderSearch;
