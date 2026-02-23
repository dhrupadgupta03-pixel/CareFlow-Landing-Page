import React, { useState } from 'react';
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
  ComponentLibraryMobile
};

function App() {
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

export default App;
