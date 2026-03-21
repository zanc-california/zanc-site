import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import Gallery from './pages/Gallery';
import Membership from './pages/Membership';
import Insurance from './pages/Insurance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import Community from './pages/Community';
import GetInvolved from './pages/GetInvolved';
import Initiatives from './pages/Initiatives';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminNews from './admin/AdminNews';
import AdminGallery from './admin/AdminGallery';
import AdminSuggestions from './admin/AdminSuggestions';
import AdminOpportunities from './admin/AdminOpportunities';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/news/article/:slug" element={<Layout><NewsArticle /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/membership" element={<Layout><Membership /></Layout>} />
        <Route path="/insurance" element={<Layout><Insurance /></Layout>} />
        <Route path="/community" element={<Layout><Community /></Layout>} />
        <Route path="/get-involved" element={<Layout><GetInvolved /></Layout>} />
        <Route path="/initiatives" element={<Layout><Initiatives /></Layout>} />
        <Route path="/forms" element={<Navigate to="/membership" replace />} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/donate" element={<Layout><DonatePage /></Layout>} />
        <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />
        <Route path="/payment-cancel" element={<Layout><PaymentCancelled /></Layout>} />

        {/* Admin — layout guards auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/news" element={<AdminLayout><AdminNews /></AdminLayout>} />
        <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
        <Route path="/admin/suggestions" element={<AdminLayout><AdminSuggestions /></AdminLayout>} />
        <Route path="/admin/opportunities" element={<AdminLayout><AdminOpportunities /></AdminLayout>} />

        {/* Legacy redirects */}
        <Route path="/success" element={<Navigate to="/payment-success" replace />} />
        <Route path="/cancel" element={<Navigate to="/payment-cancel" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
