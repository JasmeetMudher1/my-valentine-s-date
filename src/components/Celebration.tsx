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

        {/* Countdown */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card-gold rounded-3xl p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-valentine-gold" />
              <h2 className="font-display text-2xl text-valentine-deep-pink">
                Countdown to Valentine's Day
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-6">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Minutes' },
                { value: countdown.seconds, label: 'Seconds' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="glass-card rounded-2xl p-3 md:p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <motion.p
                    className="text-3xl md:text-5xl font-display text-valentine-deep-pink"
                    key={item.value}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.p>
                  <p className="text-xs md:text-sm font-body text-muted-foreground">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Date Itinerary */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-valentine-gold" />
            <h2 className="font-display text-3xl text-valentine-deep-pink">
              Our Date Night Plan
            </h2>
            <Sparkles className="w-6 h-6 text-valentine-gold" />
          </div>

          <div className="space-y-4">
            {dateItinerary.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card rounded-2xl p-5 flex items-center gap-4"
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + i * 0.15, type: 'spring' }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(350 100% 88%), hsl(43 75% 70%))',
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-body text-valentine-gold font-semibold">
                      {item.time}
                    </span>
                    <h3 className="font-display text-xl text-valentine-deep-pink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm font-body text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
