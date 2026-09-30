import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Avatar } from "./ui";
import { useAuth } from "../context/AuthContext";
const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/mentors", label: "Mentors" },
    { to: "/stories", label: "Stories" },
    { to: "/events", label: "Events" },
    { to: "/news", label: "Campus News" },
    { to: "/alerts", label: "Alerts" },
    { to: "/resources", label: "Resources" },
];
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isLoggedIn } = useAuth();
    const role = user?.role ?? "guest";
    const userName = user?.name ?? "";
    const dashboardPath = role === "admin" ? "/admin/dashboard"
        : role === "mentor" ? "/mentor/dashboard"
            : role === "faculty" ? "/faculty/dashboard"
                : "/dashboard";
    const roleBadge = {
        student: "Student",
        mentor: "Mentor",
        faculty: "Faculty",
        admin: "Admin",
    };
    const isActive = (to) => location.pathname === to;
    const handleLogout = () => {
        setProfileOpen(false);
        logout();
        navigate("/");
    };
    return (<nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#F97316] rounded-xl flex items-center justify-center text-white font-bold text-sm">U</div>
            <div>
              <span className="font-bold text-[#1F2937] text-sm font-display leading-none block">UIU Campus</span>
              <span className="text-[10px] text-[#F97316] font-semibold leading-none block uppercase tracking-wide">Guide</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {!isLoggedIn ? (publicLinks.map((l) => (<Link key={l.to} to={l.to} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(l.to) ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-50"}`}>
                  {l.label}
                </Link>))) : (<>
                <Link to={dashboardPath} className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive(dashboardPath) ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Dashboard</Link>
                <Link to="/mentors" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive("/mentors") ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Mentors</Link>
                <Link to="/services" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive("/services") ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Services</Link>
                {role === "student" && (<Link to="/bookings" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive("/bookings") ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Bookings</Link>)}
                <Link to="/events" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive("/events") ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Events</Link>
                <Link to="/news" className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive("/news") ? "bg-orange-50 text-[#F97316]" : "text-[#6B7280] hover:text-[#1F2937]"}`}>News</Link>
              </>)}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (<>
                <Link to="/login" className="hidden sm:block text-sm font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors">Login</Link>
                <Link to="/register" className="bg-[#F97316] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#EA580C] transition-colors">Register</Link>
              </>) : (<>
                <button className="relative p-2 rounded-xl hover:bg-gray-100 text-[#6B7280]">
                  <Bell size={18}/>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full"/>
                </button>
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors">
                    <Avatar name={userName} size="sm"/>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-[#1F2937] leading-none">{userName}</p>
                      <p className="text-xs text-[#6B7280] leading-none mt-0.5">{roleBadge[role] ?? role}</p>
                    </div>
                    <ChevronDown size={14} className="text-[#9CA3AF]"/>
                  </button>
                  {profileOpen && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#E5E7EB] shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-[#F3F4F6] mb-1">
                        <p className="text-xs font-semibold text-[#1F2937]">{userName}</p>
                        <span className="text-xs text-[#F97316] font-semibold">{roleBadge[role] ?? role}</span>
                      </div>
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#374151] hover:bg-gray-50">
                        <User size={14}/> My Profile
                      </Link>
                      <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#374151] hover:bg-gray-50">
                        <Settings size={14}/> Settings
                      </Link>
                      <hr className="my-1 border-[#F3F4F6]"/>
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut size={14}/> Logout
                      </button>
                    </div>)}
                </div>
              </>)}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-[#6B7280]">
              {menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (<div className="lg:hidden border-t border-[#E5E7EB] bg-white">
          <div className="px-4 py-3 space-y-1">
            {publicLinks.map((l) => (<Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-[#374151] hover:bg-gray-50">{l.label}</Link>))}
            {!isLoggedIn ? (<div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center border border-[#E5E7EB] rounded-xl py-2 text-sm font-semibold text-[#1F2937]">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-[#F97316] rounded-xl py-2 text-sm font-semibold text-white">Register</Link>
              </div>) : (<button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50">
                Logout
              </button>)}
          </div>
        </div>)}
    </nav>);
}
