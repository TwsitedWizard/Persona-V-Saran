import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxPanels() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div
      className="hidden md:block"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <motion.div
        style={{
          y: y1,
          position: "absolute",
          left: "-100px",
          top: "20%",
          width: "400px",
          height: "600px",
          background: "rgba(255,0,0,0.08)",
          filter: "blur(80px)",
          clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
        }}
      />

      <motion.div
        style={{
          y: y2,
          position: "absolute",
          right: "-100px",
          top: "40%",
          width: "400px",
          height: "600px",
          background: "rgba(255,0,0,0.08)",
          filter: "blur(80px)",
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 90%)",
        }}
      />
    </div>
  );
}
