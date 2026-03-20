import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Adheesha Sooriyaarachchi | Creative Developer",
  description:
    "Premium glassmorphism portfolio for Adheesha Sooriyaarachchi built with Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
        <Script id="chatway-widget" src="https://cdn.chatway.app/widget.js?id=dqkNTqEXV67t" strategy="afterInteractive" />
      </body>
    </html>
  );
}
