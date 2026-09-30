import Navbar from "../components/Navbar";
import { Card, StatusBadge, Badge } from "../components/ui";
import { news, events, alerts, resources, stories, achievements } from "../data/mockData";
import { Download } from "lucide-react";
// Campus News
export function NewsPage() {
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Campus News</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Latest News</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (<Card key={item.id} className="overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-44 object-cover"/>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="orange">{item.category}</Badge>
                  <span className="text-xs text-[#9CA3AF]">{item.date}</span>
                </div>
                <h3 className="font-bold text-[#1F2937] font-display mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">By {item.author}</span>
                  <button className="text-xs font-semibold text-[#F97316]">Read More →</button>
                </div>
              </div>
            </Card>))}
        </div>
      </div>
    </div>);
}
// Events Page
export function EventsPage() {
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Campus Events</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Upcoming Events</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4">
          {events.map(event => (<Card key={event.id} className="p-0 overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <img src={event.image} alt={event.title} className="w-full sm:w-48 h-36 object-cover"/>
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <StatusBadge status={event.status}/>
                      <h3 className="font-bold text-[#1F2937] font-display text-lg mt-2">{event.title}</h3>
                      <p className="text-sm text-[#6B7280] mt-1">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#6B7280]">
                    <span>📅 {event.date} · {event.time}</span>
                    <span>📍 {event.location}</span>
                    <span>🏛 {event.organizer}</span>
                  </div>
                </div>
              </div>
            </Card>))}
        </div>
      </div>
    </div>);
}
// Campus Alerts
export function AlertsPage() {
    const typeIcon = { warning: "⚠️", info: "ℹ️", error: "🚨", success: "✅" };
    const typeColor = {
        warning: "border-yellow-200 bg-yellow-50",
        info: "border-blue-200 bg-blue-50",
        error: "border-red-200 bg-red-50",
        success: "border-green-200 bg-green-50",
    };
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Important</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Campus Alerts</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4">
          {alerts.map(alert => (<div key={alert.id} className={`rounded-2xl border p-5 ${typeColor[alert.type] || "border-gray-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="text-xl">{typeIcon[alert.type]}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1F2937] font-display">{alert.title}</h3>
                    <span className="text-xs text-[#9CA3AF]">{alert.date}</span>
                  </div>
                  <p className="text-sm text-[#374151] mt-1">{alert.message}</p>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
// Resources Page
export function ResourcesPage() {
    const typeIcon = { PDF: "📄", DOCX: "📝", XLSX: "📊", ZIP: "📦" };
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Download Center</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Campus Resources</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4">
          {resources.map(res => (<Card key={res.id} className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {typeIcon[res.fileType] || "📄"}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1F2937] font-display">{res.title}</h3>
                  <p className="text-sm text-[#6B7280] mt-0.5">{res.description}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Uploaded by {res.uploadedBy} · {res.date}</p>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:text-[#EA580C] shrink-0">
                  <Download size={14}/> Download
                </button>
              </div>
            </Card>))}
        </div>
      </div>
    </div>);
}
// Stories Page
export function StoriesPage() {
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Inspiration</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Student Success Stories</h1>
          <p className="text-[#6B7280] text-sm mt-2">Real stories from UIU graduates who achieved their dreams.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (<Card key={story.id} className="overflow-hidden group cursor-pointer">
              <div className="relative h-52 overflow-hidden">
                {story.image && <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#1F2937] font-display mb-2 line-clamp-2">{story.title}</h3>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">{story.author} · {story.date}</span>
                  <button className="text-xs font-semibold text-[#F97316]">Read Story →</button>
                </div>
              </div>
            </Card>))}
        </div>
      </div>
    </div>);
}
// Achievements Page
export function AchievementsPage() {
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-[#F97316] text-xs font-bold tracking-widest uppercase">Pride of UIU</span>
          <h1 className="text-3xl font-bold text-[#1F2937] font-display mt-2">Achievements</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4">
          {achievements.map(ach => (<Card key={ach.id} className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-xl shrink-0">🏆</div>
                <div>
                  <h3 className="font-bold text-[#1F2937] font-display">{ach.title}</h3>
                  <p className="text-sm text-[#6B7280] mt-1">{ach.description}</p>
                  <p className="text-xs text-[#9CA3AF] mt-2">{ach.author} · {ach.date}</p>
                </div>
              </div>
            </Card>))}
        </div>
      </div>
    </div>);
}
