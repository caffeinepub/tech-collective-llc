import { Heart } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2026. Built with</span>
            <Heart className="h-4 w-4 fill-primary text-primary" />
            <span>using</span>
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-display font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tech Collective LLC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

