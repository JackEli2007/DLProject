import React, { useRef, useEffect, useState } from 'react';

const Tabs = ({ tabs, activeTab, onChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
      const el = tabsRef.current[activeIndex];
      setIndicatorStyle({
        width: el.offsetWidth,
        left: el.offsetLeft
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <nav className="relative flex space-x-8" aria-label="Tabs">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={el => tabsRef.current[index] = el}
              onClick={() => onChange(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 text-sm font-medium transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-sm
                ${isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && (
                <span className={`mr-2 ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400'}`}>
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          );
        })}
        <span
          className="absolute bottom-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out"
          style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
        />
      </nav>
    </div>
  );
};

export default Tabs;
