import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

const Envelope = ({ onOpen, isOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isOpen && (
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: -100 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-display text-valentine-deep-pink mb-8 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You have a special letter! 💌
          </motion.h1>

          <motion.div
            className="relative cursor-pointer perspective-1000"
            onClick={onOpen}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={isHovered ? {} : { rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.5, repeat: isHovered ? 0 : Infinity, repeatDelay: 2 }}
          >
            {/* Envelope Body */}
            <div className="relative w-72 h-48 md:w-96 md:h-64">
              {/* Back of envelope */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, hsl(350 100% 88%), hsl(350 80% 82%))',
                  boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3), 0 10px 30px rgba(255, 194, 209, 0.4)',
                }}
              />

              {/* Envelope flap (top triangle) */}
              <motion.div
                className="absolute -top-1 left-0 right-0 origin-top"
                style={{
                  height: '50%',
                  background: 'linear-gradient(180deg, hsl(350 100% 92%), hsl(350 100% 88%))',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  transformStyle: 'preserve-3d',
                }}
                animate={isHovered ? { rotateX: -30 } : { rotateX: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Seal */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, hsl(43 75% 52%), hsl(43 60% 45%))',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                </motion.div>
              </motion.div>

              {/* Inner content peek */}
              <div
                className="absolute inset-x-4 top-8 bottom-4 rounded bg-white/90 flex items-center justify-center"
                style={{
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                <p className="font-display text-lg md:text-xl text-valentine-deep-pink opacity-60">
                  Click to open...
                </p>
              </div>

              {/* Bottom fold lines */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{
                  background: 'linear-gradient(0deg, hsl(350 80% 80%), transparent)',
                  clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
                }}
              />
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              animate={{
                boxShadow: isHovered
                  ? '0 0 60px rgba(212, 175, 55, 0.6), 0 0 100px rgba(255, 194, 209, 0.4)'
                  : '0 0 0px transparent',
              }}
            />
          </motion.div>

          <motion.p
            className="mt-6 text-lg font-body text-valentine-deep-pink/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Tap the envelope to reveal your surprise ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;
