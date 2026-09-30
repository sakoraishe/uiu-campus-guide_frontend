import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import { Card, Button, StarRating, Badge } from "../components/ui";
import { mentors, services } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
export default function MentorProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const mentor = mentors.find(m => m.id === id) || mentors[0];
    const mentorServices = services.filter(s => s.mentorId === mentor.id && s.status === "approved");
    const reviews = [
        { name: "Arif Hossain", rating: 5, comment: "Excellent session! Very practical advice that I could apply immediately.", date: "2024-01-20" },
        { name: "Sadia Islam", rating: 5, comment: "The mentor was very patient and explained everything clearly.", date: "2024-01-15" },
        { name: "Raihan Ahmed", rating: 4, comment: "Great guidance on career planning. Highly recommend.", date: "2024-01-10" },
    ];
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/mentors" className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1F2937] mb-6">
          <ArrowLeft size={14}/> Back to Mentors
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile sidebar */}
          <div className="space-y-5">
            <Card className="p-6 text-center">
              <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4"/>
              <h1 className="text-xl font-bold text-[#1F2937] font-display">{mentor.name}</h1>
              <p className="text-sm text-[#6B7280] mt-1">{mentor.department}</p>
              <div className="flex justify-center mt-2">
                <StarRating rating={mentor.rating} size="md"/>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1">{mentor.sessions} sessions completed</p>
              <div className="mt-4 p-3 bg-orange-50 rounded-xl">
                <p className="text-xs text-orange-700 font-semibold">🗓 Available: {mentor.availability}</p>
              </div>
              <Button className="w-full mt-4" onClick={() => isLoggedIn ? navigate("/bookings") : navigate("/login")}>
                {isLoggedIn ? "Book a Session" : "Sign in to Book"}
              </Button>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-bold text-[#1F2937] font-display mb-3">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Phone size={14}/> {mentor.mobile}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Mail size={14}/> {mentor.name.toLowerCase().replace(" ", ".")}@uiu.ac.bd
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-bold text-[#1F2937] font-display mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map(e => (<span key={e} className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold">{e}</span>))}
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[#1F2937] font-display mb-3">About</h2>
              <p className="text-[#374151] leading-relaxed">{mentor.bio}</p>
            </Card>

            {/* Services */}
            {mentorServices.length > 0 && (<div>
                <h2 className="text-lg font-bold text-[#1F2937] font-display mb-4">Services Offered</h2>
                <div className="space-y-4">
                  {mentorServices.map(service => (<Card key={service.id} className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="orange" className="mb-2">{service.category}</Badge>
                          <h3 className="font-bold text-[#1F2937] font-display">{service.name}</h3>
                          <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{service.description}</p>
                          <p className="text-xs text-[#9CA3AF] mt-2">📅 {service.date} · ⏰ {service.time}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-xl font-bold text-[#1F2937]">৳{service.fee}</p>
                          <Link to={`/services/${service.id}`} className="mt-2 block">
                            <Button size="sm">Book</Button>
                          </Link>
                        </div>
                      </div>
                    </Card>))}
                </div>
              </div>)}

            {/* Reviews */}
            <div>
              <h2 className="text-lg font-bold text-[#1F2937] font-display mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review, i) => (<Card key={i} className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-[#1F2937] text-sm">{review.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{review.date}</p>
                      </div>
                      <StarRating rating={review.rating}/>
                    </div>
                    <p className="text-sm text-[#374151]">{review.comment}</p>
                  </Card>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
