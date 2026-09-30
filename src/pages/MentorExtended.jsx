import { useState, useEffect } from "react";
import { X, CheckCircle, XCircle, Save, Camera } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, Button, Input, Select, SectionHeader, StarRating, StatusBadge, Table, Th, Td } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { departments } from "../data/mockData";
import { DollarSign, Users, BookOpen, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// ─── Toast ─────────────────────────────────────────────────────────────────────
function useToast() {
    const [toast, setToast] = useState(null);
    useEffect(() => { if (!toast)
        return; const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }, [toast]);
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
// ─── Mentor Profile Page ───────────────────────────────────────────────────────
export function MentorProfilePage() {
    const { user, login } = useAuth();
    const { show, ToastEl } = useToast();
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [dept, setDept] = useState(user?.dept ?? "");
    const [mobile, setMobile] = useState("+880 1913-456789");
    const [bio, setBio] = useState("Senior software engineer at a leading tech company. Specializes in web development and preparing students for top tech interviews.");
    const [expertise, setExpertise] = useState("Full Stack Development, React, Node.js, Interview Prep");
    const [availability, setAvailability] = useState("Mon, Tue, Thu");
    const [sessionFee, setSessionFee] = useState("500");
    const handleSave = () => {
        login({ role: "mentor", name, dept, email });
        show("Profile updated successfully");
    };
    return (<DashboardLayout title="My Profile" subtitle="Manage your public mentor profile">
      {ToastEl}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar card */}
        <Card className="p-6 text-center h-fit">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format" alt={name} className="w-24 h-24 rounded-2xl object-cover"/>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F97316] rounded-xl flex items-center justify-center text-white shadow">
              <Camera size={14}/>
            </button>
          </div>
          <h3 className="font-bold text-[#1F2937] font-display">{name}</h3>
          <p className="text-sm text-[#6B7280] mt-0.5">{dept}</p>
          <div className="flex justify-center mt-2">
            <StarRating rating={4.7} size="md"/>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">215 sessions completed</p>
          <div className="mt-4 p-3 bg-green-50 rounded-xl">
            <p className="text-xs text-green-700 font-semibold">✅ Verified Mentor</p>
          </div>
        </Card>

        {/* Edit form */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6">
            <SectionHeader title="Personal Information"/>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Input label="Full Name" value={name} onChange={e => setName(e.target.value)}/>
              <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
              <Input label="Mobile" value={mobile} onChange={e => setMobile(e.target.value)}/>
              <Input label="Default Session Fee (৳)" type="number" value={sessionFee} onChange={e => setSessionFee(e.target.value)}/>
              <Select label="Department" value={dept} onChange={e => setDept(e.target.value)} options={departments.map(d => ({ value: d, label: d }))} className="sm:col-span-2"/>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader title="Professional Info"/>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
              </div>
              <Input label="Areas of Expertise (comma-separated)" value={expertise} onChange={e => setExpertise(e.target.value)}/>
              <Input label="Availability (e.g. Mon, Tue, Thu)" value={availability} onChange={e => setAvailability(e.target.value)}/>
            </div>
          </Card>

          <Button onClick={handleSave}><Save size={15}/> Save Profile</Button>
        </div>
      </div>
    </DashboardLayout>);
}
// ─── Mentor Students Page ──────────────────────────────────────────────────────
const myStudents = [
    { id: "011201010", name: "Arif Hossain", dept: "CSE", sessions: 3, lastSession: "2024-02-15", status: "active", notes: "Preparing for FAANG interviews" },
    { id: "011201011", name: "Sadia Islam", dept: "CSE", sessions: 1, lastSession: "2024-01-20", status: "completed", notes: "Career guidance session" },
    { id: "011201012", name: "Raihan Ahmed", dept: "EEE", sessions: 2, lastSession: "2024-02-10", status: "active", notes: "Final year project guidance" },
];
export function MentorStudentsPage() {
    const [students, setStudents] = useState(myStudents);
    const [noteModal, setNoteModal] = useState(null);
    const [noteText, setNoteText] = useState("");
    const { show, ToastEl } = useToast();
    return (<DashboardLayout title="My Students" subtitle="Students who have booked sessions with you">
      {ToastEl}
      {noteModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1F2937] font-display">Add Note — {noteModal.name}</h2>
              <button onClick={() => setNoteModal(null)}><X size={18} className="text-[#9CA3AF]"/></button>
            </div>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note about this student's progress..." rows={4} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none mb-4"/>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setNoteModal(null)}>Cancel</Button>
              <Button className="flex-1" onClick={() => {
                setStudents(prev => prev.map(s => s.id === noteModal.id ? { ...s, notes: noteText } : s));
                setNoteModal(null);
                show("Note saved");
            }}>Save Note</Button>
            </div>
          </Card>
        </div>)}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Students" value={students.length.toString()} icon={<Users size={16}/>} color="orange"/>
        <StatCard label="Active" value={students.filter(s => s.status === "active").length.toString()} icon={<CheckCircle size={16}/>} color="green"/>
        <StatCard label="Completed" value={students.filter(s => s.status === "completed").length.toString()} icon={<BookOpen size={16}/>} color="blue"/>
      </div>

      <div className="space-y-4">
        {students.map(s => (<Card key={s.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-lg font-bold text-orange-600 shrink-0">
                  {s.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-[#1F2937] font-display">{s.name}</h3>
                  <p className="text-xs text-[#9CA3AF]">{s.dept} · {s.id}</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {s.sessions} session{s.sessions > 1 ? "s" : ""} · Last: {s.lastSession}
                  </p>
                  {s.notes && <p className="text-xs text-[#6B7280] mt-1 italic bg-[#FAFAF9] px-2 py-1 rounded-lg">📝 {s.notes}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={s.status}/>
                <Button size="sm" variant="outline" onClick={() => { setNoteModal(s); setNoteText(s.notes); }}>
                  Add Note
                </Button>
              </div>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Mentor Earnings Page ──────────────────────────────────────────────────────
const earningsHistory = [
    { id: "PAY-001", student: "Arif Hossain", service: "FAANG Interview Prep", amount: 800, commission: 40, net: 760, date: "2024-02-15", status: "released" },
    { id: "PAY-002", student: "Sadia Islam", service: "Entrepreneurship Session", amount: 600, commission: 30, net: 570, date: "2024-01-20", status: "released" },
    { id: "PAY-003", student: "Raihan Ahmed", service: "Full Stack Bootcamp", amount: 400, commission: 20, net: 380, date: "2024-02-10", status: "escrow" },
];
const monthlyEarnings = [
    { month: "Sep", gross: 8400, net: 7980 }, { month: "Oct", gross: 11200, net: 10640 },
    { month: "Nov", gross: 9600, net: 9120 }, { month: "Dec", gross: 13000, net: 12350 },
    { month: "Jan", gross: 10800, net: 10260 }, { month: "Feb", gross: 12400, net: 11780 },
];
export function MentorEarningsPage() {
    const totalGross = earningsHistory.reduce((s, e) => s + e.amount, 0);
    const totalNet = earningsHistory.reduce((s, e) => s + e.net, 0);
    const totalCommission = earningsHistory.reduce((s, e) => s + e.commission, 0);
    return (<DashboardLayout title="Earnings" subtitle="Track your income and payment history">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Gross" value={`৳${totalGross.toLocaleString()}`} icon={<DollarSign size={16}/>} color="green"/>
        <StatCard label="Platform Commission" value={`৳${totalCommission}`} icon={<TrendingUp size={16}/>} color="orange"/>
        <StatCard label="Net Earnings" value={`৳${totalNet.toLocaleString()}`} icon={<DollarSign size={16}/>} color="blue"/>
        <StatCard label="In Escrow" value={`৳${earningsHistory.filter(e => e.status === "escrow").reduce((s, e) => s + e.net, 0)}`} icon={<BookOpen size={16}/>} color="purple"/>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-5">
          <SectionHeader title="Monthly Gross vs Net"/>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }} formatter={(v) => `৳${Number(v).toLocaleString()}`}/>
              <Area type="monotone" dataKey="gross" stroke="#F97316" fill="#FFF7ED" strokeWidth={2} name="Gross"/>
              <Area type="monotone" dataKey="net" stroke="#16A34A" fill="#F0FDF4" strokeWidth={2} name="Net"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <SectionHeader title="Monthly Net Earnings (৳)"/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }} formatter={(v) => `৳${Number(v).toLocaleString()}`}/>
              <Bar dataKey="net" fill="#F97316" radius={[4, 4, 0, 0]} name="Net"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <SectionHeader title="Payment History"/>
        <Table>
          <thead>
            <tr><Th>Payment ID</Th><Th>Student</Th><Th>Service</Th><Th>Gross</Th><Th>Commission (5%)</Th><Th>Net Payout</Th><Th>Date</Th><Th>Status</Th></tr>
          </thead>
          <tbody>
            {earningsHistory.map(e => (<tr key={e.id} className="hover:bg-[#FAFAF9]">
                <Td><span className="font-mono text-xs text-[#F97316]">{e.id}</span></Td>
                <Td><span className="font-semibold">{e.student}</span></Td>
                <Td><span className="text-xs">{e.service}</span></Td>
                <Td><span className="font-semibold">৳{e.amount}</span></Td>
                <Td><span className="text-red-500">-৳{e.commission}</span></Td>
                <Td><span className="font-bold text-green-600">৳{e.net}</span></Td>
                <Td><span className="text-xs">{e.date}</span></Td>
                <Td><StatusBadge status={e.status}/></Td>
              </tr>))}
          </tbody>
        </Table>
      </Card>
    </DashboardLayout>);
}
// ─── Mentor Payments Page ──────────────────────────────────────────────────────
export function MentorPaymentsPage() {
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [bkash, setBkash] = useState("+880 1913-456789");
    const { show, ToastEl } = useToast();
    const available = 1330;
    const pending = 380;
    return (<DashboardLayout title="Payments" subtitle="Withdraw your earnings and manage payment methods">
      {ToastEl}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <Card className="p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
            <p className="text-xs text-slate-400 mb-1">Available Balance</p>
            <p className="text-4xl font-bold font-display">৳{available.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2">৳{pending} in escrow (pending release)</p>
            <div className="flex gap-3 mt-5">
              <Button size="sm" onClick={() => show("Withdrawal request submitted!")}>Withdraw Now</Button>
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">View History</Button>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader title="Request Withdrawal"/>
            <div className="space-y-4 mt-4">
              <Input label="Amount (৳)" type="number" placeholder="Enter amount to withdraw" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)}/>
              <Input label="bKash Number" value={bkash} onChange={e => setBkash(e.target.value)}/>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700">
                Withdrawals are processed within 1–2 business days via bKash. Minimum withdrawal: ৳500.
              </div>
              <Button className="w-full" onClick={() => {
            if (!withdrawAmount || Number(withdrawAmount) < 500) {
                show("Minimum withdrawal is ৳500", "error");
                return;
            }
            if (Number(withdrawAmount) > available) {
                show("Insufficient balance", "error");
                return;
            }
            show(`Withdrawal of ৳${withdrawAmount} requested successfully!`);
            setWithdrawAmount("");
        }}>Submit Withdrawal Request</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-6">
            <SectionHeader title="Payment Summary"/>
            <div className="space-y-3 mt-4">
              {[
            ["Total Earned", "৳1,800"],
            ["Platform Commission (5%)", "-৳90"],
            ["Net Earnings", "৳1,710"],
            ["Already Withdrawn", "৳380"],
            ["Available Balance", `৳${available}`],
            ["In Escrow", `৳${pending}`],
        ].map(([k, v]) => (<div key={k} className={`flex justify-between p-3 rounded-xl ${k === "Available Balance" ? "bg-orange-50 border border-orange-100" : "bg-[#FAFAF9]"}`}>
                  <span className="text-sm text-[#6B7280]">{k}</span>
                  <span className={`font-bold text-sm ${k === "Available Balance" ? "text-[#F97316]" : k.includes("Commission") ? "text-red-500" : "text-[#1F2937]"}`}>{v}</span>
                </div>))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader title="Withdrawal History"/>
            <div className="space-y-3 mt-3">
              {[
            { date: "2024-01-20", amount: 380, status: "completed", ref: "WD-001" },
        ].map(w => (<div key={w.ref} className="flex items-center justify-between p-3 bg-[#FAFAF9] rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-[#1F2937]">৳{w.amount}</p>
                    <p className="text-xs text-[#9CA3AF]">{w.date} · {w.ref}</p>
                  </div>
                  <StatusBadge status={w.status}/>
                </div>))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}
// ─── Mentor Reviews Page ───────────────────────────────────────────────────────
const allReviews = [
    { id: "1", student: "Arif Hossain", service: "FAANG Interview Prep", rating: 5, comment: "Excellent session! Very practical advice that I could apply immediately to my interview preparation.", date: "2024-02-15" },
    { id: "2", student: "Sadia Islam", service: "Full Stack Bootcamp", rating: 5, comment: "The mentor was very patient and explained React hooks clearly. Highly recommended.", date: "2024-01-15" },
    { id: "3", student: "Raihan Ahmed", service: "Career Guidance", rating: 4, comment: "Great guidance on career planning. Helped me understand what I need to work on.", date: "2024-01-10" },
];
export function MentorReviewsPage() {
    const avgRating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
    const dist = [5, 4, 3, 2, 1].map(n => ({ star: n, count: allReviews.filter(r => r.rating === n).length }));
    return (<DashboardLayout title="Reviews" subtitle="Student feedback on your sessions">
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 text-center">
          <p className="text-5xl font-bold text-[#1F2937] font-display">{avgRating.toFixed(1)}</p>
          <div className="flex justify-center my-2">
            <StarRating rating={avgRating} size="md"/>
          </div>
          <p className="text-sm text-[#6B7280]">{allReviews.length} total reviews</p>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <SectionHeader title="Rating Breakdown"/>
          <div className="space-y-2 mt-3">
            {dist.map(({ star, count }) => (<div key={star} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#374151] w-6">{star}★</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F97316] rounded-full" style={{ width: `${allReviews.length ? (count / allReviews.length) * 100 : 0}%` }}/>
                </div>
                <span className="text-xs text-[#9CA3AF] w-4">{count}</span>
              </div>))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {allReviews.map(r => (<Card key={r.id} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center font-bold text-orange-600">
                  {r.student[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937] text-sm">{r.student}</p>
                  <p className="text-xs text-[#9CA3AF]">{r.service} · {r.date}</p>
                </div>
              </div>
              <StarRating rating={r.rating}/>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed bg-[#FAFAF9] p-3 rounded-xl">"{r.comment}"</p>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Mentor Notifications Page ────────────────────────────────────────────────
export function MentorNotificationsPage() {
    const [notifications, setNotifications] = useState([
        { id: "1", type: "booking", title: "New Booking Request", message: "Arif Hossain has requested a FAANG Interview Prep session on Feb 25, 6:00 PM.", time: "2 hours ago", read: false },
        { id: "2", type: "payment", title: "Payment Released", message: "৳570 has been released to your account for the Entrepreneurship session with Sadia Islam.", time: "1 day ago", read: false },
        { id: "3", type: "review", title: "New Review Received", message: "Raihan Ahmed gave you a 4-star review: \"Great guidance on career planning.\"", time: "2 days ago", read: true },
        { id: "4", type: "system", title: "Profile Approved", message: "Your mentor profile has been approved. You can now receive bookings.", time: "1 week ago", read: true },
        { id: "5", type: "booking", title: "Booking Confirmed", message: "Your session with Arif Hossain on Feb 15 has been confirmed.", time: "1 week ago", read: true },
    ]);
    const unread = notifications.filter(n => !n.read).length;
    const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const typeIcon = { booking: "📅", payment: "💰", review: "⭐", system: "🔔" };
    const typeBg = { booking: "bg-blue-50", payment: "bg-green-50", review: "bg-yellow-50", system: "bg-gray-50" };
    return (<DashboardLayout title="Notifications" subtitle="Stay updated on bookings, payments, and reviews">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#6B7280]">{unread} unread notification{unread !== 1 ? "s" : ""}</p>
        {unread > 0 && (<Button size="sm" variant="outline" onClick={markAllRead}>Mark all as read</Button>)}
      </div>

      <div className="space-y-3">
        {notifications.map(n => (<Card key={n.id} className={`p-4 cursor-pointer transition-all ${!n.read ? "border-orange-200 bg-orange-50/30" : ""}`} onClick={() => markRead(n.id)}>
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${typeBg[n.type]}`}>
                {typeIcon[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#1F2937] text-sm">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-[#F97316] rounded-full shrink-0"/>}
                </div>
                <p className="text-sm text-[#6B7280] mt-0.5">{n.message}</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{n.time}</p>
              </div>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Mentor Settings Page ──────────────────────────────────────────────────────
export function MentorSettingsPage() {
    const { user } = useAuth();
    const { show, ToastEl } = useToast();
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [autoAccept, setAutoAccept] = useState(false);
    const [profileVisible, setProfileVisible] = useState(true);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Toggle = ({ on, onChange, label, desc }) => (<div className="flex items-center justify-between p-4 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
      <div>
        <p className="text-sm font-semibold text-[#374151]">{label}</p>
        {desc && <p className="text-xs text-[#9CA3AF] mt-0.5">{desc}</p>}
      </div>
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-[#F97316]" : "bg-[#D1D5DB]"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`}/>
      </button>
    </div>);
    return (<DashboardLayout title="Settings" subtitle="Manage your account preferences">
      {ToastEl}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <Card className="p-6">
            <SectionHeader title="Notification Preferences"/>
            <div className="space-y-3 mt-4">
              <Toggle on={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} label="Email Notifications" desc="Receive booking and payment emails"/>
              <Toggle on={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} label="SMS Notifications" desc="Receive text alerts for new bookings"/>
              <Toggle on={autoAccept} onChange={() => setAutoAccept(!autoAccept)} label="Auto-Accept Bookings" desc="Automatically confirm incoming requests"/>
              <Toggle on={profileVisible} onChange={() => setProfileVisible(!profileVisible)} label="Public Profile Visible" desc="Allow students to find your profile"/>
            </div>
            <Button className="mt-4" onClick={() => show("Preferences saved")}>Save Preferences</Button>
          </Card>

          <Card className="p-6">
            <SectionHeader title="Account Info"/>
            <div className="space-y-3 mt-4 text-sm">
              {[["Name", user?.name ?? "—"], ["Email", user?.email ?? "—"], ["Role", "Mentor"], ["Department", user?.dept ?? "—"]].map(([k, v]) => (<div key={k} className="flex justify-between p-3 bg-[#FAFAF9] rounded-xl">
                  <span className="text-[#6B7280]">{k}</span>
                  <span className="font-semibold text-[#1F2937]">{v}</span>
                </div>))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-6">
            <SectionHeader title="Change Password"/>
            <div className="space-y-4 mt-4">
              <Input label="Current Password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••"/>
              <Input label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••"/>
              <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"/>
              <Button className="w-full" onClick={() => {
            if (!currentPassword || !newPassword) {
                show("Please fill all fields", "error");
                return;
            }
            if (newPassword !== confirmPassword) {
                show("Passwords do not match", "error");
                return;
            }
            if (newPassword.length < 6) {
                show("Password must be at least 6 characters", "error");
                return;
            }
            show("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }}>Update Password</Button>
            </div>
          </Card>

          <Card className="p-6 border-red-100">
            <SectionHeader title="Danger Zone"/>
            <div className="space-y-3 mt-4">
              <Button variant="danger" className="w-full" onClick={() => show("Deactivation request sent to admin", "info")}>
                Deactivate Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}
