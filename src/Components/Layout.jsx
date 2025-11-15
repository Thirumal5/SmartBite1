import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Radar,
  Settings,
  Bot,
  User,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.svg";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const mainLinks = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/history", label: "History", icon: <BookOpen size={18} /> },
    { to: "/signals", label: "Signals", icon: <Radar size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
    { to: "/assistant", label: "AI Assistant", icon: <Bot size={18} /> },
  ];

  const bottomLinks = [
    { to: "/profile", label: "Profile", icon: <User size={18} /> },
    { to: "/logout", label: "Logout", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#081017]">

      {/* FIXED SIDEBAR */}
      <aside className="w-64 h-full fixed left-0 top-0 bg-[var(--glass)] border-r border-[var(--glass-border)] backdrop-blur-xl flex flex-col">
        <div className="flex items-center gap-3 px-5 py-6">
          <img src={logo} className="w-10 h-10" alt="logo" />
          <h1 className="text-2xl font-bold text-[var(--primary)]">SmartBite</h1>
        </div>

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
          {mainLinks.map((item) => (
            <NavItem key={item.label} {...item} active={path === item.to} />
          ))}
        </nav>

        <div className="px-3 pb-6 space-y-2">
          {bottomLinks.map((item) => (
            <NavItem key={item.label} {...item} active={path === item.to} />
          ))}
        </div>
      </aside>

      {/* PAGE CONTENT AREA */}
      <main className="flex-1 ml-64 h-full overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, label, icon, active }) {
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-4 py-2 rounded-lg transition " +
        (active
          ? "bg-[var(--primary)] text-black font-semibold"
          : "text-gray-200 hover:bg-[var(--primary)] hover:text-black")
      }
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
