import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Adheesha Sooriyaarachchi | Creative Developer & Digital Artist",
  description:
    "Premium portfolio showcasing web development, digital design, video editing, and AI projects. Built with Next.js, React, and modern web technologies.",
  keywords: ["developer", "designer", "video editor", "AI projects", "portfolio", "next.js", "react"],
  authors: [{ name: "Adheesha Sooriyaarachchi" }],
  creator: "Adheesha Sooriyaarachchi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://info-adheesha.vercel.app",
    title: "Adheesha Sooriyaarachchi | Creative Developer & Digital Artist",
    description: "Premium portfolio showcasing web development, digital design, and AI projects",
    siteName: "Adheesha Sooriyaarachchi Portfolio",
    images: [
      {
        url: "https://info-adheesha.vercel.app/ppimage.png",
        width: 1200,
        height: 630,
        alt: "Adheesha Sooriyaarachchi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adheesha Sooriyaarachchi | Creative Developer",
    description: "Explore my portfolio of web development and digital design projects",
    images: ["https://info-adheesha.vercel.app/ppimage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adheesha Sooriyaarachchi",
    url: "https://info-adheesha.vercel.app",
    image: "https://info-adheesha.vercel.app/ppimage.png",
    description: "Creative Developer and Digital Artist",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://www.linkedin.com/in/adheesha-sooriyaarachchi",
      "https://github.com/adeshasur",
      "https://www.instagram.com/adheesha",
      "https://www.facebook.com/adheesha",
    ],
    skills: [
      "Web Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Digital Design",
      "Video Editing",
      "AI Projects",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://info-adheesha.vercel.app" />
        <link rel="preconnect" href="https://cdn.chatway.app" />
        <link rel="dns-prefetch" href="https://cdn.chatway.app" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
        <Script id="chatway-widget" src="https://cdn.chatway.app/widget.js?id=dqkNTqEXV67t" strategy="afterInteractive" />
      </body>
    </html>
  );
}
