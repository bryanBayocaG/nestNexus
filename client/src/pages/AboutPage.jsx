import React from "react";
import { useState } from "react";

function AboutPage() {
  const [activeTab, setActiveTab] = useState("tab1");
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
      <div className="max-w-lg p-4 rounded-lg shadow-xl">
        <div className="flex flex-wrap gap-2 border-b ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 drop-shadow-lg rounded-t-lg py-2 font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-b-2 border-secondary text-dark"
                  : "text-gray-500 hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div>{tabContent[activeTab]}</div>
      </div>
    </div>
  );
}

export default AboutPage;
