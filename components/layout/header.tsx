"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" 
          : "bg-transparent"
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
              isAtTop && isDarkMode ? "text-white" : "text-foreground"
            )}>KTProd Technology</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/tech" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isAtTop && isDarkMode ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Technology
            </Link>
            <Link 
              href="/about" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isAtTop && isDarkMode ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isAtTop && isDarkMode ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isAtTop && isDarkMode ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className={cn(
              "transition-colors",
              isAtTop && isDarkMode ? "text-white" : "text-foreground"
            )}>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-md transition-colors",
                isAtTop && isDarkMode ? "text-white hover:bg-white/20" : "text-foreground hover:bg-muted"
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/tech"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Technology
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
