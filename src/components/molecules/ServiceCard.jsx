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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("card card-hover group", className)}
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-normal">
          {service.icon}
        </div>
        <h3 className="text-display-md text-gray-900 mb-3 group-hover:text-primary transition-colors duration-normal">
          {service.name}
        </h3>
        <p className="text-body-base text-gray-600 mb-6 line-clamp-2">
          {service.description}
        </p>
        <Button 
          onClick={handleBookNow}
          variant="secondary"
          className="w-full"
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;