import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, X, CheckCircle, XCircle, Search, Star } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, Button, Tabs, StatusBadge, Table, Th, Td, Badge, Input, Select, Textarea, SectionHeader, } from "../components/ui";
import { services as rawServices, bookings as rawBookings } from "../data/mockData";
import { DollarSign, BookOpen, Users, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../context/AuthContext";
// Module-level state shared across pages
let _mServices = rawServices.filter(s => s.mentorId === "3").map(s => ({ ...s }));
let _mBookings = rawBookings.map(b => ({ ...b, status: b.status }));
// ─── Toast ─────────────────────────────────────────────────────────────────────
function useToast() {
    const [toast, setToast] = useState(null);
    useEffect(() => {
        if (!toast)
            return;
        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
    }, [toast]);
    const show = (msg, type = "success") => setToast({ msg, type });
    const ToastEl = toast ? (<div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-xl text-sm font-semibold
      ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-blue-600"}`}>
      {toast.type === "success" && <CheckCircle size={15}/>}
      {toast.type === "error" && <XCircle size={15}/>}
      {toast.msg}
      <button onClick={() => setToast(null)}><X size={13}/></button>
    </div>) : null;
    return { show, ToastEl };
}
function Confirm({ title, msg, danger, onOk, onCancel }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm p-6">
        <h2 className="text-base font-bold text-[#1F2937] font-display mb-2">{title}</h2>
        <p className="text-sm text-[#6B7280] mb-6">{msg}</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant={danger ? "danger" : "primary"} className="flex-1" onClick={onOk}>Confirm</Button>
        </div>
      </Card>
    </div>);
}
// ─── Service Form ──────────────────────────────────────────────────────────────
function ServiceForm({ initial, onSave, onCancel, }) {
    const { user } = useAuth();
    const [name, setName] = useState(initial?.name ?? "");
    const [category, setCategory] = useState(initial?.category ?? "Career Guidance");
    const [fee, setFee] = useState(String(initial?.fee ?? ""));
    const [date, setDate] = useState(initial?.date ?? "");
    const [time, setTime] = useState(initial?.time ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [error, setError] = useState("");
    const handleSave = () => {
        if (!name || !fee || !date || !time || !description) {
            setError("Please fill all required fields.");
            return;
        }
        onSave({
            id: initial?.id ?? `svc-${Date.now()}`,
            name, category, fee: Number(fee), date, time, description,
            department: user?.dept ?? "Computer Science & Engineering",
            status: initial?.status ?? "pending",
            rating: initial?.rating ?? 0,
            mentorId: "3",
            mentorName: user?.name ?? "Mentor",
            mentorImage: "",
        });
    };
    return (<Card className="p-6 mb-6 border-orange-100">
      <h2 className="text-base font-bold text-[#1F2937] font-display mb-5">
        {initial?.id ? "Edit Service" : "Create New Service"}
      </h2>
      {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Service Name *" placeholder="e.g. FAANG Interview Preparation" value={name} onChange={e => setName(e.target.value)} className="sm:col-span-2"/>
        <Select label="Category *" value={category} onChange={e => setCategory(e.target.value)} options={["Academic Guidance", "Career Guidance", "Programming", "Research", "Project Help", "Interview Preparation", "Scholarship Guidance", "Study Abroad"].map(c => ({ value: c, label: c }))}/>
        <Input label="Fee (৳) *" type="number" placeholder="500" value={fee} onChange={e => setFee(e.target.value)}/>
        <Input label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)}/>
        <Input label="Time *" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 3:00 PM"/>
        <Textarea label="Description *" placeholder="Describe what students will gain from this session..." value={description} onChange={e => setDescription(e.target.value)} className="sm:col-span-2"/>
      </div>
      <div className="flex gap-3 mt-5">
        <Button onClick={handleSave}>{initial?.id ? "Save Changes" : "Submit for Approval"}</Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </Card>);
}
// ─── Earnings chart data ───────────────────────────────────────────────────────
const earningsData = [
    { month: "Sep", earnings: 8400 }, { month: "Oct", earnings: 11200 },
    { month: "Nov", earnings: 9600 }, { month: "Dec", earnings: 13000 },
    { month: "Jan", earnings: 10800 }, { month: "Feb", earnings: 12400 },
];
// ─── Mentor Dashboard ──────────────────────────────────────────────────────────
export function MentorDashboard() {
    const [bookingList, setBookingList] = useState(_mBookings);
    const { user } = useAuth();
    const { show, ToastEl } = useToast();
    const accept = (id) => {
        const updated = bookingList.map(b => b.id === id ? { ...b, status: "confirmed" } : b);
        setBookingList(updated);
        _mBookings = updated;
        show("Booking accepted");
    };
    const reject = (id) => {
        const updated = bookingList.map(b => b.id === id ? { ...b, status: "cancelled" } : b);
        setBookingList(updated);
        _mBookings = updated;
        show("Booking rejected", "error");
    };
    const pending = bookingList.filter(b => b.status === "pending");
    const completed = bookingList.filter(b => b.status === "completed");
    const totalEarnings = bookingList.filter(b => b.status === "completed").reduce((s, b) => s + b.fee, 0);
    return (<DashboardLayout title="Mentor Dashboard" subtitle={`Welcome back, ${user?.name ?? "Mentor"}`}>
      {ToastEl}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="My Services" value={_mServices.length.toString()} icon={<BookOpen size={18}/>} color="orange"/>
        <StatCard label="Pending Requests" value={pending.length.toString()} icon={<Clock size={18}/>} color="blue"/>
        <StatCard label="Completed Sessions" value={completed.length.toString()} icon={<Users size={18}/>} color="green"/>
        <StatCard label="Total Earnings" value={`৳${totalEarnings.toLocaleString()}`} icon={<DollarSign size={18}/>} trend="+12% this month" color="green"/>
        <StatCard label="This Month" value="৳12,400" icon={<DollarSign size={18}/>} color="purple"/>
        <StatCard label="Avg Rating" value="4.7 ⭐" icon={<Star size={18}/>} color="orange"/>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pending requests */}
          {pending.length > 0 && (<Card className="p-5 border-orange-200">
              <SectionHeader title="Pending Booking Requests" action={<span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{pending.length} waiting</span>}/>
              <div className="space-y-3">
                {pending.map(b => (<div key={b.id} className="flex items-center justify-between p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                    <div>
                      <p className="font-bold text-[#1F2937] text-sm">{b.student}</p>
                      <p className="text-xs text-[#6B7280]">{b.service}</p>
                      <p className="text-xs text-[#9CA3AF]">📅 {b.date} · ⏰ {b.time} · 💰 ৳{b.fee}</p>
                      {b.notes && <p className="text-xs text-[#9CA3AF] mt-1 italic">"{b.notes}"</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => accept(b.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600">
                        <CheckCircle size={13}/> Accept
                      </button>
                      <button onClick={() => reject(b.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-200">
                        <XCircle size={13}/> Reject
                      </button>
                    </div>
                  </div>))}
              </div>
            </Card>)}

          {/* Recent bookings */}
          <Card className="p-5">
            <SectionHeader title="Recent Bookings" action={<Link to="/mentor/bookings"><Button variant="outline" size="sm">View All</Button></Link>}/>
            <div className="space-y-3">
              {bookingList.slice(0, 5).map(b => (<div key={b.id} className="flex items-center justify-between p-3 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">{b.student}</p>
                    <p className="text-xs text-[#6B7280]">{b.service}</p>
                    <p className="text-xs text-[#9CA3AF]">{b.date} · {b.time}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={b.status}/>
                    <p className="text-xs text-[#9CA3AF] mt-1">৳{b.fee}</p>
                  </div>
                </div>))}
            </div>
          </Card>

          {/* Earnings chart */}
          <Card className="p-5">
            <SectionHeader title="Earnings Trend" subtitle="Monthly earnings (৳)"/>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
                <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }} formatter={(v) => [`৳${Number(v).toLocaleString()}`, "Earnings"]}/>
                <Area type="monotone" dataKey="earnings" stroke="#F97316" fill="#FFF7ED" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <h3 className="text-sm font-bold text-[#1F2937] font-display mb-4">Earnings Summary</h3>
            <div className="space-y-3">
              {[["This Month", "৳12,400"], ["Last Month", "৳10,200"], ["Total", `৳${totalEarnings || 600}`]].map(([label, val]) => (<div key={label} className="flex justify-between items-center p-2.5 bg-[#FAFAF9] rounded-xl">
                  <span className="text-sm text-[#6B7280]">{label}</span>
                  <span className="font-bold text-[#1F2937]">{val}</span>
                </div>))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-bold text-[#1F2937] font-display mb-3">My Services</h3>
            <div className="space-y-2">
              {_mServices.slice(0, 3).map(s => (<div key={s.id} className="flex items-center justify-between p-2.5 bg-[#FAFAF9] rounded-xl">
                  <div>
                    <p className="text-xs font-semibold text-[#1F2937] line-clamp-1">{s.name}</p>
                    <p className="text-xs text-[#9CA3AF]">৳{s.fee}</p>
                  </div>
                  <StatusBadge status={s.status}/>
                </div>))}
            </div>
            <Link to="/mentor/services">
              <Button variant="outline" size="sm" className="w-full mt-3">Manage Services</Button>
            </Link>
          </Card>

          <Card className="p-5 bg-[#F97316] border-[#F97316]">
            <p className="text-sm font-bold text-white mb-1">Add New Service</p>
            <p className="text-xs text-white/80 mb-3">Create a new session for students to book.</p>
            <Link to="/mentor/services">
              <Button variant="secondary" size="sm"><Plus size={14}/> Create Service</Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}
// ─── Mentor Services Page ──────────────────────────────────────────────────────
export function MentorServicesPage() {
    const [serviceList, setServiceList] = useState(_mServices);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [delService, setDelService] = useState(null);
    const [viewService, setViewService] = useState(null);
    const { show, ToastEl } = useToast();
    const sync = (updated) => { setServiceList(updated); _mServices = updated; };
    const handleSave = (s) => {
        if (editingService) {
            sync(serviceList.map(x => x.id === s.id ? s : x));
            show("Service updated");
        }
        else {
            sync([s, ...serviceList]);
            show("Service submitted for admin approval");
        }
        setShowForm(false);
        setEditingService(null);
    };
    const startEdit = (s) => { setEditingService(s); setShowForm(false); };
    const cancelForm = () => { setShowForm(false); setEditingService(null); };
    return (<DashboardLayout title="My Services" subtitle="Manage and create mentorship services">
      {ToastEl}
      {delService && (<Confirm title="Delete Service" msg={`Delete "${delService.name}"? This cannot be undone.`} danger onOk={() => { sync(serviceList.filter(s => s.id !== delService.id)); setDelService(null); show("Service deleted", "error"); }} onCancel={() => setDelService(null)}/>)}

      {/* View modal */}
      {viewService && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937] font-display">Service Details</h2>
              <button onClick={() => setViewService(null)}><X size={18} className="text-[#9CA3AF]"/></button>
            </div>
            <Badge variant="orange" className="mb-3">{viewService.category}</Badge>
            <h3 className="font-bold text-[#1F2937] font-display mb-2">{viewService.name}</h3>
            <p className="text-sm text-[#374151] mb-4">{viewService.description}</p>
            <div className="space-y-2 text-sm">
              {[["Fee", `৳${viewService.fee}`], ["Date", viewService.date], ["Time", viewService.time], ["Status", viewService.status]].map(([k, v]) => (<div key={k} className="flex justify-between p-2.5 bg-[#FAFAF9] rounded-xl">
                  <span className="text-[#6B7280]">{k}</span>
                  <span className="font-semibold text-[#1F2937]">{v}</span>
                </div>))}
            </div>
            <div className="flex gap-3 mt-5">
              <Button variant="outline" className="flex-1" onClick={() => setViewService(null)}>Close</Button>
              <Button className="flex-1" onClick={() => { startEdit(viewService); setViewService(null); }}>Edit</Button>
            </div>
          </Card>
        </div>)}

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#6B7280]">{serviceList.length} services</p>
        <Button onClick={() => { setEditingService(null); setShowForm(!showForm); }}>
          <Plus size={14}/> {showForm ? "Close Form" : "Create Service"}
        </Button>
      </div>

      {(showForm && !editingService) && (<ServiceForm onSave={handleSave} onCancel={cancelForm}/>)}
      {editingService && (<ServiceForm initial={editingService} onSave={handleSave} onCancel={cancelForm}/>)}

      {serviceList.length === 0 ? (<Card className="p-12 text-center">
          <p className="text-4xl mb-3">📋</p>
          <h3 className="font-bold text-[#1F2937] font-display mb-1">No services yet</h3>
          <p className="text-sm text-[#6B7280] mb-4">Create your first service to start accepting bookings.</p>
          <Button onClick={() => setShowForm(true)}><Plus size={14}/> Create Service</Button>
        </Card>) : (<Table>
          <thead>
            <tr><Th>Service</Th><Th>Category</Th><Th>Fee</Th><Th>Date</Th><Th>Time</Th><Th>Status</Th><Th>Actions</Th></tr>
          </thead>
          <tbody>
            {serviceList.map(s => (<tr key={s.id} className="hover:bg-[#FAFAF9]">
                <Td>
                  <p className="font-semibold text-[#1F2937]">{s.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{s.department?.split("&")[0]}</p>
                </Td>
                <Td><Badge variant="orange">{s.category}</Badge></Td>
                <Td><span className="font-semibold">৳{s.fee}</span></Td>
                <Td><span className="text-xs">{s.date}</span></Td>
                <Td><span className="text-xs">{s.time}</span></Td>
                <Td><StatusBadge status={s.status}/></Td>
                <Td>
                  <div className="flex gap-1">
                    <button onClick={() => setViewService(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]" title="View"><Eye size={14}/></button>
                    <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]" title="Edit"><Edit size={14}/></button>
                    <button onClick={() => setDelService(s)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" title="Delete"><Trash2 size={14}/></button>
                  </div>
                </Td>
              </tr>))}
          </tbody>
        </Table>)}
    </DashboardLayout>);
}
// ─── Mentor Bookings Page ──────────────────────────────────────────────────────
export function MentorBookingsPage() {
    const [bookingList, setBookingList] = useState(_mBookings);
    const [active, setActive] = useState("all");
    const [search, setSearch] = useState("");
    const [viewBooking, setViewBooking] = useState(null);
    const { show, ToastEl } = useToast();
    const sync = (updated) => { setBookingList(updated); _mBookings = updated; };
    const accept = (id) => { sync(bookingList.map(b => b.id === id ? { ...b, status: "confirmed" } : b)); show("Booking accepted"); };
    const reject = (id) => { sync(bookingList.map(b => b.id === id ? { ...b, status: "cancelled" } : b)); show("Booking rejected", "error"); };
    const complete = (id) => { sync(bookingList.map(b => b.id === id ? { ...b, status: "completed", paymentStatus: "released" } : b)); show("Session marked as completed"); };
    const counts = {
        all: bookingList.length,
        pending: bookingList.filter(b => b.status === "pending").length,
        confirmed: bookingList.filter(b => b.status === "confirmed").length,
        completed: bookingList.filter(b => b.status === "completed").length,
        cancelled: bookingList.filter(b => b.status === "cancelled").length,
    };
    const tabList = [
        { id: "all", label: "All", count: counts.all },
        { id: "pending", label: "Pending", count: counts.pending },
        { id: "confirmed", label: "Confirmed", count: counts.confirmed },
        { id: "completed", label: "Completed", count: counts.completed },
        { id: "cancelled", label: "Cancelled", count: counts.cancelled },
    ];
    const filtered = bookingList
        .filter(b => active === "all" || b.status === active)
        .filter(b => !search || b.student.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase()));
    const totalPending = counts.pending;
    return (<DashboardLayout title="Bookings" subtitle="Manage student booking requests">
      {ToastEl}

      {/* View booking modal */}
      {viewBooking && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1F2937] font-display">Booking Details</h2>
              <button onClick={() => setViewBooking(null)}><X size={18} className="text-[#9CA3AF]"/></button>
            </div>
            <div className="space-y-2 text-sm mb-5">
              {[
                ["Booking ID", viewBooking.id],
                ["Student", viewBooking.student],
                ["Service", viewBooking.service],
                ["Date", viewBooking.date],
                ["Time", viewBooking.time],
                ["Fee", `৳${viewBooking.fee}`],
            ].map(([k, v]) => (<div key={k} className="flex justify-between p-2.5 bg-[#FAFAF9] rounded-xl">
                  <span className="text-[#6B7280]">{k}</span>
                  <span className="font-semibold text-[#1F2937]">{v}</span>
                </div>))}
              <div className="flex justify-between p-2.5 bg-[#FAFAF9] rounded-xl">
                <span className="text-[#6B7280]">Status</span>
                <StatusBadge status={viewBooking.status}/>
              </div>
              <div className="flex justify-between p-2.5 bg-[#FAFAF9] rounded-xl">
                <span className="text-[#6B7280]">Payment</span>
                <StatusBadge status={viewBooking.paymentStatus}/>
              </div>
              {viewBooking.notes && (<div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-xs text-blue-700 italic">"{viewBooking.notes}"</p>
                </div>)}
            </div>
            <div className="flex gap-2 flex-wrap">
              {viewBooking.status === "pending" && (<>
                  <Button size="sm" className="flex-1" onClick={() => { accept(viewBooking.id); setViewBooking(null); }}>Accept</Button>
                  <Button size="sm" variant="danger" className="flex-1" onClick={() => { reject(viewBooking.id); setViewBooking(null); }}>Reject</Button>
                </>)}
              {viewBooking.status === "confirmed" && (<Button size="sm" className="flex-1" onClick={() => { complete(viewBooking.id); setViewBooking(null); }}>Mark Session Complete</Button>)}
              <Button size="sm" variant="outline" onClick={() => setViewBooking(null)}>Close</Button>
            </div>
          </Card>
        </div>)}

      {/* Alert banner for pending requests */}
      {totalPending > 0 && (<div className="mb-5 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3">
          <Clock size={18} className="text-orange-500 shrink-0"/>
          <p className="text-sm font-semibold text-orange-700">
            You have <strong>{totalPending}</strong> pending booking request{totalPending > 1 ? "s" : ""} waiting for your response.
          </p>
        </div>)}

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex-1 min-w-[200px]">
          <Tabs tabs={tabList} active={active} onChange={setActive}/>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="border border-[#E5E7EB] rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
        <span className="text-xs text-[#9CA3AF]">{filtered.length} bookings</span>
      </div>

      <Table>
        <thead>
          <tr><Th>Student</Th><Th>Service</Th><Th>Date & Time</Th><Th>Fee</Th><Th>Status</Th><Th>Payment</Th><Th>Actions</Th></tr>
        </thead>
        <tbody>
          {filtered.map(b => (<tr key={b.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="font-semibold text-[#1F2937]">{b.student}</span></Td>
              <Td><span className="text-xs">{b.service}</span></Td>
              <Td><span className="text-xs">{b.date} · {b.time}</span></Td>
              <Td><span className="font-semibold">৳{b.fee}</span></Td>
              <Td><StatusBadge status={b.status}/></Td>
              <Td><StatusBadge status={b.paymentStatus}/></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={() => setViewBooking(b)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]" title="View details"><Eye size={14}/></button>
                  {b.status === "pending" && (<>
                      <button onClick={() => accept(b.id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="Accept"><CheckCircle size={14}/></button>
                      <button onClick={() => reject(b.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100" title="Reject"><XCircle size={14}/></button>
                    </>)}
                  {b.status === "confirmed" && (<button onClick={() => complete(b.id)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold px-2" title="Mark complete">
                      Done
                    </button>)}
                </div>
              </Td>
            </tr>))}
          {filtered.length === 0 && (<tr><td colSpan={7} className="text-center text-sm text-[#9CA3AF] py-10">No bookings found</td></tr>)}
        </tbody>
      </Table>
    </DashboardLayout>);
}
