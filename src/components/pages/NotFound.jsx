import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 px-4"
      >
        <div className="space-y-4">
          <div className="text-8xl font-bold text-gray-200">404</div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Page Not Found</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/")} icon="Home">
            Back to Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "tel:+15551234567"}
            icon="Phone"
          >
            Call for Help
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-8 opacity-20 mt-12">
          <ApperIcon name="Wrench" className="w-8 h-8 text-primary" />
          <ApperIcon name="Settings" className="w-8 h-8 text-accent" />
          <ApperIcon name="Tool" className="w-8 h-8 text-secondary" />
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;