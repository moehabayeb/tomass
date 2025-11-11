/**
 * Footer Component
 * Site-wide footer with legal links and copyright
 * Required for App Store compliance
 */

import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Tomas English. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:support@tomashoca.com"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Support
            </a>
          </div>

          {/* Website Link */}
          <div className="text-sm text-muted-foreground">
            <a
              href="https://tomashoca.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              tomashoca.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
