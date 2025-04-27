import React, { useEffect, useRef } from "react";
import { useState } from "react";

function SwitchingTabs({ tabs, tabContent }) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[activeTab];
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);
  const tabRefs = useRef({});
  return (
    <div className="max-w-lg p-4 rounded-lg shadow-xl">
      <div className="relative flex flex-wrap gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            className={`relative px-4 py-2 font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "text-dark"
                : "text-gray-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-1 bg-secondary transition-all duration-300"
          style={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
        />
      </div>
      <div>{tabContent[activeTab]}</div>
    </div>
  );
}

export default SwitchingTabs;
