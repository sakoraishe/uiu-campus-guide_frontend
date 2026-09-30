import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
export default function DashboardLayout({ children, title, subtitle }) {
    const { user } = useAuth();
    const role = (user?.role ?? "student");
    return (<div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role={role} userName={user?.name} userDept={user?.dept}/>
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {title && (<div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937] font-display">{title}</h1>
                {subtitle && <p className="text-[#6B7280] text-sm mt-1">{subtitle}</p>}
              </div>)}
            {children}
          </div>
        </main>
      </div>
    </div>);
}
