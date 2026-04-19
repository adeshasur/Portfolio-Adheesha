import portraitImage from "../ppimage.png";
import ucscLogo from "../resources/Education/ucsc.jpg";
import nibmLogo from "../resources/Education/nibm.jpg";
import ibmsLogo from "../resources/Education/ibms.png";
import accLogo from "../resources/Education/acc.jpg";
import slegaLogo from "../resources/Education/slega.jpg";
import earthLogo from "../resources/Education/earth.jpg";
import kalanaLogo from "../resources/Working Experience/Kalana.png";
import olympusLogo from "../resources/Working Experience/olympus.jpg";
import certificate457 from "../resources/Certificates/457.jpg";
import certificate74828 from "../resources/Certificates/74828ada-c2b2-44a7-aa45-b02334370d1b.jpg";
import certificateLevel1 from "../resources/Certificates/Certificate_Adeesha_level_1.jpg";
import certificateLevel2 from "../resources/Certificates/Certificate_Adeesha_level_2.jpg";
import certificateUdemyA from "../resources/Certificates/UC-7c635141-ab61-4515-850e-9aa65845edea.jpg";
import certificateUdemyB from "../resources/Certificates/UC-f198e274-f254-4a13-9f41-23e9ace39a05.jpg";
import webDesignCertificate from "../resources/Certificates/Web_Design_for_Beginners_E-Certificate.jpg";
import auraMobileImage from "../resources/Software Projects/Aura Mobile.png";
import nibmGpaCalculatorImage from "../resources/Software Projects/nibm gpa cal.png";
import fuelTrackerHomeImage from "../resources/Software Projects/Fuel-Service-Tracker Preview/Home1.jpeg";
import fuelTrackerDashboardImage from "../resources/Software Projects/Fuel-Service-Tracker Preview/Home2.jpeg";
import fuelTrackerNearbyImage from "../resources/Software Projects/Fuel-Service-Tracker Preview/Nearby.jpeg";
import fuelTrackerVaultImage from "../resources/Software Projects/Fuel-Service-Tracker Preview/Document Valut.jpeg";
import fuelTrackerAccountImage from "../resources/Software Projects/Fuel-Service-Tracker Preview/Acount.jpeg";
import bitDitLogo from "../resources/Achievements & Events/Bit Dit Level 1/Bit Dit Level 1.jpeg";
import bitDitEvent from "../resources/Achievements & Events/Bit Dit Level 1/1766251249090.jpg";
import oracleApex1 from "../resources/Achievements & Events/Oracal APEX AI Nexus 2026/1774627948937.jpg";
import oracleApex2 from "../resources/Achievements & Events/Oracal APEX AI Nexus 2026/1774627946869.jpg";
import oracleApex3 from "../resources/Achievements & Events/Oracal APEX AI Nexus 2026/1774627945867.jpg";
import oracleApex4 from "../resources/Achievements & Events/Oracal APEX AI Nexus 2026/1774627944648.jpg";
import graphicIntroImage from "../resources/Grapic Design/2027 introduction.jpg";
import chemClassImage from "../resources/Grapic Design/chem class.jpg";
import sishyathwaPanthiImage from "../resources/Grapic Design/Sishyathwa Panthi 01.jpg";
import cameraEditPreview01 from "../resources/Video Edits/Camera Record Edit Videos/01.gif";
import cameraEditPreview02 from "../resources/Video Edits/Camera Record Edit Videos/02.gif";
import cameraEditPreview03 from "../resources/Video Edits/Camera Record Edit Videos/03.gif";
import aiVideoPreview01 from "../resources/Video Edits/AI Generated Videos/01.gif";
import aiVideoPreview02 from "../resources/Video Edits/AI Generated Videos/02.gif";
import aiVideoPreview03 from "../resources/Video Edits/AI Generated Videos/03.gif";
import stageVideoPreview01 from "../resources/Video Edits/Stage Teaching + Text Videos/01.gif";
import stageVideoPreview02 from "../resources/Video Edits/Stage Teaching + Text Videos/02.gif";
import stageVideoPreview03 from "../resources/Video Edits/Stage Teaching + Text Videos/03.gif";
import stageVideoPreview04 from "../resources/Video Edits/Stage Teaching + Text Videos/04.gif";
import stageVideoPreview05 from "../resources/Video Edits/Stage Teaching + Text Videos/05.gif";
import mobilePersonalPreview01 from "../resources/Video Edits/Mobile Shoot Personal Videos/01.gif";

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
    "I am Adheesha Sooriyaarachchi, a creative developer focused on premium portfolios, useful tools, and UI systems that feel modern on both desktop and mobile, currently an undergraduate at NIBM and a diploma holder from UCSC.",
  portraitHighlight: "Software Engineering Student & Creative Developer.",
  portraitNote:
    "Specializing in building high-performance, scalable web systems with a focus on seamless user experiences and modern, clean UI architecture.",
  portraitCaption: "Professional Graphic Design & Video Editing.",
  portrait: portraitImage,
  stats: [
    { label: "FOCUS", value: "Engineering & Creative Design" },
    { label: "STYLE", value: "Premium UI & Smooth Motion" },
    { label: "BASE", value: "Software & Media Foundation" },
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
  { href: "/tools", label: "Toolkit" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "education", label: "Education" },

  { id: "certificates", label: "Certificates" },
  { id: "books", label: "Books" },
  { id: "contact", label: "Contact" },
];

export const toolkitItems = [
  {
    name: "NIC Decoder",
    shortCode: "NIC",
    icon: "IdCard",
    href: "https://adheesha-nic-finder.vercel.app/",
    category: "Identity Utility",
    description: "Decode NIC details through a faster and cleaner utility experience.",
    accent: "linear-gradient(135deg, #def7e5 0%, #ffffff 54%, #f7fee7 100%)",
    glow: "rgba(56, 189, 120, 0.22)",
    className: "",
  },
  {
    name: "QR Studio",
    shortCode: "QR",
    icon: "QrCode",
    href: "https://adheesha-qr-generator.vercel.app/",
    category: "Generator",
    description: "Generate QR outputs with polished controls and a product-led feel.",
    accent: "linear-gradient(135deg, #fef3c7 0%, #ffffff 54%, #fefce8 100%)",
    glow: "rgba(245, 158, 11, 0.22)",
    className: "",
  },
  {
    name: "Vault Guard",
    shortCode: "VG",
    icon: "ShieldCheck",
    href: "https://adheesha-secure-password-generator.vercel.app/",
    category: "Security Tool",
    description: "Calm password generation UI with cleaner decision flow.",
    accent: "linear-gradient(135deg, #e2e8f0 0%, #ffffff 56%, #f0f9ff 100%)",
    glow: "rgba(71, 85, 105, 0.24)",
    className: "",
  },
  {
    name: "Postal Code Finder",
    shortCode: "PCF",
    icon: "MapPin",
    href: "https://adheesha-sl-postal-code-finder.vercel.app/",
    category: "Lookup Tool",
    description: "Quick postcode search with practical clarity.",
    accent: "linear-gradient(135deg, #f5e7d0 0%, #ffffff 54%, #ffedd5 100%)",
    glow: "rgba(217, 119, 6, 0.2)",
    className: "",
  },
  {
    name: "Text Transformer Pro",
    shortCode: "TTP",
    icon: "RotateCw",
    href: "https://adheesha-text-transformer.vercel.app/",
    category: "Productivity",
    description: "A sharper text formatting utility for daily workflows.",
    accent: "linear-gradient(135deg, #d8f3ff 0%, #ffffff 56%, #f8fafc 100%)",
    glow: "rgba(14, 165, 233, 0.2)",
    className: "",
  },
  {
    name: "Meta Tag Generator",
    shortCode: "MTG",
    icon: "FileCode",
    href: "https://adheesha-meta-tags-generator.vercel.app/",
    category: "SEO Utility",
    description: "Generate clean head meta tags, OG tags, and Twitter tags from one live form.",
    accent: "linear-gradient(135deg, #f1f5f9 0%, #ffffff 56%, #e5e7eb 100%)",
    glow: "rgba(63, 63, 70, 0.18)",
    className: "",
  },
  {
    name: "Chroma Craft",
    shortCode: "CC",
    icon: "Palette",
    href: "https://adheesha-chroma-craft.vercel.app/",
    category: "Creative Tool",
    description: "Explore color systems through a more visual interface.",
    accent: "linear-gradient(135deg, #ffe4e6 0%, #ffffff 54%, #ffedd5 100%)",
    glow: "rgba(244, 63, 94, 0.18)",
    className: "",
  },
  {
    name: "Interest Calc Pro",
    shortCode: "ICP",
    icon: "Calculator",
    href: "https://adheesha-interest-calc.vercel.app/",
    category: "Finance Calculator",
    description: "Interest calculations presented with speed and clarity.",
    accent: "linear-gradient(135deg, #e5e7eb 0%, #ffffff 54%, #f4f4f5 100%)",
    glow: "rgba(82, 82, 91, 0.18)",
    className: "",
  },
  {
    name: "Image Compressor",
    shortCode: "IC",
    icon: "ImageIcon",
    href: "https://adheesha-image-compressor.vercel.app/",
    category: "Productivity",
    description: "Optimize and compress image assets directly in your browser with pro quality.",
    accent: "linear-gradient(135deg, #f5f5f4 0%, #ffffff 54%, #fafaf9 100%)",
    glow: "rgba(120, 113, 108, 0.2)",
    className: "",
  },
];
export const toolkitGroups = [
  {
    id: "identity-lookup",
    title: "Identity & Lookup",
    eyebrow: "Daily Utilities",
    description: "Fast-access tools for decoding details, searching records, and handling practical lookup work.",
    accent: "linear-gradient(145deg, rgba(220, 252, 231, 0.85), rgba(255, 255, 255, 0.74), rgba(224, 242, 254, 0.78))",
    glow: "rgba(56, 189, 120, 0.16)",
    items: toolkitItems.filter((item) => ["NIC Decoder", "Postal Code Finder"].includes(item.name)),
  },
  {
    id: "creative-productivity",
    title: "Creative & Productivity",
    eyebrow: "Make & Format",
    description: "Tools for generating assets, transforming content, and shaping cleaner visual output faster.",
    accent: "linear-gradient(145deg, rgba(254, 240, 138, 0.78), rgba(255, 255, 255, 0.8), rgba(253, 230, 138, 0.72))",
    glow: "rgba(245, 158, 11, 0.16)",
    items: toolkitItems.filter((item) => ["QR Studio", "Text Transformer Pro", "Meta Tag Generator", "Chroma Craft", "Image Compressor"].includes(item.name)),
  },
  {
    id: "security-finance",
    title: "Security & Finance",
    eyebrow: "Safer Decisions",
    description: "Practical tools built around protection, calculation clarity, and everyday personal workflow support.",
    accent: "linear-gradient(145deg, rgba(226, 232, 240, 0.84), rgba(255, 255, 255, 0.78), rgba(224, 231, 255, 0.74))",
    glow: "rgba(71, 85, 105, 0.16)",
    items: toolkitItems.filter((item) => ["Vault Guard", "Interest Calc Pro"].includes(item.name)),
  },
];

export const softwareProjects = [
  {
    name: "Fuel & Service Tracker",
    type: "Mobile App / React Native",
    status: "Demo Available",
    description:
      "A local-first vehicle management app with service reminders, fuel analytics, nearby station discovery, and document tracking in one mobile experience.",
    longDescription:
      "Built with React Native and Expo Router, this mobile app helps drivers manage maintenance cycles, monitor fuel spending, discover nearby services, and keep important vehicle documents organized with a polished dashboard flow.",
    details: ["Local-first data", "Maintenance alerts", "Fuel analytics", "Document vault"],
    accent: "linear-gradient(135deg, rgba(191, 219, 254, 0.92), rgba(255, 255, 255, 0.88) 48%, rgba(224, 231, 255, 0.86))",
    icon: "⛽",
    glow: "rgba(37, 99, 235, 0.18)",
    cta: "Open Preview",
    image: fuelTrackerHomeImage,
    imageAlt: "Fuel and Service Tracker home dashboard preview",
    imageContain: true,
    previewLabel: "Mobile App Preview",
    shots: [
      {
        title: "Dashboard Overview",
        description: "A quick summary screen for fuel records, vehicles, reminders, and usage trends.",
        image: fuelTrackerHomeImage,
      },
      {
        title: "Detailed Dashboard",
        description: "Expanded metrics and cleaner at-a-glance tracking for the user's vehicle activity.",
        image: fuelTrackerDashboardImage,
      },
      {
        title: "Nearby Services",
        description: "Find nearby fuel stations and service points with a more practical mobile map flow.",
        image: fuelTrackerNearbyImage,
      },
      {
        title: "Document Vault",
        description: "Store vehicle-related documents and keep expiry-related information easier to manage.",
        image: fuelTrackerVaultImage,
      },
      {
        title: "Account & Settings",
        description: "User profile, preferences, and app-level settings collected into one tidy control area.",
        image: fuelTrackerAccountImage,
      },
    ],
    links: [
      {
        label: "Watch Demo",
        href: "https://www.linkedin.com/posts/activity-7448344199063601152-m9H7",
      },
      {
        label: "View Repository",
        href: "https://github.com/adeshasur/Fuel-Service-Tracker",
      },
    ],
  },
  {
    name: "Aura Mobile",
    type: "Mobile App / Live Project",
    status: "Published",
    description:
      "A polished mobile-focused project presented with a dedicated preview and direct live access.",
    details: ["Mobile UI", "Live deployment", "Product showcase"],
    accent: "linear-gradient(135deg, rgba(251, 207, 232, 0.92), rgba(255, 255, 255, 0.88) 48%, rgba(224, 231, 255, 0.84))",
    icon: "📱",
    glow: "rgba(236, 72, 153, 0.18)",
    href: "https://aura-mobile-seven.vercel.app/",
    cta: "Open Project",
    image: auraMobileImage,
    imageAlt: "Aura Mobile project preview",
  },
  {
    name: "NIBM GPA Calculator",
    type: "Web App / Live Project",
    status: "Published",
    description:
      "A student-focused GPA calculator built for NIBM coursework with a cleaner interface, quick inputs, and live result feedback.",
    details: ["Student utility", "Responsive UI", "Live deployment"],
    accent: "linear-gradient(135deg, rgba(191, 219, 254, 0.92), rgba(255, 255, 255, 0.88) 48%, rgba(220, 252, 231, 0.84))",
    icon: "🎓",
    glow: "rgba(59, 130, 246, 0.18)",
    href: "https://nibm-gpa-calculator.vercel.app/",
    cta: "Open Project",
    image: nibmGpaCalculatorImage,
    imageAlt: "NIBM GPA Calculator project preview",
  },
];

export const galleryItems = [
  {
    title: "2027 Introduction",
    category: "Graphic Design",
    description: "An introduction poster built with stronger hierarchy, cleaner spacing, and a sharper event-style presentation.",
    accent: "linear-gradient(160deg, rgba(249, 220, 170, 0.8), rgba(255, 255, 255, 0.6), rgba(245, 158, 11, 0.25))",
    height: "h-[360px]",
    image: graphicIntroImage,
    imageAlt: "2027 introduction graphic design poster",
  },
  {
    title: "Chem Class Poster",
    category: "Graphic Design",
    description: "A classroom poster composition shaped around clearer copy balance and a more promotional visual rhythm.",
    accent: "linear-gradient(160deg, rgba(254, 215, 170, 0.7), rgba(255, 255, 255, 0.65), rgba(251, 146, 60, 0.28))",
    height: "h-[340px]",
    image: chemClassImage,
    imageAlt: "Chem class graphic design poster",
  },
  {
    title: "Sishyathwa Panthi 01",
    category: "Graphic Design",
    description: "A tuition-poster style visual with bold emphasis, structured information blocks, and stronger campaign clarity.",
    accent: "linear-gradient(160deg, rgba(252, 231, 243, 0.75), rgba(255, 255, 255, 0.6), rgba(236, 72, 153, 0.18))",
    height: "h-[420px]",
    image: sishyathwaPanthiImage,
    imageAlt: "Sishyathwa Panthi 01 graphic design poster",
  },
  {
    title: "Oracle AI Nexus 2026",
    category: "Technical Event",
    description: "Capturing moments from the Oracle APEX AI Nexus 2026 conference, exploring next-generation enterprise AI solutions.",
    accent: "linear-gradient(160deg, rgba(220, 230, 255, 0.75), rgba(255, 255, 255, 0.6), rgba(59, 130, 246, 0.22))",
    height: "h-[380px]",
    image: oracleApex4,
    imageAlt: "Oracle APEX AI Nexus 2026 event photo",
  },
];

export const videoShowcaseGroups = [
  {
    id: "camera-edits",
    title: "Camera Record Edit Videos",
    description: "Camera phone recording clips edited and polished for stronger visual flow.",
    platform: "Facebook",
    items: [
      {
        id: "camera-edits-01",
        title: "Camera Edit 01",
        href: "https://web.facebook.com/reel/1807864846838165/",
        previewGif: cameraEditPreview01,
      },
      {
        id: "camera-edits-02",
        title: "Camera Edit 02",
        href: "https://web.facebook.com/share/r/14M8XhVEATF/",
        previewGif: cameraEditPreview02,
      },
      {
        id: "camera-edits-03",
        title: "Camera Edit 03",
        href: "https://web.facebook.com/reel/4148668108681900/",
        previewGif: cameraEditPreview03,
      },
    ],
  },
  {
    id: "ai-videos",
    title: "AI Generated Videos",
    description: "Concept clips created with AI workflows and post-editing refinements.",
    platform: "Facebook",
    items: [
      {
        id: "ai-videos-01",
        title: "AI Video 01",
        href: "https://web.facebook.com/share/r/1aCPYXRQSL/",
        previewGif: aiVideoPreview01,
      },
      {
        id: "ai-videos-02",
        title: "AI Video 02",
        href: "https://web.facebook.com/reel/1846017302946276/",
        previewGif: aiVideoPreview02,
      },
      {
        id: "ai-videos-03",
        title: "AI Video 03",
        href: "https://web.facebook.com/reel/1334742447855640/",
        previewGif: aiVideoPreview03,
      },
      {
        id: "ai-videos-04",
        title: "AI Video 04",
        href: "https://web.facebook.com/share/v/1Kr9h7ncnn/",
      },
    ],
  },
  {
    id: "stage-text-videos",
    title: "Stage Teaching + Text Videos",
    description: "Stage/teaching visuals with text overlays designed for clear message delivery.",
    platform: "Facebook",
    items: [
      {
        id: "stage-text-01",
        title: "Stage Text Video 01",
        href: "https://web.facebook.com/share/v/1CjhGLqMPA/",
        previewGif: stageVideoPreview01,
      },
      {
        id: "stage-text-02",
        title: "Stage Text Video 02",
        href: "https://web.facebook.com/share/r/18VPRVMFhi/",
        previewGif: stageVideoPreview02,
      },
      {
        id: "stage-text-03",
        title: "Stage Text Video 03",
        href: "https://web.facebook.com/reel/1389796569303576/",
        previewGif: stageVideoPreview03,
      },
      {
        id: "stage-text-04",
        title: "Stage Text Video 04",
        href: "https://web.facebook.com/share/r/1Cqher3Cgz/",
        previewGif: stageVideoPreview04,
      },
      {
        id: "stage-text-05",
        title: "Stage Text Video 05",
        href: "https://web.facebook.com/share/v/1JFCEV4PWZ/",
        previewGif: stageVideoPreview05,
      },
    ],
  },
  {
    id: "mobile-personal",
    title: "Mobile Shoot Personal Videos",
    description: "Personal mobile-shot clips. More videos can be added here gradually.",
    platform: "TikTok",
    items: [
      {
        id: "mobile-personal-01",
        title: "Personal Video 01",
        href: "https://www.tiktok.com/@zalxk.u/video/7560636957252963604",
        previewGif: mobilePersonalPreview01,
      },
    ],
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
    imageClassName: "scale-[1.8] md:scale-[2]",
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
    title: "Bit Dit Level 1",
    subtitle: "Achievement milestone",
    body: "Successfully completed the Bit Dit Level 1 certification, marking a significant step in technical proficiency.",
    images: [bitDitLogo, bitDitEvent],
    imageOrientation: "portrait",
  },
  {
    year: "Event",
    title: "Oracle APEX AI Nexus 2026",
    subtitle: "Conference Participation",
    body: "Attended the Oracle APEX AI Nexus 2026, exploring the intersection of low-code development and artificial intelligence.",
    images: [oracleApex1, oracleApex2, oracleApex3, oracleApex4],
    imageOrientation: "landscape",
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
    title: "Udemy Certificate 01",
    label: "Online Learning Certificate",
    description:
      "An additional online course certificate showing continued upskilling in practical digital and web-focused topics.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(244,244,255,0.9), rgba(139,92,246,0.12))",
    glow: "rgba(139, 92, 246, 0.2)",
    image: certificateUdemyA,
    orientation: "landscape",
  },
  {
    title: "Udemy Certificate 02",
    label: "Course Completion",
    description:
      "A further certificate that adds breadth to the portfolio's learning journey and technical confidence.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(232,250,255,0.9), rgba(6,182,212,0.12))",
    glow: "rgba(6, 182, 212, 0.18)",
    image: certificateUdemyB,
    orientation: "landscape",
  },
  {
    title: "Certificate Record 74828",
    label: "Recognition Record",
    description:
      "A certified milestone preserved as part of the wider learning and achievement archive.",
    accent: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(250,245,255,0.9), rgba(168,85,247,0.12))",
    glow: "rgba(168, 85, 247, 0.18)",
    image: certificate74828,
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















