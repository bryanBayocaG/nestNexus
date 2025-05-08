import SideTabs from "../SideTabs";
import CreateListing from "./CreateListing";
import ShowListing from "./ShowListing";

function CombineCreateandListingPages() {
  const tabs = [
    { id: "showListing", name: "Show Listing" },
    { id: "createListing", name: "Create Listing" },
  ];

  // Notice we're storing the *component functions*, not JSX
  const tabContent = {
    createListing: (props) => <CreateListing {...props} />,
    showListing: (props) => <ShowListing {...props} />,
  };
  return <SideTabs title="Listing" tabs={tabs} tabContent={tabContent} />;
}

export default CombineCreateandListingPages;
