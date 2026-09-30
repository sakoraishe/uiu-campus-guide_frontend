import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// Public pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import MentorsPage from "./pages/MentorsPage";
import MentorProfilePage from "./pages/MentorProfilePage";
import { NewsPage, EventsPage, AlertsPage, ResourcesPage, StoriesPage, AchievementsPage } from "./pages/PublicInfoPages";
// Auth
import { LoginPage, RegisterPage } from "./pages/AuthPages";
// Student
import StudentDashboard from "./pages/StudentDashboard";
import { CareerPage, RoadmapPage } from "./pages/CareerPages";
import BookingsPage from "./pages/BookingsPage";
import ProfilePage, { StudentSettingsPage } from "./pages/ProfilePage";
// Mentor
import { MentorDashboard, MentorServicesPage, MentorBookingsPage } from "./pages/MentorPanel";
import { MentorProfilePage as MentorOwnProfilePage, MentorStudentsPage, MentorEarningsPage, MentorPaymentsPage, MentorReviewsPage, MentorNotificationsPage, MentorSettingsPage, } from "./pages/MentorExtended";
// Faculty
import { FacultyDashboard } from "./pages/FacultyPanel";
// Admin
import { AdminDashboard, AdminMentorsPage, AdminServicesPage, AdminBookingsPage, AdminPaymentsPage, AdminHomeContentPage, } from "./pages/AdminPanel";
import { AdminUsersPage, AdminStudentsPage, AdminFacultyPage, AdminNewsPage, AdminEventsPage, AdminAlertsPage, AdminResourcesPage, AdminStoriesPage, AdminAchievementsPage, AdminDepartmentsPage, AdminReportsPage, AdminSettingsPage, } from "./pages/AdminExtended";
export default function App() {
    return (<AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />}/>
        <Route path="/services" element={<ServicesPage />}/>
        <Route path="/services/:id" element={<ServiceDetailPage />}/>
        <Route path="/mentors" element={<MentorsPage />}/>
        <Route path="/mentors/:id" element={<MentorProfilePage />}/>
        <Route path="/news" element={<NewsPage />}/>
        <Route path="/events" element={<EventsPage />}/>
        <Route path="/alerts" element={<AlertsPage />}/>
        <Route path="/resources" element={<ResourcesPage />}/>
        <Route path="/stories" element={<StoriesPage />}/>
        <Route path="/achievements" element={<AchievementsPage />}/>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>

        {/* Student */}
        <Route path="/dashboard" element={<StudentDashboard />}/>
        <Route path="/dashboard/career" element={<CareerPage />}/>
        <Route path="/roadmap/:careerName" element={<RoadmapPage />}/>
        <Route path="/bookings" element={<BookingsPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/settings" element={<StudentSettingsPage />}/>

        {/* Mentor */}
        <Route path="/mentor/dashboard" element={<MentorDashboard />}/>
        <Route path="/mentor/services" element={<MentorServicesPage />}/>
        <Route path="/mentor/bookings" element={<MentorBookingsPage />}/>
        <Route path="/mentor/profile" element={<MentorOwnProfilePage />}/>
        <Route path="/mentor/students" element={<MentorStudentsPage />}/>
        <Route path="/mentor/earnings" element={<MentorEarningsPage />}/>
        <Route path="/mentor/payments" element={<MentorPaymentsPage />}/>
        <Route path="/mentor/reviews" element={<MentorReviewsPage />}/>
        <Route path="/mentor/notifications" element={<MentorNotificationsPage />}/>
        <Route path="/mentor/settings" element={<MentorSettingsPage />}/>

        {/* Faculty */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />}/>

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
        <Route path="/admin/mentors" element={<AdminMentorsPage />}/>
        <Route path="/admin/services" element={<AdminServicesPage />}/>
        <Route path="/admin/bookings" element={<AdminBookingsPage />}/>
        <Route path="/admin/payments" element={<AdminPaymentsPage />}/>
        <Route path="/admin/home-content" element={<AdminHomeContentPage />}/>
        <Route path="/admin/users" element={<AdminUsersPage />}/>
        <Route path="/admin/students" element={<AdminStudentsPage />}/>
        <Route path="/admin/faculty" element={<AdminFacultyPage />}/>
        <Route path="/admin/news" element={<AdminNewsPage />}/>
        <Route path="/admin/events" element={<AdminEventsPage />}/>
        <Route path="/admin/alerts" element={<AdminAlertsPage />}/>
        <Route path="/admin/resources" element={<AdminResourcesPage />}/>
        <Route path="/admin/stories" element={<AdminStoriesPage />}/>
        <Route path="/admin/achievements" element={<AdminAchievementsPage />}/>
        <Route path="/admin/departments" element={<AdminDepartmentsPage />}/>
        <Route path="/admin/reports" element={<AdminReportsPage />}/>
        <Route path="/admin/settings" element={<AdminSettingsPage />}/>

        {/* Fallback */}
        <Route path="*" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>);
}
