import { FaSearch } from "react-icons/fa";

function HeaderSearch() {
  return (
    <form className="bg-slate-100 rounded-lg p-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-40 md:w-50 lg:w-60"
      />

      <FaSearch className="text-secondary cursor-pointer" />
    </form>
  );
}

export default HeaderSearch;
