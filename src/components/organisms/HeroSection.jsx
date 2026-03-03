import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import TrustBadge from "@/components/molecules/TrustBadge";
import heroBg from "/images/carousel-1.jpg";

const HeroSection = ({ onBookService, onCallNow }) => {
  const trustBadges = [
    { icon: "Clock", text: "Same Day Service" },
    { icon: "Award", text: "Certified Technicians" },
    { icon: "DollarSign", text: "Affordable Pricing" }
  ];

  const handleBookService = () => {
    const element = document.getElementById("contact");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    if (onBookService) {
      onBookService();
    }
  };

  const handleCallNow = () => {
    window.location.href = "tel:+919511634622";
    if (onCallNow) {
      onCallNow();
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br bg-slate-500  overflow-hidden"
    >
      <img src={heroBg} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover brightness-50" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight">
            Fast & Reliable{" "}
            <span className="bg-gradient-to-r from-orange-300 to-orange-100 bg-clip-text text-transparent">
              Home Appliance
            </span>{" "}
            Repair Service
          </h1>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Expert technicians for AC, Refrigerator, Washing Machine & More. 
            Same day service with genuine spare parts.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <Button 
              onClick={handleBookService}
              size="lg"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4"
              icon="Calendar"
            >
              Book a Service
            </Button>
            <Button 
              onClick={handleCallNow}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4"
              icon="Phone"
            >
              Call Now
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {trustBadges.map((badge, index) => (
              <TrustBadge
                key={badge.text}
                icon={badge.icon}
                text={badge.text}
                delay={0.7 + index * 0.1}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      
    </section>
  );
};

export default HeroSection;