import React from 'react';
import Navbar from '../../components/dashboard/Navbar';
import BottomBar from '../../components/dashboard/BottomBar';

function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Settings</h1>
          {/* Add settings content here */}
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default SettingsPage;