import { useState } from "react";
import Header from "@/components/organisms/Header";
import HeroSection from "@/components/organisms/HeroSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import AboutSection from "@/components/organisms/AboutSection";
import WhyChooseUsSection from "@/components/organisms/WhyChooseUsSection";
import ContactSection from "@/components/organisms/ContactSection";
import Footer from "@/components/organisms/Footer";
import WhatsAppFAB from "@/components/organisms/WhatsAppFAB";
import AdminDashboard from "@/components/organisms/AdminDashboard";

const HomePage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleAdminAccess = () => {
    setShowAdmin(true);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
  };

  if (showAdmin) {
    return <AdminDashboard onClose={handleCloseAdmin} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <ServicesSection onServiceSelect={handleServiceSelect} />
        <AboutSection />
        <WhyChooseUsSection />
        <ContactSection selectedService={selectedService} />
      </main>
      
      <Footer onAdminAccess={handleAdminAccess} />
      <WhatsAppFAB />
    </div>
  );
};

export default HomePage;