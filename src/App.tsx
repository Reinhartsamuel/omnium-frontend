import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SendToken from './pages/SendToken';
import WalletPage from './pages/dashboard/WalletPage';
import ActivityPage from './pages/dashboard/ActivityPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import Dashboard from './pages/dashboard';
import MerchantDashboard from './pages/MerchantDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Dashboard />} />
      <Route path="/app/send" element={<SendToken />} />
      <Route path="/app/wallet" element={<WalletPage />} />
      <Route path="/app/activity" element={<ActivityPage />} />
      <Route path="/app/settings" element={<SettingsPage />} />
      <Route path="/merchant" element={<MerchantDashboard />} />
    </Routes>
  )
}

export default App