/**
 * NotFoundPage — 404 page with animation and navigation.
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <motion.h1
          className="text-8xl font-bold gradient-text"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.h1>
        <p className="text-text-secondary text-lg mt-4">
          This page doesn't exist.
        </p>
        <p className="text-text-tertiary text-sm mt-1">
          Maybe the workflow you're looking for is elsewhere.
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            icon={Home}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
