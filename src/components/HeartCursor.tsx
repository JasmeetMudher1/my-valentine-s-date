import React, { useEffect, useRef } from "react";

const HEART_EMOJI = "💖";

const HeartCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let moveCount = 0;
    const handleMove = (e: MouseEvent) => {
      moveCount++;
      if (moveCount % 6 !== 0) return; // Only create a heart every 6th event
      const heart = document.createElement("span");
      heart.textContent = HEART_EMOJI;
      heart.style.position = "fixed";
      heart.style.left = `${e.clientX - 10}px`;
      heart.style.top = `${e.clientY - 10}px`;
      heart.style.pointerEvents = "none";
      heart.style.fontSize = "1.5rem";
      heart.style.opacity = "0.8";
      heart.style.transition = "transform 0.8s, opacity 0.8s";
      heart.style.transform = `scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 60 - 30}deg)`;
      heart.style.zIndex = "9999";
      if (containerRef.current) {
        containerRef.current.appendChild(heart);
      } else {
        document.body.appendChild(heart);
      }
      setTimeout(() => {
        heart.style.opacity = "0";
        heart.style.transform += " translateY(-40px) scale(0.5)";
      }, 10);
      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, 800);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} />;
};

export default HeartCursor;
