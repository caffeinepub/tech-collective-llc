import { useState } from 'react';
import SiteHeader from './components/layout/SiteHeader';
import MarketingPage from './pages/MarketingPage';
import InquiriesPage from './pages/InquiriesPage';
import SiteFooter from './components/layout/SiteFooter';

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'inquiries'>('marketing');

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1">
        {currentView === 'marketing' ? <MarketingPage /> : <InquiriesPage />}
      </main>
      <SiteFooter />
    </div>
  );
}

