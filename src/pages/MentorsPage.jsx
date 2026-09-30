import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { Card, Input, Select, StarRating } from "../components/ui";
import { mentors, departments } from "../data/mockData";
export default function MentorsPage() {
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("All");
    const [minRating, setMinRating] = useState("0");
    const filtered = mentors
        .filter(m => m.status === "approved")
        .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.expertise.some(e => e.toLowerCase().includes(search.toLowerCase())))
        .filter(m => dept === "All" || m.department === dept)
        .filter(m => m.rating >= parseFloat(minRating));
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />

      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Verified Professionals</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2 mb-2">Mentor Directory</h1>
          <p className="text-[#6B7280] text-sm">Discover and connect with experienced mentors across all UIU departments.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input placeholder="Search by name or expertise..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={15}/>}/>
            </div>
            <Select options={[{ value: "All", label: "All Departments" }, ...departments.map(d => ({ value: d, label: d }))]} value={dept} onChange={e => setDept(e.target.value)} className="min-w-[200px]"/>
            <Select options={[
            { value: "0", label: "All Ratings" },
            { value: "4.5", label: "4.5+ ⭐" },
            { value: "4", label: "4.0+ ⭐" },
        ]} value={minRating} onChange={e => setMinRating(e.target.value)} className="min-w-[140px]"/>
          </div>
        </Card>

        <p className="text-sm text-[#6B7280] mb-5">{filtered.length} mentors available</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(mentor => (<Card key={mentor.id} className="p-6 flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover"/>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1F2937] font-display">{mentor.name}</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">{mentor.department}</p>
                  <StarRating rating={mentor.rating}/>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{mentor.sessions} sessions completed</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] line-clamp-2 flex-1 mb-4">{mentor.bio}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 3).map(e => (<span key={e} className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">{e}</span>))}
              </div>
              <div className="flex items-center justify-between mb-4 text-xs text-[#9CA3AF]">
                <span>🗓 {mentor.availability}</span>
              </div>
              <Link to={`/mentors/${mentor.id}`} className="block text-center bg-[#F97316] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#EA580C] transition-colors">
                View Profile
              </Link>
            </Card>))}
        </div>
      </div>
    </div>);
}
