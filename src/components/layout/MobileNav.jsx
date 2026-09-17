import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants.js';

const mobileIcons = {
  home: '🏠',
  book: '📖',
  flask: '🧪',
  target: '🎯',
  trophy: '🏆',
  'help-circle': '❓',
  'bar-chart': '📊',
};

const MobileNav = () => {
  // Show only 5 key items on mobile to fit
  const mobileItems = NAV_ITEMS.filter((item) =>
    ['/', '/learn', '/lab', '/quiz', '/progress'].includes(item.path)
  );

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 safe-area-inset-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {mobileItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[56px]
              transition-all duration-200
              ${isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }
            `}
            aria-label={item.label}
          >
            <span className="text-lg leading-none">{mobileIcons[item.icon]}</span>
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
