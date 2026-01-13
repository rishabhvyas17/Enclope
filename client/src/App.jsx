import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShowroomPage from './pages/ShowroomPage';
import ForgePage from './pages/ForgePage';
import CruciblePage from './pages/CruciblePage';
import Footer from './components/Footer';
import JoinPage from './pages/JoinPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';
import TermsAndConditionsPage from './pages/TermsAndConditions';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-base">
      <ScrollToTop />
      <div className="blueprint-bg"></div>
      <Header />
      <main className="container mx-auto px-6 pt-32">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/forge" element={<ForgePage />} />
          <Route path="/about" element={<CruciblePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}