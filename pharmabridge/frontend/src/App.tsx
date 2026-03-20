import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import MedicineSearch from './pages/MedicineSearch';
import PharmacyDashboard from './pages/admin/PharmacyDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/search" element={<MedicineSearch />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['PHARMACY_ADMIN']}>
              <Routes>
                <Route path="dashboard" element={<PharmacyDashboard />} />
                <Route path="inventory" element={<div className="p-8">Admin Inventory Page (WIP)</div>} />
                <Route path="orders" element={<div className="p-8">Admin Orders Page (WIP)</div>} />
                <Route path="settings" element={<div className="p-8">Admin Settings Page (WIP)</div>} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
