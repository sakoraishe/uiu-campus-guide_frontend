import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, Table, Th, Td, StatusBadge, StarRating, SectionHeader } from "../components/ui";
import { mentors } from "../data/mockData";
import { Users, Star, BookOpen, Calendar, Building } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const students = [
    { id: "011201010", name: "Arif Hossain", dept: "CSE", program: "B.Sc.", semester: 7, status: "active" },
    { id: "011201011", name: "Sadia Islam", dept: "CSE", program: "B.Sc.", semester: 5, status: "active" },
    { id: "011201012", name: "Raihan Ahmed", dept: "EEE", program: "B.Sc.", semester: 8, status: "active" },
    { id: "011201013", name: "Lamia Haque", dept: "BBA", program: "BBA", semester: 4, status: "inactive" },
    { id: "011201014", name: "Farhad Ali", dept: "CSE", program: "B.Sc.", semester: 3, status: "active" },
];
const deptData = [
    { dept: "CSE", students: 1240, mentors: 12, services: 48 },
    { dept: "EEE", students: 820, mentors: 8, services: 22 },
    { dept: "BBA", students: 960, mentors: 10, services: 31 },
    { dept: "Pharmacy", students: 430, mentors: 6, services: 18 },
    { dept: "English", students: 380, mentors: 5, services: 15 },
];
export function FacultyDashboard() {
    return (<DashboardLayout title="Faculty Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Students" value="4,210" icon={<Users size={18}/>} trend="+215 this semester" color="orange"/>
        <StatCard label="Active Mentors" value="41" icon={<Star size={18}/>} color="green"/>
        <StatCard label="Pending Approvals" value="7" icon={<BookOpen size={18}/>} color="blue"/>
        <StatCard label="Active Services" value="134" icon={<BookOpen size={18}/>} color="purple"/>
        <StatCard label="Upcoming Events" value="3" icon={<Calendar size={18}/>} color="orange"/>
        <StatCard label="Departments" value="10" icon={<Building size={18}/>} color="green"/>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Dept overview chart */}
        <Card className="p-5">
          <SectionHeader title="Department Overview" subtitle="Students per department"/>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="dept" tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }}/>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}/>
              <Bar dataKey="students" fill="#F97316" radius={[4, 4, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Mentor overview */}
        <Card className="p-5">
          <SectionHeader title="Top Mentors" subtitle="By department rating"/>
          <div className="space-y-3">
            {mentors.filter(m => m.status === "approved").slice(0, 4).map(m => (<div key={m.id} className="flex items-center gap-3">
                <img src={m.image} alt={m.name} className="w-9 h-9 rounded-xl object-cover"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1F2937] truncate">{m.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{m.department.split("&")[0]}</p>
                </div>
                <StarRating rating={m.rating}/>
              </div>))}
          </div>
        </Card>
      </div>

      {/* Students table */}
      <Card className="p-5">
        <SectionHeader title="Recent Students"/>
        <Table>
          <thead>
            <tr>
              <Th>Student ID</Th>
              <Th>Name</Th>
              <Th>Department</Th>
              <Th>Program</Th>
              <Th>Semester</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (<tr key={s.id} className="hover:bg-[#FAFAF9]">
                <Td><span className="font-mono text-xs">{s.id}</span></Td>
                <Td><span className="font-semibold text-[#1F2937]">{s.name}</span></Td>
                <Td>{s.dept}</Td>
                <Td>{s.program}</Td>
                <Td>Semester {s.semester}</Td>
                <Td><StatusBadge status={s.status}/></Td>
              </tr>))}
          </tbody>
        </Table>
      </Card>
    </DashboardLayout>);
}
