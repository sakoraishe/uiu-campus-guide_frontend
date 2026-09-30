import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import { Card, Button, StarRating, Badge } from "../components/ui";
import { services, mentors } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
export default function ServiceDetailPage() {
    const { id } = useParams();
    const service = services.find(s => s.id === id) || services[0];
    const mentor = mentors.find(m => m.id === service.mentorId) || mentors[0];
    const related = services.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [showBookModal, setShowBookModal] = useState(false);
    const [booked, setBooked] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const handleBookClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        setShowBookModal(true);
    };
    const handleConfirmBooking = () => {
        setBooked(true);
    };
    return (<div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/services" className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1F2937] mb-6">
          <ArrowLeft size={14}/> Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Badge variant="orange" className="mb-3">{service.category}</Badge>
              <h1 className="text-2xl font-bold text-[#1F2937] font-display mb-4">{service.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-[#6B7280] mb-6">
                <span className="flex items-center gap-1"><Calendar size={14}/> {service.date}</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {service.time}</span>
                <StarRating rating={service.rating} size="md"/>
              </div>
              <p className="text-[#374151] leading-relaxed">{service.description}</p>
              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h4 className="text-sm font-bold text-[#1F2937] mb-2">What you'll get</h4>
                <ul className="space-y-1.5">
                  {["1-on-1 personalized session", "Actionable feedback and guidance", "Follow-up Q&A support", "Resource recommendations"].map(i => (<li key={i} className="flex items-center gap-2 text-sm text-[#374151]">
                      <CheckCircle size={14} className="text-green-500 shrink-0"/> {i}
                    </li>))}
                </ul>
              </div>
            </Card>

            {/* Mentor card */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-[#1F2937] font-display mb-4">About the Mentor</h2>
              <div className="flex items-start gap-4">
                <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover"/>
                <div>
                  <h3 className="font-bold text-[#1F2937] font-display">{mentor.name}</h3>
                  <p className="text-sm text-[#6B7280]">{mentor.department}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={mentor.rating}/>
                    <span className="text-xs text-[#9CA3AF]">· {mentor.sessions} sessions completed</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#374151] mt-4 leading-relaxed">{mentor.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {mentor.expertise.map(e => (<span key={e} className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold">{e}</span>))}
              </div>
              <Link to={`/mentors/${mentor.id}`} className="inline-block mt-4 text-sm font-semibold text-[#F97316]">
                View full profile →
              </Link>
            </Card>

            {/* Related */}
            {related.length > 0 && (<div>
                <h2 className="text-lg font-bold text-[#1F2937] font-display mb-4">Related Services</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map(s => (<Link to={`/services/${s.id}`} key={s.id}>
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <Badge variant="orange" className="mb-2">{s.category}</Badge>
                        <h3 className="font-bold text-sm text-[#1F2937] font-display mb-1">{s.name}</h3>
                        <p className="text-xs text-[#6B7280] mb-2">{s.mentorName}</p>
                        <span className="font-bold text-[#F97316]">৳{s.fee}</span>
                      </Card>
                    </Link>))}
                </div>
              </div>)}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Card className="p-6">
              <div className="text-3xl font-bold text-[#1F2937] font-display mb-1">৳{service.fee}</div>
              <p className="text-xs text-[#9CA3AF] mb-5">One-time session fee</p>
              <Button className="w-full" size="lg" onClick={handleBookClick}>
                {isLoggedIn ? "Book This Service" : "Sign in to Book"}
              </Button>
              <p className="text-xs text-center text-[#9CA3AF] mt-3">Payment secured via bKash escrow</p>
              <hr className="my-4 border-[#F3F4F6]"/>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Available</span>
                  <span className="font-semibold text-[#1F2937]">{mentor.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Session date</span>
                  <span className="font-semibold text-[#1F2937]">{service.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Time</span>
                  <span className="font-semibold text-[#1F2937]">{service.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Rating</span>
                  <span className="font-semibold text-[#1F2937]">⭐ {service.rating}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-100">
              <p className="text-xs text-blue-800 font-semibold mb-1">Secure Payment</p>
              <p className="text-xs text-blue-700">Your payment is held in escrow and released to the mentor only after session completion.</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            {!booked ? (<>
                <h2 className="text-lg font-bold text-[#1F2937] font-display mb-1">Book Session</h2>
                <p className="text-sm text-[#6B7280] mb-5">Confirm your booking for <strong>{service.name}</strong> with <strong>{mentor.name}</strong>.</p>

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#374151] mb-1.5">Preferred Date</label>
                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#374151] mb-1.5">Preferred Time</label>
                    <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]">
                      <option value="">Select a time slot</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] rounded-xl p-4 mb-5 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Service Fee</span>
                    <span className="font-semibold text-[#1F2937]">৳{service.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Platform Commission (5%)</span>
                    <span className="font-semibold text-[#1F2937]">৳{Math.round(service.fee * 0.05)}</span>
                  </div>
                  <hr className="border-[#E5E7EB]"/>
                  <div className="flex justify-between text-base">
                    <span className="font-bold text-[#1F2937]">Total</span>
                    <span className="font-bold text-[#F97316]">৳{service.fee + Math.round(service.fee * 0.05)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 flex gap-2">
                  <AlertTriangle size={15} className="text-blue-600 shrink-0 mt-0.5"/>
                  <p className="text-xs text-blue-700">Payment is held in escrow and released to the mentor only after you confirm session completion.</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowBookModal(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={handleConfirmBooking}>Confirm & Pay via bKash</Button>
                </div>
              </>) : (<div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500"/>
                </div>
                <h2 className="text-lg font-bold text-[#1F2937] font-display mb-2">Booking Confirmed!</h2>
                <p className="text-sm text-[#6B7280] mb-6">
                  Your session with <strong>{mentor.name}</strong> has been booked.
                  {selectedDate && selectedTime && ` Scheduled for ${selectedDate} at ${selectedTime}.`}
                  {" "}Payment is held in escrow until the session is complete.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowBookModal(false)}>Close</Button>
                  <Button className="flex-1" onClick={() => navigate("/bookings")}>View My Bookings</Button>
                </div>
              </div>)}
          </Card>
        </div>)}
    </div>);
}
