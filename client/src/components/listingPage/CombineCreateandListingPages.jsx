import SideTabs from "../SideTabs";
import CreateListing from "./CreateListing";
import ShowListing from "./ShowListing";

function CombineCreateandListingPages() {
  const tabs = [
    { id: "createListing", name: "Create Listing" },
    { id: "showListing", name: "Show Listing" },
  ];
  const tabContent = {
    createListing: <CreateListing />,
    showListing: <ShowListing />,
  };
  return <SideTabs title="Listing" tabs={tabs} tabContent={tabContent} />;
}

export default CombineCreateandListingPages;
