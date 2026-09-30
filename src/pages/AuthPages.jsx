import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, Briefcase, CheckCircle, ShieldCheck } from "lucide-react";
import { Input, Button, Select } from "../components/ui";
import { departments } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
function AuthLayout({ children, title, subtitle }) {
    return (<div className="min-h-screen bg-[#FAFAF9] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1F2937] flex-col justify-between p-12 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=900&fit=crop&auto=format" alt="UIU Campus" className="absolute inset-0 w-full h-full object-cover opacity-20"/>
        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center text-white font-bold">U</div>
            <div>
              <span className="font-bold text-white font-display block leading-none">UIU Campus</span>
              <span className="text-[10px] text-[#F97316] font-bold tracking-widest uppercase">Guide</span>
            </div>
          </Link>
        </div>
        <div className="relative">
          <blockquote className="text-white">
            <p className="text-2xl font-bold font-display leading-relaxed mb-4">
              "The right mentor can change your entire trajectory."
            </p>
            <footer className="text-gray-400 text-sm">— UIU Career Development Center</footer>
          </blockquote>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[["4,200+", "Students"], ["48", "Expert Mentors"], ["134", "Services"], ["892", "Bookings"]].map(([v, l]) => (<div key={l} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-white font-display">{v}</p>
                <p className="text-xs text-gray-400 mt-0.5">{l}</p>
              </div>))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-[#F97316] rounded-xl flex items-center justify-center text-white font-bold text-sm">U</div>
            <span className="font-bold text-[#1F2937] font-display">UIU Campus Guide</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1F2937] font-display mb-1">{title}</h1>
          <p className="text-[#6B7280] text-sm mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>);
}
// ─── Login ───────────────────────────────────────────────────────────────────
const roleConfig = {
    student: {
        icon: GraduationCap,
        label: "Student",
        desc: "Access dashboard & career tools",
        name: "Arif Hossain",
        dept: "CSE, Semester 7",
        dest: "/dashboard",
    },
    mentor: {
        icon: Briefcase,
        label: "Mentor",
        desc: "Manage sessions & services",
        name: "Tanvir Ahmed",
        dept: "Computer Science & Engineering",
        dest: "/mentor/dashboard",
    },
    admin: {
        icon: ShieldCheck,
        label: "Admin",
        desc: "Full platform control",
        name: "System Admin",
        dept: "Administration",
        dest: "/admin/dashboard",
    },
};
export function LoginPage() {
    const [selectedRole, setSelectedRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        const cfg = roleConfig[selectedRole];
        login({ role: selectedRole, name: cfg.name, dept: cfg.dept, email });
        navigate(cfg.dest);
    };
    return (<AuthLayout title="Welcome back" subtitle="Sign in to your UIU Campus Guide account">
      {/* Role selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {Object.entries(roleConfig).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const active = selectedRole === key;
            return (<button key={key} type="button" onClick={() => { setSelectedRole(key); setError(""); }} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${active ? "border-[#F97316] bg-orange-50" : "border-[#E5E7EB] hover:border-orange-200"}`}>
              <Icon size={20} className={active ? "text-[#F97316]" : "text-[#9CA3AF]"}/>
              <span className={`text-xs font-bold ${active ? "text-[#F97316]" : "text-[#6B7280]"}`}>{cfg.label}</span>
              <span className="text-[10px] text-[#9CA3AF] text-center leading-tight hidden sm:block">{cfg.desc}</span>
            </button>);
        })}
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input label="Email address" type="email" placeholder="you@uiu.ac.bd" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} required/>
        <div>
          <label className="block text-sm font-semibold text-[#374151] mb-1.5">
            Password<span className="text-red-500 ml-0.5">*</span>
          </label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-10 text-sm text-[#1F2937] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent" required/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
        </div>
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-[#6B7280]">
            <input type="checkbox" className="accent-[#F97316]"/> Remember me
          </label>
          <button type="button" className="text-sm text-[#F97316] font-semibold">Forgot password?</button>
        </div>
        <Button type="submit" className="w-full" size="lg">
          Sign in as {roleConfig[selectedRole].label}
        </Button>
        <p className="text-center text-sm text-[#6B7280]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#F97316] font-semibold">Create account</Link>
        </p>
      </form>
    </AuthLayout>);
}
// ─── Register ────────────────────────────────────────────────────────────────
export function RegisterPage() {
    const [role, setRole] = useState("student");
    const [done, setDone] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dept, setDept] = useState("");
    const [mobile, setMobile] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setDept("");
        setMobile("");
        setBio("");
        setDone(false);
    };
    const handleAutoLogin = () => {
        login({
            role,
            name: `${firstName} ${lastName}`.trim() || (role === "student" ? "New Student" : "New Mentor"),
            dept: dept || "UIU",
            email,
        });
        navigate(role === "student" ? "/dashboard" : "/mentor/dashboard");
    };
    // ── Success screen ──────────────────────────────────────────────────────────
    if (done) {
        return (<AuthLayout title={role === "mentor" ? "Application Submitted!" : "Account Created!"} subtitle={role === "mentor" ? "Your mentor application is under review." : "Welcome to UIU Campus Guide."}>
        <div className="text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500"/>
          </div>
          {role === "mentor" ? (<>
              <p className="text-[#374151] text-sm mb-2">
                Your mentor account is pending admin review.
                This typically takes <strong>1–2 business days</strong>.
              </p>
              <p className="text-[#9CA3AF] text-xs mb-8">
                You'll be notified at <strong>{email || "your email"}</strong> once approved.
              </p>
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => navigate("/login")}>
                  Go to Login
                </Button>
                <Button variant="outline" className="w-full" onClick={resetForm}>
                  Create Another Account
                </Button>
              </div>
            </>) : (<>
              <p className="text-[#374151] text-sm mb-8">
                Your student account is ready. Jump straight to your dashboard or create another account.
              </p>
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handleAutoLogin}>
                  Go to My Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={resetForm}>
                  Create Another Account
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate("/login")}>
                  Sign in to a different account
                </Button>
              </div>
            </>)}
        </div>
      </AuthLayout>);
    }
    // ── Registration form ───────────────────────────────────────────────────────
    return (<AuthLayout title="Create your account" subtitle="Join UIU Campus Guide — free for all UIU students">
      {/* Role selector */}
      <div className="flex gap-3 mb-6">
        {["student", "mentor"].map(r => (<button key={r} type="button" onClick={() => setRole(r)} className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === r ? "border-[#F97316] bg-orange-50" : "border-[#E5E7EB] hover:border-orange-200"}`}>
            {r === "student"
                ? <GraduationCap size={22} className={role === r ? "text-[#F97316]" : "text-[#9CA3AF]"}/>
                : <Briefcase size={22} className={role === r ? "text-[#F97316]" : "text-[#9CA3AF]"}/>}
            <span className={`text-sm font-bold ${role === r ? "text-[#F97316]" : "text-[#6B7280]"}`}>
              {r === "student" ? "Student" : "Mentor"}
            </span>
            <span className="text-xs text-[#9CA3AF]">{r === "student" ? "Free account" : "Subject to approval"}</span>
          </button>))}
      </div>

      <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="First Name" placeholder="Arif" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
          <Input label="Last Name" placeholder="Hossain" value={lastName} onChange={e => setLastName(e.target.value)} required/>
        </div>
        <Input label="Email" type="email" placeholder="you@uiu.ac.bd" value={email} onChange={e => setEmail(e.target.value)} required/>
        <div>
          <label className="block text-sm font-semibold text-[#374151] mb-1.5">
            Password<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input type="password" placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"/>
        </div>
        <Select label="Department" options={[{ value: "", label: "Select department" }, ...departments.map(d => ({ value: d, label: d }))]} value={dept} onChange={e => setDept(e.target.value)}/>

        {role === "mentor" && (<>
            <Input label="Mobile Number" type="tel" placeholder="+880 1XXXXXXXXX" value={mobile} onChange={e => setMobile(e.target.value)} required/>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Bio / About You</label>
              <textarea placeholder="Describe your background and what kind of mentorship you offer..." rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"/>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-xs text-amber-800 font-semibold">⏳ Approval Required</p>
              <p className="text-xs text-amber-700 mt-0.5">Your account will be reviewed by admin before activation. Typically 1–2 business days.</p>
            </div>
          </>)}

        <Button type="submit" className="w-full" size="lg">
          {role === "student" ? "Create Student Account" : "Submit Mentor Application"}
        </Button>
        <p className="text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#F97316] font-semibold">Sign in</Link>
        </p>
      </form>
    </AuthLayout>);
}
