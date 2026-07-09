import { motion } from "framer-motion";
function AnalyticsCard({ title, value, icon }) {
  return (
    <motion.div
      className={`relative bg-primary-800 rounded-lg p-6 shadow-md overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-sm mb-1 font-semibold text-white">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
      </div>

      <div className="absolute inset-0 gradient-to-br from-primary-600 to-primary-900/30"></div>
      <div className="absolute -bottom-4 -right-4 ">{icon}</div>
    </motion.div>
  );
}

export default AnalyticsCard;
