import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';

interface SiteHeaderProps {
  currentView: 'marketing' | 'inquiries';
  onNavigate: (view: 'marketing' | 'inquiries') => void;
}

export default function SiteHeader({ currentView, onNavigate }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'marketing') {
      onNavigate('marketing');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <button
            onClick={() => {
              onNavigate('marketing');
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/tech-collective-logo.dim_512x512.png"
              alt="Tech Collective LLC"
              className="h-10 w-10"
            />
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tech Collective LLC
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            {identity && isAdmin && (
              <button
                onClick={() => onNavigate(currentView === 'inquiries' ? 'marketing' : 'inquiries')}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {currentView === 'inquiries' ? 'Back to Site' : 'View Inquiries'}
              </button>
            )}
            <LoginButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              {identity && isAdmin && (
                <button
                  onClick={() => {
                    onNavigate(currentView === 'inquiries' ? 'marketing' : 'inquiries');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  {currentView === 'inquiries' ? 'Back to Site' : 'View Inquiries'}
                </button>
              )}
              <div className="pt-2">
                <LoginButton />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

