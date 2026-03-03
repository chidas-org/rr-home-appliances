import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/molecules/ServiceCard";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { serviceService } from "@/services/api/serviceService";

const ServicesSection = ({ onServiceSelect }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceService.getAll();
      setServices(result);
    } catch (err) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleBookNow = (service) => {
    // Scroll to contact form
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
    
    // Notify parent component
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  if (loading) return <Loading className="py-20" />;
  if (error) return <ErrorView message={error} onRetry={loadServices} className="py-20" />;
  if (!services.length) return <Empty title="No Services Available" onAction={loadServices} className="py-20" />;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Our Expert{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Repair Services
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional appliance repair and maintenance services for all major brands. 
            Quick diagnosis, genuine parts, and reliable solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.Id}
              service={service}
              onBookNow={handleBookNow}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;