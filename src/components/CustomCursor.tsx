import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Hide the default cursor
  useEffect(() => {
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = originalCursor;
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "rgba(255, 105, 180, 0.7)", // pink
        border: "2px solid #D72660",
        pointerEvents: "none",
        zIndex: 10000,
        transform: "translate(-50%, -50%)",
        transition: "background 0.2s, border 0.2s, transform 0.08s",
        boxShadow: "0 2px 8px rgba(215,38,96,0.15)",
        mixBlendMode: "multiply",
      }}
    />
  );
};

export default CustomCursor;
