'use client';
import Image from "next/image";
import { FaChess, FaUserGraduate, FaTrophy, FaHeadset, FaLightbulb } from 'react-icons/fa';
import { useState } from "react";
import { useBookDemoModal } from '@/components/BookDemoModalContext';

const team = [
  {
    name: "Anish Singh",
    title: "Founder & Head Coach",
    img: "/logo.png",
    bio: "FIDE-rated coach with 10+ years of experience, passionate about mentoring young minds.",
    fun: "Loves solving chess puzzles at midnight!"
  },
  {
    name: "Vineet Singh",
    title: "Senior Coach",
    img: "/logo.png",
    bio: "Expert in tournament prep and advanced tactics. FIDE-rated and tech enthusiast.",
    fun: "Can recite all world champions in order."
  },
  {
    name: "Sudhanshu Singh",
    title: "Coach & Curriculum Designer",
    img: "/logo.png",
    bio: "Designs engaging lessons and interactive challenges for all levels.",
    fun: "Once played 20 games simultaneously!"
  }
];

const impact = [
  { label: "Students Coached", value: 500 },
  { label: "Tournaments", value: 30 },
  { label: "Satisfaction", value: 99 }
];

const features = [
  { icon: <FaUserGraduate size={32} className="text-blue-400" />, title: "Live 1-on-1", desc: "Personalized coaching tailored to each student&apos;s needs." },
  { icon: <FaChess size={32} className="text-blue-400" />, title: "Structured Levels", desc: "Clear progression from beginner to advanced with real gameplay." },
  { icon: <FaTrophy size={32} className="text-blue-400" />, title: "Tournament Prep", desc: "Practice and compete in friendly tournaments to build confidence." },
  { icon: <FaHeadset size={32} className="text-blue-400" />, title: "24/7 Support", desc: "Get help anytime with our always-on chat and live sessions." }
];

export default function AboutPage() {
  const { openBookDemoModal } = useBookDemoModal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="bg-[#1A1C2C] text-white font-poppins min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-b from-[#1A1C2C] to-[#223a5f]">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center font-playfair">About Krrid</h1>
        <h3 className="text-xl md:text-2xl text-blue-200 font-medium mb-8 text-center max-w-2xl">&quot;Empowering young minds through strategy, focus, and passion for chess.&quot;</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition mb-8" onClick={openBookDemoModal}>Book Free Demo</button>
        <div className="w-full flex justify-center">
          {/* <Image src="/chessboard.svg" alt="Chessboard" width={600} height={220} className="rounded-2xl shadow-2xl" /> */}
        </div>
      </section>

      {/* Our Mission */}
      <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 py-20 px-4">
        <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
          <div className="w-56 h-56 rounded-full overflow-hidden flex items-center justify-center">
            <Image src="/logo1.png" alt="Founder" width={180} height={180} />
          </div>
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-3xl font-bold text-blue-300 mb-4 font-playfair">Our Mission</h2>
          <p className="text-lg text-gray-200 mb-2">To nurture the next generation of confident, critical thinkers through chess—combining fun, discipline, and excellence.</p>
          <p className="text-base text-gray-300 mb-6">Krrid Chess Academy is dedicated to developing young thinkers into strategic innovators through the timeless game of chess. We offer:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#181f2b] rounded-xl p-6 flex items-start gap-4 shadow border border-blue-900">
              <FaUserGraduate size={32} className="text-blue-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-blue-100 mb-1">Personalized Instruction</h4>
                <p className="text-gray-300 text-sm">Individualized 1-on-1 coaching tailored to each student&apos;s skill and learning pace.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-6 flex items-start gap-4 shadow border border-blue-900">
              <FaChess size={32} className="text-blue-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-blue-100 mb-1">Structured Curriculum</h4>
                <p className="text-gray-300 text-sm">Clear, progressive levels from Beginner to Advanced, filled with hands-on practice and real gameplay.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-6 flex items-start gap-4 shadow border border-blue-900">
              <FaHeadset size={32} className="text-blue-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-blue-100 mb-1">Live Practice & Support</h4>
                <p className="text-gray-300 text-sm">Interactive sessions via Zoom/Meet and around-the-clock doubt resolution through chat.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-6 flex items-start gap-4 shadow border border-blue-900">
              <FaLightbulb size={32} className="text-blue-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-blue-100 mb-1">Holistic Development</h4>
                <p className="text-gray-300 text-sm">Emphasis on critical thinking, confidence, patience, and sportsmanship, not just chess skills.</p>
              </div>
            </div>
            <div className="bg-[#181f2b] rounded-xl p-6 flex items-start gap-4 shadow border border-blue-900 md:col-span-2">
              <FaTrophy size={32} className="text-blue-400 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-blue-100 mb-1">Tournament Experience</h4>
                <p className="text-gray-300 text-sm">Engage in friendly competitions to boost confidence and prepare for real-world challenges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-blue-200 mb-10 text-center font-playfair">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#181f2b] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl border border-blue-900"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-blue-100 mb-2">{f.title}</h3>
              <p className="text-gray-300 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-blue-200 mb-10 text-center font-playfair">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-[#181f2b] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-blue-900 relative group cursor-pointer transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 mb-4">
                <Image src={member.img} alt={member.name} width={112} height={112} />
              </div>
              <h3 className="text-lg font-bold text-blue-100 mb-1">{member.name}</h3>
              <p className="text-blue-300 mb-2">{member.title}</p>
              <div className={`absolute inset-0 bg-[#1A1C2C]/95 flex flex-col items-center justify-center rounded-2xl px-4 py-8 transition-opacity duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="text-base text-gray-100 mb-2">{member.bio}</p>
                <span className="text-xs text-blue-200 italic">Fun fact: {member.fun}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {impact.map((item, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <span className="text-5xl md:text-6xl font-bold text-gold-400 mb-2" style={{ color: '#FFD700' }}>{item.value}{item.label === 'Satisfaction' ? '%' : ''}</span>
            <span className="text-lg text-blue-100 font-semibold">{item.label}</span>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-black-700 to-sky-900 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white  mb-6 text-center font-playfair">Ready to level up?</h2>
        <button className="bg-gradient-to-r from-black-600 to-yellow-600 hover:bg-yellow-200 text-black font-bold py-4 px-12 rounded-full text-xl shadow-lg transition" onClick={openBookDemoModal}>
          Book Your Free Demo
        </button>
      </section>

    </main>
  );
} 