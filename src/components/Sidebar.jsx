import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User, BookOpen, Calendar, Users, Star, DollarSign, Bell, Settings, FileText, Newspaper, AlertCircle, Award, Building, BarChart2, Home, ShoppingBag, CreditCard, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar } from "./ui";
const sidebarItems = {
    student: [
        { icon: <LayoutDashboard size={18}/>, label: "Dashboard", to: "/dashboard" },
        { icon: <Users size={18}/>, label: "Mentors", to: "/mentors" },
        { icon: <ShoppingBag size={18}/>, label: "Services", to: "/services" },
        { icon: <BookOpen size={18}/>, label: "Bookings", to: "/bookings" },
        { icon: <Star size={18}/>, label: "Career Path", to: "/dashboard/career" },
        { icon: <Newspaper size={18}/>, label: "Campus News", to: "/news" },
        { icon: <Calendar size={18}/>, label: "Events", to: "/events" },
        { icon: <AlertCircle size={18}/>, label: "Alerts", to: "/alerts" },
        { icon: <FileText size={18}/>, label: "Resources", to: "/resources" },
        { icon: <Award size={18}/>, label: "Stories", to: "/stories" },
        { icon: <User size={18}/>, label: "My Profile", to: "/profile" },
    ],
    mentor: [
        { icon: <LayoutDashboard size={18}/>, label: "Dashboard", to: "/mentor/dashboard" },
        { icon: <User size={18}/>, label: "My Profile", to: "/mentor/profile" },
        { icon: <ShoppingBag size={18}/>, label: "My Services", to: "/mentor/services" },
        { icon: <BookOpen size={18}/>, label: "Bookings", to: "/mentor/bookings" },
        { icon: <Users size={18}/>, label: "Students", to: "/mentor/students" },
        { icon: <DollarSign size={18}/>, label: "Earnings", to: "/mentor/earnings" },
        { icon: <CreditCard size={18}/>, label: "Payments", to: "/mentor/payments" },
        { icon: <Star size={18}/>, label: "Reviews", to: "/mentor/reviews" },
        { icon: <Bell size={18}/>, label: "Notifications", to: "/mentor/notifications" },
        { icon: <Settings size={18}/>, label: "Settings", to: "/mentor/settings" },
    ],
    faculty: [
        { icon: <LayoutDashboard size={18}/>, label: "Dashboard", to: "/faculty/dashboard" },
        { icon: <Users size={18}/>, label: "Students", to: "/faculty/students" },
        { icon: <Building size={18}/>, label: "Departments", to: "/faculty/departments" },
        { icon: <Star size={18}/>, label: "Mentors", to: "/faculty/mentors" },
        { icon: <ShoppingBag size={18}/>, label: "Services", to: "/faculty/services" },
        { icon: <Calendar size={18}/>, label: "Events", to: "/events" },
        { icon: <FileText size={18}/>, label: "Resources", to: "/resources" },
        { icon: <Newspaper size={18}/>, label: "News", to: "/news" },
        { icon: <Award size={18}/>, label: "Achievements", to: "/achievements" },
        { icon: <BarChart2 size={18}/>, label: "Reports", to: "/faculty/reports" },
        { icon: <User size={18}/>, label: "Profile", to: "/profile" },
        { icon: <Settings size={18}/>, label: "Settings", to: "/settings" },
    ],
    admin: [
        { icon: <LayoutDashboard size={18}/>, label: "Dashboard", to: "/admin/dashboard" },
        { icon: <Users size={18}/>, label: "Users", to: "/admin/users" },
        { icon: <User size={18}/>, label: "Students", to: "/admin/students" },
        { icon: <Star size={18}/>, label: "Mentors", to: "/admin/mentors" },
        { icon: <Building size={18}/>, label: "Faculty", to: "/admin/faculty" },
        { icon: <ShoppingBag size={18}/>, label: "Services", to: "/admin/services" },
        { icon: <BookOpen size={18}/>, label: "Bookings", to: "/admin/bookings" },
        { icon: <CreditCard size={18}/>, label: "Payments", to: "/admin/payments" },
        { icon: <MessageSquare size={18}/>, label: "Stories", to: "/admin/stories" },
        { icon: <Home size={18}/>, label: "Home Content", to: "/admin/home-content" },
        { icon: <Newspaper size={18}/>, label: "News", to: "/admin/news" },
        { icon: <Calendar size={18}/>, label: "Events", to: "/admin/events" },
        { icon: <AlertCircle size={18}/>, label: "Alerts", to: "/admin/alerts" },
        { icon: <FileText size={18}/>, label: "Resources", to: "/admin/resources" },
        { icon: <Award size={18}/>, label: "Achievements", to: "/admin/achievements" },
        { icon: <Building size={18}/>, label: "Departments", to: "/admin/departments" },
        { icon: <BarChart2 size={18}/>, label: "Reports", to: "/admin/reports" },
        { icon: <Settings size={18}/>, label: "System Settings", to: "/admin/settings" },
    ],
};
export default function Sidebar({ role, userName = "User", userDept = "" }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const items = sidebarItems[role] || [];
    return (<aside className={`hidden lg:flex flex-col bg-white border-r border-[#E5E7EB] transition-all duration-200 shrink-0 ${collapsed ? "w-16" : "w-56"}`} style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* User info */}
      {!collapsed && (<div className="p-4 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <Avatar name={userName} size="md"/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] truncate font-display">{userName}</p>
              <p className="text-xs text-[#6B7280] truncate">{userDept || role}</p>
            </div>
          </div>
        </div>)}

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {items.map((item) => {
            const active = location.pathname === item.to;
            return (<Link key={item.to} to={item.to} title={collapsed ? item.label : undefined} className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all ${active
                    ? "bg-orange-50 text-[#F97316]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#1F2937]"}`}>
              <span className={`shrink-0 ${active ? "text-[#F97316]" : ""}`}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>);
        })}
      </nav>

      {/* Collapse toggle */}
      <button onClick={() => setCollapsed(!collapsed)} className="flex items-center justify-center h-10 border-t border-[#F3F4F6] text-[#9CA3AF] hover:text-[#6B7280] hover:bg-gray-50 transition-colors">
        {collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
      </button>
    </aside>);
}
