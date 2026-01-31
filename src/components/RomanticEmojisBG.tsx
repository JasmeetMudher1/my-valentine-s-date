import React from "react";
import { motion } from "framer-motion";

const emojis = [
  { emoji: "♥", className: "absolute top-10 left-10 text-6xl text-valentine-pink/30", animate: { rotate: [0, 10, -10, 0], y: [0, -10, 0] }, duration: 4, delay: 0 },
  { emoji: "✦", className: "absolute bottom-20 right-10 text-4xl text-valentine-gold/40", animate: { rotate: [0, -10, 10, 0], y: [0, 10, 0] }, duration: 3, delay: 0.5 },
  { emoji: "💖", className: "absolute top-24 right-16 text-5xl text-valentine-pink/40", animate: { y: [0, 20, 0], scale: [1, 1.2, 1] }, duration: 5, delay: 1 },
  { emoji: "💘", className: "absolute bottom-32 left-16 text-4xl text-valentine-gold/30", animate: { y: [0, -15, 0], scale: [1, 1.1, 1] }, duration: 4, delay: 2 },
  { emoji: "💝", className: "absolute top-1/2 left-1/4 text-5xl text-valentine-pink/20", animate: { x: [0, 10, -10, 0], rotate: [0, 10, -10, 0] }, duration: 6, delay: 1.5 },
  { emoji: "🌹", className: "absolute bottom-10 left-1/2 text-4xl text-valentine-gold/20", animate: { y: [0, 10, 0], scale: [1, 1.15, 1] }, duration: 5, delay: 2.5 },
  // Moving emojis (all float upwards)
  { emoji: "💌", className: "absolute left-0 bottom-0 text-4xl text-valentine-pink/30", animate: { y: [0, -window.innerHeight + 60] }, duration: 14, delay: 0 },
  { emoji: "💞", className: "absolute right-0 bottom-10 text-4xl text-valentine-gold/30", animate: { y: [0, -window.innerHeight + 80] }, duration: 16, delay: 2 },
  { emoji: "💑", className: "absolute left-1/2 bottom-0 text-4xl text-valentine-pink/20", animate: { y: [0, -window.innerHeight + 100] }, duration: 18, delay: 1 },
  { emoji: "🍫", className: "absolute right-1/3 bottom-0 text-4xl text-valentine-gold/20", animate: { y: [0, -window.innerHeight + 120] }, duration: 17, delay: 3 },
  { emoji: "😊", className: "absolute left-1/4 bottom-0 text-4xl text-valentine-pink/30", animate: { y: [0, -window.innerHeight + 90] }, duration: 15, delay: 2.5 },
];

const RomanticEmojisBG: React.FC = () => (
  <>
    {emojis.map((e, i) => (
      <motion.div
        key={i}
        className={e.className}
        animate={e.animate}
        transition={{ duration: e.duration, repeat: Infinity, delay: e.delay }}
        style={{ pointerEvents: "none", zIndex: 0 }}
      >
        {e.emoji}
      </motion.div>
    ))}
  </>
);

export default RomanticEmojisBG;
