import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";
import teamImage from "/images/team-image.jpg";
const AboutSection = () => {
  const stats = [
    { number: "7+", label: "Years Experience" },
    { number: "5000+", label: "Repairs Done" },
    { number: "24/7", label: "City-Wide Coverage" }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  RR HomeTech Services
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                With over 5 years of experience in home appliance repair, RR HomeTech Services has become 
                the trusted choice for homeowners across the city. Our team of certified technicians 
                specializes in repairing all major appliance brands with genuine spare parts and 
                industry-leading warranties.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We understand that appliance breakdowns can disrupt your daily routine. That's why 
                we offer same-day service, transparent pricing, and doorstep repairs to get your 
                appliances back to perfect working condition quickly and efficiently.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  number={stat.number}
                  label={stat.label}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-card overflow-hidden shadow-card"
          >
            <img src={teamImage} alt="About Background" className="absolute inset-0 w-full h-full object-cover brightness-50" />
            <div className="relative rounded-card overflow-hidden shadow-card">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  {/* <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-4xl">🔧</span>
                  </div> */}
                  <div className="text-white">
                    Professional Team
                    <br />
                    Expert Technicians
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-secondary rounded-full opacity-80" />
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent rounded-full opacity-60" />
            </div>
          </motion.div>
    
        </div>
      </div>
    </section>
  );
};

export default AboutSection;