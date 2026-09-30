import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Input } from "../components/ui";
import { Camera, CheckCircle, GraduationCap, Briefcase, Sliders, Bell, Lock, Shield, Trash2 } from "lucide-react";
import { departments } from "../data/mockData";
const allSkills = [
    "Python", "JavaScript", "React", "Node.js", "SQL", "Java", "C++", "TypeScript",
    "Machine Learning", "Data Structures", "Algorithms", "Git", "Docker", "AWS",
    "Financial Modeling", "Excel", "Accounting", "R", "MATLAB", "System Design",
];
const allInterests = [
    "AI / ML", "Web Development", "Mobile Apps", "Data Science", "Cloud Computing",
    "Cybersecurity", "Robotics", "Entrepreneurship", "Research", "Finance", "IoT",
];
const degrees = ["B.Sc. in CSE", "B.Sc. in EEE", "BBA", "B.Pharm", "B.A. in English", "M.Sc. in CSE", "MBA"];
const semesterOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(s => ({ value: String(s), label: `Semester ${s}` }));
const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const genderOptions = ["Male", "Female", "Prefer not to say"];
// ─── Main ProfilePage ────────────────────────────────────────────────────────────
export default function ProfilePage() {
    const [saved, setSaved] = useState(false);
    // Personal info
    const [firstName, setFirstName] = useState("Arif");
    const [lastName, setLastName] = useState("Hossain");
    const [email, setEmail] = useState("arif.hossain@uiu.ac.bd");
    const [phone, setPhone] = useState("+880 1712-345678");
    const [gender, setGender] = useState("Male");
    const [dob, setDob] = useState("2002-05-15");
    const [blood, setBlood] = useState("B+");
    const [bio, setBio] = useState("");
    // Academic info
    const [degree, setDegree] = useState("B.Sc. in CSE");
    const [dept, setDept] = useState("Computer Science & Engineering");
    const [semester, setSemester] = useState("7");
    const [studentId] = useState("011201010");
    const [cgpa, setCgpa] = useState("3.60");
    // Skills & interests
    const [skills, setSkills] = useState(["Python", "JavaScript", "React", "Git"]);
    const [interests, setInterests] = useState(["Web Development", "AI / ML"]);
    const [skillInput, setSkillInput] = useState("");
    const addSkill = (s) => {
        const t = s.trim();
        if (t && !skills.includes(t))
            setSkills(p => [...p, t]);
        setSkillInput("");
    };
    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
    return (<DashboardLayout>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] font-display">My Profile</h1>
            <p className="text-[#64748B] text-sm mt-0.5">Keep your information up to date.</p>
          </div>
          {saved && (<span className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
              <CheckCircle size={13}/> Changes saved!
            </span>)}
        </div>

        <div className="space-y-5">

          {/* ── Profile picture + name card ── */}
          <Card className="p-6">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold font-display select-none">
                  {initials}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#EA580C] transition-colors">
                  <Camera size={14}/>
                </button>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1">Display name</p>
                <p className="text-lg font-bold text-[#0F172A] font-display">{firstName} {lastName}</p>
                <p className="text-sm text-[#64748B] mt-0.5">{email}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs font-semibold text-[#F97316] bg-orange-50 px-2.5 py-1 rounded-full">{degree}</span>
                  <span className="text-xs font-semibold text-[#64748B] bg-gray-100 px-2.5 py-1 rounded-full">Semester {semester}</span>
                  <span className="text-xs font-semibold text-[#64748B] bg-gray-100 px-2.5 py-1 rounded-full">ID: {studentId}</span>
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Active</span>
                </div>
              </div>
            </div>
          </Card>

          {/* ── Personal Information ── */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
                <GraduationCap size={16} className="text-[#F97316]"/>
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] font-display">Personal Information</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
              <Input label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
              <Input label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+880 17XX-XXXXXX"/>
              <Input label="Date of Birth" type="date" value={dob} onChange={e => setDob(e.target.value)}/>
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                  {genderOptions.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Blood Group</label>
                <select value={blood} onChange={e => setBlood(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                  {bloodGroups.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Bio / About Me</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Tell mentors a bit about yourself..." className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none bg-white"/>
              </div>
            </div>
          </Card>

          {/* ── Academic Information ── */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
                <Briefcase size={16} className="text-[#F97316]"/>
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] font-display">Academic Information</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Degree Program</label>
                <select value={degree} onChange={e => setDegree(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                  {degrees.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Department</label>
                <select value={dept} onChange={e => setDept(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#374151] mb-1.5">Current Semester</label>
                <select value={semester} onChange={e => setSemester(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                  {semesterOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <Input label="CGPA" type="number" value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="e.g. 3.60"/>
              <Input label="Student ID" value={studentId} disabled/>
              <Input label="University Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
          </Card>

          {/* ── Skills & Interests ── */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
                <Sliders size={16} className="text-[#F97316]"/>
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] font-display">Skills & Interests</h2>
            </div>

            {/* Skill input */}
            <p className="text-sm font-semibold text-[#374151] mb-2">Your Skills</p>
            <div className="flex gap-2 mb-3">
              <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") {
        e.preventDefault();
        addSkill(skillInput);
    } }} placeholder="Type a skill and press Enter..." className="flex-1 border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"/>
              <button onClick={() => addSkill(skillInput)} className="bg-[#F97316] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#EA580C] transition-colors">
                Add
              </button>
            </div>
            <div className="min-h-[48px] p-3 bg-[#FAFAF9] rounded-xl border border-[#E5E7EB] flex flex-wrap gap-2 mb-4">
              {skills.map(s => (<span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 text-[#F97316] rounded-full text-xs font-semibold">
                  {s}
                  <button onClick={() => setSkills(p => p.filter(x => x !== s))} className="hover:text-red-500">×</button>
                </span>))}
              {skills.length === 0 && <p className="text-xs text-[#9CA3AF] self-center">No skills added yet.</p>}
            </div>
            <p className="text-xs font-semibold text-[#374151] mb-2">Quick Add</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {allSkills.filter(s => !skills.includes(s)).map(s => (<button key={s} onClick={() => addSkill(s)} className="px-3 py-1 rounded-full border border-dashed border-[#D1D5DB] text-xs text-[#6B7280] hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50 transition-all">
                  + {s}
                </button>))}
            </div>

            <hr className="border-[#F3F4F6] mb-5"/>

            <p className="text-sm font-semibold text-[#374151] mb-2">Areas of Interest</p>
            <div className="flex flex-wrap gap-2">
              {allInterests.map(i => (<button key={i} onClick={() => interests.includes(i) ? setInterests(p => p.filter(x => x !== i)) : setInterests(p => [...p, i])} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${interests.includes(i)
                ? "border-[#F97316] bg-orange-50 text-[#F97316]"
                : "border-[#E5E7EB] text-[#6B7280] hover:border-orange-200 hover:text-[#F97316]"}`}>
                  {interests.includes(i) ? "✓ " : ""}{i}
                </button>))}
            </div>
          </Card>

          {/* ── Save button ── */}
          <button onClick={handleSave} className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <CheckCircle size={16}/> Save Profile
          </button>

        </div>
      </div>
    </DashboardLayout>);
}
// ─── Student Settings Page ─────────────────────────────────────────────────────
function Toggle({ on, onToggle }) {
    return (<button onClick={onToggle} className={`w-11 h-6 rounded-full relative transition-colors ${on ? "bg-[#F97316]" : "bg-[#E5E7EB]"}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-6" : "left-1"}`}/>
    </button>);
}
function useToast() {
    const [toast, setToast] = useState(null);
    useEffect(() => { if (!toast)
        return; const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }, [toast]);
    const show = (msg, type = "success") => setToast({ msg, type });
    const ToastEl = toast ? (<div className={`fixed bottom-6 right-6 z-[9999] px-4 py-3 rounded-xl text-white shadow-xl text-sm font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {toast.type === "success" ? <CheckCircle size={15}/> : null}
      {toast.msg}
    </div>) : null;
    return { show, ToastEl };
}
export function StudentSettingsPage() {
    const { show, ToastEl } = useToast();
    const [notifs, setNotifs] = useState({ emailBooking: true, emailNews: false, smsReminder: true, pushAlerts: true });
    const [priv, setPriv] = useState({ profileVisible: true, showBookings: false });
    const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
    const [pwError, setPwError] = useState("");
    const handlePwSave = () => {
        if (!pw.current) {
            setPwError("Enter your current password.");
            return;
        }
        if (pw.next.length < 6) {
            setPwError("New password must be at least 6 characters.");
            return;
        }
        if (pw.next !== pw.confirm) {
            setPwError("Passwords do not match.");
            return;
        }
        setPwError("");
        setPw({ current: "", next: "", confirm: "" });
        show("Password updated successfully.");
    };
    return (<DashboardLayout>
      {ToastEl}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] font-display">Settings</h1>
        <p className="text-[#64748B] text-sm mt-1">Manage your notification, privacy, and security preferences.</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
              <Bell size={16} className="text-[#F97316]"/>
            </div>
            <h2 className="text-sm font-bold text-[#0F172A] font-display">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
            ["emailBooking", "Email — Booking confirmations & updates"],
            ["emailNews", "Email — Campus news & announcements"],
            ["smsReminder", "SMS — Session reminders"],
            ["pushAlerts", "Push — Campus alerts"],
        ].map(([key, label]) => (<div key={key} className="flex items-center justify-between">
                <span className="text-sm text-[#374151]">{label}</span>
                <Toggle on={notifs[key]} onToggle={() => setNotifs(p => ({ ...p, [key]: !p[key] }))}/>
              </div>))}
          </div>
          <button onClick={() => show("Notification preferences saved.")} className="mt-5 bg-[#F97316] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#EA580C] transition-colors">
            Save Preferences
          </button>
        </Card>

        {/* Privacy */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
              <Shield size={16} className="text-[#F97316]"/>
            </div>
            <h2 className="text-sm font-bold text-[#0F172A] font-display">Privacy</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#374151]">Public profile visible to mentors</p>
                <p className="text-xs text-[#9CA3AF]">Mentors can view your profile and skills</p>
              </div>
              <Toggle on={priv.profileVisible} onToggle={() => setPriv(p => ({ ...p, profileVisible: !p.profileVisible }))}/>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#374151]">Show booking history</p>
                <p className="text-xs text-[#9CA3AF]">Other students can see your past sessions</p>
              </div>
              <Toggle on={priv.showBookings} onToggle={() => setPriv(p => ({ ...p, showBookings: !p.showBookings }))}/>
            </div>
          </div>
          <button onClick={() => show("Privacy settings saved.")} className="mt-5 bg-[#F97316] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#EA580C] transition-colors">
            Save Privacy Settings
          </button>
        </Card>

        {/* Password */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
              <Lock size={16} className="text-[#F97316]"/>
            </div>
            <h2 className="text-sm font-bold text-[#0F172A] font-display">Change Password</h2>
          </div>
          <div className="space-y-3 max-w-sm">
            <Input label="Current Password" type="password" placeholder="••••••••" value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))}/>
            <Input label="New Password" type="password" placeholder="At least 6 characters" value={pw.next} onChange={e => setPw(p => ({ ...p, next: e.target.value }))}/>
            <Input label="Confirm New Password" type="password" placeholder="Repeat new password" value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))}/>
            {pwError && <p className="text-xs text-red-600">{pwError}</p>}
            <button onClick={handlePwSave} className="bg-[#F97316] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#EA580C] transition-colors">
              Update Password
            </button>
          </div>
        </Card>

        {/* Danger zone */}
        <Card className="p-6 border-red-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
              <Trash2 size={16} className="text-red-500"/>
            </div>
            <h2 className="text-sm font-bold text-red-600 font-display">Danger Zone</h2>
          </div>
          <p className="text-xs text-[#6B7280] mb-4">Deleting your account is permanent and cannot be undone. All data including bookings and profile information will be removed.</p>
          <button onClick={() => show("Account deletion request submitted. You will receive a confirmation email.", "error")} className="border border-red-200 text-red-600 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-red-50 transition-colors">
            Delete My Account
          </button>
        </Card>
      </div>
    </DashboardLayout>);
}
