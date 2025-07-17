
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoaderComponent() {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <motion.div
        className="flex flex-col items-center space-y-6 bg-white/10 backdrop-blur-lg px-10 py-8 rounded-2xl shadow-xl border border-white/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
        >
          <Loader className="w-16 h-16 text-white" strokeWidth={2.5} />
        </motion.div>
        <motion.p
          className="text-white text-lg font-semibold tracking-wide"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}