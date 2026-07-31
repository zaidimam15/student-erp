import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (user?.name || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen flex bg-paper">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 shrink-0 bg-white border-b border-ink-900/[0.06] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
          <button
            className="lg:hidden text-ink-700 hover:text-ink-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:block" />

          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2.5 pl-2 pr-1 py-1.5 rounded-full hover:bg-ink-900/[0.04] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center font-display font-bold text-[13px]">
                {initials}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-[13.5px] font-semibold text-ink-900">{user?.name}</p>
                <p className="text-[11px] text-ink-500 capitalize">{user?.role}</p>
              </div>
              <ChevronDown size={16} className="text-ink-500" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-ink-900/10 py-1.5 z-20">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2.5 text-[13.5px] text-ink-800 hover:bg-ink-900/[0.04]"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-[13.5px] text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
