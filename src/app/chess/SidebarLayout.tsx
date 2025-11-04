"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChessBoard, FaPuzzlePiece, FaGraduationCap, FaUserFriends } from "react-icons/fa";

const nav = [
  { href: "/chess", label: "Play", icon: <FaChessBoard /> },
  { href: "/chess/puzzles", label: "Puzzles", icon: <FaPuzzlePiece /> },
  { href: "/chess/study", label: "Learn", icon: <FaGraduationCap /> },
  { href: "/chess/friends", label: "Friends", icon: <FaUserFriends /> },
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-[#181a1b] ">
      <aside className="w-64 flex flex-col gap-4 py-10 px-6 bg-gradient-to-b from-black via-[#181a1b] to-[#23272b] border-r border-[#222] shadow-xl rounded-tr-3xl rounded-br-3xl">
        <Link href="/chess" className="text-3xl font-extrabold text-sky-400 mb-10 tracking-tight hover:text-sky-300 transition-colors">Chess</Link>
        {nav.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-heading text-xl font-semibold transition-all duration-150 shadow-sm
              ${pathname === href ? "bg-sky-900 text-sky-200 border-l-4 border-sky-400" : "text-white hover:bg-sky-800 hover:text-sky-200"}`}
          >
            {icon} {label}
          </Link>
        ))}
        <div className="flex-1" />
      </aside>
      <main className="flex-1 flex flex-col items-center justify-start bg-[#23272b] min-h-screen">
        {children}
      </main>
    </div>
  );
} 