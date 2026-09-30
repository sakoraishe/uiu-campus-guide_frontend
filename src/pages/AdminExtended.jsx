import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X, CheckCircle, XCircle, Search, AlertTriangle, Upload } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, Table, Th, Td, StatusBadge, Button, SectionHeader, Badge, Input, Select } from "../components/ui";
import { news as rawNews, events as rawEvents, alerts as rawAlerts, resources as rawResources, stories as rawStories, achievements as rawAchievements, } from "../data/mockData";
import { Users, BookOpen, Building, TrendingUp, CreditCard } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
// ─── Shared helpers ────────────────────────────────────────────────────────────
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
      {toast.type === "info" && <AlertTriangle size={15}/>}
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
function Modal({ title, onClose, children }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#1F2937] font-display">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-[#9CA3AF] hover:text-[#374151]"/></button>
        </div>
        {children}
      </Card>
    </div>);
}
// ─── Students ─────────────────────────────────────────────────────────────────
const rawStudents = [
    { id: "011201010", name: "Arif Hossain", dept: "CSE", email: "arif@uiu.ac.bd", semester: 7, program: "B.Sc.", status: "active", joinDate: "2021-01-10" },
    { id: "011201011", name: "Sadia Islam", dept: "CSE", email: "sadia@uiu.ac.bd", semester: 5, program: "B.Sc.", status: "active", joinDate: "2022-01-15" },
    { id: "011201012", name: "Raihan Ahmed", dept: "EEE", email: "raihan@uiu.ac.bd", semester: 8, program: "B.Sc.", status: "active", joinDate: "2020-09-01" },
    { id: "011201013", name: "Lamia Haque", dept: "BBA", email: "lamia@uiu.ac.bd", semester: 4, program: "BBA", status: "inactive", joinDate: "2022-09-10" },
    { id: "011201014", name: "Farhad Ali", dept: "CSE", email: "farhad@uiu.ac.bd", semester: 3, program: "B.Sc.", status: "active", joinDate: "2023-01-20" },
    { id: "011201015", name: "Nadia Rahman", dept: "Pharmacy", email: "nadia@uiu.ac.bd", semester: 6, program: "B.Pharm.", status: "active", joinDate: "2021-09-05" },
    { id: "011201016", name: "Sabbir Hossain", dept: "English", email: "sabbir@uiu.ac.bd", semester: 2, program: "B.A.", status: "active", joinDate: "2023-09-01" },
];
export function AdminStudentsPage() {
    const [students, setStudents] = useState(rawStudents);
    const [search, setSearch] = useState("");
    const [deptFilter, setDeptFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");
    const [del, setDel] = useState(null);
    const [editing, setEditing] = useState(null);
    const { show, ToastEl } = useToast();
    const depts = ["All", ...Array.from(new Set(students.map(s => s.dept)))];
    const filtered = students
        .filter(s => statusFilter === "all" || s.status === statusFilter)
        .filter(s => deptFilter === "All" || s.dept === deptFilter)
        .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search));
    const toggleStatus = (id) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s));
        show("Student status updated");
    };
    return (<DashboardLayout title="Student Management" subtitle="View and manage all registered students">
      {ToastEl}
      {del && <Confirm title="Remove Student" msg={`Remove ${del.name} from the platform?`} danger onOk={() => { setStudents(s => s.filter(x => x.id !== del.id)); setDel(null); show("Student removed"); }} onCancel={() => setDel(null)}/>}
      {editing && (<Modal title="Edit Student" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Input label="Full Name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}/>
            <Input label="Email" value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })}/>
            <div className="grid grid-cols-2 gap-3">
              <Select label="Department" value={editing.dept} onChange={e => setEditing({ ...editing, dept: e.target.value })} options={["CSE", "EEE", "BBA", "Pharmacy", "English"].map(d => ({ value: d, label: d }))}/>
              <Select label="Status" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}/>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
            <Button className="flex-1" onClick={() => {
                setStudents(prev => prev.map(s => s.id === editing.id ? editing : s));
                setEditing(null);
                show("Student updated");
            }}>Save Changes</Button>
          </div>
        </Modal>)}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value={students.length.toString()} icon={<Users size={16}/>} color="orange"/>
        <StatCard label="Active" value={students.filter(s => s.status === "active").length.toString()} icon={<CheckCircle size={16}/>} color="green"/>
        <StatCard label="Inactive" value={students.filter(s => s.status === "inactive").length.toString()} icon={<XCircle size={16}/>} color="blue"/>
        <StatCard label="Departments" value={Array.from(new Set(students.map(s => s.dept))).length.toString()} icon={<Building size={16}/>} color="purple"/>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="w-full border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
        <Select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} options={depts.map(d => ({ value: d, label: d }))} className="min-w-[160px]"/>
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} options={[{ value: "all", label: "All Statuses" }, { value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} className="min-w-[140px]"/>
        <span className="text-xs text-[#9CA3AF] self-center">{filtered.length} students</span>
      </div>

      <Table>
        <thead><tr><Th>ID</Th><Th>Name</Th><Th>Email</Th><Th>Dept</Th><Th>Semester</Th><Th>Status</Th><Th>Joined</Th><Th>Actions</Th></tr></thead>
        <tbody>
          {filtered.map(s => (<tr key={s.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="font-mono text-xs">{s.id}</span></Td>
              <Td><span className="font-semibold text-[#1F2937]">{s.name}</span></Td>
              <Td><span className="text-xs">{s.email}</span></Td>
              <Td><Badge variant="orange">{s.dept}</Badge></Td>
              <Td>Sem {s.semester}</Td>
              <Td><StatusBadge status={s.status}/></Td>
              <Td><span className="text-xs">{s.joinDate}</span></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]" title="Edit"><Edit size={13}/></button>
                  <button onClick={() => toggleStatus(s.id)} className={`p-1.5 rounded-lg ${s.status === "active" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-600"}`} title="Toggle status">
                    {s.status === "active" ? <XCircle size={13}/> : <CheckCircle size={13}/>}
                  </button>
                  <button onClick={() => setDel(s)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" title="Delete"><Trash2 size={13}/></button>
                </div>
              </Td>
            </tr>))}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Users (all roles) ────────────────────────────────────────────────────────
export function AdminUsersPage() {
    const allUsers = [
        { id: "USR-001", name: "Arif Hossain", email: "arif@uiu.ac.bd", role: "student", status: "active", joinDate: "2021-01-10" },
        { id: "USR-002", name: "Dr. Rafiqul Islam", email: "rafiqul@uiu.ac.bd", role: "mentor", status: "active", joinDate: "2023-01-15" },
        { id: "USR-003", name: "Prof. Dr. Mahmud", email: "mahmud@uiu.ac.bd", role: "faculty", status: "active", joinDate: "2022-06-01" },
        { id: "USR-004", name: "System Admin", email: "admin@uiu.ac.bd", role: "admin", status: "active", joinDate: "2020-01-01" },
        { id: "USR-005", name: "Ms. Nusrat Jahan", email: "nusrat@uiu.ac.bd", role: "mentor", status: "active", joinDate: "2023-03-10" },
        { id: "USR-006", name: "Sadia Islam", email: "sadia@uiu.ac.bd", role: "student", status: "active", joinDate: "2022-01-15" },
        { id: "USR-007", name: "Ms. Tasmia Haque", email: "tasmia@uiu.ac.bd", role: "mentor", status: "pending", joinDate: "2023-09-01" },
    ];
    const [users, setUsers] = useState(allUsers);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const { show, ToastEl } = useToast();
    const filtered = users
        .filter(u => roleFilter === "all" || u.role === roleFilter)
        .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    const roleColors = {
        admin: "bg-purple-50 text-purple-700",
        mentor: "bg-blue-50 text-blue-700",
        faculty: "bg-green-50 text-green-700",
        student: "bg-orange-50 text-orange-700",
    };
    return (<DashboardLayout title="User Management" subtitle="All platform users across all roles">
      {ToastEl}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["student", "mentor", "faculty", "admin"].map(role => (<StatCard key={role} label={role.charAt(0).toUpperCase() + role.slice(1) + "s"} value={users.filter(u => u.role === role).length.toString()} icon={<Users size={16}/>} color={role === "student" ? "orange" : role === "mentor" ? "blue" : role === "faculty" ? "green" : "purple"}/>))}
      </div>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
        <Select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} options={[{ value: "all", label: "All Roles" }, { value: "student", label: "Students" }, { value: "mentor", label: "Mentors" }, { value: "faculty", label: "Faculty" }, { value: "admin", label: "Admins" }]} className="min-w-[150px]"/>
        <span className="text-xs text-[#9CA3AF] self-center">{filtered.length} users</span>
      </div>
      <Table>
        <thead><tr><Th>User ID</Th><Th>Name</Th><Th>Email</Th><Th>Role</Th><Th>Status</Th><Th>Joined</Th><Th>Actions</Th></tr></thead>
        <tbody>
          {filtered.map(u => (<tr key={u.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="font-mono text-xs text-[#F97316]">{u.id}</span></Td>
              <Td><span className="font-semibold text-[#1F2937]">{u.name}</span></Td>
              <Td><span className="text-xs">{u.email}</span></Td>
              <Td><span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${roleColors[u.role]}`}>{u.role}</span></Td>
              <Td><StatusBadge status={u.status}/></Td>
              <Td><span className="text-xs">{u.joinDate}</span></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={() => { setUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x)); show("User status updated"); }} className={`p-1.5 rounded-lg ${u.status === "active" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-600"}`}>
                    {u.status === "active" ? <XCircle size={13}/> : <CheckCircle size={13}/>}
                  </button>
                  <button onClick={() => { setUsers(prev => prev.filter(x => x.id !== u.id)); show("User removed", "error"); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13}/></button>
                </div>
              </Td>
            </tr>))}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Faculty ──────────────────────────────────────────────────────────────────
const rawFaculty = [
    { id: "FAC-001", name: "Prof. Dr. Mahmud Hasan", dept: "CSE", designation: "Professor", email: "mahmud@uiu.ac.bd", status: "active", courses: 3, joinDate: "2015-01-10" },
    { id: "FAC-002", name: "Dr. Farzana Ahmed", dept: "EEE", designation: "Associate Professor", email: "farzana@uiu.ac.bd", status: "active", courses: 2, joinDate: "2018-03-15" },
    { id: "FAC-003", name: "Mr. Rakib Hassan", dept: "BBA", designation: "Lecturer", email: "rakib@uiu.ac.bd", status: "active", courses: 4, joinDate: "2020-09-01" },
    { id: "FAC-004", name: "Dr. Shireen Chowdhury", dept: "Pharmacy", designation: "Assistant Professor", email: "shireen@uiu.ac.bd", status: "inactive", courses: 2, joinDate: "2019-06-01" },
];
export function AdminFacultyPage() {
    const [faculty, setFaculty] = useState(rawFaculty);
    const [editing, setEditing] = useState(null);
    const [del, setDel] = useState(null);
    const [search, setSearch] = useState("");
    const { show, ToastEl } = useToast();
    const filtered = faculty.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.dept.toLowerCase().includes(search.toLowerCase()));
    return (<DashboardLayout title="Faculty Management" subtitle="Manage faculty members across departments">
      {ToastEl}
      {del && <Confirm title="Remove Faculty" msg={`Remove ${del.name}?`} danger onOk={() => { setFaculty(f => f.filter(x => x.id !== del.id)); setDel(null); show("Faculty removed"); }} onCancel={() => setDel(null)}/>}
      {editing && (<Modal title="Edit Faculty" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Input label="Full Name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}/>
            <Input label="Email" value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })}/>
            <div className="grid grid-cols-2 gap-3">
              <Select label="Department" value={editing.dept} onChange={e => setEditing({ ...editing, dept: e.target.value })} options={["CSE", "EEE", "BBA", "Pharmacy", "English"].map(d => ({ value: d, label: d }))}/>
              <Select label="Status" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}/>
            </div>
            <Input label="Designation" value={editing.designation} onChange={e => setEditing({ ...editing, designation: e.target.value })}/>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
            <Button className="flex-1" onClick={() => { setFaculty(prev => prev.map(f => f.id === editing.id ? editing : f)); setEditing(null); show("Faculty updated"); }}>Save</Button>
          </div>
        </Modal>)}

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty..." className="w-full border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
        </div>
      </div>

      <Table>
        <thead><tr><Th>ID</Th><Th>Name</Th><Th>Department</Th><Th>Designation</Th><Th>Courses</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
        <tbody>
          {filtered.map(f => (<tr key={f.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="font-mono text-xs text-[#F97316]">{f.id}</span></Td>
              <Td><span className="font-semibold text-[#1F2937]">{f.name}</span></Td>
              <Td><Badge variant="orange">{f.dept}</Badge></Td>
              <Td><span className="text-xs">{f.designation}</span></Td>
              <Td>{f.courses} courses</Td>
              <Td><StatusBadge status={f.status}/></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(f)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]"><Edit size={13}/></button>
                  <button onClick={() => setDel(f)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13}/></button>
                </div>
              </Td>
            </tr>))}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── News ─────────────────────────────────────────────────────────────────────
export function AdminNewsPage() {
    const [newsList, setNewsList] = useState(rawNews.map(n => ({ ...n })));
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [del, setDel] = useState(null);
    const { show, ToastEl } = useToast();
    const blank = { id: Date.now().toString(), title: "", excerpt: "", content: "", image: "", author: "", date: new Date().toISOString().split("T")[0], category: "General" };
    const save = () => {
        if (!editing)
            return;
        if (isNew)
            setNewsList(prev => [editing, ...prev]);
        else
            setNewsList(prev => prev.map(n => n.id === editing.id ? editing : n));
        setEditing(null);
        setIsNew(false);
        show(isNew ? "News article created" : "News updated");
    };
    return (<DashboardLayout title="News Management" subtitle="Manage campus news and announcements">
      {ToastEl}
      {del && <Confirm title="Delete Article" msg={`Delete "${del.title}"?`} danger onOk={() => { setNewsList(n => n.filter(x => x.id !== del.id)); setDel(null); show("Article deleted", "error"); }} onCancel={() => setDel(null)}/>}
      {editing && (<Modal title={isNew ? "New Article" : "Edit Article"} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div className="space-y-3">
            <Input label="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}/>
            <Input label="Category" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}/>
            <Input label="Author" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })}/>
            <Input label="Date" type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })}/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Excerpt</label>
              <textarea value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            <Button className="flex-1" onClick={save}>{isNew ? "Publish" : "Save"}</Button>
          </div>
        </Modal>)}

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-[#6B7280]">{newsList.length} articles</p>
        <Button size="sm" onClick={() => { setEditing(blank); setIsNew(true); }}><Plus size={14}/> New Article</Button>
      </div>

      <div className="space-y-4">
        {newsList.map(n => (<Card key={n.id} className="p-5 flex gap-4">
            {n.image ? <img src={n.image} alt={n.title} className="w-24 h-16 rounded-xl object-cover shrink-0"/> : <div className="w-24 h-16 bg-orange-50 rounded-xl shrink-0 flex items-center justify-center text-2xl">📰</div>}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="orange" className="mb-1">{n.category}</Badge>
                  <h3 className="font-bold text-[#1F2937] font-display text-sm">{n.title}</h3>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">{n.excerpt}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{n.author} · {n.date}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEditing(n)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]"><Edit size={13}/></button>
                  <button onClick={() => setDel(n)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13}/></button>
                </div>
              </div>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Events ───────────────────────────────────────────────────────────────────
export function AdminEventsPage() {
    const [eventList, setEventList] = useState(rawEvents.map(e => ({ ...e })));
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [del, setDel] = useState(null);
    const { show, ToastEl } = useToast();
    const blank = { id: Date.now().toString(), title: "", date: "", time: "", location: "", organizer: "", status: "upcoming", description: "", image: "" };
    const save = () => {
        if (!editing)
            return;
        if (isNew)
            setEventList(prev => [editing, ...prev]);
        else
            setEventList(prev => prev.map(e => e.id === editing.id ? editing : e));
        setEditing(null);
        setIsNew(false);
        show(isNew ? "Event created" : "Event updated");
    };
    return (<DashboardLayout title="Events Management" subtitle="Create and manage campus events">
      {ToastEl}
      {del && <Confirm title="Delete Event" msg={`Delete "${del.title}"?`} danger onOk={() => { setEventList(e => e.filter(x => x.id !== del.id)); setDel(null); show("Event deleted", "error"); }} onCancel={() => setDel(null)}/>}
      {editing && (<Modal title={isNew ? "New Event" : "Edit Event"} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div className="space-y-3">
            <Input label="Event Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}/>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Date" type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })}/>
              <Input label="Time" value={editing.time} onChange={e => setEditing({ ...editing, time: e.target.value })}/>
            </div>
            <Input label="Location" value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })}/>
            <Input label="Organizer" value={editing.organizer} onChange={e => setEditing({ ...editing, organizer: e.target.value })}/>
            <Select label="Status" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} options={[{ value: "upcoming", label: "Upcoming" }, { value: "ongoing", label: "Ongoing" }, { value: "completed", label: "Completed" }, { value: "cancelled", label: "Cancelled" }]}/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Description</label>
              <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            <Button className="flex-1" onClick={save}>{isNew ? "Create Event" : "Save"}</Button>
          </div>
        </Modal>)}

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-[#6B7280]">{eventList.length} events</p>
        <Button size="sm" onClick={() => { setEditing(blank); setIsNew(true); }}><Plus size={14}/> New Event</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventList.map(ev => (<Card key={ev.id} className="overflow-hidden flex flex-col">
            <img src={ev.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"} alt={ev.title} className="w-full h-32 object-cover"/>
            <div className="p-4 flex-1">
              <StatusBadge status={ev.status}/>
              <h3 className="font-bold text-[#1F2937] font-display text-sm mt-2 mb-1">{ev.title}</h3>
              <p className="text-xs text-[#9CA3AF]">📅 {ev.date} · ⏰ {ev.time}</p>
              <p className="text-xs text-[#9CA3AF]">📍 {ev.location}</p>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(ev)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => setDel(ev)}>Delete</Button>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Alerts ───────────────────────────────────────────────────────────────────
export function AdminAlertsPage() {
    const [alertList, setAlertList] = useState(rawAlerts.map(a => ({ ...a })));
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const { show, ToastEl } = useToast();
    const blank = { id: Date.now().toString(), type: "info", title: "", message: "", date: new Date().toISOString().split("T")[0], status: "active" };
    const save = () => {
        if (!editing)
            return;
        if (isNew)
            setAlertList(prev => [editing, ...prev]);
        else
            setAlertList(prev => prev.map(a => a.id === editing.id ? editing : a));
        setEditing(null);
        setIsNew(false);
        show(isNew ? "Alert created" : "Alert updated");
    };
    const typeIcon = { warning: "⚠️", info: "ℹ️", error: "🚨" };
    const typeBg = { warning: "bg-yellow-50 border-yellow-200", info: "bg-blue-50 border-blue-200", error: "bg-red-50 border-red-200" };
    return (<DashboardLayout title="Alerts Management" subtitle="Platform-wide alerts and notifications">
      {ToastEl}
      {editing && (<Modal title={isNew ? "New Alert" : "Edit Alert"} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div className="space-y-3">
            <Select label="Type" value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })} options={[{ value: "info", label: "ℹ️ Info" }, { value: "warning", label: "⚠️ Warning" }, { value: "error", label: "🚨 Urgent" }]}/>
            <Input label="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Message</label>
              <textarea value={editing.message} onChange={e => setEditing({ ...editing, message: e.target.value })} rows={3} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
            <Select label="Status" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}/>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            <Button className="flex-1" onClick={save}>{isNew ? "Publish Alert" : "Save"}</Button>
          </div>
        </Modal>)}

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-[#6B7280]">{alertList.filter(a => a.status === "active").length} active alerts</p>
        <Button size="sm" onClick={() => { setEditing(blank); setIsNew(true); }}><Plus size={14}/> New Alert</Button>
      </div>

      <div className="space-y-4">
        {alertList.map(a => (<Card key={a.id} className={`p-5 border ${typeBg[a.type] || "bg-gray-50 border-gray-200"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>{typeIcon[a.type]}</span>
                  <span className="font-bold text-[#1F2937] font-display text-sm">{a.title}</span>
                  <StatusBadge status={a.status}/>
                </div>
                <p className="text-sm text-[#374151]">{a.message}</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{a.date}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => setEditing(a)} className="p-1.5 rounded-lg hover:bg-white/60 text-[#6B7280]"><Edit size={13}/></button>
                <button onClick={() => { setAlertList(prev => prev.map(x => x.id === a.id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x)); show("Alert status updated"); }} className="p-1.5 rounded-lg hover:bg-white/60 text-[#6B7280]">{a.status === "active" ? <XCircle size={13}/> : <CheckCircle size={13}/>}</button>
                <button onClick={() => { setAlertList(prev => prev.filter(x => x.id !== a.id)); show("Alert deleted", "error"); }} className="p-1.5 rounded-lg hover:bg-white/60 text-red-500"><Trash2 size={13}/></button>
              </div>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Resources ────────────────────────────────────────────────────────────────
export function AdminResourcesPage() {
    const [resList, setResList] = useState(rawResources.map(r => ({ ...r })));
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const { show, ToastEl } = useToast();
    const blank = { id: Date.now().toString(), title: "", description: "", fileType: "PDF", uploadedBy: "", date: new Date().toISOString().split("T")[0] };
    const save = () => {
        if (!editing)
            return;
        if (isNew)
            setResList(prev => [editing, ...prev]);
        else
            setResList(prev => prev.map(r => r.id === editing.id ? editing : r));
        setEditing(null);
        setIsNew(false);
        show(isNew ? "Resource uploaded" : "Resource updated");
    };
    return (<DashboardLayout title="Resources Management" subtitle="Manage campus documents, forms, and guides">
      {ToastEl}
      {editing && (<Modal title={isNew ? "Upload Resource" : "Edit Resource"} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div className="space-y-3">
            <Input label="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Description</label>
              <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select label="File Type" value={editing.fileType} onChange={e => setEditing({ ...editing, fileType: e.target.value })} options={["PDF", "DOC", "XLSX", "ZIP", "PPT"].map(t => ({ value: t, label: t }))}/>
              <Input label="Uploaded By" value={editing.uploadedBy} onChange={e => setEditing({ ...editing, uploadedBy: e.target.value })}/>
            </div>
            {isNew && (<div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
                <Upload size={24} className="text-[#9CA3AF] mx-auto mb-2"/>
                <p className="text-sm text-[#6B7280]">Click to upload or drag & drop</p>
                <p className="text-xs text-[#9CA3AF]">PDF, DOC, XLSX up to 10MB</p>
              </div>)}
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            <Button className="flex-1" onClick={save}>{isNew ? "Upload" : "Save"}</Button>
          </div>
        </Modal>)}

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-[#6B7280]">{resList.length} resources</p>
        <Button size="sm" onClick={() => { setEditing(blank); setIsNew(true); }}><Plus size={14}/> Upload Resource</Button>
      </div>

      <Table>
        <thead><tr><Th>Title</Th><Th>Description</Th><Th>Type</Th><Th>Uploaded By</Th><Th>Date</Th><Th>Actions</Th></tr></thead>
        <tbody>
          {resList.map(r => (<tr key={r.id} className="hover:bg-[#FAFAF9]">
              <Td><span className="font-semibold text-[#1F2937]">{r.title}</span></Td>
              <Td><span className="text-xs text-[#6B7280] line-clamp-1 max-w-xs">{r.description}</span></Td>
              <Td><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-bold">{r.fileType}</span></Td>
              <Td><span className="text-xs">{r.uploadedBy}</span></Td>
              <Td><span className="text-xs">{r.date}</span></Td>
              <Td>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(r)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]"><Edit size={13}/></button>
                  <button onClick={() => { setResList(prev => prev.filter(x => x.id !== r.id)); show("Resource deleted", "error"); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13}/></button>
                </div>
              </Td>
            </tr>))}
        </tbody>
      </Table>
    </DashboardLayout>);
}
// ─── Stories ──────────────────────────────────────────────────────────────────
export function AdminStoriesPage() {
    const [storyList, setStoryList] = useState(rawStories.map(s => ({ ...s })));
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [del, setDel] = useState(null);
    const { show, ToastEl } = useToast();
    const blank = { id: Date.now().toString(), title: "", excerpt: "", image: "", author: "", date: new Date().toISOString().split("T")[0], status: "draft" };
    const save = () => {
        if (!editing)
            return;
        if (isNew)
            setStoryList(prev => [editing, ...prev]);
        else
            setStoryList(prev => prev.map(s => s.id === editing.id ? editing : s));
        setEditing(null);
        setIsNew(false);
        show(isNew ? "Story published" : "Story updated");
    };
    return (<DashboardLayout title="Success Stories" subtitle="Manage alumni success stories and testimonials">
      {ToastEl}
      {del && <Confirm title="Delete Story" msg={`Delete "${del.title}"?`} danger onOk={() => { setStoryList(s => s.filter(x => x.id !== del.id)); setDel(null); show("Story deleted", "error"); }} onCancel={() => setDel(null)}/>}
      {editing && (<Modal title={isNew ? "New Story" : "Edit Story"} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div className="space-y-3">
            <Input label="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}/>
            <Input label="Author" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })}/>
            <Input label="Date" type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })}/>
            <Select label="Status" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} options={[{ value: "published", label: "Published" }, { value: "draft", label: "Draft" }, { value: "archived", label: "Archived" }]}/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Excerpt</label>
              <textarea value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            <Button className="flex-1" onClick={save}>{isNew ? "Publish" : "Save"}</Button>
          </div>
        </Modal>)}

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-[#6B7280]">{storyList.length} stories</p>
        <Button size="sm" onClick={() => { setEditing(blank); setIsNew(true); }}><Plus size={14}/> New Story</Button>
      </div>

      <div className="space-y-4">
        {storyList.map(s => (<Card key={s.id} className="p-5 flex gap-4">
            {s.image ? <img src={s.image} alt={s.title} className="w-20 h-16 rounded-xl object-cover shrink-0"/> : <div className="w-20 h-16 bg-orange-50 rounded-xl shrink-0 flex items-center justify-center text-2xl">✨</div>}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <StatusBadge status={s.status}/>
                  <h3 className="font-bold text-[#1F2937] font-display text-sm mt-1">{s.title}</h3>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{s.author} · {s.date}</p>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">{s.excerpt}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => { setStoryList(prev => prev.map(x => x.id === s.id ? { ...x, status: x.status === "published" ? "draft" : "published" } : x)); show("Status updated"); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]">{s.status === "published" ? <XCircle size={13}/> : <CheckCircle size={13}/>}</button>
                  <button onClick={() => setEditing(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]"><Edit size={13}/></button>
                  <button onClick={() => setDel(s)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13}/></button>
                </div>
              </div>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Achievements ─────────────────────────────────────────────────────────────
export function AdminAchievementsPage() {
    const [list, setList] = useState(rawAchievements.map(a => ({ ...a })));
    const [editing, setEditing] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const { show, ToastEl } = useToast();
    const blank = { id: Date.now().toString(), title: "", description: "", author: "", date: new Date().toISOString().split("T")[0] };
    const save = () => {
        if (!editing)
            return;
        if (isNew)
            setList(prev => [editing, ...prev]);
        else
            setList(prev => prev.map(a => a.id === editing.id ? editing : a));
        setEditing(null);
        setIsNew(false);
        show(isNew ? "Achievement added" : "Achievement updated");
    };
    return (<DashboardLayout title="Achievements" subtitle="Showcase UIU student and faculty achievements">
      {ToastEl}
      {editing && (<Modal title={isNew ? "New Achievement" : "Edit Achievement"} onClose={() => { setEditing(null); setIsNew(false); }}>
          <div className="space-y-3">
            <Input label="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}/>
            <Input label="Credited to" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })}/>
            <Input label="Date" type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })}/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Description</label>
              <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
            <Button className="flex-1" onClick={save}>{isNew ? "Add Achievement" : "Save"}</Button>
          </div>
        </Modal>)}

      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-[#6B7280]">{list.length} achievements</p>
        <Button size="sm" onClick={() => { setEditing(blank); setIsNew(true); }}><Plus size={14}/> Add Achievement</Button>
      </div>

      <div className="space-y-4">
        {list.map(a => (<Card key={a.id} className="p-5 flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl shrink-0">🏆</div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1F2937] font-display text-sm">{a.title}</h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{a.author} · {a.date}</p>
              <p className="text-sm text-[#374151] mt-1">{a.description}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => setEditing(a)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]"><Edit size={13}/></button>
              <button onClick={() => { setList(prev => prev.filter(x => x.id !== a.id)); show("Achievement deleted", "error"); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13}/></button>
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Departments ──────────────────────────────────────────────────────────────
export function AdminDepartmentsPage() {
    const deptData = [
        { name: "Computer Science & Engineering", short: "CSE", students: 1240, faculty: 45, mentors: 12, head: "Prof. Dr. Mahmud Hasan" },
        { name: "Electrical & Electronic Engineering", short: "EEE", students: 820, faculty: 32, mentors: 8, head: "Dr. Farzana Ahmed" },
        { name: "Business Administration", short: "BBA", students: 960, faculty: 38, mentors: 10, head: "Dr. Zahirul Islam" },
        { name: "Pharmacy", short: "PHR", students: 430, faculty: 20, mentors: 6, head: "Dr. Shireen Chowdhury" },
        { name: "English", short: "ENG", students: 380, faculty: 18, mentors: 5, head: "Dr. Sabina Yasmin" },
        { name: "Mathematics & Statistics", short: "MATH", students: 290, faculty: 15, mentors: 4, head: "Dr. Rafia Noor" },
    ];
    const [list, setList] = useState(deptData);
    const [editing, setEditing] = useState(null);
    const { show, ToastEl } = useToast();
    return (<DashboardLayout title="Departments" subtitle="Manage university departments">
      {ToastEl}
      {editing && (<Modal title="Edit Department" onClose={() => setEditing(null)}>
          <div className="space-y-3">
            <Input label="Department Name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}/>
            <Input label="Short Code" value={editing.short} onChange={e => setEditing({ ...editing, short: e.target.value })}/>
            <Input label="Department Head" value={editing.head} onChange={e => setEditing({ ...editing, head: e.target.value })}/>
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
            <Button className="flex-1" onClick={() => { setList(prev => prev.map(d => d.short === editing.short ? editing : d)); setEditing(null); show("Department updated"); }}>Save</Button>
          </div>
        </Modal>)}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map(d => (<Card key={d.short} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-xs font-bold">{d.short}</span>
                <h3 className="font-bold text-[#1F2937] font-display text-sm mt-1">{d.name}</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Head: {d.head}</p>
              </div>
              <button onClick={() => setEditing(d)} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280]"><Edit size={13}/></button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[["Students", d.students], ["Faculty", d.faculty], ["Mentors", d.mentors]].map(([l, v]) => (<div key={l} className="text-center p-2 bg-[#FAFAF9] rounded-xl">
                  <p className="text-base font-bold text-[#1F2937] font-display">{v}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{l}</p>
                </div>))}
            </div>
          </Card>))}
      </div>
    </DashboardLayout>);
}
// ─── Reports ──────────────────────────────────────────────────────────────────
const monthlyData = [
    { month: "Sep", students: 3200, bookings: 120, revenue: 60000 },
    { month: "Oct", students: 3600, bookings: 145, revenue: 72500 },
    { month: "Nov", students: 3900, bookings: 160, revenue: 80000 },
    { month: "Dec", students: 4100, bookings: 132, revenue: 66000 },
    { month: "Jan", students: 4421, bookings: 178, revenue: 89000 },
    { month: "Feb", students: 4821, bookings: 157, revenue: 78500 },
];
export function AdminReportsPage() {
    const [period, setPeriod] = useState("6m");
    const { show, ToastEl } = useToast();
    return (<DashboardLayout title="Reports & Analytics" subtitle="Platform performance and growth metrics">
      {ToastEl}
      <div className="flex items-center gap-3 mb-6">
        {["1m", "3m", "6m", "1y"].map(p => (<button key={p} onClick={() => setPeriod(p)} className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${period === p ? "bg-[#F97316] text-white" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-orange-200"}`}>
            {p}
          </button>))}
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => show("Report exported as CSV", "info")}>Export CSV</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue" value="৳4,46,000" icon={<CreditCard size={16}/>} trend="+18% vs last period" color="green"/>
        <StatCard label="Total Bookings" value="892" icon={<BookOpen size={16}/>} trend="+892 sessions" color="blue"/>
        <StatCard label="New Users" value="1,621" icon={<Users size={16}/>} color="orange"/>
        <StatCard label="Avg. Session Fee" value="৳523" icon={<TrendingUp size={16}/>} color="purple"/>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-5">
          <SectionHeader title="User Growth" subtitle="Monthly registrations"/>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}/>
              <Area type="monotone" dataKey="students" stroke="#F97316" fill="#FFF7ED" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Revenue (৳)" subtitle="Monthly earnings"/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}/>
              <Bar dataKey="revenue" fill="#F97316" radius={[4, 4, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <SectionHeader title="Monthly Summary Table"/>
        <Table>
          <thead><tr><Th>Month</Th><Th>Students</Th><Th>Bookings</Th><Th>Revenue (৳)</Th><Th>Avg. Fee</Th></tr></thead>
          <tbody>
            {monthlyData.map(row => (<tr key={row.month} className="hover:bg-[#FAFAF9]">
                <Td><span className="font-semibold">{row.month}</span></Td>
                <Td>{row.students.toLocaleString()}</Td>
                <Td>{row.bookings}</Td>
                <Td><span className="font-semibold text-green-600">৳{row.revenue.toLocaleString()}</span></Td>
                <Td>৳{Math.round(row.revenue / row.bookings)}</Td>
              </tr>))}
          </tbody>
        </Table>
      </Card>
    </DashboardLayout>);
}
// ─── System Settings ──────────────────────────────────────────────────────────
export function AdminSettingsPage() {
    const [siteName, setSiteName] = useState("UIU Campus Guide");
    const [siteEmail, setSiteEmail] = useState("info@uiu.ac.bd");
    const [commission, setCommission] = useState("5");
    const [maxBookings, setMaxBookings] = useState("10");
    const [regOpen, setRegOpen] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const { show, ToastEl } = useToast();
    const Toggle = ({ on, onChange, label }) => (<div className="flex items-center justify-between p-4 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
      <span className="text-sm font-semibold text-[#374151]">{label}</span>
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-[#F97316]" : "bg-[#D1D5DB]"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`}/>
      </button>
    </div>);
    return (<DashboardLayout title="System Settings" subtitle="Configure platform-wide settings">
      {ToastEl}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="text-base font-bold text-[#1F2937] font-display mb-4">General Settings</h2>
            <div className="space-y-4">
              <Input label="Platform Name" value={siteName} onChange={e => setSiteName(e.target.value)}/>
              <Input label="Contact Email" value={siteEmail} onChange={e => setSiteEmail(e.target.value)}/>
              <Input label="Platform Commission (%)" type="number" value={commission} onChange={e => setCommission(e.target.value)}/>
              <Input label="Max Bookings per Student" type="number" value={maxBookings} onChange={e => setMaxBookings(e.target.value)}/>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-bold text-[#1F2937] font-display mb-4">Feature Flags</h2>
            <div className="space-y-3">
              <Toggle on={regOpen} onChange={() => setRegOpen(!regOpen)} label="Student Registration Open"/>
              <Toggle on={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} label="Email Notifications"/>
              <Toggle on={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} label="Maintenance Mode"/>
            </div>
          </Card>

          <Button onClick={() => show("Settings saved successfully!")}>Save Settings</Button>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="text-base font-bold text-[#1F2937] font-display mb-4">Live Preview</h2>
            <div className="space-y-3 text-sm">
              {[["Platform Name", siteName], ["Contact Email", siteEmail], ["Commission Rate", `${commission}%`], ["Max Bookings", maxBookings], ["Registration", regOpen ? "Open" : "Closed"], ["Notifications", emailNotifs ? "Enabled" : "Disabled"], ["Mode", maintenanceMode ? "⚠️ Maintenance" : "✅ Live"]].map(([k, v]) => (<div key={k} className="flex justify-between p-3 bg-[#FAFAF9] rounded-xl">
                  <span className="text-[#6B7280]">{k}</span>
                  <span className="font-semibold text-[#1F2937]">{v}</span>
                </div>))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-base font-bold text-[#1F2937] font-display mb-4">Danger Zone</h2>
            <div className="space-y-3">
              {[["Clear All Cache", "info"], ["Reset Demo Data", "error"], ["Export Full Backup", "info"]].map(([label, type]) => (<Button key={label} variant={type === "error" ? "danger" : "outline"} className="w-full" onClick={() => show(`${label} — are you sure? This would require a confirmation in production.`, type)}>
                  {label}
                </Button>))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}
