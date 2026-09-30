import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import { Card, Badge, Button, Input, Select, StarRating } from "../components/ui";
import { services, departments } from "../data/mockData";
const categories = ["All", "Academic Guidance", "Career Guidance", "Programming", "Research", "Project Help", "Interview Preparation", "Scholarship Guidance", "Study Abroad", "Personal Development"];
export default function ServicesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [dept, setDept] = useState("All");
    const [sort, setSort] = useState("newest");
    const filtered = services
        .filter(s => s.status === "approved")
        .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.mentorName.toLowerCase().includes(search.toLowerCase()))
        .filter(s => category === "All" || s.category === category)
        .filter(s => dept === "All" || s.department === dept)
        .sort((a, b) => sort === "fee-low" ? a.fee - b.fee : sort === "fee-high" ? b.fee - a.fee : b.rating - a.rating);
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Mentor Services</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2 mb-2">Browse Services</h1>
          <p className="text-[#6B7280] text-sm">Explore professionally offered mentor services across all departments.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input placeholder="Search services or mentor name..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={15}/>}/>
            </div>
            <Select options={[{ value: "All", label: "All Departments" }, ...departments.map(d => ({ value: d, label: d }))]} value={dept} onChange={e => setDept(e.target.value)} className="min-w-[200px]"/>
            <Select options={[
            { value: "newest", label: "Sort: Newest" },
            { value: "popular", label: "Sort: Popular" },
            { value: "fee-low", label: "Sort: Fee Low–High" },
            { value: "fee-high", label: "Sort: Fee High–Low" },
        ]} value={sort} onChange={e => setSort(e.target.value)} className="min-w-[180px]"/>
          </div>
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(c => (<button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${category === c ? "bg-[#F97316] text-white" : "bg-gray-100 text-[#6B7280] hover:bg-orange-50 hover:text-orange-700"}`}>
                {c}
              </button>))}
          </div>
        </Card>

        <p className="text-sm text-[#6B7280] mb-5">{filtered.length} services found</p>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (<Card key={service.id} className="flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {service.mentorImage
                ? <img src={service.mentorImage} alt={service.mentorName} className="w-11 h-11 rounded-xl object-cover"/>
                : <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-lg font-bold text-orange-600">{service.mentorName?.[0] ?? "M"}</div>}
                  <div>
                    <p className="text-sm font-bold text-[#1F2937] font-display">{service.mentorName}</p>
                    <p className="text-xs text-[#9CA3AF]">{service.department.split("&")[0].trim()}</p>
                  </div>
                </div>
                <Badge variant="orange" className="mb-2">{service.category}</Badge>
                <h3 className="font-bold text-[#1F2937] font-display text-sm mb-2 line-clamp-2">{service.name}</h3>
                <p className="text-xs text-[#6B7280] line-clamp-2 mb-4">{service.description}</p>
                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1"><Clock size={12}/> {service.date} · {service.time}</span>
                  <StarRating rating={service.rating}/>
                </div>
              </div>
              <div className="px-5 pb-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                <span className="font-bold text-[#1F2937] text-base">৳{service.fee}</span>
                <div className="flex gap-2">
                  <Link to={`/services/${service.id}`}>
                    <Button variant="outline" size="sm">Details</Button>
                  </Link>
                  <Link to="/login">
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </Card>))}
        </div>
      </div>
    </div>);
}
