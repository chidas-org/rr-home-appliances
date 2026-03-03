import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("card group text-center hover:border-primary/20", className)}
    >
      <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-normal">
        <ApperIcon name={icon} className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-display-md text-gray-900 mb-3 group-hover:text-primary transition-colors duration-normal">
        {title}
      </h3>
      <p className="text-body-base text-gray-600">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;