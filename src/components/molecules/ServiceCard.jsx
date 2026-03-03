import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";

const ServiceCard = ({ 
  service, 
  onBookNow, 
  className = "",
  delay = 0 
}) => {
  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(service);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} // Better for grids: animates when scrolled into view
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex flex-col h-full", 
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
          {service.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow">
          {service.description}
        </p>

        <Button 
          onClick={handleBookNow}
          variant="secondary"
          className="w-full mt-auto py-2.5"
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;