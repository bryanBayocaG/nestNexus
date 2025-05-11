import React from "react";

function Pagination({ totalLists, listPerPage, currentPage, setCurrentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalLists / listPerPage); i++) {
    pages.push(i);
  }

  console.log("current page:", currentPage);

  return (
    <div className="flex gap-2 justify-center items-center">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentPage(page), console.log("clicked", page);
          }}
          className={`p-2 rounded-lg   w-10 h-10 border-2 border-secondary ${
            currentPage === page ? "bg-secondary text-white" : "text-secondary"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
