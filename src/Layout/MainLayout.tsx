import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  Flag,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import logo from '../assets/truth.png';
// import AuthHook from '../Hooks/AuthHook';

const paths = {
  "/dashboard": {
    title: "Dashboard",
    des: "Welcome back! Here's what's happening",
  },
  "/dashboard/user": {
    title: "User Management",
    des: "Manage all users, verification status, and permissions.",
  },
  "/dashboard/listing": {
    title: "Listing Management",
    des: "Manage all users, verification status, and permissions.",
  },
  "/dashboard/verification": {
    title: "Verification Requests",
    des: "Review and approve verification requests from shops and builders."
  },
  "/dashboard/content": {
    title: "Content Moderation",
    des: "Review and manage flagged content to maintain community standards."
  },
  "/dashboard/boosted": {
    title: "Boosted Listings",
    des: "Track and manage all boosted listings and their performance."
  }
  , "/dashboard/notification": {
    title: "Notifications",
    des: "Stay updated with platform activities and alerts."
  },
  "/dashboard/analytics": {
    title: "Analytics",
    des: "Track platform performance and user engagement metrics."
  },
  "/dashboard/settings": {
    title: "Settings",
    des: "Manage your admin account and security settings."
  }

} as const;

const MainLayout: React.FC = () => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', },
    { icon: Menu, label: 'User Management', path: '/dashboard/user' },
    { icon: CircleCheck, label: 'Add Event', path: '/dashboard/add-event' },
    { icon: Users, label: 'Category', path: '/dashboard/verification' },
    { icon: Flag, label: 'Bookings', path: '/dashboard/content' },
    { icon: TrendingUp, label: 'Boosted Listings', path: '/dashboard/boosted' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notification' },
    { icon: ChartNoAxesColumnIncreasing, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];


  const location = useLocation()

  const currentPath = paths[location.pathname as keyof typeof paths];

  // const userdata = AuthHook()



  return (
    <div className="h-screen w-full bg-black flex overflow-hidden">

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-60 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-70 bg-(--side) z-70 shadow-2xl sm:p-6 lg:hidden"
            >
              <SidebarContent location={location.pathname} items={menuItems} onClose={() => setIsSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex flex-col w-70 bg-(--side) border-r border p-2.5 sticky top-0 h-screen shrink-0">
        <SidebarContent location={location.pathname} items={menuItems} />
      </aside>


      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden md:pl-10 p-2 ">


        <header className="border-b border-dotted border-gray-500 py-1 sm:py-2 flex items-center justify-between sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <div>
              <h1 className='text-[16px] sm:text-[32px] text-white font-semibold'>
                {currentPath?.title ?? "Dashboard"}
              </h1>
              <h2 className="hidden sm:block sm:text-[14px] text-[#9CA3AF] capitalize">
                {currentPath?.des ?? "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              <div>
                {/* <h1 className='text-white text-[14px] font-bold leading-5 text-right'>{userdata?.user?.fullName}</h1>
                <p className='text-[#9CA3AF] text-[12px] text-right'>{userdata?.user?.role && 'Admin'}</p> */}
              </div>
              <div className="w-10 h-10 ml-3 rounded-full overflow-hidden">
                {/* <img
                  className="w-full h-full object-cover"
                  src={userdata?.user?.avatar || admin}
                  alt="User Avatar"
                /> */}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 sm:mt-5 sm:pr-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >

            <Outlet />

          </motion.div>


        </main>
      </div>
    </div>
  );
};

type SidebarContentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  onClose?: () => void,
  location: string,
}



const SidebarContent = ({ items, onClose, location }: SidebarContentProps) => (



  <div className="flex flex-col h-full">
    <div className="mb-4 px-2 flex justify-between items-center shrink-0">
      <img className='w-[80%] sm:w-[70%] mx-auto' src={logo} alt="" />
      {onClose && <button onClick={onClose} className="lg:hidden p-1 text-white"><X size={20} /></button>}
    </div>


    <nav className="flex-1 overflow-y-auto sm:px-3 sm:space-y-5">
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          onClick={() => {
            onClose?.()
          }}

          className={`
  flex items-center gap-3 hover:scale-95  px-4 py-3 rounded-xl
  transition-all leading-2 capitalize sm:text-[20px] group
  ${location === item.path ? ' bg-[#C7B268] text-black ' : 'text-white'}
  hover:bg-[#1F3A5F]
`}
        >
          <item.icon size={20} className="group-hover:scale-110 transition-transform" />
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="pt-4 mb-6 shrink-0">
      <Link to={'/'}>

        <button className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:scale-95 transition duration-700 rounded-xl cursor-pointer border border-red-500 text-[20px]">
          <LogOut size={20} /> Logout
        </button></Link>
    </div>
  </div>
);

export default MainLayout;