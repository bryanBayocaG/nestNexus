import ListingCard from "./ListingCard";

function SearchResultDisplay({ loading, listings }) {
  return (
    <div className="p-4">
      <p className="">{listings.length} listing result</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {/* card */}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {listings.map((listing, i) => (
              <ListingCard key={i} listing={listing} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResultDisplay;
