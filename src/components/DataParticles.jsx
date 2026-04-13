import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DataParticles() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;

    const arr = Array.from({ length: particleCount }).map((_, i) => {
      const size = Math.random() * 6 + 4;
      const shapeType = Math.floor(Math.random() * 3);
      
      const isCircle = shapeType === 0;
      const isRotated = shapeType === 1;
      const isWide = shapeType === 2;

      return {
        id: i,
        left: Math.random() * 100 + "%",
        duration: Math.random() * 8 + 10, // 10 to 18 seconds for nice slow drift
        delay: Math.random() * 5,
        size: size,
        borderRadius: isCircle ? "50%" : "0",
        transform: isRotated ? "rotate(45deg)" : "none",
        width: isWide ? size * 2 : size,
        xAnim: Math.random() * 60 - 30, // slight horizontal drift
      };
    });
    setParticles(arr);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 5, /* Middle layer: Above base background, but safely under z-10 motion.main */
        pointerEvents: "none", 
        overflow: "hidden" 
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-50px",
            left: p.left,
            width: p.width,
            height: p.size,
            backgroundColor: "#FF0000",
            boxShadow: "0 0 6px rgba(255,0,0,0.6)",
            opacity: 0, /* initial opacity */
            borderRadius: p.borderRadius,
            transform: p.transform
          }}
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{ 
            y: -1500, 
            x: p.xAnim,
            opacity: [0, 0.3, 0] 
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
