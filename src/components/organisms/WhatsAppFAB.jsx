import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const WhatsAppFAB = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I need help with my home appliance. Can you assist me?");
    const phoneNumber = "919511634622"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-sticky">
      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-card hover:shadow-card-hover flex items-center justify-center transition-all duration-normal group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ApperIcon name="MessageCircle" className="w-7 h-7" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:hidden" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 5 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 10, y: 5 }}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-tooltip"
          >
            Chat with us on WhatsApp
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppFAB;