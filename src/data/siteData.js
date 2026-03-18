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
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const heroHighlights = [
  "Glassmorphism UI direction",
  "3D-inspired depth and layered cards",
  "Responsive React + Tailwind build",
];

export const projectLinks = [
  {
    name: "NIC Decoder",
    url: "https://adheesha-nic-finder.vercel.app/",
    blurb: "Decode Sri Lankan NIC details through a cleaner, utility-first interface.",
  },
  {
    name: "QR Studio",
    url: "https://adheesha-qr-generator.vercel.app/",
    blurb: "Generate QR outputs with a sharper product presentation.",
  },
  {
    name: "Vault Guard",
    url: "https://adheesha-secure-password-generator.vercel.app/",
    blurb: "Password generation experience designed to feel clear and secure.",
  },
  {
    name: "Postal Code Finder",
    url: "https://adheesha-sl-postal-code-finder.vercel.app/",
    blurb: "Fast postal lookup flow focused on practical use and clarity.",
  },
  {
    name: "Text Transformer Pro",
    url: "https://adheesha-text-transformer.vercel.app/",
    blurb: "Quick text formatting and transformation utility for daily workflows.",
  },
  {
    name: "Chroma Craft",
    url: "https://adheesha-chroma-craft.vercel.app/",
    blurb: "Color exploration tool with a more visual, modern interface.",
  },
  {
    name: "Interest Calc Pro",
    url: "https://adheesha-interest-calc.vercel.app/",
    blurb: "Clean calculator interface for interest checks and financial estimates.",
  },
];

export const educationItems = [
  { name: "UCSC", image: ucscLogo },
  { name: "NIBM", image: nibmLogo },
  { name: "IBMS", image: ibmsLogo },
  { name: "ACC", image: accLogo },
  { name: "SLEGA", image: slegaLogo },
  { name: "Earth", image: earthLogo },
];

export const workItems = [
  {
    name: "Kalana",
    image: kalanaLogo,
    description:
      "Worked on digital execution with attention to presentation, layout, and polished output.",
  },
  {
    name: "Olympus",
    image: olympusLogo,
    description:
      "Contributed to product-facing creative work where clean interface quality mattered.",
  },
];

export const insightCards = [
  {
    title: "Books",
    description:
      "Reading influences behind how I think about design systems, product clarity, and creative discipline.",
  },
  {
    title: "Graphic Designs",
    description:
      "Poster, social, and brand presentation ideas built around strong hierarchy and visual tone.",
  },
  {
    title: "Photographs",
    description:
      "A frame-first approach to portraits, light, detail, and atmospheric composition.",
  },
  {
    title: "Achievements",
    description:
      "Shipped tools, growth milestones, and practical learning translated into public work.",
  },
];

export const contactCards = [
  {
    title: "Email",
    value: "adheesha@example.com",
    href: "mailto:adheesha@example.com",
  },
  {
    title: "Project Type",
    value: "Portfolio sites, landing pages, utility products",
  },
  {
    title: "Preferred Flow",
    value: "Discovery, design direction, polished frontend build",
  },
];
