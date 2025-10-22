"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookDemoModal } from "@/components/BookDemoModalContext";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

// Define a User type for Supabase user
interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

export default function Navbar() {
  const { openBookDemoModal } = useBookDemoModal();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user as User);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser((session?.user as User) ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const safePathname = pathname || "";
  // Only show profile button on /chess/multiplayer and its subpages
  const showProfile = safePathname.startsWith("/chess/multiplayer");

  // Use chess page navbar color for profile section
  const getNavbarStyles = () => {
    if (
      safePathname.startsWith("/chess/multiplayer") ||
      safePathname.startsWith("/chess/multiplayer/profile")
    ) {
      return {
        nav: "relative flex items-center justify-between px-6 py-1 border-b border-blue-900/20 top-0 z-50 bg-gradient-to-r from-black to-blue-900/95 backdrop-blur-md",
        text: "text-white",
        hover: "hover:text-blue-300",
        button: "bg-blue-500 hover:bg-blue-600 text-white",
      };
    }
    switch (safePathname) {
      case "/about":
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-blue-900/20 top-0 z-50 bg-[#1A1C2C]/95 backdrop-blur-md",
          text: "text-white",
          hover: "hover:text-blue-300",
          button: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      case "/contact":
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-gray-800/20 top-0 z-50 bg-black/95 backdrop-blur-md",
          text: "text-white",
          hover: "hover:text-gray-300",
          button: "bg-white hover:bg-gray-100 text-black",
        };
      case "/courses-curriculum":
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-gray-200 top-0 z-50 bg-white/95 backdrop-blur-md",
          text: "text-gray-900",
          hover: "hover:text-gray-600",
          button: "bg-gray-900 hover:bg-gray-800 text-white",
        };
      case "/learn":
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-black top-0 z-50 bg-black text-white",
          text: "text-white",
          hover: "hover:text-gray-300",
          button: "bg-sky-500 hover:bg-sky-600 text-white",
        };
      case "/chess":
      case "/chess/play":
      case "/chess/multiplayer":
      case "/chess/puzzles":
      case "/chess/study":
      case "/chess/friends":
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-blue-900/20 top-0 z-50 bg-gradient-to-r from-black to-blue-900/95 backdrop-blur-md",
          text: "text-white",
          hover: "hover:text-blue-300",
          button: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      default: // Home page and other pages
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-gray-100 top-0 z-50 bg-white/100 backdrop-blur-md",
          text: "text-black",
          hover: "hover:text-gray-600",
          button: "bg-black hover:bg-gray-800 text-white",
        };
    }
  };

  const styles = getNavbarStyles();

  // Profile dropdown menu
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  function handleLogout() {
    supabase.auth.signOut();
    setUser(null);
    setProfileMenuOpen(false);
  }

  return (
    <nav className={styles.nav}>
      <div className="flex items-center gap-0  md:ml-[50px] h-[50px] w-[115px] pt-[0px]">
        <Link href="/">
          <Image src="/logo.svg" alt="Krrid Logo" width={155} height={50} />
        </Link>
      </div>
      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 z-50 p-2 focus:outline-none"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="red"
          stroke="skyblue"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-2xl"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {/* Desktop Nav Links */}
      <div className="nav-mid absolute left-1/2 -translate-x-1/2">
        <ul
          className={`hidden md:flex items-center justify-center gap-8 ${styles.text} text-lg font-medium font-poppins`}
        >
          <li
            className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}
          >
            <Link href="/about">About Us</Link>
          </li>
          <li
            className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}
          >
            <Link href="/courses-curriculum">Courses & Curriculum</Link>
          </li>
          <li
            className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}
          >
            <Link href="/blog">Blog</Link>
          </li>
          <li
            className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}
          >
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div
          className="fixed inset-0   md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-full  bg-black/50  overflow-x-hidden  z-50 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col pt-20 px-4 gap-6 ${
          styles.text
        }`}
      >
        <button
          className="absolute top-2 right-6 p-2"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="sky-500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Link
          href="/about"
          className={`block py-2 px-2 text-3xl text-white rounded transition-colors duration-200 ${styles.hover}`}
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/courses-curriculum"
          className={`block py-2 px-2 text-3xl text-white rounded transition-colors duration-200 ${styles.hover}`}
          onClick={() => setMenuOpen(false)}
        >
          Courses & Curriculum
        </Link>
        <Link
          href="/blog"
          className={`block py-2 px-2 text-3xl text-white rounded transition-colors duration-200 ${styles.hover}`}
          onClick={() => setMenuOpen(false)}
        >
          Blog
        </Link>
        <Link
          href="/contact"
          className={`block py-2 px-2 text-3xl text-white rounded transition-colors duration-200 ${styles.hover}`}
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
        <button
          className={`${styles.button} pulse-fade-in-navbar-demo rounded-lg  px-6 py-4 font-heading text-2xl font-semibold transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-black hover:to-sky-400 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/60 mt-4 mb-2`}
          onClick={() => {
            setMenuOpen(false);
            openBookDemoModal();
          }}
        >
          Book a Demo
        </button>
      </div>
      {/* Desktop Book a Demo Button & Profile Button */}
      <div className="flex gap-3 mr-[50px] items-center">
        <button
          className={`${styles.button} pulse-fade-in-navbar-demo rounded-lg px-2 py-2 font-heading text-base font-semibold transition-transform duration-200 cursor-pointer hover:border-3 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-primary/60 hidden md:block`}
          onClick={openBookDemoModal}
        >
          Book a Demo
        </button>
        {showProfile && user && (
          <div className="relative ml-2">
            <button
              onClick={() => setProfileMenuOpen((open) => !open)}
              className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg border-2 border-sky-300 hover:scale-105 transition-transform focus:outline-none"
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <span>
                  {user.user_metadata?.name?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#23272b] text-white rounded-lg shadow-lg py-2 z-50 border border-blue-900">
                <Link
                  href="/chess/multiplayer/profile"
                  className="block px-4 py-2 hover:bg-sky-700 rounded-t-lg"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/student"
                  className="block px-4 py-2 hover:bg-sky-700"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-red-600 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
