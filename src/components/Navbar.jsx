import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, BookOpen, User } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    // Navigate to login page - you would use React Router here
    window.location.href = '/login';
  };

  const handleSignup = () => {
    // Navigate to signup page - you would use React Router here  
    window.location.href = '/signup';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Handle logout logic here
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-primary">
              <GraduationCap className="w-6 h-6" />
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/courses"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Browse Courses
            </a>
            <a
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLogin}>
                  Login
                </Button>
                <Button size="sm" onClick={handleSignup}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              <a
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/courses"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Courses
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full" onClick={handleLogin}>
                      Login
                    </Button>
                    <Button size="sm" className="w-full" onClick={handleSignup}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};