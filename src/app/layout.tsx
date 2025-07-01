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
  title: "Krrid - Nuturing Young Minds",
  description: "The ultimate destination where games meet learning, and strategy builds success!",
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
          <footer className="bg-black text-white pt-10 pb-0 px-0 rounded-t-[3rem] sm:rounded-t-[8rem] mt-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-center max-w-7xl mx-auto gap-8 px-4 sm:px-8">
              <div className="flex flex-col gap-2 items-center md:items-start mt-2 w-full md:w-auto text-center md:text-left">
                <Image src="/logo.svg" alt="Krrid Logo" width={80} height={40} />
                <span className="text-base sm:text-lg leading-tight mt-4">Shiddhart Vihar, Gaur City 2,<br />Ghaziabad, Uttar Pradesh<br />201009</span>
                <div className="flex space-x-4 mt-2 justify-center md:justify-start w-full">
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
              <div className="flex flex-row gap-4 gap-[18em] items-center md:items-end w-full md:w-auto mt-8 md:mt-0 text-center md:text-right">
                <span className="font-heading text-lg sm:text-2xl font-Inter font-semibold text-white leading-tight">Have Any Questions?<br />Please Don&apos;t Hesitate To <br/> Connect With Us -</span>
                <div className="flex flex-col gap-2 items-center md:items-end w-full md:w-auto">
                  <span className="bg-gradient-to-r from-[#47D4EB]/100 to-[#000000]/100 text-white px-2 py-1 font-heading font-semibold text-sm sm:text-base tracking-wide rounded w-full md:w-auto inline-block text-center md:text-right">+91 72750 33235</span>
                  <span className="bg-gradient-to-r from-[#47D4EB]/100 to-[#000000]/100 text-white px-2 py-1 font-heading font-semibold text-sm sm:text-base tracking-wide rounded w-full md:w-auto inline-block text-center md:text-right">officialkrrid@Gmail.Com</span>
                </div>
              </div>
            </div>
            <div className="bg-[#47D4EB] w-full mt-8 py-2 px-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center max-w-full text-xs sm:text-sm text-black font-semibold tracking-wide gap-2 sm:gap-0">
              <span className="font-Inter font-semibold text-center  ml-35 w-full sm:w-auto">Copyright © 2025 Krrid</span>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center mr-25 w-full sm:w-auto justify-center sm:justify-end">
                {/* <Link href="/refund-policy" className="hover:underline cursor-pointer">Refund Policy</Link> */}
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
