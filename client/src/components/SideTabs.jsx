import React, { useEffect, useRef, useState } from "react";

function SideTabs({ title, tabs, tabContent }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [underlineStyle, setUnderlineStyle] = useState({ height: 0, right: 0 });
  const tabRefs = useRef({});
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetTop, offsetHeight } = tabRefs.current[activeTab];
      setUnderlineStyle({ top: offsetTop, height: offsetHeight });
    }
  }, [activeTab]);
  return (
    <main className="w-[95vw] h-fit m-auto mt-6 flex gap-4">
      <div className="hidden md:block shadow-lg h-fit p-4 rounded-lg border-2 border-gray-100">
        <h1 className="font-bold text-2xl pl-1">{title}</h1>
        <div className="relative flex flex-col gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              className={`relative px-4 py-2 font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-secondary shadow-lg"
                  : " hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
          <div
            className="absolute right-0 w-1 bg-secondary transition-all duration-300"
            style={{
              top: underlineStyle.top,
              height: underlineStyle.height,
            }}
          />
        </div>
      </div>

      {/* viewdiv */}
      {/* <div className="flex-1 shadow-lg p-4 rounded-lg border-2 border-gray-100">
        {tabContent[activeTab]}
      </div> */}
      <div className="flex-1 shadow-lg p-4 rounded-lg border-2 border-gray-100">
        {tabContent[activeTab]({ isActive: true })}
      </div>
    </main>
  );
}

export default SideTabs;
