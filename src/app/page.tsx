'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { supabase } from "@/utils/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const aboutRef = useRef(null);
  const plansRef = useRef(null);
  const coursesRef = useRef(null);
  const contactRef = useRef(null);

  // Move FAQ array and state here
  const faqs = [
    {
      question: "I am a complete beginner. Can I join Krrid?",
      answer: "Absolutely! We offer personalized coaching for all levels, from beginners to advanced players. If you&apos;re unsure about your level, share your 'chess.com' or 'Lichess' ID, and we&apos;ll recommend the best training program for you.",
    },
    {
      question: "How long does it take to see improvement in my chess skills?",
      answer: "Progress varies based on practice, consistency, and learning pace. However, with regular training, structured lessons, and weekly tasks, most students notice significant improvement within a few months.",
    },
    {
      question: "Do you offer trial classes before enrollment?",
      answer: "Yes! We provide a free trial session so you can experience our teaching methods and interact with our coaches before enrolling.",
    },
    {
      question: "What is the ideal age to start learning chess?",
      answer: "Chess can be learned at any age! We have successfully trained kids as young as 4 years old, helping them develop cognitive skills and strategic thinking early on.",
    },
    {
      question: "How do online classes work, and are they effective?",
      answer: "Our online sessions use interactive boards, real-time game analysis, and structured lesson plans. With flexible timing and expert guidance, students find online learning just as effective, if not better, than offline classes.",
    },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data && data.user) {
        // user = data.user as User;
      }
    });
    const timer = setTimeout(() => setLoading(false), 2000);
    // Scroll listener for active section
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "plans", ref: plansRef },
        { id: "courses", ref: coursesRef },
        { id: "contact", ref: contactRef },
      ];
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const ref = sections[i].ref.current as HTMLElement | null;
        if (ref && ref.offsetTop <= scrollY) {
          // activeSection = sections[i].id;
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-lg text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-body">
      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col items-center text-center py-8 px-4   w-full h-[700px]">

  {/* Background Image */}
  <div className="absolute bottom-0   flex justify-center items-center mt-[0px] ">
    <Image
      src="/chessboard.svg"
      alt="Chessboard"
      width={1690}
      height={580}
      className="object-cover"
    />
  </div>

  {/* Foreground Text */}
  <h1 className="krrid-heading text-5xl md:text-6xl font-bold leading-tight mb-4 z-10">
    Learn through<br />the
    <span className="bg-krrid-highlight"> Krrid</span> way!
  </h1>
  <p className="text-gray-700 max-w-xl mx-auto mb-8 text-xl font-Inter font-regular z-10">
    Welcome to Krrid, the ultimate destination where games meet learning, and strategy builds success! 
  </p>
  <div className="flex gap-4 justify-center mb-8 z-10">
    <button
      className="bg-black text-white rounded-lg px-8 py-2 font-heading text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 ripple"
      onClick={e => { e.currentTarget.classList.add('ripple-animate'); setTimeout(() => e.currentTarget.classList.remove('ripple-animate'), 400); router.push("/chess"); }}
    >
      Play
    </button>
    <button
      className="bg-gray-100 text-black rounded-lg px-8 py-2 font-heading text-lg font-semibold border border-gray-300 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/60 ripple"
      onClick={e => { e.currentTarget.classList.add('ripple-animate'); setTimeout(() => e.currentTarget.classList.remove('ripple-animate'), 400); router.push("/learn"); }}
    >
      Learn
    </button>
  </div>
</section>


      {/* Turn Pawns Into Queens Section */}
      <section className="  py-10 px-4 flex flex-col items-center  overflow-x-clip min-h-[600px] md:min-h-[700px]">
        <div className="relative z-10 flex mt-[2em]  flex-col w-full max-w-5xl mx-auto items-center justify-center gap-5   ">
          <h2 className="font-heading text-5xl md:text-[80px] font-Inter font-semibold text-center text-[#181f2b]  leading-[72px] tracking-[-4.28px]">
            Turn Pawns Into 
            <br />Queens With Us!
          </h2>
          <p className="   text-gray-600 bg-white font-Inter  text-center max-w-lg mb-0 text-lg">Chess sharpens critical thinking, improve focus, and problem solving skills for school and life!</p>
        </div>
        <div className=" absolute    flex flex-row w-full max-w-5xl mt-[8em] py-0 items-center justify-center gap-0 ">
          <Image src="/pawn.svg" alt="Pawn" width={250} height={510} className="hidden md:block h-[510px] w-[250px] object-contain" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} />
          <div className="flex flex flex-col items-center justify-center px-10 ">
            <div className="font-heading text-lg font-semibold text-center mb-3 text-[#181f2b]">At Krrid, we make learning fun with:</div>
            <div className="w-full max-w-xl flex flex-col gap-3 mb-2 items-center justify-center">
              <div className="grid grid-cols-4 gap-5 w-[42em] h-[2em]">
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Expert strategies</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">AI & real matches</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Interactive lessons</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Tactical puzzles</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2  w-[30em] h-[2em]">
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Tournaments & leaderboards</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Tournaments & leaderboards</span>
              </div>
            </div>
            <div className="font-Inter italic text-[#1D242B] text-center font-medium mt-8 text-base">With Krrid, kids don&apos;t just play, they master, grow, and excel!</div>
          </div>
          <Image src="/queen.svg" alt="Queen" width={250} height={460} className="hidden md:block h-[460px] w-[250px]  object-contain " style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} />
        </div>
      </section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="py-6 px-4 flex flex-col items-center"
      >
        <h2 className="font-Inter text-4xl md:text-[64px] font-semibold text-black text-center leading-[77px] tracking-[-2.28px] mb-10">Benefits Of Chess <br/> For Kids</h2>
        <div
          className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6"
          style={{ gridTemplateRows: 'repeat(3, minmax(180px, auto))', gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          {/* Top left: Interactive & Engaging Experience */}
          <div className="bg-white border border-black rounded-3xl p-6 flex flex-col justify-between md:col-span-2 md:row-span-1 md:flex-row md:items-center" style={{ gridColumn: '1/3', gridRow: '1/2' }}>
            <div className="flex-1">
              <h3 className="font-Inter font-bold text-xl md:text-2xl text-black mb-2">Interactive & Engaging Experience:</h3>
              <p className="text-[#222] font-Inter text-base mb-2">With Krrid&apos;s dynamic platform, learning chess transforms into an immersive journey where every match sparks curiosity, growth, and the joy of discovery.</p>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
              <Image src="/interactive.svg" alt="Kids learning chess" width={180} height={120} className="rounded-2xl object-cover" />
            </div>
          </div>
          {/* Top right: Fostering Creativity & Innovation */}
          <div className="bg-white border border-black rounded-3xl p-6 flex flex-col justify-between" style={{ gridColumn: '3/4', gridRow: '1/2' }}>
            <h3 className="font-Inter font-bold text-xl md:text-2xl text-black mb-2">Fostering Creativity & Innovation:</h3>
            <p className="text-[#222] font-Inter text-base">Encourage kids to explore diverse strategies, turning challenges into opportunities and everyday moves into bold breakthroughs.</p>
          </div>
          {/* Middle left: Empowering Strategic Minds */}
          <div className="bg-white border border-black rounded-3xl p-6 flex flex-col justify-between" style={{ gridColumn: '1/2', gridRow: '2/3' }}>
            <h3 className="font-Inter font-bold text-xl md:text-2xl text-black mb-2">Empowering Strategic Minds:</h3>
            <p className="text-[#222] font-Inter text-base mb-2">Cultivate planning, foresight, and critical decision-making skills that lay the foundation for academic and personal success.</p>
            <div className="flex-shrink-0 mt-2">
              <Image src="/empowering.svg" alt="Strategic mind" width={120} height={80} className="object-contain" />
            </div>
          </div>
          {/* Middle right: Boosting Cognitive Abilities */}
          <div className="bg-white border border-black rounded-3xl p-6 flex flex-row justify-between items-center md:col-span-2" style={{ gridColumn: '2/4', gridRow: '2/3' }}>
            <div className="flex-1">
              <h3 className="font-Inter font-bold text-xl md:text-2xl text-black mb-2">Boosting Cognitive Abilities:</h3>
              <p className="text-[#222] font-Inter text-base">Enhance memory, concentration, and problem-solving skill , each move sharpens the mind for smarter learning.</p>
            </div>
            <div className="flex-shrink-0 ml-6">
              <Image src="/ability.svg" alt="Brain with ladder" width={120} height={80} className="object-contain" />
            </div>
          </div>
          {/* Bottom left: (empty for spacing) */}
          <div className="hidden md:block" style={{ gridColumn: '1/2', gridRow: '3/4' }}></div>
          {/* Bottom: Enhancing Social Interaction */}
          <div className="bg-white border border-black rounded-3xl p-6 flex flex-row justify-between items-center md:col-span-2" style={{ gridColumn: '2/4', gridRow: '3/4' }}>
            <div className="flex-1">
              <h3 className="font-Inter font-bold text-xl md:text-2xl text-black mb-2">Enhancing Social Interaction:</h3>
              <p className="text-[#222] font-Inter text-base">Promote respectful competition, sportsmanship, and teamwork through interactive, fun chess sessions that connect young minds.</p>
            </div>
            <div className="flex-shrink-0 ml-6">
              <Image src="/social.svg" alt="Kids socializing" width={140} height={100} className="rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </motion.section>

      

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-black text-white flex flex-col ml-1 mr-1 pb-20 items-center rounded-t-[3rem] rounded-b-[3rem]"
      >
        <h2 className="font-Inter text-4xl md:text-[80px] font-bold text-center mb-12 z-20">What Our <br/> Students Say</h2>
        <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-between">
          
          <Image src="/iconl.svg" alt="Quote" width={120} height={120} className="absolute left-[-180px] md:left-[-180px] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-80 z-0" />
          
         
          <div className="relative z-10 w-full flex flex-col items-center">
            <TestimonialCarousel />
          </div>
          <Image src="/iconr.svg" alt="Quote" width={120} height={120} className="absolute right-[-180px] md:right-[-180px] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-80 z-0" />

        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 bg-white flex flex-col items-center"
      >
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          <div className="flex-1 flex flex-col gap-4 items-start justify-start">
            <div className="flex flex-row gap-2 bg-[#F1F1F1] items-center justify-start  px-2 py-1 rounded-full ">
              <Image src="/faqicon.svg" alt="FAQ" width={18} height={18} />
              <span className=" text-xs font-poppins text-black font-medium font-heading ">FAQs</span>
            </div>
            
            <h2 className="font-heading font-Inter text-3xl md:text-4xl text-black font-bold mb-2">Have Questions? <br/> We&apos;ve Got You!</h2>
            <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 mb-2 shadow">
              <Image src="/handshake.svg" alt="Coach" width={48} height={48} className="rounded-full" />
              <span className="font-heading font-Inter text-black font-semibold  text-base">Trust The Process, And You&apos;ll <br/> See Progress In No Time <span className="text-accent text-red-500">🏆</span></span>
            </div>
            <p className="text-black font-Inter font-semibold text-base  mb-4">Feel free to reach out, we&apos;re here to assist you anytime!</p>
            <button className="bg-black text-white rounded-lg px-6 py-2 font-heading text-base">Contact Us</button>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {/* FAQ Accordions (static for now) */}
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border border-gray-200 bg-white shadow transition-all duration-200 ${openFaq === idx ? 'ring-2 ring-primary' : ''}`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 font-heading font-semibold text-base text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="text-black">{faq.question}</span>
                  <span className="ml-4 text-2xl text-gray-400">{openFaq === idx ? '×' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-6 pb-4 text-base text-gray-700 animate-fadeIn"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
