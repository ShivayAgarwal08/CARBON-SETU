import { useState, useRef } from 'react';
import LandingSection from './components/LandingSection';
import LoginSection from './components/LoginSection';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <LandingSection onLaunchDashboard={scrollToDashboard} />
      
      <div ref={dashboardRef}>
        {!isLoggedIn ? (
          <LoginSection onLogin={handleLogin} />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

export default App;
