import ListingCard from "./ListingCard";
import NothingFound from "./NothingFound";
import PageLoader from "./PageLoader";

function SearchResultDisplay({ loading, listings }) {
  return (
    <div className="p-4">
      <p className="">{listings.length} listing result</p>
      <div className="p-2">
        {loading ? (
          <PageLoader loading={loading} />
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {listings.map((listing, i) => (
              <ListingCard key={i} listing={listing} />
            ))}
          </div>
        ) : (
          <NothingFound />
        )}
      </div>
    </div>
  );
}

export default SearchResultDisplay;
