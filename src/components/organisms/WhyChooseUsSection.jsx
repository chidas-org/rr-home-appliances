import { motion } from "framer-motion";
import FeatureCard from "@/components/molecules/FeatureCard";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: "Zap",
      title: "Fast Response",
      description: "Same day service with quick diagnosis and immediate repair solutions for your convenience."
    },
    {
      icon: "Shield",
      title: "Genuine Spare Parts",
      description: "We use only authentic manufacturer parts to ensure lasting repairs and optimal performance."
    },
    {
      icon: "Home",
      title: "Doorstep Service",
      description: "Professional technicians come to your home with all necessary tools and equipment."
    },
    {
      icon: "CheckCircle",
      title: "Warranty on Repairs",
      description: "All repairs come with warranty coverage for your peace of mind and protection."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RR HomeTech Services?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional service that exceeds your expectations. 
            Here's what sets us apart from the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;