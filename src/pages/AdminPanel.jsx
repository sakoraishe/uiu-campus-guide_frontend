import { useState, useEffect } from "react";
import { Eye, CheckCircle, XCircle, Edit, Trash2, AlertTriangle, X, Search } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, Table, Th, Td, StatusBadge, Button, Tabs, SectionHeader, Badge, StarRating, Input, Select } from "../components/ui";
import { mentors as rawMentors, services as rawServices, bookings as rawBookings, adminStats } from "../data/mockData";
import { Users, Star, BookOpen, CreditCard, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
let _mentors = rawMentors.map(m => ({ ...m, status: m.status }));
let _services = rawServices.map(s => ({ ...s, status: s.status }));
let _bookings = rawBookings.map(b => ({ ...b, status: b.status }));
// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);
    const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-blue-600" };
    return (<div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-xl text-sm font-semibold ${colors[type]}`}>
      {type === "success" && <CheckCircle size={16}/>}
      {type === "error" && <XCircle size={16}/>}
      {type === "info" && <AlertTriangle size={16}/>}
      {message}
      <button onClick={onClose}><X size={14}/></button>
    </div>);
}
function useToast() {
    const [toast, setToast] = useState(null);
    const show = (message, type = "success") => setToast({ message, type });
    const hide = () => setToast(null);
    const ToastEl = toast ? <Toast message={toast.message} type={toast.type} onClose={hide}/> : null;
    return { show, ToastEl };
}
// ─── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ title, message, confirmLabel = "Confirm", danger = false, onConfirm, onCancel }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm p-6">
        <h2 className="text-base font-bold text-[#1F2937] font-display mb-2">{title}</h2>
        <p className="text-sm text-[#6B7280] mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant={danger ? "danger" : "primary"} className="flex-1" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </Card>
    </div>);
}
// ─── View Mentor Modal ─────────────────────────────────────────────────────────
function MentorModal({ mentor, onClose, onApprove, onReject }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1F2937] font-display">Mentor Profile</h2>
          <button onClick={onClose}><X size={18} className="text-[#9CA3AF]"/></button>
        </div>
        <div className="flex items-start gap-4 mb-4">
          <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover"/>
          <div>
            <h3 className="font-bold text-[#1F2937] font-display text-base">{mentor.name}</h3>
            <p className="text-sm text-[#6B7280]">{mentor.department}</p>
            <p className="text-xs text-[#9CA3AF]">{mentor.mobile}</p>
            <div className="mt-1"><StarRating rating={mentor.rating}/></div>
          </div>
        </div>
        <p className="text-sm text-[#374151] leading-relaxed mb-4">{mentor.bio}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.expertise.map(e => (<span key={e} className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold">{e}</span>))}
        </div>
        <div className="flex items-center justify-between text-sm p-3 bg-[#FAFAF9] rounded-xl mb-4">
          <span className="text-[#6B7280]">Sessions completed</span>
          <span className="font-bold text-[#1F2937]">{mentor.sessions}</span>
        </div>
        <div className="flex items-center justify-between text-sm p-3 bg-[#FAFAF9] rounded-xl mb-5">
          <span className="text-[#6B7280]">Availability</span>
          <span className="font-bold text-[#1F2937]">{mentor.availability}</span>
        </div>
        <div className="flex gap-3">
          {mentor.status === "pending" && onApprove && onReject && (<>
              <Button className="flex-1" onClick={onApprove}>Approve</Button>
              <Button variant="danger" className="flex-1" onClick={onReject}>Reject</Button>
            </>)}
          <Button variant="outline" className="flex-1" onClick={onClose}>Close</Button>
        </div>
      </Card>
    </div>);
}
// ─── Edit Service Modal ────────────────────────────────────────────────────────
function EditServiceModal({ service, onSave, onClose }) {
    const [name, setName] = useState(service.name);
    const [fee, setFee] = useState(String(service.fee));
    const [date, setDate] = useState(service.date);
    const [time, setTime] = useState(service.time);
    const [description, setDescription] = useState(service.description);
    const [category, setCategory] = useState(service.category);
    const handleSave = () => {
        onSave({ ...service, name, fee: Number(fee), date, time, description, category });
    };
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <h2 className="text-lg font-bold text-[#1F2937] font-display">Edit Service</h2>
          <button onClick={onClose}><X size={18} className="text-[#9CA3AF]"/></button>
        </div>
        <div className="space-y-4">
          <Input label="Service Name" value={name} onChange={e => setName(e.target.value)}/>
          <Select label="Category" value={category} onChange={e => setCategory(e.target.value)} options={[
            { value: "Career Guidance", label: "Career Guidance" },
            { value: "Academic Support", label: "Academic Support" },
            { value: "Resume Review", label: "Resume Review" },
            { value: "Interview Prep", label: "Interview Prep" },
            { value: "Technical Mentorship", label: "Technical Mentorship" },
        ]}/>
          <Input label="Fee (৳)" type="number" value={fee} onChange={e => setFee(e.target.value)}/>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
            </div>
            <Input label="Time" value={time} onChange={e => setTime(e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={handleSave}>Save Changes</Button>
        </div>
      </Card>
    </div>);
}
// ─── Charts data ───────────────────────────────────────────────────────────────
const userGrowthData = [
    { month: "Sep", users: 3200 }, { month: "Oct", users: 3600 },
    { month: "Nov", users: 3900 }, { month: "Dec", users: 4100 },
    { month: "Jan", users: 4421 }, { month: "Feb", users: 4821 },
];
const bookingData = [
    { month: "Sep", bookings: 120 }, { month: "Oct", bookings: 145 },
    { month: "Nov", bookings: 160 }, { month: "Dec", bookings: 132 },
    { month: "Jan", bookings: 178 }, { month: "Feb", bookings: 157 },
];
const deptDistribution = [
    { name: "CSE", value: 1240, color: "#F97316" }, { name: "EEE", value: 820, color: "#FB923C" },
    { name: "BBA", value: 960, color: "#FDBA74" }, { name: "Others", value: 1190, color: "#FED7AA" },
];
// ─── Admin Dashboard ───────────────────────────────────────────────────────────
export function AdminDashboard() {
    const [mentorList, setMentorList] = useState(_mentors);
    const { show, ToastEl } = useToast();
    const approveMentor = (id) => {
        const updated = mentorList.map(m => m.id === id ? { ...m, status: "approved" } : m);
        setMentorList(updated);
        _mentors = updated;
        show("Mentor approved successfully");
    };
    const rejectMentor = (id) => {
        const updated = mentorList.map(m => m.id === id ? { ...m, status: "rejected" } : m);
        setMentorList(updated);
        _mentors = updated;
        show("Mentor application rejected", "error");
    };
    const pendingMentors = mentorList.filter(m => m.status === "pending");
    return (<DashboardLayout title="Admin Dashboard" subtitle="Platform overview and management">
      {ToastEl}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value={adminStats.totalUsers.toLocaleString()} icon={<Users size={18}/>} trend="+12% this month" color="orange"/>
        <StatCard label="Total Students" value={adminStats.totalStudents.toLocaleString()} icon={<Users size={18}/>} color="blue"/>
        <StatCard label="Total Mentors" value={adminStats.totalMentors} icon={<Star size={18}/>} color="green"/>
        <StatCard label="Pending Approvals" value={pendingMentors.length} icon={<AlertCircle size={18}/>} color="orange"/>
        <StatCard label="Active Services" value={adminStats.activeServices} icon={<BookOpen size={18}/>} color="purple"/>
        <StatCard label="Total Bookings" value={adminStats.totalBookings} icon={<BookOpen size={18}/>} color="blue"/>
        <StatCard label="Pending Payments" value={adminStats.pendingPayments} icon={<CreditCard size={18}/>} color="orange"/>
        <StatCard label="Active Disputes" value={adminStats.disputes} icon={<AlertTriangle size={18}/>} color="orange"/>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-5">
          <SectionHeader title="User Growth" subtitle="Monthly new registrations"/>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}/>
              <Area type="monotone" dataKey="users" stroke="#F97316" fill="#FFF7ED" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <SectionHeader title="Dept. Distribution"/>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deptDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                {deptDistribution.map((entry, index) => <Cell key={index} fill={entry.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}/>
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-[#6B7280]">{v}</span>}/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5 mb-6">
        <SectionHeader title="Booking Trends" subtitle="Monthly booking activity"/>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
            <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}/>
            <Area type="monotone" dataKey="bookings" stroke="#2563EB" fill="#EFF6FF" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <SectionHeader title="Pending Mentor Approvals" action={<span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{pendingMentors.length} pending</span>}/>
          <div className="space-y-3">
            {pendingMentors.map(m => (<div key={m.id} className="flex items-center gap-3 p-3 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
                <img src={m.image} alt={m.name} className="w-10 h-10 rounded-xl object-cover shrink-0"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1F2937] truncate">{m.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{m.department.split("&")[0]}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => approveMentor(m.id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="Approve"><CheckCircle size={14}/></button>
                  <button onClick={() => rejectMentor(m.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100" title="Reject"><XCircle size={14}/></button>
                </div>
              </div>))}
            {pendingMentors.length === 0 && <p className="text-sm text-[#9CA3AF] text-center py-4">✓ No pending approvals</p>}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Recent Bookings"/>
          <div className="space-y-3">
            {_bookings.map(b => (<div key={b.id} className="flex items-center justify-between p-3 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
                <div>
                  <p className="text-sm font-semibold text-[#1F2937]">{b.student}</p>
                  <p className="text-xs text-[#9CA3AF]">{b.service}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={b.status}/>
                  <p className="text-xs text-[#9CA3AF] mt-1">৳{b.fee}</p>
                </div>
              </div>))}
          </div>
        </Card>
      </div>
    </DashboardLayout>);
}
// ─── Admin Mentors Page ────────────────────────────────────────────────────────
export function AdminMentorsPage() {
    const [mentorList, setMentorList] = useState(_mentors);
    const [active, setActive] = useState("all");
    const [search, setSearch] = useState("");
    const [viewMentor, setViewMentor] = useState(null);
    const [deleteMentor, setDeleteMentor] = useState(null);
    const { show, ToastEl } = useToast();
    const sync = (updated) => { setMentorList(updated); _mentors = updated; };
    const approve = (id) => {
        sync(mentorList.map(m => m.id === id ? { ...m, status: "approved" } : m));
        show("Mentor approved");
        if (viewMentor?.id === id)
            setViewMentor(prev => prev ? { ...prev, status: "approved" } : null);
    };
    const reject = (id) => {
        sync(mentorList.map(m => m.id === id ? { ...m, status: "rejected" } : m));
        show("Mentor rejected", "error");
        if (viewMentor?.id === id)
            setViewMentor(prev => prev ? { ...prev, status: "rejected" } : null);
    };
    const confirmDelete = () => {
        if (!deleteMentor)
            return;
        sync(mentorList.filter(m => m.id !== deleteMentor.id));
        setDeleteMentor(null);
        show("Mentor removed from platform");
    };
    const tabList = [
        { id: "all", label: "All", count: mentorList.length },
        { id: "pending", label: "Pending", count: mentorList.filter(m => m.status === "pending").length },
        { id: "approved", label: "Approved", count: mentorList.filter(m => m.status === "approved").length },
        { id: "rejected", label: "Rejected", count: mentorList.filter(m => m.status === "rejected").length },
    ];
    const filtered = mentorList
        .filter(m => active === "all" || m.status === active)
        .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase()));
    return (<DashboardLayout title="Mentor Management" subtitle="Review and manage mentor applications">
      {ToastEl}
      {viewMentor && (<MentorModal mentor={viewMentor} onClose={() => setViewMentor(null)} onApprove={viewMentor.status === "pending" ? () => { approve(viewMentor.id); setViewMentor(null); } : undefined} onReject={viewMentor.status === "pending" ? () => { reject(viewMentor.id); setViewMentor(null); } : undefined}/>)}
      {deleteMentor && (<ConfirmModal title="Remove Mentor" message={`Are you sure you want to permanently remove ${deleteMentor.name}? This cannot be undone.`} confirmLabel="Remove" danger onConfirm={confirmDelete} onCancel={() => setDeleteMentor(null)}/>)}

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-[220px]">
          <Tabs tabs={tabList} active={active} onChange={setActive}/>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input placeholder="Search mentors..." value={search} onChange={e => setSearch(e.target.value)} className="border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Mentor</Th><Th>Department</Th><Th>Mobile</Th>
            <Th>Status</Th><Th>Rating</Th><Th>Sessions</Th><Th>Joined</Th><Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(m => (<tr key={m.id} className="hover:bg-[#FAFAF9]">
              <Td>
                <div className="flex items-center gap-3">
                  <img src={m.image} alt={m.name} className="w-9 h-9 rounded-xl object-cover"/>
                  <span className="font-semibold text-[#1F2937]">{m.name}</span>
                </div>
              </Td>
              <Td><span className="text-xs">{m.department.split("&")[0]}</span></Td>
              <Td><span className="text-xs font-mono">{m.mobile}</span></Td>
              <Td><StatusBadge status={m.status}/></Td>
              <Td><StarRating rating={m.rating}/></Td>
              <Td>{m.sessions}</Td>
              <Td><span className="text-xs">{m.joinDate}</span></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={() => setViewMentor(m)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]" title="View"><Eye size={14}/></button>
                  {m.status === "pending" && (<>
                      <button onClick={() => approve(m.id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="Approve"><CheckCircle size={14}/></button>
                      <button onClick={() => reject(m.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100" title="Reject"><XCircle size={14}/></button>
                    </>)}
                  {m.status === "approved" && (<button onClick={() => reject(m.id)} className="p-1.5 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100" title="Suspend"><XCircle size={14}/></button>)}
                  <button onClick={() => setDeleteMentor(m)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" title="Delete"><Trash2 size={14}/></button>
                </div>
              </Td>
            </tr>))}
          {filtered.length === 0 && (<tr><td colSpan={8} className="text-center text-sm text-[#9CA3AF] py-10">No mentors found</td></tr>)}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Admin Services Page ───────────────────────────────────────────────────────
export function AdminServicesPage() {
    const [serviceList, setServiceList] = useState(_services);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [editService, setEditService] = useState(null);
    const [deleteService, setDeleteService] = useState(null);
    const { show, ToastEl } = useToast();
    const sync = (updated) => { setServiceList(updated); _services = updated; };
    const approveS = (id) => { sync(serviceList.map(s => s.id === id ? { ...s, status: "approved" } : s)); show("Service approved"); };
    const rejectS = (id) => { sync(serviceList.map(s => s.id === id ? { ...s, status: "rejected" } : s)); show("Service rejected", "error"); };
    const saveEdit = (updated) => { sync(serviceList.map(s => s.id === updated.id ? updated : s)); setEditService(null); show("Service updated"); };
    const confirmDelete = () => {
        if (!deleteService)
            return;
        sync(serviceList.filter(s => s.id !== deleteService.id));
        setDeleteService(null);
        show("Service deleted");
    };
    const filtered = serviceList
        .filter(s => statusFilter === "all" || s.status === statusFilter)
        .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.mentorName.toLowerCase().includes(search.toLowerCase()));
    return (<DashboardLayout title="Service Management" subtitle="Manage and moderate mentor services">
      {ToastEl}
      {editService && <EditServiceModal service={editService} onSave={saveEdit} onClose={() => setEditService(null)}/>}
      {deleteService && (<ConfirmModal title="Delete Service" message={`Delete "${deleteService.name}"? This action cannot be undone.`} confirmLabel="Delete" danger onConfirm={confirmDelete} onCancel={() => setDeleteService(null)}/>)}

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-[220px]">
          <Tabs tabs={[
            { id: "all", label: "All", count: serviceList.length },
            { id: "pending", label: "Pending", count: serviceList.filter(s => s.status === "pending").length },
            { id: "approved", label: "Approved", count: serviceList.filter(s => s.status === "approved").length },
            { id: "rejected", label: "Rejected", count: serviceList.filter(s => s.status === "rejected").length },
        ]} active={statusFilter} onChange={setStatusFilter}/>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)} className="border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Service</Th><Th>Mentor</Th><Th>Category</Th><Th>Fee</Th>
            <Th>Date</Th><Th>Status</Th><Th>Rating</Th><Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (<tr key={s.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="font-semibold text-[#1F2937]">{s.name}</span></Td>
              <Td><span className="text-xs">{s.mentorName}</span></Td>
              <Td><Badge>{s.category}</Badge></Td>
              <Td><span className="font-semibold">৳{s.fee}</span></Td>
              <Td><span className="text-xs">{s.date}</span></Td>
              <Td><StatusBadge status={s.status}/></Td>
              <Td><StarRating rating={s.rating}/></Td>
              <Td>
                <div className="flex gap-1">
                  {s.status === "pending" && (<>
                      <button onClick={() => approveS(s.id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="Approve"><CheckCircle size={14}/></button>
                      <button onClick={() => rejectS(s.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100" title="Reject"><XCircle size={14}/></button>
                    </>)}
                  <button onClick={() => setEditService(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]" title="Edit"><Edit size={14}/></button>
                  <button onClick={() => setDeleteService(s)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" title="Delete"><Trash2 size={14}/></button>
                </div>
              </Td>
            </tr>))}
          {filtered.length === 0 && (<tr><td colSpan={8} className="text-center text-sm text-[#9CA3AF] py-10">No services found</td></tr>)}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Admin Bookings Page ───────────────────────────────────────────────────────
// NOTE: rebuilt (not present in the exported Figma Make file) to match AdminMentorsPage/AdminServicesPage patterns.
export function AdminBookingsPage() {
    const [bookingList, setBookingList] = useState(_bookings);
    const [active, setActive] = useState("all");
    const [search, setSearch] = useState("");
    const [cancelTarget, setCancelTarget] = useState(null);
    const { show, ToastEl } = useToast();
    const sync = (updated) => { setBookingList(updated); _bookings = updated; };
    const setStatus = (id, status, msg, type = "success") => {
        sync(bookingList.map(b => b.id === id ? { ...b, status } : b));
        show(msg, type);
    };
    const tabList = [
        { id: "all", label: "All", count: bookingList.length },
        { id: "pending", label: "Pending", count: bookingList.filter(b => b.status === "pending").length },
        { id: "confirmed", label: "Confirmed", count: bookingList.filter(b => b.status === "confirmed").length },
        { id: "completed", label: "Completed", count: bookingList.filter(b => b.status === "completed").length },
        { id: "cancelled", label: "Cancelled", count: bookingList.filter(b => b.status === "cancelled").length },
    ];
    const filtered = bookingList
        .filter(b => active === "all" || b.status === active)
        .filter(b => !search || [b.id, b.student, b.mentor, b.service].some(v => v.toLowerCase().includes(search.toLowerCase())));
    return (<DashboardLayout title="Booking Management" subtitle="Monitor and manage all mentor sessions">
      {ToastEl}
      {cancelTarget && (<ConfirmModal title="Cancel Booking" message={`Cancel booking ${cancelTarget.id} for ${cancelTarget.student}?`} confirmLabel="Cancel Booking" danger onConfirm={() => { setStatus(cancelTarget.id, "cancelled", "Booking cancelled", "error"); setCancelTarget(null); }} onCancel={() => setCancelTarget(null)}/>)}

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-[220px]">
          <Tabs tabs={tabList} active={active} onChange={setActive}/>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} className="border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th><Th>Student</Th><Th>Mentor</Th><Th>Service</Th>
            <Th>Date</Th><Th>Fee</Th><Th>Status</Th><Th>Payment</Th><Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(b => (<tr key={b.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="text-xs font-mono">{b.id}</span></Td>
              <Td><span className="font-semibold text-[#1F2937]">{b.student}</span></Td>
              <Td><span className="text-xs">{b.mentor}</span></Td>
              <Td><span className="text-xs">{b.service}</span></Td>
              <Td><span className="text-xs">{b.date} · {b.time}</span></Td>
              <Td><span className="font-semibold">৳{b.fee}</span></Td>
              <Td><StatusBadge status={b.status}/></Td>
              <Td><StatusBadge status={b.paymentStatus}/></Td>
              <Td>
                <div className="flex gap-1">
                  {b.status === "pending" && (<button onClick={() => setStatus(b.id, "confirmed", "Booking confirmed")} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="Confirm"><CheckCircle size={14}/></button>)}
                  {b.status === "confirmed" && (<button onClick={() => setStatus(b.id, "completed", "Booking marked completed")} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="Mark completed"><CheckCircle size={14}/></button>)}
                  {(b.status === "pending" || b.status === "confirmed") && (<button onClick={() => setCancelTarget(b)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100" title="Cancel"><XCircle size={14}/></button>)}
                </div>
              </Td>
            </tr>))}
          {filtered.length === 0 && (<tr><td colSpan={9} className="text-center text-sm text-[#9CA3AF] py-10">No bookings found</td></tr>)}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Admin Payments Page ───────────────────────────────────────────────────────
export function AdminPaymentsPage() {
    const [bookingList, setBookingList] = useState(_bookings);
    const [filter, setFilter] = useState("all");
    const { show, ToastEl } = useToast();
    const setPayment = (id, paymentStatus, msg, type = "success") => {
        const updated = bookingList.map(b => b.id === id ? { ...b, paymentStatus } : b);
        setBookingList(updated);
        _bookings = updated;
        show(msg, type);
    };
    const total = (s) => bookingList.filter(b => b.paymentStatus === s).reduce((sum, b) => sum + b.fee, 0);
    const filtered = bookingList.filter(b => filter === "all" || b.paymentStatus === filter);
    return (<DashboardLayout title="Payment Management" subtitle="Escrow, releases and refunds">
      {ToastEl}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="In Escrow" value={`৳${total("escrow")}`} icon={<CreditCard size={18}/>} color="blue"/>
        <StatCard label="Released" value={`৳${total("released")}`} icon={<CheckCircle size={18}/>} color="green"/>
        <StatCard label="Frozen" value={`৳${total("frozen")}`} icon={<AlertTriangle size={18}/>} color="orange"/>
        <StatCard label="Refunded" value={`৳${total("refunded")}`} icon={<XCircle size={18}/>} color="purple"/>
      </div>

      <div className="mb-5">
        <Tabs tabs={[
            { id: "all", label: "All", count: bookingList.length },
            { id: "escrow", label: "Escrow", count: bookingList.filter(b => b.paymentStatus === "escrow").length },
            { id: "released", label: "Released", count: bookingList.filter(b => b.paymentStatus === "released").length },
            { id: "frozen", label: "Frozen", count: bookingList.filter(b => b.paymentStatus === "frozen").length },
            { id: "refunded", label: "Refunded", count: bookingList.filter(b => b.paymentStatus === "refunded").length },
        ]} active={filter} onChange={setFilter}/>
      </div>

      <Table>
        <thead>
          <tr><Th>Booking</Th><Th>Student</Th><Th>Mentor</Th><Th>Amount</Th><Th>Payment</Th><Th>Actions</Th></tr>
        </thead>
        <tbody>
          {filtered.map(b => (<tr key={b.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="text-xs font-mono">{b.id}</span></Td>
              <Td><span className="font-semibold text-[#1F2937]">{b.student}</span></Td>
              <Td><span className="text-xs">{b.mentor}</span></Td>
              <Td><span className="font-semibold">৳{b.fee}</span></Td>
              <Td><StatusBadge status={b.paymentStatus}/></Td>
              <Td>
                <div className="flex gap-1.5">
                  {(b.paymentStatus === "escrow" || b.paymentStatus === "frozen") && (<>
                      <Button size="sm" onClick={() => setPayment(b.id, "released", "Payment released to mentor")}>Release</Button>
                      <Button size="sm" variant="outline" onClick={() => setPayment(b.id, "refunded", "Payment refunded to student", "info")}>Refund</Button>
                    </>)}
                  {b.paymentStatus === "escrow" && (<Button size="sm" variant="outline" onClick={() => setPayment(b.id, "frozen", "Payment frozen for review", "info")}>Freeze</Button>)}
                </div>
              </Td>
            </tr>))}
          {filtered.length === 0 && (<tr><td colSpan={6} className="text-center text-sm text-[#9CA3AF] py-10">No payments found</td></tr>)}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Admin Home Content Page ───────────────────────────────────────────────────
export function AdminHomeContentPage() {
    const [heroTitle, setHeroTitle] = useState("Your Complete Guide to Campus Life");
    const [heroSub, setHeroSub] = useState("UIU Campus Guide connects students with experienced mentors, academic resources, campus services, events, and opportunities — all in one trusted platform.");
    const [stats, setStats] = useState([
        { label: "Active Students", value: "4,200+" },
        { label: "Expert Mentors", value: "48" },
        { label: "Campus Services", value: "134" },
        { label: "Events This Month", value: "12" },
    ]);
    const { show, ToastEl } = useToast();
    return (<DashboardLayout title="Home Page Content" subtitle="Edit what visitors see on the public home page">
      {ToastEl}
      <Card className="p-6 mb-5">
        <h2 className="text-base font-bold text-[#1F2937] font-display mb-4">Hero Section</h2>
        <div className="space-y-4">
          <Input label="Headline" value={heroTitle} onChange={e => setHeroTitle(e.target.value)}/>
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5">Sub-headline</label>
            <textarea value={heroSub} onChange={e => setHeroSub(e.target.value)} rows={3} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-5">
        <h2 className="text-base font-bold text-[#1F2937] font-display mb-4">Platform Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((s, i) => (<Input key={s.label} label={s.label} value={s.value} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}/>))}
        </div>
      </Card>

      <Button onClick={() => show("Home page content saved")}>Save Changes</Button>
    </DashboardLayout>);
}
