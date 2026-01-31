import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Utensils, Heart, Film, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  show: boolean;
}

const dateItinerary = [
  {
    time: '6:00 PM',
    title: 'Pick You Up',
    description: 'I\'ll be at your door with flowers 💐',
    icon: Heart,
  },
  {
    time: '6:30 PM',
    title: 'Romantic Dinner',
    description: 'Your favorite restaurant awaits',
    icon: Utensils,
  },
  {
    time: '8:30 PM',
    title: 'Sunset Walk',
    description: 'Hand in hand, just us',
    icon: MapPin,
  },
  {
    time: '9:30 PM',
    title: 'Movie Under Stars',
    description: 'Cozy blankets and your favorite film',
    icon: Film,
  },
];

const Celebration = ({ show }: CelebrationProps) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (show) {
      // Heart confetti explosion!
      const duration = 4000;
      const end = Date.now() + duration;

      const heartShape = confetti.shapeFromText({ text: '❤️', scalar: 2 });

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#FFC2D1', '#D4AF37', '#FF69B4', '#FFB6C1'],
          shapes: [heartShape, 'circle'],
          scalar: 1.2,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#FFC2D1', '#D4AF37', '#FF69B4', '#FFB6C1'],
          shapes: [heartShape, 'circle'],
          scalar: 1.2,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Big initial burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFC2D1', '#D4AF37', '#FF69B4', '#FFB6C1', '#FFD700'],
        shapes: [heartShape, 'circle', 'square'],
        scalar: 1.5,
      });

      frame();
    }
  }, [show]);

  useEffect(() => {
    const valentinesDay = new Date('2025-02-14T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = valentinesDay.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, hsl(60 100% 97%), hsl(350 80% 94%))',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen py-12 px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <motion.div
            className="text-6xl md:text-8xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display text-valentine-deep-pink mb-4">
            You Said Yes!!!
          </h1>
          <p className="text-xl md:text-2xl font-body text-valentine-deep-pink/80">
            Best decision ever! Here's what I have planned...
          </p>
        </motion.div>

        {/* Countdown and Date Itinerary removed as requested */}

        {/* Footer Message */}
        <motion.div
          className="text-center mt-16 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <p className="text-2xl md:text-3xl font-display text-valentine-deep-pink">
            Can't wait to spend Valentine's Day with you! 💕
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Celebration;
