import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-full bg-slate-100 opacity-50 z-10 flex items-center justify-center">
        <motion.div
        className="z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        >
        <motion.div
            className="w-12 h-12 border-8 border-green-400 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        </motion.div>
    </div>
  );
};

export default LoadingSpinner;
