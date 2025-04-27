import SwitchingTabs from "../components/SwitchingTabs";

function AboutPage() {
  const tabs = [
    { id: "tab1", name: "Tab 1" },
    { id: "tab2", name: "Tab 2" },
  ];

  const tabContent = {
    tab1: (
      <div className="tab-content">
        <h2>Tab 1 Content</h2>
        <p>This is the content for Tab 1.</p>
      </div>
    ),
    tab2: (
      <div className="tab-content">
        <h2>Tab 2 Content</h2>
        <p>This is the content for Tab 2.</p>
      </div>
    ),
  };
  return (
    <div className="flex flex-1 justify-center items-center ">
      <SwitchingTabs tabs={tabs} tabContent={tabContent} />
    </div>
  );
}

export default AboutPage;
