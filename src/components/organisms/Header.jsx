import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "services", label: "Services", href: "#services" },
    { id: "about", label: "About Us", href: "#about" },
    { id: "why-us", label: "Why Choose Us", href: "#why-us" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleCallNow = () => {
    window.location.href = "tel:+15551234567";
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-sticky bg-white transition-all duration-normal",
          isScrolled && "shadow-card"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-header">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Wrench" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    RR HomeTech Services
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Appliance Service
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={cn(
                    "text-sm font-medium transition-colors duration-normal relative py-2",
                    activeSection === item.id 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Call Now Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleCallNow}
                variant="secondary"
                size="sm"
                icon="Phone"
                className="hidden sm:inline-flex"
              >
                Call Now
              </Button>
              
              <Button 
                onClick={handleCallNow}
                variant="secondary"
                size="sm"
                className="sm:hidden"
              >
                <ApperIcon name="Phone" className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-normal"
              >
                <ApperIcon 
                  name={isMenuOpen ? "X" : "Menu"} 
                  className="w-6 h-6 text-gray-700" 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-normal",
                      activeSection === item.id 
                        ? "bg-primary/10 text-primary" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-header" />
    </>
  );
};

export default Header;