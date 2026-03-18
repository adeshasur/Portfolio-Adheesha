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
  { label: "Work", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const heroMeta = "2 selected project slots available";

export const heroTitle = "Adheesha is building clean portfolio experiences and useful digital products";

export const heroSummary =
  "As a UI-focused creative developer, I design and build polished websites, practical tools, and premium digital experiences with a strong sense of clarity and visual balance.";

export const projectLinks = [
  {
    name: "NIC Decoder",
    url: "https://adheesha-nic-finder.vercel.app/",
    blurb: "Decode Sri Lankan NIC details through a clearer, utility-first interface.",
    category: "Utility Tool",
    format: "Web App",
    year: "2026",
    accent: "linear-gradient(135deg, #d8dfc7 0%, #8f9d7d 100%)",
  },
  {
    name: "QR Studio",
    url: "https://adheesha-qr-generator.vercel.app/",
    blurb: "Generate QR outputs with a sharper product presentation and cleaner controls.",
    category: "Generator",
    format: "Product UI",
    year: "2026",
    accent: "linear-gradient(135deg, #ead9b8 0%, #c4aa6f 100%)",
  },
  {
    name: "Vault Guard",
    url: "https://adheesha-secure-password-generator.vercel.app/",
    blurb: "Password generation experience designed to feel secure, calm, and easy to use.",
    category: "Security Tool",
    format: "Web Utility",
    year: "2026",
    accent: "linear-gradient(135deg, #c9d2d9 0%, #768696 100%)",
  },
  {
    name: "Postal Code Finder",
    url: "https://adheesha-sl-postal-code-finder.vercel.app/",
    blurb: "Fast postal lookup flow focused on practical use, speed, and clarity.",
    category: "Lookup Tool",
    format: "Web Utility",
    year: "2026",
    accent: "linear-gradient(135deg, #e8dcc9 0%, #b39a74 100%)",
  },
  {
    name: "Text Transformer Pro",
    url: "https://adheesha-text-transformer.vercel.app/",
    blurb: "Quick text formatting and transformation utility for daily workflows.",
    category: "Productivity",
    format: "Tool",
    year: "2026",
    accent: "linear-gradient(135deg, #d7dfdf 0%, #91a1a1 100%)",
  },
  {
    name: "Chroma Craft",
    url: "https://adheesha-chroma-craft.vercel.app/",
    blurb: "Color exploration tool with a more visual, modern interface language.",
    category: "Creative Tool",
    format: "Color System",
    year: "2026",
    accent: "linear-gradient(135deg, #ecd1c7 0%, #d47f65 100%)",
  },
  {
    name: "Interest Calc Pro",
    url: "https://adheesha-interest-calc.vercel.app/",
    blurb: "Clean calculator interface for interest checks and financial estimates.",
    category: "Finance Tool",
    format: "Calculator",
    year: "2026",
    accent: "linear-gradient(135deg, #e4e4e4 0%, #9f9f9f 100%)",
  },
];

export const serviceCards = [
  {
    title: "Graphic Design",
    description: "High-contrast layouts, poster directions, and branded visuals with sharper hierarchy.",
    tags: ["Posters", "Brand Layouts", "Social Creatives"],
    tone: "light",
  },
  {
    title: "Front-End Development",
    description: "Responsive React interfaces, landing pages, and product-focused websites with polished motion.",
    tags: ["React", "Tailwind CSS", "Motion UI"],
    tone: "dark",
  },
  {
    title: "UI/UX Design",
    description: "Clean digital experiences built around clarity, stronger spacing, and premium presentation.",
    tags: ["Product UI", "UX Flows", "Design Systems"],
    tone: "light",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Brief & Direction",
    text: "We align on goals, references, audience, and the visual tone of the project.",
  },
  {
    step: "02",
    title: "Structure",
    text: "The content, hierarchy, and user flow are shaped into a clearer product story.",
  },
  {
    step: "03",
    title: "Design Pass",
    text: "The interface gets refined with typography, spacing, contrast, and stronger composition.",
  },
  {
    step: "04",
    title: "Development",
    text: "The selected direction is translated into responsive frontend output with motion and polish.",
  },
  {
    step: "05",
    title: "Launch & Support",
    text: "Final improvements, deployment support, and cleanup for a finished result.",
  },
];

export const faqItems = [
  {
    question: "What type of projects do you usually build?",
    answer: "Portfolio websites, landing pages, practical tools, and modern frontend experiences with a premium feel.",
  },
  {
    question: "Do you work with custom UI directions?",
    answer: "Yes. If you have a style reference, I can adapt the layout, spacing, motion, and visual system around it.",
  },
  {
    question: "Can you redesign an existing portfolio?",
    answer: "Yes. I can keep the content and rebuild the structure, hierarchy, and visual presentation from scratch.",
  },
  {
    question: "Do your project links open in the same tab?",
    answer: "Yes. The live tool links can stay in the same tab for a smoother browsing flow.",
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
