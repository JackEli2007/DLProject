import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import MobileNav from './MobileNav.jsx';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-app-dark transition-colors duration-200">
      <Navbar />
      <main
        className="pt-16 pb-20 lg:pb-8 min-h-screen"
        role="main"
        id="main-content"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;
