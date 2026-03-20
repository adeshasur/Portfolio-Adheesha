import portraitImage from "../ppimage.png";
import ucscLogo from "../Education/ucsc.jpg";
import nibmLogo from "../Education/nibm.jpg";
import ibmsLogo from "../Education/ibms.png";
import accLogo from "../Education/acc.jpg";
import slegaLogo from "../Education/slega.jpg";
import earthLogo from "../Education/earth.jpg";
import kalanaLogo from "../Working Experience/kalana.jpg";
import olympusLogo from "../Working Experience/olympus.jpg";
import certificate457 from "../Certificates/457.jpg";
import certificateLevel1 from "../Certificates/Certificate_Adeesha_level_1.jpg";
import certificateLevel2 from "../Certificates/Certificate_Adeesha_level_2.jpg";
import webDesignCertificate from "../Certificates/Web_Design_for_Beginners_E-Certificate.jpg";

export const heroContent = {
  badge: "Available",
  headlineLines: ["Adheesha", "Sooriyaarachchi"],
  roles: [
    ["Undergraduate Software", "Engineer"],
    ["Graphic Designer"],
    ["Video Editor"],
    ["Web Developer"],
    ["Social Media", "Marketing Manager"],
  ],
  summary:
    "I am Adheesha Sooriyaarachchi, a creative developer focused on premium portfolios, useful tools, and UI systems that feel modern on both desktop and mobile.",
  portrait: portraitImage,
  stats: [
    { label: "Focus", value: "UI Engineering + Creative Frontend" },
    { label: "Style", value: "Glassmorphism, Motion, Product Clarity" },
    { label: "Base", value: "Light mode with black, white, and gold accents" },
  ],
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/adeshasur", icon: "github" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
];

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "toolkit", label: "Toolkit" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "education", label: "Education" },
  { href: "/experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "books", label: "Books" },
  { id: "contact", label: "Contact" },
];

export const toolkitItems = [
  {
    name: "NIC Decoder",
    href: "https://adheesha-nic-finder.vercel.app/",
    category: "Identity Utility",
    description: "Decode NIC details through a faster and cleaner utility experience.",
    accent: "linear-gradient(135deg, #def7e5 0%, #ffffff 54%, #f7fee7 100%)",
    glow: "rgba(56, 189, 120, 0.22)",
    className: "md:col-span-3 xl:col-span-4",
  },
  {
    name: "QR Studio",
    href: "https://adheesha-qr-generator.vercel.app/",
    category: "Generator",
    description: "Generate QR outputs with polished controls and a product-led feel.",
    accent: "linear-gradient(135deg, #fef3c7 0%, #ffffff 54%, #fefce8 100%)",
    glow: "rgba(245, 158, 11, 0.22)",
    className: "md:col-span-3 xl:col-span-4",
  },
  {
    name: "Vault Guard",
    href: "https://adheesha-secure-password-generator.vercel.app/",
    category: "Security Tool",
    description: "Calm password generation UI with cleaner decision flow.",
    accent: "linear-gradient(135deg, #e2e8f0 0%, #ffffff 56%, #f0f9ff 100%)",
    glow: "rgba(71, 85, 105, 0.24)",
    className: "md:col-span-3 xl:col-span-3",
  },
  {
    name: "Postal Code Finder",
    href: "https://adheesha-sl-postal-code-finder.vercel.app/",
    category: "Lookup Tool",
    description: "Quick postcode search with practical clarity.",
    accent: "linear-gradient(135deg, #f5e7d0 0%, #ffffff 54%, #ffedd5 100%)",
    glow: "rgba(217, 119, 6, 0.2)",
    className: "md:col-span-3 xl:col-span-4",
  },
  {
    name: "Text Transformer Pro",
    href: "https://adheesha-text-transformer.vercel.app/",
    category: "Productivity",
    description: "A sharper text formatting utility for daily workflows.",
    accent: "linear-gradient(135deg, #d8f3ff 0%, #ffffff 56%, #f8fafc 100%)",
    glow: "rgba(14, 165, 233, 0.2)",
    className: "md:col-span-3 xl:col-span-3",
  },
  {
    name: "Chroma Craft",
    href: "https://adheesha-chroma-craft.vercel.app/",
    category: "Creative Tool",
    description: "Explore color systems through a more visual interface.",
    accent: "linear-gradient(135deg, #ffe4e6 0%, #ffffff 54%, #ffedd5 100%)",
    glow: "rgba(244, 63, 94, 0.18)",
    className: "md:col-span-3 xl:col-span-3",
  },
  {
    name: "Interest Calc Pro",
    href: "https://adheesha-interest-calc.vercel.app/",
    category: "Finance Calculator",
    description: "Interest calculations presented with speed and clarity.",
    accent: "linear-gradient(135deg, #e5e7eb 0%, #ffffff 54%, #f4f4f5 100%)",
    glow: "rgba(82, 82, 91, 0.18)",
    className: "md:col-span-3 xl:col-span-3",
  },
];

export const softwareProjects = [
  {
    name: "Salli-Pettiya",
    type: "Money / Savings Product",
    status: "Concept Build",
    description:
      "A modern finance-focused product direction built around personal tracking, clarity, and calm interaction design.",
    details: ["Dashboard thinking", "Mobile-first UX", "Clean financial visuals"],
    accent: "linear-gradient(135deg, rgba(209, 250, 229, 0.92), rgba(255, 255, 255, 0.88) 48%, rgba(204, 251, 241, 0.84))",
    glow: "rgba(16, 185, 129, 0.18)",
    href: "#contact",
    cta: "Discuss Build",
  },
  {
    name: "ProKade",
    type: "Retail / Product System",
    status: "Case Study",
    description:
      "A retail platform concept focused on smooth storefront browsing, inventory clarity, and premium UI rhythm.",
    details: ["Retail workflows", "Product discovery", "Conversion-led interface"],
    accent: "linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(255, 255, 255, 0.88) 48%, rgba(224, 231, 255, 0.84))",
    glow: "rgba(59, 130, 246, 0.18)",
    href: "#contact",
    cta: "View Direction",
  },
  {
    name: "QR Studio",
    type: "Live Tool",
    status: "Published",
    description:
      "A finished utility presented with cleaner controls and a stronger product feel than a typical generator.",
    details: ["Generator UX", "Quick export flow", "Sharper presentation"],
    accent: "linear-gradient(135deg, rgba(254, 243, 199, 0.92), rgba(255, 255, 255, 0.88) 48%, rgba(254, 249, 195, 0.84))",
    glow: "rgba(245, 158, 11, 0.18)",
    href: "https://adheesha-qr-generator.vercel.app/",
    cta: "Open Project",
  },
  {
    name: "Vault Guard",
    type: "Live Tool",
    status: "Published",
    description:
      "A security utility with calmer visual language, readable structure, and useful everyday interaction.",
    details: ["Security utility", "Clearer controls", "Practical interface"],
    accent: "linear-gradient(135deg, rgba(226, 232, 240, 0.92), rgba(255, 255, 255, 0.88) 48%, rgba(241, 245, 249, 0.84))",
    glow: "rgba(71, 85, 105, 0.18)",
    href: "https://adheesha-secure-password-generator.vercel.app/",
    cta: "Open Project",
  },
];

export const galleryItems = [
  {
    title: "Poster Systems",
    category: "Graphic Design",
    description: "Bold hierarchy, contrast, and editorial framing for social and promotional pieces.",
    accent: "linear-gradient(160deg, rgba(249, 220, 170, 0.8), rgba(255, 255, 255, 0.6), rgba(245, 158, 11, 0.25))",
    height: "h-[320px]",
  },
  {
    title: "Portrait Mood Frames",
    category: "Photography",
    description: "Soft light, stronger subject focus, and high-presence portrait direction.",
    accent: "linear-gradient(160deg, rgba(209, 213, 219, 0.7), rgba(255, 255, 255, 0.6), rgba(148, 163, 184, 0.3))",
    height: "h-[420px]",
  },
  {
    title: "Brand Presentation",
    category: "Graphic Design",
    description: "Layouts that make visual identity feel intentional instead of generic.",
    accent: "linear-gradient(160deg, rgba(254, 215, 170, 0.7), rgba(255, 255, 255, 0.65), rgba(251, 146, 60, 0.28))",
    height: "h-[360px]",
  },
  {
    title: "Storytelling Shots",
    category: "Photography",
    description: "Scenes and compositions designed to carry mood, not just documentation.",
    accent: "linear-gradient(160deg, rgba(224, 231, 255, 0.75), rgba(255, 255, 255, 0.6), rgba(99, 102, 241, 0.22))",
    height: "h-[300px]",
  },
  {
    title: "Social Visual Kits",
    category: "Graphic Design",
    description: "Crisp assets for campaigns, announcements, and visual storytelling.",
    accent: "linear-gradient(160deg, rgba(252, 231, 243, 0.75), rgba(255, 255, 255, 0.6), rgba(236, 72, 153, 0.18))",
    height: "h-[380px]",
  },
  {
    title: "Light and Contrast",
    category: "Photography",
    description: "Use of tonal separation and framing to shape atmosphere.",
    accent: "linear-gradient(160deg, rgba(220, 252, 231, 0.75), rgba(255, 255, 255, 0.62), rgba(34, 197, 94, 0.16))",
    height: "h-[340px]",
  },
];

export const educationItems = [
  {
    title: "UCSC",
    subtitle: "Computing-oriented academic exposure",
    body: "Expanded digital problem solving and academic thinking that support product decisions and frontend quality.",
    image: ucscLogo,
    href: "http://www.ucsc.cmb.ac.lk/",
  },
  {
    title: "NIBM",
    subtitle: "Structured technology learning",
    body: "Built a stronger practical software base with attention to systems, structure, and modern digital execution.",
    image: nibmLogo,
    href: "https://www.nibm.lk/",
  },
  {
    title: "IBMS",
    subtitle: "Business and communication exposure",
    body: "Added broader perspective that supports clearer product thinking, communication, and presentation quality.",
    image: ibmsLogo,
    href: "https://www.google.com/search?q=IBMS+Sri+Lanka",
  },
  {
    title: "ACC",
    subtitle: "Professional growth milestone",
    body: "Strengthened discipline, process, and confidence in producing cleaner digital and creative output.",
    image: accLogo,
    href: "https://www.google.com/search?q=ACC+Sri+Lanka+education",
  },
  {
    title: "SLEGA",
    subtitle: "Leadership and growth learning",
    body: "Supported confidence, soft-skill growth, and a more mature approach to creative and technical work.",
    image: slegaLogo,
    href: "https://www.google.com/search?q=SLEGA+Sri+Lanka",
  },
  {
    title: "Earth",
    subtitle: "Wider learning base",
    body: "Added a broader educational layer that continues to support curiosity, range, and creative adaptability.",
    image: earthLogo,
    href: "https://www.google.com/search?q=Earth+Sri+Lanka+education",
  },
];

export const experienceItems = [
  {
    title: "Kalana",
    subtitle: "Creative / Digital Work",
    body: "Worked on polished digital execution with attention to presentation, layout, and higher-quality output.",
    image: kalanaLogo,
    href: "https://kalana.lk/",
  },
  {
    title: "Olympus",
    subtitle: "Product-facing Creative Support",
    body: "Contributed to product-facing creative work where cleaner interface quality and fast delivery mattered.",
    image: olympusLogo,
    href: "https://olympus.lk/",
  },
];

export const achievementItems = [
  {
    year: "Achievement",
    title: "Live Utility Tools",
    subtitle: "Public product output",
    body: "Shipped multiple live tools that turned self-learning into accessible, real-world digital products.",
  },
  {
    year: "Achievement",
    title: "Portfolio Evolution",
    subtitle: "Continuous refinement",
    body: "Kept improving visual quality, responsiveness, and interaction polish across the whole portfolio system.",
  },
];

export const certificateItems = [
  {
    title: "Web Design for Beginners",
    label: "Foundation Certificate",
    description:
      "A core certificate focused on layout thinking, interface basics, and cleaner visual presentation for modern websites.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(255,247,230,0.9), rgba(245,158,11,0.14))",
    glow: "rgba(245, 158, 11, 0.24)",
    image: webDesignCertificate,
    orientation: "landscape",
  },
  {
    title: "Creative Progress Level 1",
    label: "Skill Milestone",
    description:
      "Marks an early certification step that strengthened consistency, digital craft, and practical execution quality.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(238,242,255,0.88), rgba(99,102,241,0.14))",
    glow: "rgba(99, 102, 241, 0.22)",
    image: certificateLevel1,
    orientation: "landscape",
  },
  {
    title: "Creative Progress Level 2",
    label: "Advanced Milestone",
    description:
      "Builds on the previous level with better refinement, stronger output confidence, and more polished digital delivery.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(236,253,245,0.88), rgba(16,185,129,0.14))",
    glow: "rgba(16, 185, 129, 0.22)",
    image: certificateLevel2,
    orientation: "landscape",
  },
  {
    title: "Certificate Archive 457",
    label: "Recognition Record",
    description:
      "An additional certified achievement preserved as part of the broader learning and creative growth journey.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(241,245,249,0.9), rgba(71,85,105,0.13))",
    glow: "rgba(71, 85, 105, 0.22)",
    image: certificate457,
    orientation: "portrait",
  },
];

export const bookshelfItems = [
  {
    title: "Design Thinking",
    tone: "Product Systems",
    color: "from-amber-300 to-yellow-500",
    height: "h-56",
  },
  {
    title: "Creative Discipline",
    tone: "Taste & Consistency",
    color: "from-zinc-700 to-zinc-900",
    height: "h-64",
  },
  {
    title: "UI Writing & Clarity",
    tone: "Human Interfaces",
    color: "from-sky-300 to-cyan-500",
    height: "h-52",
  },
  {
    title: "Visual Hierarchy",
    tone: "Readable Screens",
    color: "from-rose-300 to-pink-500",
    height: "h-60",
  },
  {
    title: "Creative Growth",
    tone: "Learning Mindset",
    color: "from-emerald-300 to-teal-500",
    height: "h-48",
  },
];

export const contactContent = {
  title: "Let us build something modern, premium, and useful.",
  body:
    "From portfolio redesigns to landing pages and practical web tools, the focus is always on stronger presentation, smoother motion, and cleaner frontend quality.",
  bullets: [
    "Portfolio redesigns and landing pages",
    "Product-style web utilities and dashboards",
    "Responsive UI systems with motion polish",
  ],
};

