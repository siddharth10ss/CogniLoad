import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { OnboardingModal } from './components/OnboardingModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { LoadingScreen } from './components/LoadingScreen';
import { usePersistence } from './hooks/usePersistence';
import { calculateCognitiveLoad } from './utils/cognitiveLoad';

function App() {
  const [tasks] = usePersistence('cogniload_tasks', []);
  const [backgroundLoad] = usePersistence('background_load_modifier', 0);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate total load for background reactivity
  const { totalLoad } = calculateCognitiveLoad(tasks, new Date(), backgroundLoad);

  // One-breath loading animation (1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show main app
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-text font-sans flex flex-col">
        <BackgroundAnimation totalLoad={totalLoad} />
        <OnboardingModal />
        <Header />
        <div className="flex-grow">
          <Dashboard />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
