"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      setIsAtTop(window.scrollY < window.innerHeight * 0.8); // Still in hero section
    };

    // Check dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkDarkMode);
    checkDarkMode(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkDarkMode);
    };
  }, []);

  // Apply white text on homepage when transparent, red accent on other pages
  const shouldUseWhiteText = isHomepage && isAtTop && !isMenuOpen;
  const shouldUseRedAccent = !isHomepage;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" 
            : isHomepage 
              ? "bg-transparent" 
              : "bg-background/95 backdrop-blur-sm border-b border-primary/20 shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">KT</span>
              </div>
              <span className={cn(
                "font-semibold text-lg",
                shouldUseWhiteText ? "text-white" : "text-foreground"
              )}>KTProd Technology</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/tech" 
                className={cn(
                  "text-sm font-medium transition-colors",
                  shouldUseWhiteText 
                    ? "text-white hover:text-white/80" 
                    : shouldUseRedAccent 
                      ? "text-primary hover:text-primary/80" 
                      : "text-foreground hover:text-primary"
                )}
              >
                Technology
              </Link>
              <Link 
                href="/about" 
                className={cn(
                  "text-sm font-medium transition-colors",
                  shouldUseWhiteText 
                    ? "text-white hover:text-white/80" 
                    : shouldUseRedAccent 
                      ? "text-primary hover:text-primary/80" 
                      : "text-foreground hover:text-primary"
                )}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className={cn(
                  "text-sm font-medium transition-colors",
                  shouldUseWhiteText 
                    ? "text-white hover:text-white/80" 
                    : shouldUseRedAccent 
                      ? "text-primary hover:text-primary/80" 
                      : "text-foreground hover:text-primary"
                )}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className={cn(
                  "text-sm font-medium transition-colors",
                  shouldUseWhiteText 
                    ? "text-white hover:text-white/80" 
                    : shouldUseRedAccent 
                      ? "text-primary hover:text-primary/80" 
                      : "text-foreground hover:text-primary"
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className={cn(
                "transition-colors",
                shouldUseWhiteText ? "text-white" : "text-foreground"
              )}>
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "md:hidden p-2 rounded-md transition-colors",
                  shouldUseWhiteText ? "text-white hover:bg-white/20" : "text-foreground hover:bg-muted"
                )}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu - full screen slide from right */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Full screen menu panel */}
          <div className={cn(
            "absolute top-0 right-0 h-full w-full transform transition-transform duration-300 ease-in-out",
            shouldUseWhiteText 
              ? "bg-black/95" 
              : "bg-background"
          )}>
            <div className="flex flex-col h-full justify-center">
              {/* Close button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "p-3 rounded-md transition-colors",
                    shouldUseWhiteText ? "text-white hover:bg-white/20" : "text-foreground hover:bg-muted"
                  )}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Menu content - centered */}
              <nav className="px-8 space-y-6">
                <Link
                  href="/tech"
                  className={cn(
                    "text-2xl font-medium transition-colors px-6 py-4 rounded-md block text-center",
                    shouldUseWhiteText 
                      ? "text-white hover:bg-white/20" 
                      : "text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Technology
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "text-2xl font-medium transition-colors px-6 py-4 rounded-md block text-center",
                    shouldUseWhiteText 
                      ? "text-white hover:bg-white/20" 
                      : "text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    "text-2xl font-medium transition-colors px-6 py-4 rounded-md block text-center",
                    shouldUseWhiteText 
                      ? "text-white hover:bg-white/20" 
                      : "text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-2xl font-medium transition-colors px-6 py-4 rounded-md block text-center",
                    shouldUseWhiteText 
                      ? "text-white hover:bg-white/20" 
                      : "text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
