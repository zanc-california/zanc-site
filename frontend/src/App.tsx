import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import GetInvolved from './pages/GetInvolved';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/get-involved" element={<Layout><GetInvolved /></Layout>} />
          <Route path="/news" element={<Layout><News /></Layout>} />
          <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/donate" element={<Layout><DonatePage /></Layout>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success" element={<Success />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;