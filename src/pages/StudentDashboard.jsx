import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Bell, Target } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, ProgressBar, Badge, StatusBadge } from "../components/ui";
import { bookings, news, events, alerts, careerPaths, mentors } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
export default function StudentDashboard() {
    const { user } = useAuth();
    const studentName = user?.name ?? "Student";
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
    return (<DashboardLayout>
      {/* Greeting */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] font-display">
            {greeting}, {studentName.split(" ")[0]} 👋
          </h1>
          <p className="text-[#6B7280] text-sm mt-1">Here's what's happening at UIU today.</p>
        </div>
        <Link to="/bookings">
          <button className="bg-[#F97316] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#EA580C] transition-colors">
            Book a Mentor
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Upcoming Sessions" value="2" icon={<Calendar size={18}/>} trend="Next: Feb 15" color="orange"/>
        <StatCard label="Completed Sessions" value="3" icon={<BookOpen size={18}/>} color="green"/>
        <StatCard label="Unread Notifications" value="5" icon={<Bell size={18}/>} color="blue"/>
        <StatCard label="Career Match" value="89%" icon={<Target size={18}/>} trend="Software Engineer" color="purple"/>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Recommendation */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1F2937] font-display">Recommended Career Paths</h2>
              <Link to="/dashboard/career" className="text-xs font-semibold text-[#F97316] flex items-center gap-1">View all <ArrowRight size={12}/></Link>
            </div>
            <div className="space-y-4">
              {careerPaths.slice(0, 2).map(career => (<div key={career.id} className="flex items-center gap-4 p-4 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
                  <span className="text-2xl">{career.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-[#1F2937] text-sm font-display">{career.title}</p>
                      <span className="text-sm font-bold text-[#F97316]">{career.match}%</span>
                    </div>
                    <ProgressBar value={career.match} className="mb-2"/>
                    <p className="text-xs text-[#9CA3AF]">
                      {career.skillsMatched.length} skills matched · {career.skillsMissing.length} skills to develop
                    </p>
                  </div>
                </div>))}
            </div>
          </Card>

          {/* Upcoming bookings */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1F2937] font-display">Upcoming Sessions</h2>
              <Link to="/bookings" className="text-xs font-semibold text-[#F97316] flex items-center gap-1">View all <ArrowRight size={12}/></Link>
            </div>
            <div className="space-y-3">
              {bookings.filter(b => b.status !== "completed").slice(0, 2).map(booking => (<div key={booking.id} className="flex items-center gap-3 p-3 bg-[#FAFAF9] rounded-xl border border-[#F3F4F6]">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-lg shrink-0">📅</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1F2937] truncate">{booking.service}</p>
                    <p className="text-xs text-[#6B7280]">with {booking.mentor}</p>
                    <p className="text-xs text-[#9CA3AF]">{booking.date} · {booking.time}</p>
                  </div>
                  <StatusBadge status={booking.status}/>
                </div>))}
            </div>
          </Card>

          {/* Latest News */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1F2937] font-display">Campus News</h2>
              <Link to="/news" className="text-xs font-semibold text-[#F97316] flex items-center gap-1">View all <ArrowRight size={12}/></Link>
            </div>
            <div className="space-y-3">
              {news.slice(0, 2).map(item => (<div key={item.id} className="flex gap-3">
                  {item.image ? <img src={item.image} alt={item.title} className="w-16 h-14 rounded-xl object-cover shrink-0"/> : <div className="w-16 h-14 rounded-xl bg-orange-50 shrink-0 flex items-center justify-center text-xl">📰</div>}
                  <div>
                    <Badge variant="orange" className="mb-1">{item.category}</Badge>
                    <p className="text-sm font-semibold text-[#1F2937] line-clamp-2">{item.title}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{item.date}</p>
                  </div>
                </div>))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Campus Alerts */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#1F2937] font-display">Campus Alerts</h2>
              <Link to="/alerts" className="text-xs text-[#F97316] font-semibold">View all</Link>
            </div>
            <div className="space-y-2">
              {alerts.map(alert => (<div key={alert.id} className="p-3 rounded-xl bg-[#FAFAF9] border border-[#F3F4F6]">
                  <p className="text-xs font-bold text-[#1F2937]">{alert.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">{alert.message}</p>
                </div>))}
            </div>
          </Card>

          {/* Recommended Mentors */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#1F2937] font-display">Recommended Mentors</h2>
              <Link to="/mentors" className="text-xs text-[#F97316] font-semibold">View all</Link>
            </div>
            <div className="space-y-3">
              {mentors.filter(m => m.status === "approved").slice(0, 3).map(mentor => (<Link to={`/mentors/${mentor.id}`} key={mentor.id} className="flex items-center gap-3 hover:bg-[#FAFAF9] rounded-xl p-2 -mx-2 transition-colors">
                  <img src={mentor.image} alt={mentor.name} className="w-9 h-9 rounded-xl object-cover shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1F2937] truncate">{mentor.name}</p>
                    <p className="text-xs text-[#9CA3AF]">⭐ {mentor.rating} · {mentor.sessions} sessions</p>
                  </div>
                </Link>))}
            </div>
          </Card>

          {/* Upcoming events */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#1F2937] font-display">Upcoming Events</h2>
              <Link to="/events" className="text-xs text-[#F97316] font-semibold">View all</Link>
            </div>
            <div className="space-y-2">
              {events.slice(0, 2).map(event => (<div key={event.id} className="p-3 rounded-xl bg-[#FAFAF9] border border-[#F3F4F6]">
                  <p className="text-xs font-bold text-[#1F2937]">{event.title}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">📅 {event.date} · 📍 {event.location.split(",")[0]}</p>
                </div>))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}
