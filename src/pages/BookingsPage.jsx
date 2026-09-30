import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Tabs, StatusBadge, Button, EmptyState } from "../components/ui";
import { bookings } from "../data/mockData";
import { AlertTriangle } from "lucide-react";
const tabs = [
    { id: "upcoming", label: "Upcoming", count: 1 },
    { id: "pending", label: "Pending", count: 1 },
    { id: "completed", label: "Completed", count: 1 },
    { id: "cancelled", label: "Cancelled", count: 0 },
];
export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const filtered = bookings.filter(b => {
        if (activeTab === "upcoming")
            return b.status === "confirmed";
        if (activeTab === "pending")
            return b.status === "pending";
        if (activeTab === "completed")
            return b.status === "completed";
        if (activeTab === "cancelled")
            return b.status === "cancelled";
        return true;
    });
    return (<DashboardLayout title="My Bookings" subtitle="Manage your mentor session bookings">
      <div className="mb-6">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab}/>
      </div>

      {filtered.length === 0 ? (<EmptyState icon="📅" title="No bookings yet" message="Browse available mentors and book your first session to get started." action={<Button>Browse Mentors</Button>}/>) : (<div className="space-y-4">
          {filtered.map(booking => (<Card key={booking.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-xl shrink-0">📋</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[#1F2937] font-display">{booking.service}</p>
                      <StatusBadge status={booking.status}/>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-0.5">with <span className="font-semibold text-[#1F2937]">{booking.mentor}</span></p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#9CA3AF]">
                      <span>📅 {booking.date}</span>
                      <span>⏰ {booking.time}</span>
                      <span>💰 ৳{booking.fee}</span>
                    </div>
                    {booking.notes && (<p className="text-xs text-[#9CA3AF] mt-1 italic">"{booking.notes}"</p>)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#9CA3AF]">Payment:</span>
                    <StatusBadge status={booking.paymentStatus}/>
                  </div>
                  <div className="flex gap-2">
                    {booking.status === "pending" && (<Button variant="danger" size="sm">Cancel</Button>)}
                    {booking.status === "confirmed" && (<Button size="sm" onClick={() => { setSelectedBooking(booking); setShowPaymentModal(true); }}>
                        Confirm Payment
                      </Button>)}
                    {booking.status === "completed" && booking.paymentStatus === "escrow" && (<Button size="sm" variant="outline">Dispute</Button>)}
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                </div>
              </div>
            </Card>))}
        </div>)}

      {/* Payment Modal */}
      {showPaymentModal && selectedBooking && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-[#1F2937] font-display mb-1">Confirm Payment</h2>
            <p className="text-sm text-[#6B7280] mb-5">Review your booking and confirm payment via bKash.</p>

            <div className="bg-[#FAFAF9] rounded-xl p-4 mb-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Service</span>
                <span className="font-semibold text-[#1F2937]">{selectedBooking.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Mentor</span>
                <span className="font-semibold text-[#1F2937]">{selectedBooking.mentor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Date & Time</span>
                <span className="font-semibold text-[#1F2937]">{selectedBooking.date} · {selectedBooking.time}</span>
              </div>
              <hr className="border-[#E5E7EB]"/>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Service Fee</span>
                <span className="font-semibold text-[#1F2937]">৳{selectedBooking.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Platform Commission (5%)</span>
                <span className="font-semibold text-[#1F2937]">৳{Math.round(selectedBooking.fee * 0.05)}</span>
              </div>
              <hr className="border-[#E5E7EB]"/>
              <div className="flex justify-between text-base">
                <span className="font-bold text-[#1F2937]">Total</span>
                <span className="font-bold text-[#F97316]">৳{selectedBooking.fee + Math.round(selectedBooking.fee * 0.05)}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 flex gap-2">
              <AlertTriangle size={15} className="text-blue-600 shrink-0 mt-0.5"/>
              <p className="text-xs text-blue-700">Payment is held securely in escrow and will be released to the mentor only after you confirm session completion.</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>Cancel</Button>
              <Button className="flex-1">Pay via bKash</Button>
            </div>
          </Card>
        </div>)}
    </DashboardLayout>);
}
