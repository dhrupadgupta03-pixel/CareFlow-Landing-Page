import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardDesktop from './components/Dashboard';
import PremiumDoctorDashboard from './components/PremiumDoctorDashboard';
import DashboardMobile from './components/DashboardMobile';
import ReceptionistDesktop from './components/ReceptionistDesktop';
import ReceptionistMobile from './components/ReceptionistMobile';
import AppointmentSelectionDesktop from './components/AppointmentSelectionDesktop';
import AppointmentSelectionMobile from './components/AppointmentSelectionMobile';
import LandingDesktop from './components/LandingDesktop';
import LandingMobile from './components/LandingMobile';
import ComponentLibraryMobile from './components/ComponentLibraryMobile';
import { MarketingSandbox } from './pages/MarketingSandbox';
import { LandingPage } from './pages/LandingPage';

const components = {
  DashboardDesktop,
  PremiumDoctorDashboard,
  DashboardMobile,
  ReceptionistDesktop,
  ReceptionistMobile,
  AppointmentSelectionDesktop,
  AppointmentSelectionMobile,
  LandingDesktop,
  LandingMobile,
  ComponentLibraryMobile,
  MarketingSandbox,
  LandingPage
};

function ScreenViewer() {
  const [current, setCurrent] = useState(null);

  if (current) {
    const Component = components[current];
    return (
      <div className="relative min-h-screen">
        <button
          onClick={() => setCurrent(null)}
          className="fixed bottom-2 right-2 z-[9999] bg-black text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Back to Menu
        </button>
        <Component />
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Screens</h1>
      {Object.keys(components).map(name => (
        <button
          key={name}
          onClick={() => setCurrent(name)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl shadow cursor-pointer text-left font-medium transition-colors"
        >
          {name}
        </button>
      ))}
    </div>
  );
}

// Wrapper for the Sandbox components to show a "Back to Hub" button
function FlowWrapper({ children, title }) {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-[9999] bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Hub
      </button>
      {children}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingSandbox />} />
      <Route path="/screens" element={<ScreenViewer />} />
      <Route path="/patient" element={
        <FlowWrapper title="Patient Flow">
          <AppointmentSelectionMobile />
        </FlowWrapper>
      } />
      <Route path="/receptionist" element={
        <FlowWrapper title="Receptionist Flow">
          <ReceptionistMobile />
        </FlowWrapper>
      } />
      <Route path="/doctor" element={
        <FlowWrapper title="Doctor Flow">
          <PremiumDoctorDashboard />
        </FlowWrapper>
      } />
    </Routes>
  );
}

export default App;
