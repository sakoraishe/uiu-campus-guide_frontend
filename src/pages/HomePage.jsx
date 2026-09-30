import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Calendar, Briefcase, Star, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import { Card } from "../components/ui";
import { mentors, stories, events } from "../data/mockData";
const stats = [
    { label: "Active Students", value: "4,200+", icon: "🎓" },
    { label: "Expert Mentors", value: "48", icon: "👨‍🏫" },
    { label: "Campus Services", value: "134", icon: "🏛️" },
    { label: "Events This Month", value: "12", icon: "📅" },
];
const features = [
    {
        icon: <Users size={22} className="text-[#F97316]"/>,
        title: "Find a Mentor",
        description: "Connect with experienced mentors from your department for career, academic, and personal guidance.",
        to: "/mentors",
    },
    {
        icon: <BookOpen size={22} className="text-[#F97316]"/>,
        title: "Browse Services",
        description: "Explore professional services — from interview prep to research guidance — offered by UIU mentors.",
        to: "/services",
    },
    {
        icon: <Briefcase size={22} className="text-[#F97316]"/>,
        title: "Career Pathways",
        description: "Discover your personalized career roadmap based on your skills, department, and career goals.",
        to: "/dashboard/career",
    },
    {
        icon: <Calendar size={22} className="text-[#F97316]"/>,
        title: "Campus Events",
        description: "Stay updated on tech fests, career fairs, workshops, and academic events happening on campus.",
        to: "/events",
    },
    {
        icon: <Star size={22} className="text-[#F97316]"/>,
        title: "Student Stories",
        description: "Get inspired by success stories from UIU alumni who achieved their dreams through mentorship.",
        to: "/stories",
    },
    {
        icon: <Shield size={22} className="text-[#F97316]"/>,
        title: "Campus Alerts",
        description: "Real-time notifications for exam schedules, campus news, and important university announcements.",
        to: "/alerts",
    },
];
export default function HomePage() {
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1F2937] overflow-hidden">
        <img src="https://admission.uiu.ac.bd/Images/Img/carosol_img/Carosol_1.jpg" alt="UIU Campus" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-[#F97316]"/>
              <span className="text-[#F97316] text-xs font-bold tracking-[0.2em] uppercase">United International University</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight mb-6">
              Your Complete Guide<br />to{" "}
              <span className="text-[#F97316]">Campus Life</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-10">
              UIU Campus Guide connects students with experienced mentors, academic resources, campus services, events, and opportunities — all in one trusted platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="inline-flex items-center gap-2 bg-[#F97316] text-white font-bold px-7 py-4 rounded-2xl hover:bg-[#EA580C] transition-colors text-sm">
                Explore Services <ArrowRight size={16}/>
              </Link>
              <Link to="/mentors" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 font-semibold px-7 py-4 rounded-2xl hover:bg-white/20 transition-colors text-sm backdrop-blur-sm">
                Find a Mentor
              </Link>
            </div>
          </div>
        </div>

        {/* Stats floating bar */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s) => (<div key={s.label} className="text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-white font-display">{s.value}</div>
                  <div className="text-xs text-gray-300 font-medium mt-0.5">{s.label}</div>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Everything you need</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2937] font-display mt-3">Platform Features</h2>
          <p className="text-[#6B7280] mt-3 max-w-lg mx-auto">From academic guidance to career planning — UIU Campus Guide is your all-in-one campus companion.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (<Link key={f.to} to={f.to}>
              <Card className="p-6 hover:shadow-md transition-shadow h-full">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-base font-bold text-[#1F2937] font-display mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{f.description}</p>
                <div className="flex items-center gap-1 text-[#F97316] text-sm font-semibold mt-4">
                  Learn more <ArrowRight size={14}/>
                </div>
              </Card>
            </Link>))}
        </div>
      </section>

      {/* Mentors section */}
      <section className="bg-white border-y border-[#E5E7EB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Verified Professionals</span>
              <h2 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Featured Mentors</h2>
            </div>
            <Link to="/mentors" className="text-sm font-semibold text-[#F97316] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.filter(m => m.status === "approved").slice(0, 3).map((mentor) => (<Card key={mentor.id} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img src={mentor.image} alt={mentor.name} className="w-14 h-14 rounded-2xl object-cover"/>
                  <div>
                    <h3 className="font-bold text-[#1F2937] font-display">{mentor.name}</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">{mentor.department}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs font-semibold text-[#1F2937]">{mentor.rating}</span>
                      <span className="text-xs text-[#9CA3AF]">· {mentor.sessions} sessions</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-4">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.slice(0, 3).map((e) => (<span key={e} className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">{e}</span>))}
                </div>
                <Link to={`/mentors/${mentor.id}`} className="block w-full text-center border border-[#E5E7EB] rounded-xl py-2 text-sm font-semibold text-[#1F2937] hover:bg-gray-50 transition-colors">
                  View Profile
                </Link>
              </Card>))}
          </div>
        </div>
      </section>

      {/* Events section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">What's happening</span>
            <h2 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Upcoming Events</h2>
          </div>
          <Link to="/events" className="text-sm font-semibold text-[#F97316] flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight size={14}/>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (<Card key={event.id} className="overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-44 object-cover"/>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-full">Upcoming</span>
                  <span className="text-xs text-[#9CA3AF]">{event.date}</span>
                </div>
                <h3 className="font-bold text-[#1F2937] font-display mb-1">{event.title}</h3>
                <p className="text-xs text-[#6B7280] mb-3">📍 {event.location}</p>
                <Link to={`/events`} className="text-sm font-semibold text-[#F97316] flex items-center gap-1">
                  View Details <ArrowRight size={13}/>
                </Link>
              </div>
            </Card>))}
        </div>
      </section>

      {/* Stories section */}
      <section className="bg-[#1F2937] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Inspiration</span>
              <h2 className="text-3xl font-bold text-white font-display mt-2">Student Success Stories</h2>
            </div>
            <Link to="/stories" className="text-sm font-semibold text-[#F97316] flex items-center gap-1">
              All stories <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (<div key={story.id} className="rounded-2xl overflow-hidden group cursor-pointer">
                <div className="relative h-44 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                  <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">{story.author}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 border border-white/10 rounded-b-2xl">
                  <h3 className="font-bold text-white font-display text-sm leading-snug mb-2 line-clamp-2">{story.title}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{story.excerpt}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-display mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Join thousands of UIU students who use Campus Guide every day to connect, learn, and grow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="bg-white text-[#F97316] font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors text-sm">
              Create Free Account
            </Link>
            <Link to="/mentors" className="bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-2xl hover:bg-white/30 transition-colors text-sm">
              Browse Mentors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-[#F97316] rounded-xl flex items-center justify-center text-white font-bold text-sm">U</div>
            <span className="font-bold text-white text-sm font-display">UIU Campus Guide</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="hover:text-[#F97316] transition-colors">Services</Link></li>
                <li><Link to="/mentors" className="hover:text-[#F97316] transition-colors">Mentors</Link></li>
                <li><Link to="/events" className="hover:text-[#F97316] transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Campus</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/news" className="hover:text-[#F97316] transition-colors">Campus News</Link></li>
                <li><Link to="/alerts" className="hover:text-[#F97316] transition-colors">Alerts</Link></li>
                <li><Link to="/resources" className="hover:text-[#F97316] transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Students</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/register" className="hover:text-[#F97316] transition-colors">Register</Link></li>
                <li><Link to="/stories" className="hover:text-[#F97316] transition-colors">Success Stories</Link></li>
                <li><Link to="/dashboard/career" className="hover:text-[#F97316] transition-colors">Career Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">UIU</h4>
              <p className="text-sm leading-relaxed">United International University<br />Madani Avenue, Vatara<br />Dhaka 1212, Bangladesh</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-xs text-center">
            © 2024 UIU Campus Guide. United International University. All rights reserved.
          </div>
        </div>
      </footer>
    </div>);
}
