import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Lock, TrendingUp, RefreshCw, Plus, Zap, BookOpen, Target, Briefcase, GraduationCap, SlidersHorizontal, X, ChevronRight, ChevronLeft } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, ProgressBar, Button, Badge } from "../components/ui";
// ─── Extended career data ──────────────────────────────────────────────────────
const allCareers = [
    {
        id: "software-engineer",
        title: "Software Engineer",
        dept: "CSE",
        icon: "💻",
        description: "Design, develop, and maintain software systems across web, mobile, and cloud platforms. Highest demand across all industries.",
        match: 89,
        demand: "High Demand",
        demandColor: "bg-green-50 text-green-700",
        criteria: [
            { label: "Skills", score: 60 },
            { label: "Education", score: 100 },
            { label: "Department", score: 100 },
            { label: "Experience", score: 100 },
            { label: "Career Goal", score: 100 },
            { label: "Interest", score: 80 },
            { label: "Work Mode", score: 75 },
        ],
        skillsMatched: ["Python", "JavaScript", "Git", "Problem Solving", "React"],
        skillsMissing: ["Data Structures", "Algorithms", "System Design", "Docker", "AWS"],
    },
    {
        id: "ai-ml-engineer",
        title: "AI / ML Engineer",
        dept: "CSE",
        icon: "🤖",
        description: "Build intelligent systems using machine learning models, deep learning, and data pipelines.",
        match: 76,
        demand: "Very High Demand",
        demandColor: "bg-blue-50 text-blue-700",
        criteria: [
            { label: "Skills", score: 50 },
            { label: "Education", score: 100 },
            { label: "Department", score: 100 },
            { label: "Experience", score: 60 },
            { label: "Career Goal", score: 80 },
            { label: "Interest", score: 90 },
            { label: "Work Mode", score: 75 },
        ],
        skillsMatched: ["Python", "Mathematics", "Statistics"],
        skillsMissing: ["TensorFlow", "PyTorch", "Machine Learning", "Data Science", "SQL"],
    },
    {
        id: "data-scientist",
        title: "Data Scientist",
        dept: "CSE / STAT",
        icon: "📊",
        description: "Extract insights from complex datasets using ML, statistics, and data visualization tools.",
        match: 72,
        demand: "High Demand",
        demandColor: "bg-green-50 text-green-700",
        criteria: [
            { label: "Skills", score: 45 },
            { label: "Education", score: 100 },
            { label: "Department", score: 80 },
            { label: "Experience", score: 60 },
            { label: "Career Goal", score: 60 },
            { label: "Interest", score: 70 },
            { label: "Work Mode", score: 75 },
        ],
        skillsMatched: ["Python", "Mathematics", "Statistics"],
        skillsMissing: ["R", "SQL", "Data Visualization", "Machine Learning", "Tableau"],
    },
    {
        id: "embedded-systems-engineer",
        title: "Embedded Systems Engineer",
        dept: "EEE / CSE",
        icon: "🔧",
        description: "Design firmware and hardware-software integration for IoT, robotics, and embedded devices.",
        match: 58,
        demand: "Medium Demand",
        demandColor: "bg-yellow-50 text-yellow-700",
        criteria: [
            { label: "Skills", score: 40 },
            { label: "Education", score: 80 },
            { label: "Department", score: 70 },
            { label: "Experience", score: 50 },
            { label: "Career Goal", score: 40 },
            { label: "Interest", score: 60 },
            { label: "Work Mode", score: 75 },
        ],
        skillsMatched: ["C Programming", "Problem Solving"],
        skillsMissing: ["RTOS", "Arduino", "ARM", "VHDL", "PCB Design"],
    },
    {
        id: "product-manager",
        title: "Product Manager",
        dept: "BBA / CSE",
        icon: "🎯",
        description: "Lead product development from ideation to launch, bridging technical and business teams.",
        match: 62,
        demand: "High Demand",
        demandColor: "bg-green-50 text-green-700",
        criteria: [
            { label: "Skills", score: 50 },
            { label: "Education", score: 70 },
            { label: "Department", score: 60 },
            { label: "Experience", score: 60 },
            { label: "Career Goal", score: 40 },
            { label: "Interest", score: 65 },
            { label: "Work Mode", score: 80 },
        ],
        skillsMatched: ["Communication", "Problem Solving", "Leadership"],
        skillsMissing: ["Product Strategy", "User Research", "Agile", "Roadmapping"],
    },
    {
        id: "bba-finance",
        title: "Finance Analyst",
        dept: "BBA",
        icon: "💹",
        description: "Analyze financial data, prepare reports, and support strategic investment and budgeting decisions.",
        match: 45,
        demand: "Moderate Demand",
        demandColor: "bg-orange-50 text-orange-700",
        criteria: [
            { label: "Skills", score: 30 },
            { label: "Education", score: 60 },
            { label: "Department", score: 40 },
            { label: "Experience", score: 50 },
            { label: "Career Goal", score: 30 },
            { label: "Interest", score: 40 },
            { label: "Work Mode", score: 60 },
        ],
        skillsMatched: ["Mathematics", "Problem Solving"],
        skillsMissing: ["Financial Modeling", "Excel", "Bloomberg", "CFA Knowledge", "Accounting"],
    },
];
const roadmapData = {
    "software-engineer": [
        { step: 1, title: "Core Programming Basics", description: "Variables, loops, functions, OOP with Python or Java. Build simple CLI programs.", status: "completed", icon: "🐍", duration: "4–6 weeks" },
        { step: 2, title: "Data Structures & Algorithms", description: "Arrays, linked lists, trees, graphs, sorting algorithms. Essential for interviews.", status: "current", icon: "🌳", duration: "8–12 weeks" },
        { step: 3, title: "Software Architecture & Frameworks", description: "Design patterns, React.js, Node.js, REST API design principles.", status: "locked", icon: "⚛️", duration: "8 weeks" },
        { step: 4, title: "Database Management", description: "SQL, PostgreSQL, MongoDB, ORM usage, query optimization.", status: "locked", icon: "🗄️", duration: "4 weeks" },
        { step: 5, title: "System Design & Deployment", description: "Scalable architecture, Docker, CI/CD, cloud deployment on AWS/GCP.", status: "locked", icon: "📐", duration: "6 weeks" },
        { step: 6, title: "Capstone Project & Portfolio", description: "Build a full-stack production app and deploy it. Add to GitHub portfolio.", status: "locked", icon: "🚀", duration: "4–8 weeks" },
    ],
    "ai-ml-engineer": [
        { step: 1, title: "Python & Math Foundations", description: "Python programming, linear algebra, calculus, probability basics.", status: "completed", icon: "🐍", duration: "4 weeks" },
        { step: 2, title: "Data Manipulation & EDA", description: "Pandas, NumPy, data cleaning, exploratory data analysis.", status: "completed", icon: "🔧", duration: "4 weeks" },
        { step: 3, title: "Machine Learning Core", description: "Scikit-learn, supervised/unsupervised learning, model evaluation.", status: "current", icon: "🤖", duration: "8 weeks" },
        { step: 4, title: "Deep Learning", description: "Neural networks, CNNs, RNNs with TensorFlow and PyTorch.", status: "locked", icon: "🧠", duration: "8 weeks" },
        { step: 5, title: "MLOps & Deployment", description: "Model deployment, Docker, FastAPI, ML pipelines, monitoring.", status: "locked", icon: "🚀", duration: "6 weeks" },
        { step: 6, title: "AI Capstone Project", description: "Build and deploy an end-to-end ML application with real-world data.", status: "locked", icon: "🏆", duration: "6 weeks" },
    ],
    "data-scientist": [
        { step: 1, title: "Python & Statistics", description: "Python basics, descriptive/inferential statistics, probability.", status: "completed", icon: "📈", duration: "4 weeks" },
        { step: 2, title: "Data Wrangling", description: "Pandas, NumPy, missing data handling, feature engineering.", status: "current", icon: "🔧", duration: "4 weeks" },
        { step: 3, title: "Data Visualization", description: "Matplotlib, Seaborn, Plotly, Tableau — storytelling with data.", status: "locked", icon: "📊", duration: "3 weeks" },
        { step: 4, title: "SQL & Databases", description: "SQL queries, joins, window functions, BigQuery.", status: "locked", icon: "🗄️", duration: "4 weeks" },
        { step: 5, title: "Machine Learning", description: "Scikit-learn, model selection, cross-validation, hyperparameter tuning.", status: "locked", icon: "🤖", duration: "8 weeks" },
        { step: 6, title: "Capstone Project", description: "End-to-end DS project with real dataset, presentation-ready dashboard.", status: "locked", icon: "🏆", duration: "6 weeks" },
    ],
};
// ─── Circular progress ring ────────────────────────────────────────────────────
function CircularProgress({ value, size = 120, strokeWidth = 10 }) {
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    const color = value >= 80 ? "#16A34A" : value >= 60 ? "#F97316" : "#DC2626";
    return (<svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F3F4F6" strokeWidth={strokeWidth}/>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.8s ease" }}/>
    </svg>);
}
// ─── Criteria score bar ────────────────────────────────────────────────────────
function CriteriaBar({ label, score }) {
    const color = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-[#F97316]" : "bg-red-400";
    return (<div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#6B7280] font-medium">{label}</span>
        <span className="text-xs font-bold text-[#1F2937]">{score}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }}/>
      </div>
    </div>);
}
// ─── Wizard stepper ────────────────────────────────────────────────────────────
const STEPS = [
    { label: "Academic Background", Icon: GraduationCap },
    { label: "Skill Matrix", Icon: Briefcase },
    { label: "Job Preferences", Icon: SlidersHorizontal },
];
function WizardStepper({ current }) {
    return (<div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
            const done = i < current;
            const active = i === current;
            return (<div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${done ? "bg-[#22C55E]" : active ? "bg-[#F97316]" : "bg-white border-2 border-[#E5E7EB]"}`}>
                {done
                    ? <CheckCircle size={22} className="text-white"/>
                    : <step.Icon size={20} className={active ? "text-white" : "text-[#9CA3AF]"}/>}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${done ? "text-[#22C55E]" : active ? "text-[#F97316]" : "text-[#9CA3AF]"}`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (<div className={`w-24 sm:w-40 h-0.5 mx-2 mb-5 rounded-full ${i < current ? "bg-[#22C55E]" : "bg-[#E5E7EB]"}`}/>)}
          </div>);
        })}
    </div>);
}
const uiuDegrees = [
    "B.Sc. in CSE",
    "B.Sc. in Data Science",
    "B.Sc. in EEE",
    "BBA",
    "B.Sc. in Civil Engineering",
    "B.Sc. in Pharmacy",
    "MBA",
];
const uiuDepartments = [
    "Computer Science and Engineering",
    "Electrical and Electronic Engineering",
    "Business Administration",
    "Civil Engineering",
    "Pharmacy",
    "English",
];
const experienceLevels = ["No Experience", "Beginner (< 1 year)", "Intermediate (1–2 years)", "Experienced (2+ years)"];
const suggestedSkills = ["React", "Node.js", "SQL", "Java", "C++", "TypeScript", "Machine Learning", "Docker", "AWS", "Git", "Data Structures", "Algorithms", "System Design", "Excel", "Financial Modeling"];
// ─── Match score calculator ────────────────────────────────────────────────────
const careerGoalMap = {
    "software-engineer": ["Software Engineer", "Software Developer", "Full Stack Developer", "Backend Developer", "Frontend Developer"],
    "ai-ml-engineer": ["AI Engineer", "ML Engineer", "Machine Learning Engineer", "Deep Learning", "AI Researcher"],
    "data-scientist": ["Data Scientist", "Data Analyst", "Business Intelligence", "Analytics"],
    "embedded-systems-engineer": ["Embedded Engineer", "IoT Engineer", "Hardware Engineer", "Robotics"],
    "product-manager": ["Product Manager", "Product Owner", "Business Analyst", "Project Manager"],
    "bba-finance": ["Finance Analyst", "Financial Analyst", "Accountant", "Investment Banker", "CFA"],
};
const deptMap = {
    "software-engineer": ["Computer Science and Engineering", "Computer Science"],
    "ai-ml-engineer": ["Computer Science and Engineering", "Computer Science"],
    "data-scientist": ["Computer Science and Engineering", "Business Administration"],
    "embedded-systems-engineer": ["Electrical and Electronic Engineering"],
    "product-manager": ["Computer Science and Engineering", "Business Administration"],
    "bba-finance": ["Business Administration"],
};
function calcMatch(career, opts) {
    const userSkillsLower = opts.skills.map(s => s.toLowerCase());
    const allRequired = [...career.skillsMatched, ...career.skillsMissing];
    // Skills (30%)
    const skillHits = allRequired.filter(s => userSkillsLower.includes(s.toLowerCase())).length;
    const skillsScore = allRequired.length ? Math.round((skillHits / allRequired.length) * 100) : 20;
    // Interests / career goal (20%)
    const goalKeywords = careerGoalMap[career.id] || [];
    const goalMatch = goalKeywords.some(k => opts.careerGoal.toLowerCase().includes(k.toLowerCase()));
    const interestsScore = goalMatch ? 100 : 30;
    // Career Goal (15%) — same logic
    const careerGoalScore = goalMatch ? 100 : 25;
    // Education (10%) — degree maps loosely
    const degreeMatches = (opts.department.includes("Computer") && career.dept.includes("CSE"))
        || (opts.department.includes("Business") && career.dept.includes("BBA"))
        || (opts.department.includes("Electrical") && career.dept.includes("EEE"));
    const educationScore = degreeMatches ? 100 : 60;
    // Department (10%)
    const deptCareers = deptMap[career.id] || [];
    const deptScore = deptCareers.some(d => opts.department.includes(d.split(" ")[0])) ? 100 : 40;
    // Experience (10%)
    const expMap = {
        "No Experience": 60,
        "Beginner (< 1 year)": 75,
        "Intermediate (1–2 years)": 90,
        "Experienced (2+ years)": 100,
    };
    const experienceScore = expMap[opts.experience] ?? 70;
    // Work Mode (5%) — always reasonable
    const workModeScore = opts.workMode ? 75 : 50;
    // Weighted total
    const total = Math.round(skillsScore * 0.30 +
        interestsScore * 0.20 +
        careerGoalScore * 0.15 +
        educationScore * 0.10 +
        deptScore * 0.10 +
        experienceScore * 0.10 +
        workModeScore * 0.05);
    const criteria = [
        { label: "Skills", score: skillsScore },
        { label: "Interests", score: interestsScore },
        { label: "Career Goal", score: careerGoalScore },
        { label: "Education", score: educationScore },
        { label: "Department", score: deptScore },
        { label: "Experience", score: experienceScore },
        { label: "Work Mode", score: workModeScore },
    ];
    return { match: Math.min(99, Math.max(10, total)), criteria };
}
// ─── Career Page: 3-step wizard ────────────────────────────────────────────────
const careerGoalOptions = [
    "Software Engineer",
    "AI / ML Engineer",
    "Data Scientist",
    "Embedded Systems Engineer",
    "Product Manager",
    "Finance Analyst",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Cloud Engineer",
    "Cybersecurity Analyst",
    "Business Analyst",
];
export function CareerPage() {
    const [step, setStep] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [filter, setFilter] = useState("all");
    const [calculatedCareers, setCalculatedCareers] = useState(allCareers);
    // Step 1 state
    const [degree, setDegree] = useState("B.Sc. in CSE");
    const [department, setDepartment] = useState("Computer Science and Engineering");
    const [cgpa, setCgpa] = useState("");
    // Step 2 state
    const [skills, setSkills] = useState(["Python", "JavaScript", "Problem Solving"]);
    const [skillInput, setSkillInput] = useState("");
    // Step 3 state
    const [workMode, setWorkMode] = useState("Hybrid");
    const [experienceLevel, setExperienceLevel] = useState("Intermediate");
    const [careerGoal, setCareerGoal] = useState("Software Engineer");
    const [notes, setNotes] = useState("");
    const addSkill = (s) => {
        const t = s.trim();
        if (t && !skills.includes(t))
            setSkills(prev => [...prev, t]);
        setSkillInput("");
    };
    const handleSave = () => {
        const expMap = {
            "Beginner": "Beginner (< 1 year)",
            "Intermediate": "Intermediate (1–2 years)",
            "Advanced": "Experienced (2+ years)",
        };
        const opts = { skills, department, experience: expMap[experienceLevel] ?? experienceLevel, workMode, careerGoal };
        const updated = allCareers
            .map(c => {
            const { match, criteria } = calcMatch(c, opts);
            return { ...c, match, criteria };
        })
            .sort((a, b) => b.match - a.match);
        setCalculatedCareers(updated);
        setShowResults(true);
    };
    const top = calculatedCareers[0];
    const deptFilters = ["all", "CSE", "EEE", "BBA"];
    const shown = filter === "all" ? calculatedCareers : calculatedCareers.filter(c => c.dept.includes(filter));
    // ── Results view ──────────────────────────────────────────────────────────
    if (showResults) {
        return (<DashboardLayout>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] font-display">Career Recommendations</h1>
            <p className="text-[#64748B] text-sm mt-1">System-generated paths based on your profile, skills, and preferences.</p>
          </div>
          <button onClick={() => { setShowResults(false); setStep(0); }} className="flex items-center gap-2 border border-[#E5E7EB] text-[#374151] font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw size={13}/> Re-evaluate Profile
          </button>
        </div>

        {/* Hero recommendation */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)"
            }}/>
          <div className="relative flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F97316]/20 text-[#FB923C] text-xs font-bold">⭐ Top Recommendation</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${top.demandColor}`}>{top.demand}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{top.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">{top.title}</h2>
                  <p className="text-sm text-slate-400">{degree} · {department.split(" ")[0]}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg mb-5">{top.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {top.criteria.map(c => (<div key={c.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-slate-400 mb-1">{c.label}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.score >= 80 ? "bg-emerald-400" : c.score >= 60 ? "bg-[#F97316]" : "bg-red-400"}`} style={{ width: `${c.score}%` }}/>
                      </div>
                      <span className="text-xs font-bold text-white">{c.score}%</span>
                    </div>
                  </div>))}
              </div>
              <Link to={`/roadmap/${top.id}`}>
                <Button size="md">View Detailed Roadmap →</Button>
              </Link>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="relative">
                <CircularProgress value={top.match} size={140} strokeWidth={12}/>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-400 font-display">{top.match}%</span>
                  <span className="text-xs text-slate-400">Match</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center max-w-[120px]">Weighted algorithm score</p>
            </div>
          </div>
        </div>

        {/* Other pathways */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-base font-bold text-[#0F172A] font-display">Other UIU Career Pathways</h2>
          <div className="flex gap-2 ml-auto">
            {deptFilters.map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${filter === f ? "bg-[#F97316] text-white" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#F97316] hover:text-[#F97316]"}`}>
                {f === "all" ? "All" : f}
              </button>))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {shown.slice(1).map(career => (<Card key={career.id} className="p-5 flex flex-col hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{career.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] font-display text-sm">{career.title}</h3>
                    <span className="text-xs text-[#94A3B8]">{career.dept}</span>
                  </div>
                </div>
                <div className="relative shrink-0">
                  <CircularProgress value={career.match} size={52} strokeWidth={5}/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#0F172A]">{career.match}%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed mb-3 line-clamp-2">{career.description}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#94A3B8]">Overall Match</span>
                  <span className="font-bold text-[#0F172A]">{career.match}%</span>
                </div>
                <ProgressBar value={career.match} color={career.match >= 75 ? "green" : "orange"}/>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-3 ${career.demandColor}`}>{career.demand}</span>
              <div className="mb-4 flex-1 flex flex-wrap gap-1">
                {career.skillsMatched.slice(0, 3).map(s => (<span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">{s}</span>))}
                {career.skillsMissing.slice(0, 2).map(s => (<span key={s} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">{s}</span>))}
              </div>
              <Link to={`/roadmap/${career.id}`} className="block">
                <Button className="w-full" variant="outline" size="sm">View Roadmap →</Button>
              </Link>
            </Card>))}
        </div>
      </DashboardLayout>);
    }
    // ── Wizard form ───────────────────────────────────────────────────────────
    return (<DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Career Path</span>
          <h1 className="text-2xl font-bold text-[#0F172A] font-display mt-1 mb-1">Build Your Career Profile</h1>
          <p className="text-[#64748B] text-sm">Complete 3 steps to get AI-powered career recommendations.</p>
        </div>

        <WizardStepper current={step}/>

        {/* Step card */}
        <div className="bg-white border border-[#F3F4F6] rounded-2xl shadow-sm p-6 sm:p-8 mb-4">

          {/* ── Step 1: Academic Background ── */}
          {step === 0 && (<div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={18} className="text-[#F97316]"/>
                </div>
                <h2 className="text-lg font-bold text-[#1F2937] font-display">Academic Background</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-[#374151] block mb-1.5">UIU Degree Program</label>
                  <select value={degree} onChange={e => setDegree(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                    {["B.Sc. in CSE", "B.Sc. in Data Science", "B.Sc. in EEE", "BBA", "B.Sc. in Civil Engineering", "B.Sc. in Pharmacy", "MBA"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#374151] block mb-1.5">Department</label>
                  <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                    {["Computer Science and Engineering", "Electrical and Electronic Engineering", "Business Administration", "Civil Engineering", "Pharmacy", "English"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-[#374151] block mb-1.5">CGPA (optional)</label>
                  <input type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.60" value={cgpa} onChange={e => setCgpa(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"/>
                </div>
              </div>
            </div>)}

          {/* ── Step 2: Skill Matrix ── */}
          {step === 1 && (<div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Briefcase size={18} className="text-[#F97316]"/>
                </div>
                <h2 className="text-lg font-bold text-[#1F2937] font-display">Skill Matrix</h2>
              </div>

              <p className="text-sm font-semibold text-[#1F2937] mb-2">Add a Skill</p>
              <div className="flex gap-3 mb-5">
                <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter")
            addSkill(skillInput); }} placeholder="Type a skill and press Enter..." className="flex-1 border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"/>
                <button onClick={() => addSkill(skillInput)} className="bg-[#F97316] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#EA580C] transition-colors">
                  Add
                </button>
              </div>

              <p className="text-sm font-semibold text-[#1F2937] mb-2">
                Your Skills <span className="text-[#9CA3AF] font-normal">({skills.length})</span>
              </p>
              <div className="min-h-[52px] border border-[#F3F4F6] bg-[#FFFBF7] rounded-xl p-3 mb-5 flex flex-wrap gap-2">
                {skills.length === 0 && <span className="text-xs text-[#9CA3AF] self-center">No skills added yet.</span>}
                {skills.map(s => (<span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 text-[#F97316] rounded-full text-sm font-semibold">
                    {s}
                    <button onClick={() => setSkills(p => p.filter(x => x !== s))} className="hover:text-red-500"><X size={12}/></button>
                  </span>))}
              </div>

              <p className="text-sm font-semibold text-[#1F2937] mb-2">Quick Add</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "SQL", "Java", "C++", "TypeScript", "Machine Learning", "Docker", "AWS", "Git", "Data Structures", "Algorithms", "System Design", "Excel", "Financial Modeling"]
                .filter(s => !skills.includes(s)).map(s => (<button key={s} onClick={() => addSkill(s)} className="px-3 py-1.5 border border-[#E5E7EB] rounded-full text-xs text-[#374151] hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50 transition-all font-medium">
                    + {s}
                  </button>))}
              </div>
            </div>)}

          {/* ── Step 3: Job Preferences ── */}
          {step === 2 && (<div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <SlidersHorizontal size={18} className="text-[#F97316]"/>
                </div>
                <h2 className="text-lg font-bold text-[#1F2937] font-display">Job Preferences</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-[#1F2937] mb-3">Preferred Work Mode</p>
                  <div className="flex flex-wrap gap-3">
                    {[{ label: "Remote", emoji: "🏠" }, { label: "Hybrid", emoji: "🖥️" }, { label: "On-site", emoji: "🏢" }].map(({ label, emoji }) => (<button key={label} onClick={() => setWorkMode(label)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${workMode === label ? "border-[#F97316] text-[#F97316] bg-orange-50" : "border-[#E5E7EB] text-[#374151] hover:border-[#F97316] hover:text-[#F97316]"}`}>
                        <span>{emoji}</span> {label}
                      </button>))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1F2937] mb-3">Experience Level</p>
                  <div className="flex flex-wrap gap-3">
                    {["Beginner", "Intermediate", "Advanced"].map(lvl => (<button key={lvl} onClick={() => setExperienceLevel(lvl)} className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${experienceLevel === lvl ? "border-[#F97316] text-[#F97316] bg-orange-50" : "border-[#E5E7EB] text-[#374151] hover:border-[#F97316] hover:text-[#F97316]"}`}>
                        {lvl}
                      </button>))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1F2937] block mb-1.5">Primary Career Goal</label>
                  <select value={careerGoal} onChange={e => setCareerGoal(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] bg-white">
                    {careerGoalOptions.map(g => <option key={g}>{g}</option>)}
                  </select>
                  <p className="text-xs text-[#9CA3AF] mt-1">This influences your career match scores on the Career Recommendations page.</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1F2937] block mb-1.5">Additional Notes / Goals</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="E.g. I want to work at a tech company in Dhaka, transition into AI research after 2 years..." className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none"/>
                </div>
              </div>
            </div>)}
        </div>

        {/* Bottom navigation bar */}
        <div className="bg-white border border-[#F3F4F6] rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF] font-medium">Step {step + 1} of 3 · {STEPS[step].label}</span>
          <div className="flex gap-3">
            {step > 0 && (<button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 border border-[#E5E7EB] text-[#374151] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <ChevronLeft size={15}/> Back
              </button>)}
            {step < 2 ? (<button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 bg-[#F97316] text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#EA580C] transition-colors">
                Next <ChevronRight size={15}/>
              </button>) : (<button onClick={handleSave} className="flex items-center gap-2 bg-[#F97316] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-[#EA580C] transition-colors">
                <RefreshCw size={15}/> Save & Calculate Match Scores
              </button>)}
          </div>
        </div>
      </div>
    </DashboardLayout>);
}
// ─── Roadmap Page (Screen B) ───────────────────────────────────────────────────
export function RoadmapPage() {
    const { careerName } = useParams();
    const key = careerName || "software-engineer";
    const career = allCareers.find(c => c.id === key) || allCareers[0];
    const steps = roadmapData[key] || roadmapData["software-engineer"];
    const [completedSteps, setCompletedSteps] = useState(() => steps.filter(s => s.status === "completed").map(s => s.step));
    const [acquiredSkills, setAcquiredSkills] = useState(career.skillsMatched);
    const [liveMatch, setLiveMatch] = useState(career.match);
    const toggleStep = (step) => {
        const next = completedSteps.includes(step)
            ? completedSteps.filter(s => s !== step)
            : [...completedSteps, step];
        setCompletedSteps(next);
        // Recalculate a simulated live match score
        const baseMatch = career.match;
        const bonus = (next.length - steps.filter(s => s.status === "completed").length) * 3;
        setLiveMatch(Math.min(99, Math.max(40, baseMatch + bonus)));
    };
    const markSkillComplete = (skill) => {
        if (!acquiredSkills.includes(skill)) {
            const updated = [...acquiredSkills, skill];
            setAcquiredSkills(updated);
            setLiveMatch(prev => Math.min(99, prev + 3));
        }
    };
    const missingSkills = career.skillsMissing.filter(s => !acquiredSkills.includes(s));
    const progress = Math.round((completedSteps.length / steps.length) * 100);
    return (<DashboardLayout>
      {/* Back */}
      <Link to="/dashboard/career" className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0F172A] mb-5 transition-colors">
        <ArrowLeft size={14}/> Back to Career Recommendations
      </Link>

      {/* ── Top Banner ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-4xl">{career.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-white font-display">{career.title}</h1>
              <p className="text-slate-400 text-xs">{career.dept}</p>
            </div>
          </div>
          {/* Live match pill */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <CircularProgress value={liveMatch} size={72} strokeWidth={7}/>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-white">{liveMatch}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400">Live Match Score</p>
              <p className="text-xs text-[#FB923C] font-semibold mt-0.5">Updates as you progress</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${career.demandColor}`}>{career.demand}</span>
            <Link to="/profile?step=1">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <RefreshCw size={13}/> Re-evaluate
              </Button>
            </Link>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Roadmap Progress</span>
            <span className="font-semibold text-white">{completedSteps.length}/{steps.length} steps · {progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#F97316] rounded-full transition-all duration-500" style={{ width: `${progress}%` }}/>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ───────────────────────────────────── */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Left: Skill Gap Analysis */}
        <div className="lg:col-span-2 space-y-5">

          {/* Acquired Skills */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle size={15} className="text-green-600"/>
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] font-display">Acquired Skills</h2>
              <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{acquiredSkills.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {acquiredSkills.map(s => (<span key={s} className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <CheckCircle size={10}/> {s}
                </span>))}
            </div>
          </Card>

          {/* Missing Skills */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
                <Zap size={15} className="text-[#F97316]"/>
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] font-display">Skills to Develop</h2>
              <span className="ml-auto text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{missingSkills.length}</span>
            </div>
            {missingSkills.length === 0 ? (<div className="text-center py-4">
                <CheckCircle size={28} className="text-green-500 mx-auto mb-2"/>
                <p className="text-sm font-semibold text-green-600">All skills acquired! 🎉</p>
              </div>) : (<div className="space-y-2">
                {missingSkills.map(skill => (<div key={skill} className="flex items-center justify-between p-2.5 bg-orange-50/60 border border-orange-100 rounded-xl">
                    <span className="text-xs font-semibold text-[#374151]">{skill}</span>
                    <button onClick={() => markSkillComplete(skill)} className="flex items-center gap-1 text-xs font-bold text-[#F97316] hover:text-[#EA580C] bg-white border border-orange-200 px-2.5 py-1 rounded-lg transition-colors">
                      <Plus size={11}/> Mark as Completed
                    </button>
                  </div>))}
              </div>)}
          </Card>

          {/* Match Criteria Breakdown */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <Target size={15} className="text-blue-600"/>
              </div>
              <h2 className="text-sm font-bold text-[#0F172A] font-display">Match Breakdown</h2>
            </div>
            <div className="space-y-3">
              {career.criteria.map(c => <CriteriaBar key={c.label} label={c.label} score={c.score}/>)}
            </div>
          </Card>

          {/* Find a mentor CTA */}
          <div className="bg-[#F97316] rounded-2xl p-5 text-white">
            <div className="text-2xl mb-2">👨‍🏫</div>
            <h3 className="font-bold font-display mb-1">Need guidance?</h3>
            <p className="text-white/80 text-xs mb-3">Book a session with a {career.title} mentor to fast-track your progress.</p>
            <Link to="/mentors">
              <Button variant="secondary" size="sm">Find a Mentor</Button>
            </Link>
          </div>
        </div>

        {/* Right: Roadmap Timeline */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F172A] font-display">Step-by-Step Learning Roadmap</h2>
            <Badge variant="orange">{career.title}</Badge>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-300 via-[#F97316] to-[#E5E7EB] opacity-40"/>

            <div className="space-y-3">
              {steps.map((step) => {
            const isDone = completedSteps.includes(step.step);
            const isCurrent = step.status === "current" && !isDone;
            const isLocked = step.status === "locked" && !isDone;
            const unlockable = isLocked && completedSteps.includes(step.step - 1);
            return (<div key={step.step} className="relative flex gap-4">
                    {/* Node */}
                    <div className="relative z-10 shrink-0 mt-1">
                      <div className={`w-[52px] h-[52px] rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${isDone ? "bg-green-500 border-green-500 text-white"
                    : isCurrent ? "bg-[#F97316] border-[#F97316] text-white shadow-lg shadow-orange-200"
                        : "bg-white border-[#E5E7EB] text-[#9CA3AF]"}`}>
                        {isDone ? <CheckCircle size={20}/> : isLocked && !unlockable ? <Lock size={16}/> : <span className="text-xl">{step.icon}</span>}
                        <span className="text-[9px] font-bold mt-0.5 opacity-70">Step {step.step}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 rounded-2xl border p-4 mb-1 transition-all ${isDone ? "border-green-100 bg-green-50/40"
                    : isCurrent ? "border-orange-200 bg-orange-50/40 shadow-sm"
                        : "border-[#E5E7EB] bg-white"} ${isLocked && !unlockable ? "opacity-60" : ""}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-[#0F172A] font-display text-sm">{step.title}</h3>
                            {isDone && <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">✓ Completed</span>}
                            {isCurrent && <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full animate-pulse">● In Progress</span>}
                            {isLocked && !unlockable && <span className="text-xs text-[#94A3B8] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">🔒 Locked</span>}
                            {unlockable && <span className="text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">⬆ Unlocked</span>}
                          </div>
                          <p className="text-xs text-[#64748B] leading-relaxed">{step.description}</p>
                          <p className="text-xs text-[#94A3B8] mt-2 flex items-center gap-1">
                            <BookOpen size={11}/> Est. {step.duration}
                          </p>
                        </div>
                        {/* Action */}
                        {!isLocked && (<button onClick={() => toggleStep(step.step)} className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${isDone
                        ? "border-green-200 text-green-700 hover:bg-green-50"
                        : "bg-[#F97316] text-white border-[#F97316] hover:bg-[#EA580C]"}`}>
                            {isDone ? "Undo" : "Mark Completed"}
                          </button>)}
                        {unlockable && (<button onClick={() => toggleStep(step.step)} className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all">
                            Mark Completed
                          </button>)}
                      </div>
                    </div>
                  </div>);
        })}
            </div>
          </div>

          {/* Bottom CTA */}
          <Card className="mt-5 p-5 text-center bg-[#FAFAF9]">
            <TrendingUp size={24} className="text-[#F97316] mx-auto mb-2"/>
            <p className="text-sm font-bold text-[#0F172A] font-display mb-1">Track your progress</p>
            <p className="text-xs text-[#64748B] mb-3">Complete steps to improve your match score and unlock the next stage.</p>
            <Link to="/bookings">
              <Button size="sm">Book a Mentor Session</Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}
