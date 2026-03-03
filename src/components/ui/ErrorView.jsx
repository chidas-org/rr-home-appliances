import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ErrorView;