import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TrustBadge = ({ 
  icon, 
  text, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-badge text-white text-sm font-medium",
        className
      )}
    >
      <ApperIcon name={icon} className="w-4 h-4 mr-2" />
      {text}
    </motion.div>
  );
};

export default TrustBadge;