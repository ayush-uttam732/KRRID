import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { BookDemoModalProvider } from "@/components/BookDemoModalContext";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Krrid - Learn Chess the Smart Way",
  description: "Learn chess through interactive lessons, AI matches, and strategic puzzles with Krrid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning={true}>
        <BookDemoModalProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          {/* Footer */}
          <footer className="bg-black text-white pt-12 pb-0 px-0 rounded-t-[8rem] mt-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-5 px-1">
              <div className="flex flex-col gap-2 ml-0 items-start mt-2">
                <Image src="/logo.svg" alt="Krrid Logo" width={80} height={40} />
                <span className="text-lg leading-tight mt-4">Shiddhart Vihar, Gaur City 2,<br />Ghaziabad, Uttar Pradesh<br />201009</span>
                <div className="flex space-x-4 mt-2">
                  <a href="https://www.facebook.com/share/19SDM5ZBzq/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="w-6 h-6 text-blue-600" />
                  </a>
                  <a href="https://www.instagram.com/krridofficial?igsh=ZzBsNml1aHIzcXg4" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-6 h-6 text-pink-500" />
                  </a>
                  <a href="https://m.youtube.com/@krridchessacademy?fbclid=PAQ0xDSwLO4aZleHRuA2FlbQIxMAABp8pcv3lwcJPoZ1weAdwdL8C24kTmVySwaxqoeHUOqx2OPuquMCSD23ljlYgF_aem_qYJa_gO9BGIFGc_mHMEECA" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="w-6 h-6 text-blue-400" />
                  </a>
                  <a href="https://www.linkedin.com/company/106782900/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-6 h-6 text-blue-700" />
                  </a>
                </div>
              </div>
              <div className="flex flex-row gap-70 items-start md:items-end">
                <span className="font-heading text-2xl font-Inter font-semibold text-white text-left leading-tight">Have Any Questions?<br />Please Don&apos;t Hesitate To <br/> Connect With Us -</span>
                <div className="flex flex-col gap-2 items-start md:items-start">
                  <span className="bg-gradient-to-r from-[#47D4EB]/100 to-[#000000]/100 text-white px-2 py-1 font-heading font-semibold text-base tracking-wide">+91 72750 33235</span>
                  <span className="bg-gradient-to-r from-[#47D4EB]/100 to-[#000000]/100 text-white px-2 py-1 font-heading font-semibold text-base tracking-wide">officialkrrid@Gmail.Com</span>
                </div>
              </div>
            </div>
            <div className="bg-[#47D4EB] w-full mt-8 py-2 px-0 flex flex-col md:flex-row justify-between items-center max-w-full text-xs text-black font-semibold tracking-wide">
              <span className="ml-[8rem] font-Inter font-semibold ">Copyright © 2025 Krrid</span>
              <div className="flex gap-15 mr-[5rem] mt-2 md:mt-0">
                <Link href="/refund-policy" className="hover:underline cursor-pointer">Refund Policy</Link>
                <Link href="/terms-and-conditions" className="hover:underline cursor-pointer">Terms and Conditions</Link>
                <Link href="/privacy-policy" className="hover:underline cursor-pointer">Privacy Policy</Link>
              </div>
            </div>
          </footer>
        </BookDemoModalProvider>
      </body>
    </html>
  );
}
