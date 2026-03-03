import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  number, 
  label, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn("text-center", className)}
    >
      <div className="text-2xl font-bold text-primary mb-1">
        {number}
      </div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;