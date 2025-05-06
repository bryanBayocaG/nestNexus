import React, { useEffect, useRef, useState } from "react";

function SwitchingTabs({ tabs, tabContent, isVisible }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef({});
  //for switchtab at modal
  useEffect(() => {
    if (isVisible && tabRefs.current[activeTab]) {
      const frame = requestAnimationFrame(() => {
        const { offsetLeft, offsetWidth } = tabRefs.current[activeTab];
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isVisible, activeTab]);

  //for normal switchtab
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[activeTab];
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="relative flex flex-wrap gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            className={`relative px-4 py-2 font-semibold transition-all duration-300 ${
              activeTab === tab.id ? "text-dark" : " hover:text-primary"
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
      <div className="mt-5">{tabContent[activeTab]}</div>
    </div>
  );
}

export default SwitchingTabs;
