import portraitImage from "../../ppimage.png";
import ucscLogo from "../../Education/ucsc.jpg";
import nibmLogo from "../../Education/nibm.jpg";
import ibmsLogo from "../../Education/ibms.png";
import accLogo from "../../Education/acc.jpg";
import slegaLogo from "../../Education/slega.jpg";
import earthLogo from "../../Education/earth.jpg";
import kalanaLogo from "../../Working Experience/kalana.jpg";
import olympusLogo from "../../Working Experience/olympus.jpg";

export const portrait = portraitImage;

export const navLinks = [
  { label: "Home", href: "/#home", hash: "#home" },
  { label: "About Me", href: "/#about", hash: "#about" },
  { label: "Projects", href: "/#projects", hash: "#projects" },
  { label: "Contact", href: "/#contact", hash: "#contact" },
];

export const heroHighlights = [
  "Framer-inspired editorial layout",
  "Smooth motion and layered depth",
  "Responsive React + Tailwind build",
];

export const projectLinks = [
  {
    name: "NIC Decoder",
    url: "https://adheesha-nic-finder.vercel.app/",
    blurb: "Decode Sri Lankan NIC details through a clearer, utility-first interface.",
    category: "Utility Tool",
    format: "Web App",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(244,239,227,1) 0%, rgba(223,216,194,1) 100%)",
  },
  {
    name: "QR Studio",
    url: "https://adheesha-qr-generator.vercel.app/",
    blurb: "Generate QR outputs with a sharper product presentation and cleaner controls.",
    category: "Generator",
    format: "Product UI",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(248,248,248,1) 0%, rgba(217,223,230,1) 100%)",
  },
  {
    name: "Vault Guard",
    url: "https://adheesha-secure-password-generator.vercel.app/",
    blurb: "Password generation experience designed to feel secure, calm, and easy to use.",
    category: "Security Tool",
    format: "Web Utility",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(245,241,236,1) 0%, rgba(214,208,221,1) 100%)",
  },
  {
    name: "Postal Code Finder",
    url: "https://adheesha-sl-postal-code-finder.vercel.app/",
    blurb: "Fast postal lookup flow focused on practical use, speed, and clarity.",
    category: "Lookup Tool",
    format: "Web Utility",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(249,245,236,1) 0%, rgba(225,217,196,1) 100%)",
  },
  {
    name: "Text Transformer Pro",
    url: "https://adheesha-text-transformer.vercel.app/",
    blurb: "Quick text formatting and transformation utility for daily workflows.",
    category: "Productivity",
    format: "Tool",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(248,248,248,1) 0%, rgba(218,224,220,1) 100%)",
  },
  {
    name: "Chroma Craft",
    url: "https://adheesha-chroma-craft.vercel.app/",
    blurb: "Color exploration tool with a more visual, modern interface language.",
    category: "Creative Tool",
    format: "Color System",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(249,244,238,1) 0%, rgba(234,212,190,1) 100%)",
  },
  {
    name: "Interest Calc Pro",
    url: "https://adheesha-interest-calc.vercel.app/",
    blurb: "Clean calculator interface for interest checks and financial estimates.",
    category: "Finance Tool",
    format: "Calculator",
    year: "2026",
    accent: "linear-gradient(135deg, rgba(247,247,247,1) 0%, rgba(220,220,220,1) 100%)",
  },
];

export const educationItems = [
  {
    name: "UCSC",
    image: ucscLogo,
    focus: "Computing-oriented academic exposure and digital problem solving.",
  },
  {
    name: "NIBM",
    image: nibmLogo,
    focus: "Structured technology learning with practical software direction.",
  },
  {
    name: "IBMS",
    image: ibmsLogo,
    focus: "Business and communication perspective that supports product thinking.",
  },
  {
    name: "ACC",
    image: accLogo,
    focus: "Professional growth with discipline, process, and presentation quality.",
  },
  {
    name: "SLEGA",
    image: slegaLogo,
    focus: "Creative and leadership-related learning that sharpened confidence.",
  },
  {
    name: "Earth",
    image: earthLogo,
    focus: "A wider learning base that supports curiosity and creative range.",
  },
];

export const workItems = [
  {
    name: "Kalana",
    image: kalanaLogo,
    role: "Creative / Digital Work",
    period: "Professional Experience",
    description:
      "Worked on digital execution with attention to presentation, layout, and polished output.",
  },
  {
    name: "Olympus",
    image: olympusLogo,
    role: "Product-facing Creative Support",
    period: "Professional Experience",
    description:
      "Contributed to product-facing creative work where clean interface quality and fast delivery mattered.",
  },
];

export const bookItems = [
  {
    title: "Design Thinking",
    note: "Reading around product thinking, visual systems, and cleaner decision-making.",
  },
  {
    title: "Creative Discipline",
    note: "Books and references that improve consistency, focus, and taste in output.",
  },
  {
    title: "UI Writing & Clarity",
    note: "Material that helps interfaces feel simpler, more useful, and more human.",
  },
];

export const designItems = [
  {
    title: "Poster Design",
    note: "High-contrast, hierarchy-led poster compositions with a premium mood.",
  },
  {
    title: "Social Graphics",
    note: "Clean promotional creatives built to feel clear, bold, and modern.",
  },
  {
    title: "Brand Presentation",
    note: "Layouts that make visual systems feel intentional instead of generic.",
  },
];

export const photographyItems = [
  {
    title: "Portrait Frames",
    note: "A composition-first photography direction shaped around presence and mood.",
  },
  {
    title: "Light & Contrast",
    note: "Using brightness, texture, and tonal separation to add atmosphere.",
  },
  {
    title: "Storytelling Shots",
    note: "Photographs that try to carry feeling, not just documentation.",
  },
];

export const achievementItems = [
  {
    title: "Live Utility Tools",
    note: "Built and published multiple practical tools as public projects.",
  },
  {
    title: "Portfolio Evolution",
    note: "Continuously refining frontend quality, responsiveness, and presentation.",
  },
  {
    title: "Creative Growth",
    note: "Turning self-learning into shipped work across code, design, and visuals.",
  },
];

export const portfolioSections = [
  {
    title: "Education",
    description: "Institutions and learning foundations that shaped the technical side.",
  },
  {
    title: "Working Experience",
    description: "Professional exposure focused on digital output and visual quality.",
  },
  {
    title: "Books",
    description: "Reading that influences design thinking, clarity, and discipline.",
  },
  {
    title: "Graphic Designs",
    description: "Poster, social, and brand-led work built with stronger hierarchy.",
  },
  {
    title: "Software Projects",
    description: "Live web tools presented as polished mini-products.",
  },
  {
    title: "Photographs",
    description: "A visual eye for portraits, frames, light, and mood.",
  },
  {
    title: "Achievements",
    description: "Growth milestones and shipped work translated into public output.",
  },
];

export const contactCards = [
  {
    title: "Project Flow",
    value: "Portfolio websites, landing pages, and practical web tools",
  },
  {
    title: "Working Style",
    value: "Clean structure, modern visuals, and polished frontend delivery",
  },
  {
    title: "Availability",
    value: "Open for selected creative and product collaborations",
  },
];
