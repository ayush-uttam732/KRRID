import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { BookDemoModalProvider } from "@/components/BookDemoModalContext";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { headers } from "next/headers"



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Krrid - Nuturing Young Minds",
  description: "The ultimate destination where games meet learning, and strategy builds success!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isChessPage = pathname.startsWith("/chess");
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:Krrid Academy" content="Krrid Academy" />
        <meta property="og:image" content="https://krrid.com/favicon.ico" />
        <meta property="og:title" content="Krrid Academy" />
        <meta
          name="og:description"
          content="The ultimate destination where games meet learning, and strategy builds success!"
        />
        <meta name="twitter:image" content="https://krrid.com/favicon.ico" />
        <meta name="facebook:image" content="https://krrid.com/favicon.ico" />
        <meta name="instagram:image" content="https://krrid.com/favicon.ico" />
        <meta name="linkedin:image" content="https://krrid.com/favicon.ico" />
        <meta name="youtube:image" content="https://krrid.com/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KRRID",
              url: "https://krrid.com",
              logo: "https://krrid.com/favicon.ico",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <BookDemoModalProvider>
          <AnnouncementBar />
          {!isChessPage && <Navbar />}
          {children}
          {/* Footer */}
          <footer className="bg-black text-white pt-10 pb-0 px-0   mt-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-center max-w-7xl mx-auto gap-8 px-4 sm:px-8">
              <div className="flex flex-col gap-2 items-center md:items-start mt-2 w-full md:w-auto text-center md:text-left">
              <Link href="/">
                  <Image
                  src="/logo.svg"
                  alt="Krrid Logo"
                  
                  width={80}
                  height={40}
                />
               </Link>
                
                <span className="text-lg sm:text-lg leading-tight mt-4">
                  Shiddhart Vihar, Gaur City 2,
                  <br />
                  Ghaziabad, Uttar Pradesh
                  <br />
                  201009
                </span>
                <div className="flex space-x-4 mt-2 justify-center md:justify-start w-full hover:scale-110 transition-all duration-300">
                  <a
                    href="https://www.facebook.com/share/19SDM5ZBzq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <FaFacebook className="w-6 h-6 text-blue-500" />
                  </a>
                  <a
                    href="https://www.instagram.com/krridofficial?igsh=ZzBsNml1aHIzcXg4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <FaInstagram className="w-6 h-6 text-pink-500" />
                  </a>
                  <a
                    href="https://m.youtube.com/@krridchessacademy?fbclid=PAQ0xDSwLO4aZleHRuA2FlbQIxMAABp8pcv3lwcJPoZ1weAdwdL8C24kTmVySwaxqoeHUOqx2OPuquMCSD23ljlYgF_aem_qYJa_gO9BGIFGc_mHMEECA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <FaYoutube className="w-6 h-6 text-red-500" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/106782900/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <FaLinkedin className="w-6 h-6 text-sky-500" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row  items-center gap-5  md:items-end w-full md:w-auto  md:mt-0 text-center md:text-right">
                <span className="font-heading text-xl sm:text-2xl font-Inter font-semibold text-white leading-tight">
                  Have Any Questions?
                  <br />
                  Please Don&apos;t Hesitate To <br /> Connect With Us -
                </span>
                <div className="flex flex-col gap-2 items-center  px-4 max-w-full overflow-x-auto">
                  <span className="bg-gradient-to-r from-[#47D4EB] to-[#000000] text-white px-4 py-1 font-heading font-semibold text-base sm:text-base tracking-wide rounded inline-block whitespace-nowrap">
                    +91 7275033235
                  </span>
                  <span className="bg-gradient-to-r from-[#47D4EB] to-[#000000] text-white px-4 py-1 font-heading font-semibold text-base sm:text-base tracking-wide rounded inline-block whitespace-nowrap">
                    officialkrrid@gmail.com
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#47D4EB] w-full mt-8 py-2 px-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center max-w-full text-xs sm:text-sm text-black font-semibold tracking-wide gap-2 sm:gap-0">
              <span className="font-Inter font-semibold text-center text-sm md:text-sm md:ml-35 w-full sm:w-auto">
                Copyright © 2025 Krrid
              </span>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-sm md:text-sm items-center md:mr-25 w-full sm:w-auto justify-center sm:justify-end">
                <Link href="/terms-and-conditions" className="hover:underline cursor-pointer">
                  Terms and Conditions
                </Link>
                <Link href="/privacy-policy" className="hover:underline cursor-pointer">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </footer>
          <SpeedInsights />
          <Analytics />
        </BookDemoModalProvider>
      </body>
    </html>
  );
}