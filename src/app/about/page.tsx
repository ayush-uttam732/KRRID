'use client';
import Image from "next/image";
import { FaChess, FaUserGraduate, FaTrophy, FaHeadset, FaLightbulb } from 'react-icons/fa';
import { useState } from "react";
import { useBookDemoModal } from '@/components/BookDemoModalContext';

const team = [
  {
    name: "Anish Singh",
    title: "Founder & CEO",
    img: "/logo1.png",
    bio: "A young visionary founder blending education with innovation to build a smarter next generation through Chess and AI.",
    fun: "Loves solving chess puzzles at midnight!"
  },
  {
    name: "Sudhanshu Singh Patel",
    title: "Co-Founder & COO",
    img: "/logo1.png",
    bio: "A creative executor, turning Krrid’s vision into real-world impact with precision and passion.",
    fun: "Can debug code and solve a Rubik’s cube - often at the same time."
  },
  {
    name: "Vineet Kumar Singh",
    title: "Co-Founder & Head Coach",
    img: "/logo1.png",
    bio: "A FIDE-rated chess maestro and mentor with a gift for spotting talent and shaping champions from day one.",
    fun: "Once played 20 games simultaneously!."
  }
  
];

const impact = [
  { label: "Students Coached", Text: 500 },
  { label: "Tournaments", value: 30 },
  { label: "Satisfaction", value: 99.9 }
];

const features = [
  { icon: <FaUserGraduate size={32} className="text-blue-400" />, title: "Live 1-on-1", desc: "Personalized coaching tailored to each student's needs." },
  { icon: <FaChess size={32} className="text-blue-400" />, title: "Structured Levels", desc: "Clear progression from beginner to elite with real gameplay." },
  { icon: <FaTrophy size={32} className="text-blue-400" />, title: "Tournament Prep", desc: "Practice and compete in friendly tournaments to build confidence." },
  { icon: <FaHeadset size={32} className="text-blue-400" />, title: "24/7 Support", desc: "Get help anytime with our always-on chat and live sessions." }
];

export default function AboutPage() {
  const { openBookDemoModal } = useBookDemoModal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="bg-[#1A1C2C] text-white font-poppins min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 sm:py-24 px-2 sm:px-4 bg-gradient-to-b from-[#1A1C2C] to-[#223a5f]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4 text-center font-playfair">About Krrid</h1>
        <h3 className="text-base sm:text-xl md:text-2xl text-blue-200 font-medium mb-4 sm:mb-8 text-center max-w-4xl">At Krrid, we believe that chess is more than just a game, it’s a way to shape strategic thinkers, confident learners, and resilient minds.</h3> 
        <h4 className="text-base sm:text-xl md:text-2xl text-blue-200 font-regular mb-4 sm:mb-8 text-center max-w-5xl"> <span className="font-bold">Krrid academy</span> is dedicated to <span className="font-bold">nurturing young talents</span> by blending traditional chess techniques with modern teaching methods and fun challenges. We&apos;re here to help children not only play better but think sharper, focus longer, and grow stronger <br/><span className="font-bold">&apos;on and off the board&apos;</span> .</h4>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transition mb-6 sm:mb-8 text-base sm:text-lg" onClick={openBookDemoModal}>Book Free Demo</button>
        <div className="w-full flex justify-center">
          {/* <Image src="/chessboard.svg" alt="Chessboard" width={600} height={220} className="rounded-2xl shadow-2xl" /> */}
        </div>
      </section>

      {/* Our Mission */}
      <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10 py-10 sm:py-20 px-2 sm:px-4">
        <div className="flex-shrink-0 flex justify-center w-full md:w-auto mb-6 md:mb-0">
          <div className="w-36 h-36 sm:w-88 sm:h-88 rounded-full overflow-hidden flex items-center justify-center ">
            <Image src="/logo1.png" alt="logo" width={380} height={380} />
          </div>
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 mb-2 sm:mb-4 font-playfair">Our Mission</h2>
          <p className="text-bold sm:text-base text-gray-200 mb-0 sm:mb-0">To ignite a lifelong passion for learning, focus, and strategic thinking in children through the art of chess.</p>
          <p className="text-bold sm:text-base text-gray-300 mb-4 sm:mb-6">Through engaging sessions, dedicated mentorship, and real-time competitions, we aim to empower students to think critically, compete fearlessly, and carry the strategic spirit of chess into every aspect of their lives.</p>
          <p className="text-bold sm:text-lg text-gray-300 mb-4 sm:mb-6">&quot;Every pawn has the potential to be a queen.&quot; At Krrid, we help kids realize that potential with:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#181f2b] rounded-xl p-4 sm:p-6 flex items-start gap-2 sm:gap-4 shadow border border-blue-900">
              <FaUserGraduate size={24} className="text-blue-400 mt-1 sm:text-[32px]" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-blue-100 mb-1">Personalized Instruction</h4>
                <p className="text-gray-300 text-xs sm:text-sm">Individualized 1-on-1 coaching tailored to each student&apos;s skill and learning pace.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-4 sm:p-6 flex items-start gap-2 sm:gap-4 shadow border border-blue-900">
              <FaChess size={24} className="text-blue-400 mt-1 sm:text-[32px]" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-blue-100 mb-1">Structured Curriculum</h4>
                <p className="text-gray-300 text-xs sm:text-sm">Clear, progressive levels from Beginner to Advanced, filled with hands-on practice and real gameplay.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-4 sm:p-6 flex items-start gap-2 sm:gap-4 shadow border border-blue-900">
              <FaHeadset size={24} className="text-blue-400 mt-1 sm:text-[32px]" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-blue-100 mb-1">Live Practice & Support</h4>
                <p className="text-gray-300 text-xs sm:text-sm">Interactive sessions via Zoom/Meet and around-the-clock doubt resolution through chat.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-4 sm:p-6 flex items-start gap-2 sm:gap-4 shadow border border-blue-900">
              <FaLightbulb size={24} className="text-blue-400 mt-1 sm:text-[32px]" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-blue-100 mb-1">Holistic Development</h4>
                <p className="text-gray-300 text-xs sm:text-sm">Emphasis on critical thinking, confidence, patience, and sportsmanship, not just chess skills.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-4 sm:p-6 flex items-start gap-2 sm:gap-4 shadow border border-blue-900 md:col-span-2">
              <FaTrophy size={24} className="text-blue-400 mt-1 sm:text-[32px]" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-blue-100 mb-1">Tournament Experience</h4>
                <p className="text-gray-300 text-xs sm:text-sm">Engage in friendly competitions to boost confidence and prepare for real-world challenges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="w-full max-w-6xl mx-auto py-10 sm:py-16 px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-200 mb-6 sm:mb-10 text-center font-playfair">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#181f2b] rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-lg transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl border border-blue-900"
            >
              <div className="mb-2 sm:mb-4">{f.icon}</div>
              <h3 className="text-base sm:text-xl font-bold text-blue-100 mb-1 sm:mb-2">{f.title}</h3>
              <p className="text-gray-300 text-xs sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-6xl mx-auto py-10 sm:py-16 px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-200 mb-6 sm:mb-10 text-center font-playfair">Meet Our Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-[#181f2b] rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-lg border border-blue-900 relative group cursor-pointer transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-400 mb-2 sm:mb-4">
                <Image src={member.img} alt={member.name} width={80} height={80} className="sm:w-[112px] sm:h-[112px]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-blue-100 mb-1">{member.name}</h3>
              <p className="text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base">{member.title}</p>
              <div className={`absolute inset-0 bg-[#1A1C2C]/95 flex flex-col items-center justify-center rounded-2xl px-2 sm:px-4 py-4 sm:py-8 transition-opacity duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="text-xs sm:text-base text-gray-100 mb-2">{member.bio}</p>
                <span className="text-xs text-blue-200 italic">Fun fact: {member.fun}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="w-full max-w-5xl mx-auto py-10 sm:py-16 px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        {impact.map((item, i) => (
          <div key={i} className="flex flex-col items-center flex-1 mb-4 md:mb-0">
            <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-gold-400 mb-1 sm:mb-2" style={{ color: '#FFD700' }}>{item.value}{item.label === 'Satisfaction' ? '%' : ''}</span>
            <span className="text-base sm:text-lg text-blue-100 font-semibold">{item.label}</span>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="w-full py-10 sm:py-20 bg-gradient-to-r from-black-700 to-sky-900 flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 text-center font-playfair">Ready to level up?</h2>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 sm:py-4 px-8 sm:px-12 rounded-full text-lg sm:text-xl cursor-pointer shadow-lg transition" onClick={openBookDemoModal}>
          Book Your Free Demo
        </button>
      </section>

    </main>
  );
} 