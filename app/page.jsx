"use client";

import { Suspense, createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Calculator, Coffee, Facebook, FileCode, Github, IdCard, Image as ImageIcon, Instagram, Linkedin, Mail, MapPin, MessageSquare, Palette, QrCode, RotateCw, Send, ShieldCheck, Sparkles, Type, User, WandSparkles, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendEmail } from "./actions";
import {
  achievementItems,
  bookshelfItems,
  contactContent,
  certificateItems,
  educationItems,
  experienceItems,
  galleryItems,
  heroContent,
  navItems,
  socialLinks,
  softwareProjects,
  toolkitGroups,
  toolkitItems,
  videoShowcaseGroups,
} from "../lib/site-data";

const easeOutQuint = (value) => 1 - Math.pow(1 - value, 5);
const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

const toolkitIconMap = {
  Calculator,
  FileCode,
  IdCard,
  ImageIcon,
  MapPin,
  Palette,
  QrCode,
  RotateCw,
  ShieldCheck,
};

const toolIconConfig = {
  "identity-lookup": {
    accent: ["#e5e5e5", "#f5f5f5"],
    glow: "#ffffff",
    variant: "lookup",
  },
  "creative-productivity": {
    accent: ["#f2f2f2", "#ffffff"],
    glow: "#d4d4d8",
    variant: "creative",
  },
  "security-finance": {
    accent: ["#e2e8f0", "#f8fafc"],
    glow: "#94a3b8",
    variant: "security",
  },
};

function getVideoEmbedUrl(url) {
  if (!url) return null;

  const normalizedUrl = String(url).trim();
  const isFacebookUrl = normalizedUrl.includes("facebook.com") || normalizedUrl.includes("fb.watch");
  const isTikTokUrl = normalizedUrl.includes("tiktok.com");

  if (isFacebookUrl) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(normalizedUrl)}&show_text=false&width=560&autoplay=1&mute=1`;
  }

  if (isTikTokUrl) {
    const videoIdMatch = normalizedUrl.match(/\/video\/(\d+)/i);
    if (!videoIdMatch) return null;
    return `https://www.tiktok.com/embed/v2/${videoIdMatch[1]}`;
  }

  return null;
}

function smoothScrollTo(id) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;

  const offset = 92;
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY - offset;
  const distance = target - start;
  const duration = 1050;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuint(progress);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SectionIntro({ eyebrow, title, text, theme = "light", className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`text-[11px] font-bold uppercase tracking-[0.3em] ${theme === "dark" ? "text-gold/80" : "text-gold"}`}
      >
        {eyebrow}
      </motion.p>
      <h2 className={`font-display mt-5 text-[clamp(2.2rem,5vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.08em] ${theme === "dark" ? "text-white" : "text-ink"}`}>
        <SplitText text={title} delay={0.1} />
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className={`mt-6 text-[15px] leading-8 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} md:text-[17px]`}
      >
        {text}
      </motion.p>
    </div>
  );
}

function SplitText({ text, delay = 0, reduceMotion }) {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  if (reduceMotion) return <span>{text}</span>;

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
      style={{ perspective: 600 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block whitespace-pre"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

const SectionReveal = forwardRef(({ children, className = "", delay = 0, id }, ref) => {
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
});
SectionReveal.displayName = "SectionReveal";



const DepthContext = createContext({ x: 0, y: 0 });

function ToolIconMesh({ variant, hovered, pointer, reduceMotion }) {
  const groupRef = useRef(null);
  const lensRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Default rotation + hover speedup
    const spinSpeed = hovered ? 1.85 : 0.42;
    groupRef.current.rotation.y += delta * spinSpeed;
    
    // Smooth tilt reaction to pointer
    groupRef.current.rotation.x = reduceMotion ? 0.16 : 0.16 + (pointer.y * 0.28);
    groupRef.current.rotation.z = reduceMotion ? 0 : pointer.x * 0.12;

    // Hover scale bounce effect
    const targetScale = hovered ? 1.14 : 1;
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.14;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.14;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.14;
  });

  return (
    <Float speed={reduceMotion ? 0 : hovered ? 3.2 : 1.6} rotationIntensity={reduceMotion ? 0 : hovered ? 1.2 : 0.45} floatIntensity={reduceMotion ? 0 : 0.85}>
      <group ref={groupRef}>
        {variant === "lookup" ? (
          <>
            {/* Magnifier Lens - Glass Effect */}
            <mesh position={[0, 0, 0]} ref={lensRef}>
              <cylinderGeometry args={[0.55, 0.55, 0.08, 32]} />
              <MeshTransmissionMaterial
                backside
                samples={6}
                thickness={0.65}
                roughness={0.04}
                chromaticAberration={0.06}
                anisotropy={0.15}
                distortion={0.2}
                distortionScale={0.3}
                temporalDistortion={0.1}
                color="#fdfcf8"
              />
            </mesh>
            {/* Magnifier Frame */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.56, 0.06, 24, 64]} />
              <meshStandardMaterial color="#d7b37b" metalness={0.92} roughness={0.12} />
            </mesh>
            {/* Magnifier Handle */}
            <mesh position={[0.62, -0.62, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.07, 0.07, 0.72, 16]} />
              <meshStandardMaterial color="#d7b37b" metalness={0.95} roughness={0.08} />
            </mesh>
          </>
        ) : null}

        {variant === "creative" ? (
          <>
            {/* Abstract Glass Shape */}
            <mesh rotation={[0.8, 0.4, 0.3]}>
              <torusKnotGeometry args={[0.38, 0.12, 200, 32, 2, 3]} />
              <MeshTransmissionMaterial
                backside
                samples={6}
                thickness={0.8}
                roughness={0.12}
                chromaticAberration={0.08}
                anisotropy={0.2}
                color="#f4e6db"
              />
            </mesh>
            {/* Orbital Rings - Metallic */}
            <group rotation={[Math.PI / 4, 0, 0]}>
               <mesh>
                 <torusGeometry args={[0.78, 0.025, 16, 120]} />
                 <meshStandardMaterial color="#c88f6f" metalness={0.85} roughness={0.1} />
               </mesh>
            </group>
            <group rotation={[-Math.PI / 3, 0.4, 0.2]}>
               <mesh>
                 <torusGeometry args={[0.72, 0.018, 16, 100]} />
                 <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.05} />
               </mesh>
            </group>
          </>
        ) : null}

        {variant === "security" ? (
          <>
            {/* Security Cube - Metallic/Geometric */}
            <RoundedBox args={[0.82, 0.82, 0.82]} radius={0.12} smoothness={5}>
              <meshStandardMaterial color="#eef2f7" metalness={0.88} roughness={0.08} />
            </RoundedBox>
            {/* Protection Shield Overlay - Glass */}
            <mesh position={[0, 0, 0.52]} scale={[0.68, 0.84, 0.15]}>
              <cylinderGeometry args={[0.6, 0.45, 0.18, 6]} />
              <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={0.5}
                roughness={0.05}
                chromaticAberration={0.03}
                color="#f0f9ff"
              />
            </mesh>
            {/* Core Glow */}
            <mesh scale={0.4}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#89a0bd" emissive="#89a0bd" emissiveIntensity={2} toneMapped={false} />
            </mesh>
          </>
        ) : null}
      </group>
    </Float>
  );
}

function ToolIconScene({ groupId, hovered, reduceMotion, pointer }) {
  const config = toolIconConfig[groupId] || toolIconConfig["identity-lookup"];

  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 34 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[2.2, 2.6, 2.8]} intensity={hovered ? 3.4 : 2.6} color={config.glow} />
      <pointLight position={[-2, -1.5, 1.5]} intensity={hovered ? 16 : 10} color={config.accent[0]} />
      <spotLight position={[0, 2.4, 4]} angle={0.36} penumbra={1} intensity={hovered ? 18 : 10} color="#ffffff" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ToolIconMesh variant={config.variant} hovered={hovered} pointer={pointer} reduceMotion={reduceMotion} />
      </Suspense>
    </Canvas>
  );
}

function TiltCard({ children, className = "", reduceMotion }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 22 });
  const springY = useSpring(y, { stiffness: 150, damping: 22 });

  // Parallax offsets (Inverse depth)
  const parallaxX = useTransform(x, [-12, 12], [4, -4]); 
  const parallaxY = useTransform(y, [-12, 12], [4, -4]);

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const rotateX = ((clientY - centerY) / (height / 2)) * -12;
    const rotateY = ((clientX - centerX) / (width / 2)) * 12;
    x.set(rotateX);
    y.set(rotateY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className={`group/tilt ${className}`}
    >
      <DepthContext.Provider value={{ x: parallaxX, y: parallaxY }}>
        {children}
      </DepthContext.Provider>
    </motion.div>
  );
}

function MagneticWrapper({ children, intensity = 0.15, reduceMotion }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * intensity);
    y.set(distanceY * intensity);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function HeroSpotlight({ reduceMotion }) {
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-1000 group-hover:opacity-70"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(199, 165, 84, 0.08), transparent 80%)`
        ),
      }}
    />
  );
}

function RoleRoller({ roles, reduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || roles.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduceMotion, roles]);

  return (
    <div className="mt-5 flex items-start gap-5">
      <span className="mt-4 hidden h-px w-12 bg-gold/60 md:block" />
      <div className="relative h-[5.25rem] overflow-hidden md:h-[6.25rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={roles[activeIndex].join("-")}
            initial={reduceMotion ? { opacity: 1 } : { y: 42, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: -42, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[clamp(1.42rem,2.7vw,2.35rem)] font-semibold leading-[1.14] tracking-[-0.06em] text-zinc-700"
          >
                        {roles[activeIndex].map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AchievementCard({ item, index, onOpen, reduceMotion }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = item.images || (item.image ? [item.image] : []);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (reduceMotion || !hasMultipleImages) return undefined;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [reduceMotion, hasMultipleImages, images.length]);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      variants={staggerItem}
      whileHover={{ y: -8, z: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
    >
      {images.length > 0 ? (
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <div className="relative overflow-hidden rounded-[14px] bg-zinc-50 aspect-[3/4]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImage]}
                  alt={`${item.title} image ${activeImage + 1}`}
                  fill
                  sizes="(min-width: 1280px) 15vw, (min-width: 768px) 45vw, 92vw"
                  className="object-contain object-center"
                />
              </motion.div>
            </AnimatePresence>
            
            {hasMultipleImages && (
              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? "w-3 bg-gold" : "w-1 bg-zinc-300/50"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
      
      <div className="flex flex-col flex-grow [transform:translateZ(20px)]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {item.year}
        </p>
        <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
          {item.title}
        </h4>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 text-balance">
          {item.subtitle}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/70">
          Open Preview
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.button>
    </TiltCard>
  );
}



function FloatingIconsCloud({ items, reduceMotion, glitch }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[280px] w-full overflow-hidden md:h-full"
    >
      {items.map((item, i) => (
        <IconBubble 
          key={item.name + i} 
          iconName={item.icon} 
          mousePos={mousePos}
          reduceMotion={reduceMotion}
          index={i}
          glitch={glitch}
        />
      ))}
    </div>
  );
}

function IconBubble({ iconName, mousePos, reduceMotion, index, glitch }) {
  const x = useMotionValue(Math.random() * 400);
  const y = useMotionValue(Math.random() * 200 + 40);
  const outX = useSpring(x, { damping: 20, stiffness: 80 });
  const outY = useSpring(y, { damping: 20, stiffness: 80 });
  const Icon = toolkitIconMap[iconName] || FileCode;

  useAnimationFrame(() => {
    if (reduceMotion) return;
    
    // Natural drift
    const time = Date.now() * 0.001;
    const driftX = Math.sin(time + index) * 0.35;
    const driftY = Math.cos(time * 0.8 + index) * 0.3;
    
    // Calc distance to mouse
    const dx = x.get() - mousePos.x;
    const dy = y.get() - mousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 120) {
      const power = (120 - dist) / 120;
      x.set(x.get() + (dx / dist) * 8 * power);
      y.set(y.get() + (dy / dist) * 8 * power);
    } else {
      // Stay within bounds roughly
      if (x.get() < 0) x.set(400);
      if (x.get() > 500) x.set(0);
      if (y.get() < 0) y.set(300);
      if (y.get() > 300) y.set(0);
      
      x.set(x.get() + driftX);
      y.set(y.get() + driftY);
    }
  });

  return (
    <motion.div
      style={{ x: outX, y: outY }}
      animate={glitch ? { x: [outX.get(), outX.get() + 2, outX.get() - 2, outX.get()], opacity: [0.8, 0.4, 0.8] } : {}}
      className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-xl glass-soft backdrop-blur-md md:h-16 md:w-16"
    >
      <Icon className="h-5 w-5 md:h-6 md:w-6 opacity-80" strokeWidth={1.5} />
    </motion.div>
  );
}

function LightFollower({ springX, springY }) {
  const lightRef = useRef();
  
  useFrame(() => {
    if (!lightRef.current) return;
    // Map spring coordinates to R3F world coordinates (roughly)
    const x = (springX.get() / 1380) * 10 - 5;
    const y = -(springY.get() / 800) * 5 + 2.5;
    lightRef.current.position.set(x, y, 2.5);
  });

  return <pointLight ref={lightRef} intensity={2.5} color="#ffffff" />;
}

function ToolkitHeroCard({ reduceMotion }) {
  const allIcons = toolkitGroups.flatMap(g => g.items);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 180 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const textX = useTransform(springX, [0, 1380], [reduceMotion ? 0 : 8, reduceMotion ? 0 : -8]);
  const textY = useTransform(springY, [0, 800], [reduceMotion ? 0 : 8, reduceMotion ? 0 : -8]);

  return (
    <SectionReveal id="toolkit" className="scroll-mt-28 px-4 pt-20 pb-24 md:px-6 md:pt-24 md:pb-0">
      <motion.a
        href="/tools"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.002 }}
        className="group relative mx-auto block max-w-[1380px] overflow-hidden rounded-[42px] bg-ink shadow-2xl shadow-black/40 transition-shadow duration-700 hover:shadow-white/5 transform-gpu isolation-isolate"
      >
        {/* Elite Aura Shimmer (Soft Wide Prism) */}
        <motion.div
          animate={{ x: ["-150%", "250%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.1] blur-[50px] bg-gradient-to-r from-transparent via-white to-transparent transform-gpu translate-z-0"
        />

        {/* Luminous Silver-Flow Border */}
        <div className="absolute inset-[0.5px] z-20 pointer-events-none rounded-[42px] overflow-hidden transform-gpu translate-z-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute left-[-50%] top-[-50%] h-[200%] w-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
          />
        </div>

        {/* Liquid Gravity Glow (Pure White/Silver) */}
        <motion.div
          style={{
            left: springX,
            top: springY,
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)",
          }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-0 h-[700px] w-[700px] rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 blur-[48px] transform-gpu translate-z-0"
        />

        <div className="noise-mask opacity-10" />
        
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:min-h-[640px]">
          {/* Left Content */}
          <motion.div 
            style={{ x: textX, y: textY }}
            className="p-10 md:p-14 lg:p-20 flex flex-col justify-center"
          >
            <motion.span
              variants={staggerItem}
              className="inline-flex items-center gap-2 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 glass-soft overflow-hidden"
            >
              <Sparkles className="h-4 w-4" />
              Comprehensive Toolkit
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.span>
            
            <h2 className="font-display mt-10 text-balance text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-white">
              Build something <br />
              <span className="text-white/60 group-hover:text-white transition-colors duration-1000">modern, premium,</span> <br />
              and useful.
            </h2>
            
            <p className="mt-8 max-w-xl text-balance text-[15px] leading-[1.8] text-white/50 transition-colors duration-1000 group-hover:text-white/70 md:text-[17px]">
              From specialized utilities to creative builders, every tool is crafted with a focus on high-fidelity presentation, smooth interaction, and practical depth.
            </p>

            <div className="mt-12 flex items-center gap-4 group/btn">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-white/40 group-hover:text-white/90 transition-colors">Explore Collection</span>
              <motion.div 
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowUpRight className="h-5 w-5 text-white/60" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Motion Zone (Restored and Enhanced) */}
          <div className="relative h-[440px] border-t border-white/10 md:h-[500px] lg:h-full lg:border-t-0 lg:border-l overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-60">
               <Canvas 
                 camera={{ position: [0, 0, 5] }}
                 flat 
                 dpr={[1, 1.5]} // Limit pixel ratio for performance
               >
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Environment preset="city" />
                  <LightFollower springX={springX} springY={springY} />
                  <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
                    <mesh position={[0, 0, 0]}>
                      <torusKnotGeometry args={[1.3, 0.45, 128, 32]} />
                      <MeshTransmissionMaterial 
                        backside={false} // Disable backside for 2x performance
                        thickness={0.5} 
                        roughness={0.05} 
                        chromaticAberration={0.02} 
                        transmission={0.9}
                        reflectivity={0.3}
                        color="#f8f8f8" 
                      />
                    </mesh>
                  </Float>
               </Canvas>
            </div>
            <div className="absolute inset-0 z-10 p-6 md:p-14">
               <FloatingIconsCloud items={allIcons} reduceMotion={reduceMotion} glitch={false} />
            </div>
          </div>
        </div>
      </motion.a>
    </SectionReveal>
  );
}

function ToolkitSelection({ reduceMotion, onOpen }) {
  return (
    <SectionReveal id="tools-grid" className="scroll-mt-28 px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:text-left">
          <h3 className="font-display text-4xl font-semibold tracking-[-0.04em] text-ink md:text-5xl">
            Toolkit Selection
          </h3>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-500 md:text-[18px]">
            A specialized collection of utilities built for speed, visual clarity, 
            and everyday technical productivity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {toolkitItems.map((tool, index) => (
             <motion.a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                className="group border-glow-luminous holographic-grain relative flex flex-col overflow-hidden rounded-[32px] bg-white/68 p-6 glass-soft transition-all duration-500 hover:shadow-2xl"
             >
                <div className="flex items-start justify-between">
                   <div 
                      className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm border border-black/5"
                      style={{ background: tool.accent }}
                   >
                      <div className="noise-mask opacity-10" />
                      {(() => {
                        const Icon = toolkitIconMap[tool.icon] || FileCode;
                        return <Icon className="h-6 w-6 text-ink/70" strokeWidth={1.5} />;
                      })()}
                   </div>
                   <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                      {tool.shortCode}
                   </span>
                </div>
                
                <div className="mt-8">
                   <h4 className="font-display text-[22px] font-semibold tracking-[-0.03em] text-ink">
                      {tool.name}
                   </h4>
                   <p className="mt-3 text-[14px] leading-6 text-zinc-500">
                      {tool.description}
                   </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 group-hover:text-ink transition-colors">
                      Open Tool
                   </span>
                   <ArrowUpRight className="h-4 w-4 text-zinc-300 group-hover:text-ink transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
             </motion.a>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <a 
             href="/tools" 
             className="flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-black active:scale-95 transition-all"
           >
             View Extensive Toolkit
             <ArrowUpRight className="h-4 w-4" />
           </a>
        </div>
      </div>
    </SectionReveal>
  );
}

function ProjectCard({ project, index, onOpen, reduceMotion }) {
  const canPreview = Boolean(project.shots?.length);
  const imageClassName = project.imageContain ? "object-contain p-3" : "object-cover";
  const { x: parallaxX, y: parallaxY } = useContext(DepthContext);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group border-glow-luminous holographic-grain relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <motion.div 
            style={{ x: parallaxX, y: parallaxY }}
            className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-zinc-50 border border-black/5"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 768px) 45vw, 92vw"
                className={`${imageClassName} transition-transform duration-700 group-hover/image:scale-[1.05]`}
              />
            ) : (
               <div className="flex h-full items-center justify-center bg-white/40">
                <span className="text-4xl">{project.icon || "💻"}</span>
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {project.status || "Project"}
            </span>
          </motion.div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            {project.type || "Software Development"}
          </p>
          <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
            {project.name}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500 text-balance">
            {project.description}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              {canPreview ? "Open Preview" : "View Details"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function GalleryCard({ item, index, onOpen, reduceMotion }) {
  const hasImage = Boolean(item.image);
  const { x: parallaxX, y: parallaxY } = useContext(DepthContext);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(item)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group border-glow-luminous holographic-grain relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <motion.div 
            style={{ x: parallaxX, y: parallaxY }}
            className="relative aspect-square overflow-hidden rounded-[14px] bg-zinc-50 border border-black/5"
          >
            {hasImage ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 768px) 34vw, 92vw"
                className="object-contain bg-white p-2 transition-transform duration-700 group-hover/image:scale-[1.05]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-zinc-100" style={{ background: item.accent }}>
                <span className="text-3xl opacity-40">🎬</span>
              </div>
            )}
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {item.category}
            </span>
          </motion.div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
             Creative Gallery
          </p>
          <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
            {item.title}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500">
            {item.description}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              Open Gallery
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function VideoSourceCard({ item, category, index }) {
  const embedUrl = getVideoEmbedUrl(item.href);
  const gifPreviewSrc = item.previewGif?.src || item.previewGif || null;
  const [iframeError, setIframeError] = useState(false);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
      className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-[18px] border border-white/35 bg-zinc-950 p-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.22)] md:max-w-[240px]"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[14px] bg-zinc-900">
        {gifPreviewSrc ? (
          <img
            src={gifPreviewSrc}
            alt={`${item.title} preview`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setIframeError(true)}
          />
        ) : embedUrl && !iframeError ? (
          <iframe
            key={item.id}
            src={embedUrl}
            title={`${item.title} preview`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; web-share"
            allowFullScreen
            loading="lazy"
            onError={() => setIframeError(true)}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <div className="flex h-full w-full items-end bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-4 text-white">
            <p className="text-xs text-white/70">Preview unavailable for this source link.</p>
          </div>
        )}
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${item.title} source`}
          className="absolute inset-0 z-10"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
              {category.platform}
            </span>
            <span className="rounded-full bg-black/45 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              Auto Preview
            </span>
          </div>
          <div className="rounded-xl bg-black/45 p-2.5 backdrop-blur">
            <p className="text-xs font-semibold text-white">{item.title}</p>
            <p className="mt-1.5 inline-flex rounded-full border border-white/40 bg-white/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
              Click Video To Open Source
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VideoCategorySlider({ category }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = category.items.length;

  useEffect(() => {
    if (totalItems <= 1) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 3200);
    return () => window.clearInterval(intervalId);
  }, [totalItems]);

  const activeItem = category.items[activeIndex];

  return (
    <motion.div
      variants={staggerItem}
      className="relative overflow-hidden rounded-[22px] border border-white/45 bg-white/62 p-3 glass-soft"
    >
      <div className="mb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{category.platform}</p>
          <h3 className="font-display mt-1 text-[1.05rem] font-semibold tracking-[-0.04em] leading-tight text-ink">{category.title}</h3>
          <p className="mt-1 text-[11px] leading-5 text-zinc-600 line-clamp-2">{category.description}</p>
        </div>
        <p className="mt-2 inline-flex rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Auto Preview {activeIndex + 1}/{totalItems}
        </p>
      </div>

      <VideoSourceCard
        item={activeItem}
        category={category}
        index={activeIndex}
      />
    </motion.div>
  );
}

function CertificateCard({ item, index, onOpen, reduceMotion }) {
  const isPortrait = item.orientation === "portrait";
  const { x: parallaxX, y: parallaxY } = useContext(DepthContext);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(item)}
        variants={staggerItem}
        whileHover={{ y: -10 }}
        className="group border-glow-luminous holographic-grain relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="noise-mask opacity-20" />
        <div className="relative z-10">
          <div className={`relative overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] ${isPortrait ? "mx-auto max-w-[220px]" : ""}`}>
            <motion.div 
              style={{ x: parallaxX, y: parallaxY }}
              className={`relative overflow-hidden rounded-[14px] bg-white ${isPortrait ? "aspect-[3/4]" : "aspect-[3/2]"}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 20vw, (min-width: 768px) 28vw, 46vw"
                className="object-contain object-center bg-white p-1 transition duration-500 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
            <h3 className="font-display mt-1.5 text-[1rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.1rem]">{item.title}</h3>
            <p className="mt-1.5 text-[11px] leading-5 text-zinc-600 md:text-[12px]">{item.description}</p>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function JourneyCard({ item, index, onOpen, label, reduceMotion }) {
  const { x: parallaxX, y: parallaxY } = useContext(DepthContext);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(item)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/45 bg-white/72 p-3 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-3 w-full overflow-hidden rounded-[20px] bg-white p-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.07)] [transform:translateZ(40px)]">
          <motion.div 
            style={{ x: parallaxX, y: parallaxY }}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[16px] bg-zinc-50 border border-black/5"
          >
            {item.image ? (
              <Image 
                src={item.image} 
                alt={item.title} 
                fill
                sizes="(min-width: 1536px) 14vw, (min-width: 1280px) 16vw, (min-width: 768px) 26vw, 42vw"
                className={`object-contain p-2 transition-transform duration-700 group-hover/image:scale-[1.03] ${item.imageClassName || "scale-100"}`.trim()} 
              />
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-30">
                <span className="text-3xl">🏢</span>
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {label.split(" ")[0]}
            </span>
          </motion.div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            {item.subtitle}
          </p>
          <h4 className="font-display mt-1.5 text-[1.02rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.08rem]">
            {item.title}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500">
            {item.body}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              View Milestones
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function BookSpine({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateY: -10, rotateX: 6 }}
      className={`group relative flex w-full max-w-[120px] flex-col justify-between rounded-t-[24px] px-4 pb-5 pt-6 shadow-2xl shadow-black/10 ${item.height}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`absolute inset-0 rounded-t-[24px] bg-gradient-to-b ${item.color}`} />
      <div className="absolute inset-y-0 right-0 w-3 rounded-r-[18px] bg-black/12" />
      <div className="absolute inset-[1px] rounded-t-[23px] border border-white/35" />
      <div className="relative z-10 flex h-full flex-col justify-between text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">{item.tone}</p>
        <h3 className="font-display text-lg font-semibold tracking-[-0.05em] [writing-mode:vertical-rl] rotate-180 md:text-xl">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function ContactForm({ reduceMotion }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const result = await sendEmail(formData);

    if (result.success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setError(result.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
              >
                <Send className="h-8 w-8" />
              </motion.div>
              {/* Confetti-like particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    x: Math.cos(i * 60 * (Math.PI / 180)) * 60,
                    y: Math.sin(i * 60 * (Math.PI / 180)) * 60,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.05) }}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gold"
                />
              ))}
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">Message Sent!</h3>
            <p className="mt-2 text-zinc-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-1">
                  <User className="h-3 w-3" /> Name
                </label>
                <div className="relative">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Name"
                    className={`w-full rounded-[18px] border bg-white/5 px-5 py-3 text-sm text-white outline-none transition-all focus:bg-white/10 ${errors.name ? "border-rose-500/50" : "border-white/10 focus:border-gold/50"}`}
                  />
                  {errors.name && <p className="mt-1.5 px-2 text-[10px] font-medium text-rose-400">{errors.name.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-1">
                  <Mail className="h-3 w-3" /> Email
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="hello@example.com"
                    className={`w-full rounded-[18px] border bg-white/5 px-5 py-3 text-sm text-white outline-none transition-all focus:bg-white/10 ${errors.email ? "border-rose-500/50" : "border-white/10 focus:border-gold/50"}`}
                  />
                  {errors.email && <p className="mt-1.5 px-2 text-[10px] font-medium text-rose-400">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-1">
                <Type className="h-3 w-3" /> Message
              </label>
              <div className="relative">
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="How can I help you?"
                  className={`w-full resize-none rounded-[22px] border bg-white/5 px-5 py-3 text-sm text-white outline-none transition-all focus:bg-white/10 ${errors.message ? "border-rose-500/50" : "border-white/10 focus:border-gold/50"}`}
                />
                {errors.message && <p className="mt-1.5 px-2 text-[10px] font-medium text-rose-400">{errors.message.message}</p>}
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-rose-500/10 p-4 text-[12px] font-medium text-rose-400"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white py-3 text-sm font-bold text-ink transition-all hover:bg-gold hover:text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                <RotateCw className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    // Scroll to top on mount/refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const reduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(null);
  const [activeProjectShotIndex, setActiveProjectShotIndex] = useState(0);
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeJourneyItem, setActiveJourneyItem] = useState(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: timelineScroll } = useScroll({ target: timelineRef, offset: ["start 75%", "end 20%"] });
  const layerOne = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const layerTwo = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const layerThree = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -110]);
  const timelineProgress = useTransform(timelineScroll, [0, 1], ["0%", "100%"]);
  const graphicDesignItems = galleryItems.filter((item) => item.category === "Graphic Design");
  const activeProjectShot = activeProject?.shots?.[activeProjectShotIndex] || activeProject?.shots?.[0];

  return (
    <main className="relative overflow-hidden pb-20 text-ink md:pb-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[22rem] h-[26rem] w-[26rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute left-[12%] top-[76rem] h-80 w-80 rounded-full bg-sky-100/45 blur-3xl" />
        <div className="absolute right-[10%] top-[145rem] h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-4 rounded-full border border-white/45 bg-white/52 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-6">
          <button type="button" onClick={() => smoothScrollTo("hero")} className="font-display text-sm font-semibold tracking-[-0.03em] text-ink md:text-base">
            Adheesha Sooriyaarachchi
          </button>

          <nav className="flex items-center gap-1 rounded-full bg-white/45 p-1.5 glass-panel">
            {navItems.map((item) => (
              "id" in item ? (
                <MagneticWrapper key={item.id} reduceMotion={reduceMotion} intensity={0.1}>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo(item.id)}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-ink transition duration-300 hover:bg-white/60"
                  >
                    {item.label}
                  </button>
                </MagneticWrapper>
              ) : (
                <MagneticWrapper key={item.href} reduceMotion={reduceMotion} intensity={0.1}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-ink transition duration-300 hover:bg-white/60"
                  >
                    {item.label}
                  </a>
                </MagneticWrapper>
              )
            ))}
          </nav>

          <MagneticWrapper reduceMotion={reduceMotion} intensity={0.12}>
            <button
              type="button"
              onClick={() => smoothScrollTo("contact")}
              className="hidden rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 md:inline-flex"
            >
              Let&apos;s Talk
            </button>
          </MagneticWrapper>
        </div>
      </header>

      <SectionReveal id="hero" ref={heroRef} className="scroll-mt-28 px-4 pt-4 md:px-6 md:pt-6">

        <HeroSpotlight reduceMotion={reduceMotion} />
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 pb-8 pt-5 md:px-10 md:pb-10 md:pt-6">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/80 via-white/58 to-gold/10" />
          <div className="noise-mask rounded-[42px]" />
          <motion.div style={{ y: layerOne }} className="absolute left-[4%] top-[10%] h-40 w-40 rounded-[36px] bg-white/55 blur-sm glass-panel" />
          <motion.div style={{ y: layerTwo }} className="absolute right-[8%] top-[18%] h-52 w-52 rounded-full bg-gold/15 blur-3xl" />
          <motion.div style={{ y: layerThree }} className="absolute bottom-0 right-[18%] h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />

          <div className="relative z-10 grid min-h-[clamp(560px,68vh,720px)] items-start gap-6 pt-1 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-[760px] pt-10 lg:pt-12 lg:-mt-4">
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 rounded-full bg-white/64 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-700 glass-soft"
              >
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                {heroContent.badge}
              </motion.span>

              <h1
                className="font-display mt-2 max-w-none text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.9] tracking-[-0.1em] text-ink"
              >
                {heroContent.headlineLines.map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <SplitText text={line} delay={0.2 + i * 0.15} reduceMotion={reduceMotion} />
                  </span>
                ))}
              </h1>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <RoleRoller roles={heroContent.roles} reduceMotion={reduceMotion} />
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16 md:mt-20"
              >
                <div className="flex flex-wrap gap-3">
                  <MagneticWrapper reduceMotion={reduceMotion}>
                    <button
                      type="button"
                      onClick={() => smoothScrollTo("projects")}
                      className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10"
                    >
                      Explore Projects
                    </button>
                  </MagneticWrapper>
                  <MagneticWrapper reduceMotion={reduceMotion}>
                    <button
                      type="button"
                      onClick={() => smoothScrollTo("toolkit")}
                      className="rounded-full border border-white/50 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink glass-soft"
                    >
                      Open Toolkit
                    </button>
                  </MagneticWrapper>
                  <MagneticWrapper reduceMotion={reduceMotion}>
                    <a
                      href="/cv/CV%20ADHEESHA%20SOORIYAARACHCHI.pdf"
                      download
                      className="hidden rounded-full border border-ink/15 bg-white/45 px-6 py-3.5 text-sm font-semibold text-ink glass-soft sm:inline-flex"
                    >
                      Download CV
                    </a>
                  </MagneticWrapper>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
                  {socialLinks.map((item) => {
                    const Icon = socialIconMap[item.icon];
                    return (
                      <MagneticWrapper key={item.label} reduceMotion={reduceMotion} intensity={0.2}>
                        <a
                          href={item.href}
                          aria-label={item.label}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1.5 hover:bg-zinc-800 hover:shadow-xl"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </MagneticWrapper>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-4 lg:justify-items-end">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[340px] justify-self-end rounded-[28px] bg-white/55 p-5 text-sm leading-8 text-zinc-600 glass-soft"
              >
                {heroContent.summary}
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.985 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[400px] w-full max-w-[620px] overflow-hidden rounded-[38px] md:min-h-[580px] lg:-mt-16"
              >
                <motion.div style={{ y: layerOne }} className="absolute right-0 top-8 z-20 w-[220px] rounded-[28px] bg-white/58 p-4 text-[12px] font-medium leading-6 text-zinc-600 glass-panel md:right-1 md:top-auto md:bottom-44 md:w-[250px]">
                  {heroContent.portraitHighlight}
                </motion.div>
                <motion.div style={{ y: layerTwo }} className="absolute left-8 top-28 h-32 w-32 rounded-full bg-gold/15 blur-3xl" />
                <motion.div style={{ y: layerThree }} className="absolute bottom-16 left-5 z-20 rounded-[24px] bg-white/58 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 glass-soft">
                  {heroContent.portraitCaption}
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 top-14 rounded-[38px] bg-gradient-to-b from-white/35 via-white/12 to-white/6" />
                <div className="absolute inset-x-8 bottom-0 top-20 rounded-[32px] border border-white/50 bg-white/34 backdrop-blur-[10px]" />
                <div className="absolute inset-x-10 bottom-0 top-24 rounded-[30px] bg-gradient-to-b from-white/30 via-white/8 to-transparent" />

                <div className="absolute bottom-0 right-0 z-10 w-full max-w-[560px]">
                  <Image
                    src={heroContent.portrait}
                    alt="Adheesha Sooriyaarachchi portrait"
                    priority
                    className="h-auto w-full object-contain object-bottom-right"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#f4efe3] via-[#f4efe3]/78 to-transparent" />

                <motion.div
                  style={{ y: layerOne }}
                  className="absolute left-6 top-12 z-20 rounded-[26px] bg-white/64 p-4 text-sm leading-7 text-zinc-600 glass-panel md:left-8 md:max-w-[240px]"
                >
                  {heroContent.portraitNote}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <a
        href="https://buymeacoffee.com/adeshasur"
        aria-label="Buy Me a Coffee"
        className="fixed bottom-5 right-5 z-[100] inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:-translate-y-1 md:left-5 md:right-auto"
      >
        <Coffee className="h-5 w-5" />
      </a>

      <ToolkitHeroCard reduceMotion={reduceMotion} />

      <SectionReveal id="projects" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.04}>
        <div className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Software Projects"
            title="Selected software projects with cleaner presentation."
            text="Concept builds and live projects presented in a tighter, more practical layout."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {softwareProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
                onOpen={(selectedProject) => {
                  setActiveProject(selectedProject);
                  setActiveProjectShotIndex(0);
                }}
              />
            ))}
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal id="gallery" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.08}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/68 via-white/38 to-rose-50/45" />
          <div className="absolute right-10 top-10 h-60 w-60 rounded-full bg-pink-100/50 blur-3xl" />
          <SectionIntro
            eyebrow="Graphic Designs"
            title="Graphic design work separated into its own lighter, mood-led gallery."
            text="Poster systems, brand layouts, and social visuals now sit in their own section so the design work reads as a focused collection."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {graphicDesignItems.map((item, index) => (
              <GalleryCard 
                key={item.title} 
                item={item} 
                index={index} 
                onOpen={setActiveGalleryItem} 
                reduceMotion={reduceMotion} 
              />
            ))}
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal id="video-editing" className="scroll-mt-28 px-4 pt-10 md:px-6 md:pt-12" delay={0.1}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/70 via-slate-50/55 to-sky-50/45" />
          <div className="absolute left-10 top-10 h-60 w-60 rounded-full bg-sky-100/55 blur-3xl" />
          <SectionIntro
            eyebrow="Video Editing"
            title="Video work grouped into four dedicated categories."
            text="Each category card auto-rotates previews and opens the original source when you click the video."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {videoShowcaseGroups.map((category) => (
              <VideoCategorySlider
                key={category.id}
                category={category}
              />
            ))}
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal id="education" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.12}>
        <div ref={timelineRef} className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Education"
            title="Education qualifications presented in one clear logo wall."
            text="Every qualification is easier to scan, while work experience stays visible here in one clear overview."
          />

          <div className="mt-12 space-y-6">
            <div className="py-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[clamp(1.4rem,4vw,1.95rem)] font-semibold tracking-[-0.06em] text-ink">Education Qualifications</h3>
                <motion.div style={{ scaleY: timelineProgress }} className="hidden h-16 w-px origin-top bg-gradient-to-b from-gold to-amber-400 md:block" />
              </div>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
              >
                {educationItems.map((item, index) => (
                  <JourneyCard
                    key={item.title + "-" + index}
                    item={item}
                    index={index}
                    onOpen={setActiveJourneyItem}
                    label="Education Qualification"
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </div>

            <div className="py-1">
              <h3 className="font-display text-[clamp(1.4rem,4vw,1.95rem)] font-semibold tracking-[-0.06em] text-ink">Working Experience</h3>
              <p className="mt-4 text-[15px] leading-8 text-zinc-600">
                Logos and roles stay visible here, while the full details open in a cleaner preview.
              </p>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
              >
                {experienceItems.map((item, index) => (
                  <JourneyCard
                    key={item.title + "-home-" + index}
                    item={item}
                    index={index + educationItems.length}
                    onOpen={setActiveJourneyItem}
                    label="Working Experience"
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </div>

            <div className="py-1">
              <h3 className="font-display text-[clamp(1.4rem,4vw,2.15rem)] font-semibold tracking-[-0.06em] text-ink">Achievements & Events</h3>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              >
                {achievementItems.map((item, index) => (
                  <AchievementCard
                    key={item.title + "-" + index}
                    item={item}
                    index={index}
                    onOpen={setActiveAchievement}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </SectionReveal>
      <SectionReveal id="certificates" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.14}>
        <div className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Certificates"
            title="Certificates arranged in a tighter showcase."
            text="A cleaner certificate wall with smaller cards and better room for future additions."
          />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
          >
            {certificateItems.map((item, index) => (
              <CertificateCard key={item.title} item={item} index={index} onOpen={setActiveCertificate} />
            ))}
          </motion.div>
        </div>
      </SectionReveal>
      <SectionReveal id="books" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.16}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/62 via-white/24 to-amber-50/55" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#d1b27f]/18 to-transparent" />
          <SectionIntro
            eyebrow="Minimalist Bookshelf"
            title="A 3D-inspired shelf for the books and themes that shape design taste and interface thinking."
            text="Instead of plain text bullets, the shelf turns reading interests into a more tactile visual moment."
          />

          <div className="relative z-10 mt-16">
            <div className="absolute inset-x-0 bottom-2 h-5 rounded-full bg-black/8 blur-xl" />
            <div className="absolute inset-x-0 bottom-0 h-4 rounded-full bg-gradient-to-r from-[#d0b17e] via-[#b88f52] to-[#e2c28f]" />
            <div className="relative flex flex-wrap items-end justify-center gap-3 md:gap-4" style={{ perspective: 1200 }}>
              {bookshelfItems.map((item, index) => (
                <BookSpine key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="contact" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.2}>
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
          <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          
          <div className="relative z-10 grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="flex flex-col gap-10">
              <div>
                <SectionIntro
                  eyebrow="Contact"
                  title={contactContent.title}
                  text={contactContent.body}
                  theme="dark"
                />
                
                <div className="mt-12 grid gap-4 max-w-md">
                  {contactContent.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-4 rounded-[22px] bg-white/5 border border-white/5 px-5 py-4 text-zinc-300/90 transition-colors hover:bg-white/10">
                      <WandSparkles className="mt-1 h-4 w-4 shrink-0 text-gold" />
                      <p className="text-sm leading-7 md:text-[15px]">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-6">Quick Connect</p>
                <div className="flex flex-wrap gap-4">
                  <MagneticWrapper reduceMotion={reduceMotion} intensity={0.15}>
                    <a
                      href={`https://wa.me/${contactContent.phone}?text=${encodeURIComponent(contactContent.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 px-6 py-4 text-sm font-bold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                    >
                      <MessageSquare className="h-5 w-5" />
                      WhatsApp
                    </a>
                  </MagneticWrapper>
                  <MagneticWrapper reduceMotion={reduceMotion} intensity={0.15}>
                    <a
                      href={`mailto:${contactContent.email}?subject=${encodeURIComponent("Portfolio Inquiry")}`}
                      className="group flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-ink"
                    >
                      <Mail className="h-5 w-5" />
                      Email Direct
                    </a>
                  </MagneticWrapper>
                </div>
              </div>
            </div>

            <div className="rounded-[40px] border border-white/10 bg-white/5 p-1 backdrop-blur-3xl">
              <div className="rounded-[38px] bg-zinc-950/40 p-5 md:p-8">
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-semibold text-white">Send a Message</h3>
                  <p className="mt-2 text-sm text-zinc-500">I usually respond within 24 hours.</p>
                </div>
                <ContactForm reduceMotion={reduceMotion} />
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <AnimatePresence>
        {activeProject && activeProjectShot ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[84] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
                <div className="rounded-[28px] bg-zinc-100 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                  <div className="relative overflow-hidden rounded-[22px] bg-white">
                    <div className="relative aspect-[16/11]">
                      <Image
                        src={activeProjectShot.image}
                        alt={activeProjectShot.title}
                        fill
                        sizes="(min-width: 1024px) 54vw, 94vw"
                        className="object-contain bg-white p-3"
                      />
                    </div>
                  </div>
                  {activeProject.shots.length > 1 ? (
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {activeProject.shots.map((shot, index) => (
                        <button
                          key={shot.title}
                          type="button"
                          onClick={() => setActiveProjectShotIndex(index)}
                          className={`relative overflow-hidden rounded-[18px] border bg-white p-1.5 transition ${index === activeProjectShotIndex ? "border-ink shadow-[0_16px_36px_rgba(15,23,42,0.12)]" : "border-black/8 hover:border-black/20"}`}
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-zinc-50">
                            <Image
                              src={shot.image}
                              alt={shot.title}
                              fill
                              sizes="160px"
                              className="object-contain bg-white p-1.5"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    {activeProject.previewLabel || "Project Preview"}
                  </p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeProject.name}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {activeProject.type}
                  </p>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeProject.longDescription || activeProject.description}
                  </p>

                  <div className="mt-6 rounded-[24px] bg-zinc-50 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {activeProjectShot.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">
                      {activeProjectShot.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeProject.details.map((detail) => (
                      <span key={detail} className="rounded-full bg-zinc-100 px-3 py-1.5 text-[11px] font-semibold text-zinc-700">
                        {detail}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {activeProject.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={() => setActiveProject(null)}
                      className="rounded-full bg-zinc-100 px-5 py-3 text-sm font-semibold text-ink"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeJourneyItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[83] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveJourneyItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-center">
                <div className="rounded-[28px] bg-white/85 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                  <div className="mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center rounded-[24px] bg-white p-6">
                    {activeJourneyItem.image ? (
                      <Image src={activeJourneyItem.image} alt={activeJourneyItem.title} className="h-36 w-36 object-contain md:h-44 md:w-44" />
                    ) : null}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{activeJourneyItem.label}</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeJourneyItem.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{activeJourneyItem.subtitle}</p>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeJourneyItem.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {activeJourneyItem.href ? (
                      <a
                        href={activeJourneyItem.href}
                        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                      >
                        Visit Website
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setActiveJourneyItem(null)}
                      className="rounded-full bg-zinc-100 px-5 py-3 text-sm font-semibold text-ink"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeAchievement ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[84] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                <div className="relative overflow-hidden rounded-[28px] bg-white/85 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                   <div className="relative overflow-hidden rounded-[22px] bg-white aspect-[3/4]">
                      <AchievementCard
                        item={activeAchievement}
                        index={0}
                        onOpen={() => {}}
                        reduceMotion={reduceMotion}
                      />
                   </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{activeAchievement.year}</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeAchievement.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{activeAchievement.subtitle}</p>
                  <p className="mt-6 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeAchievement.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveAchievement(null)}
                    className="mt-8 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeCertificate ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[82] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className={`grid gap-6 md:items-center ${activeCertificate.orientation === "portrait" ? "md:grid-cols-[0.78fr_1.22fr]" : "md:grid-cols-[1.08fr_0.92fr]"}`}>
                <div className={`relative overflow-hidden rounded-[28px] bg-white/85 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ${activeCertificate.orientation === "portrait" ? "mx-auto max-w-[420px]" : ""}`}>
                  <div className={`relative overflow-hidden rounded-[22px] bg-white ${activeCertificate.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[14/10]"}`}>
                    <Image
                      src={activeCertificate.image}
                      alt={activeCertificate.title}
                      fill
                      sizes="(min-width: 768px) 56vw, 90vw"
                      className="object-contain object-center bg-white p-1"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{activeCertificate.label}</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeCertificate.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeCertificate.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCertificate(null)}
                    className="mt-8 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeGalleryItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveGalleryItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className={`relative min-h-[320px] overflow-hidden rounded-[28px] p-5 ${activeGalleryItem.image ? "bg-zinc-100" : ""}`} style={activeGalleryItem.image ? undefined : { background: activeGalleryItem.accent }}>
                  {activeGalleryItem.image ? (
                    <>
                      <span className="absolute left-8 top-8 z-10 w-fit rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                        {activeGalleryItem.category}
                      </span>
                      <div className="relative h-full min-h-[320px] overflow-hidden rounded-[22px] bg-white shadow-[0_22px_48px_rgba(15,23,42,0.14)]">
                        <Image
                          src={activeGalleryItem.image}
                          alt={activeGalleryItem.imageAlt || activeGalleryItem.title}
                          fill
                          sizes="(min-width: 768px) 56vw, 90vw"
                          className="object-contain bg-white p-2"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="noise-mask opacity-20" />
                      <div className="absolute inset-4 rounded-[24px] border border-white/40" />
                      <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-white/40 blur-3xl" />
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <span className="w-fit rounded-full bg-white/72 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700 glass-soft">
                          {activeGalleryItem.category}
                        </span>
                        <div>
                          <h3 className="font-display text-4xl font-semibold tracking-[-0.07em] text-ink">
                            {activeGalleryItem.title}
                          </h3>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Creative Lightbox</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeGalleryItem.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeGalleryItem.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveGalleryItem(null)}
                    className="mt-8 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}





















