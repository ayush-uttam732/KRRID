'use client';

import React, { useState } from 'react';
import { FaGift, FaUser, FaUsers, FaUserFriends } from 'react-icons/fa';

const levels = [
  {
    title: 'Beginner',
    
    suited: 'This level is perfect for anyone new to chess who has a keen interest and enthusiasm to learn the game from scratch. No prior knowledge is required, just a willingness to explore the world of chess!',
    takeaways: 'Nature of the game | Square names | Movement of Chessmen | Special moves | Check | Checkmate | Attack | Capturing Pieces | Stalemate | Defence | Exchange | Draw | Basic Strategies',
    outcome: 'By the end of the beginner level, students will confidently step into the chessboard arena, mastering international rules and unleashing powerful strategies to elevate their game and outsmart their opponents!',
    description: 'Ready to dive into the world of chess? This level is tailor-made for beginners! At Krrid, we\'ve crafted an engaging program for students aged 4 and up, ensuring you build a solid foundation and embark on your chess adventure with confidence and excitement!',
    details: [
      {
        question: 'I Am A Complete Beginner. Can I Join Krrid?',
        answer: `Absolutely! We Offer Personalized Coaching For All Levels, From Beginners To Advanced Players. If You're Unsure About Your Level, Share Your 'chess.com' Or 'Lichess' ID, And We'll Recommend The Best Training Program For You.`
      },
      {
        question: 'What Will I Learn In The Beginner Level?',
        answer: `You'll learn the fundamentals of chess including piece movements, basic rules, check and checkmate concepts, opening principles, and essential strategies to build a strong foundation for your chess journey.`
      }
    ]
  },
  {
    title: 'Foundational',
  
    suited: 'This level is designed for students who have completed the Beginner level at Krrid or those with equivalent knowledge of the topics covered in the Beginner course.',
    takeaways: 'Mate in one positions | Basic Checkmates with Queen and 2 Rooks | Basic Opening principles | How to write a game | Tactics (Difficulty Level : Easy) – Double attack | Knight Fork | Skewer | Back Rank & Pin | Mate in two positions | Destroying the defender | Distracting the defender | Discovered attack & Check | Mixed motifs',
    outcome: 'By the end of the Foundational level, students will have a solid grasp of basic tactics and opening strategies. This level focuses not just on theory but also on practical skills, preparing students to confidently challenge and defeat amateur players in competitive games.',
    description: 'At Krrid, we\'re here to boost your chess skills! This level covers powerful tactics and solid openings through engaging coaching that mixes theory with real-game practice. Our expert coaches will provide a personalized weekly study plan, along with homework and tests to track your progress and refine your game.',
    details: [
      {
        question: 'What Makes The Foundational Level Different?',
        answer: `This level builds upon your beginner knowledge with advanced tactics, opening strategies, and practical game analysis. You'll learn to think strategically and develop a deeper understanding of chess principles.`
      },
      {
        question: 'How Long Does This Level Take To Complete?',
        answer: `The duration varies based on individual progress, but typically students complete this level in 3-6 months with regular practice and coaching sessions.`
      }
    ]
  },
  {
    title: 'Intermediate',
    level: '',
    suited: 'This level is perfect for students who have completed the Foundational level at Krrid or have equivalent knowledge of the topics covered in the Foundational course.',
    takeaways: 'Basic King and Pawn endgames | Berger\'s "Rule of the square" | Openings (development of pieces) | Tactics (Difficulty Level : Normal) – Double attack | Knight Fork | Skewer | Back Rank | Pin | Destroying the defender | Deflection | Discovered attack & check | 1 Rook Checkmate | Queen vs pawn on 7th Rank | Defending against checkmate | Mixed motifs',
    outcome: 'By the end of the Intermediate level, students will have a solid understanding of endgames, an introduction to opening theory, and a deeper grasp of tactics. They\'ll be ready to take on the Advanced level and master more complex tactics!',
    description: 'After mastering the basics, students will dive deeper into endgame strategies and opening theory at Krrid. With plenty of practice in coaching sessions, they\'ll refine their skills and gain a stronger grasp on the game. Upon completing this level, students will be prepared to compete in local tournaments and continue advancing in their chess journey!',
    details: [
      {
        question: 'What Advanced Concepts Will I Learn?',
        answer: `You'll master complex endgame techniques, advanced opening strategies, and sophisticated tactical combinations. This level prepares you for competitive play and tournament success.`
      },
      {
        question: 'Can I Participate In Tournaments After This Level?',
        answer: `Yes! Students completing the Intermediate level are well-prepared to compete in local tournaments and have the skills to perform competitively against experienced players.`
      }
    ]
  },
  {
    title: 'Advanced',
   
    suited: 'This level is ideal for students who have completed the Intermediate level at Krrid or possess equivalent knowledge of the topics covered in the Intermediate course.',
    takeaways: 'Mate in 3 | forced moves | smothered mate | wind mill | X-ray attack | line opening | line closing | positional strengths of pieces | pawn structure | Imbalance Concepts | Overloaded Pieces | Square Vacation | Combination & Calculation | Two Bishops Checkmate | The Wrong Square Bishop.',
    outcome: 'By the end of Advanced, students will be equipped to apply Advanced tactics confidently and elevate their game to a higher level.',
    description: 'The Advanced Level at Krrid aims to elevate students to a semi-professional standard by deepening their understanding of Advanced tactics and endgame theory. With a strong tactical foundation, students will also explore positional play in the middle game.',
    details: [
      {
        question: 'What Makes The Advanced Level Special?',
        answer: `This level focuses on sophisticated tactical combinations, advanced positional understanding, and professional-level strategic thinking. You'll learn techniques used by master-level players.`
      },
      {
        question: 'How Does This Level Prepare Me For Master Level?',
        answer: `The Advanced level builds the foundation for master-level play by teaching complex tactical motifs, advanced endgame techniques, and deep positional understanding essential for high-level competition.`
      }
    ]
  },
  {
    title: 'Master',

    suited: 'This level is for students who have completed Advanced Level Part 1 at Krrid or have equivalent knowledge of the topics covered in Part 1.',
    takeaways: 'Instructive short games | Pawn endgames | Mating motifs | Positional weakness | Gambits in the opening | Master games of world champions',
    outcome: 'By the end of the Master level, students will have completed all 5 foundational levels and will be well-versed in the fundamentals of chess. They will be able to understand and apply strategies used by world chess champions.',
    description: 'At Krrid, the Master level is designed to refine your chess skills and bring you closer to a semi-professional level. This course dives deeper into Advanced tactics, endgame concepts, and positional play. You\'ll also study classic games from world champions, with detailed analysis to uncover the strategies that elevate their play, helping you sharpen your own game.',
    details: [
      {
        question: 'What Will I Study In The Master Level?',
        answer: `You'll analyze games from world champions, study advanced endgame techniques, master complex tactical combinations, and develop the strategic thinking required for elite-level chess competition.`
      },
      {
        question: 'How Does This Level Complete My Chess Education?',
        answer: `The Master level represents the culmination of your chess journey at Krrid, equipping you with the knowledge and skills to compete at high levels and understand the strategies of world-class players.`
      }
    ]
  }
];

const plans = [
  {
    key: 'trial',
    icon: <FaGift className="text-2xl text-black" />, 
    title: 'Trial',
    subtitle: 'For Demo Classes',
    price: '$0',
    priceUnit: '/Mo',
    details: [
      'Personalized Learning',
      'Flexible Scheduling',
      'Immediate Feedback',
      'Accelerated Progress',
      'Personalized Learning',
    ],
    sessions: null,
  },
  {
    key: 'oneonone',
    icon: <FaUser className="text-2xl text-gray-400" />, 
    title: 'one on one',
    subtitle: 'For Demo Classes',
    price: '15',
    priceUnit: 'sessions',
    details: [
      'Personalized Learning',
      'Flexible Scheduling',
      'Immediate Feedback',
      'Accelerated Progress',
    ],
    sessions: 15,
  },
  {
    key: 'buddy',
    icon: <FaUserFriends className="text-2xl text-gray-400" />, 
    title: 'Buddy',
    subtitle: 'For Demo Classes',
    price: '$0',
    priceUnit: '/Mo',
    details: [
      'Collaborative Learning',
      'Social Interaction',
      'Enhanced Motivation',
      'Cost-Effectiveness',
    ],
    sessions: null,
  },
  {
    key: 'group',
    icon: <FaUsers className="text-2xl text-gray-400" />, 
    title: 'Group',
    subtitle: 'For Demo Classes',
    price: '$0',
    priceUnit: '/Mo',
    details: [
      'Collaborative Learning',
      'Social Interaction',
      'Enhanced Motivation',
      'Cost-Effectiveness',
    ],
    sessions: null,
  },
];

export default function CoursesCurriculumPage() {
  const [openIdx, setOpenIdx] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('trial');

  const plan = plans.find(p => p.key === selectedPlan) || plans[0];

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8">
      <section className="bg-white rounded-2xl shadow-xl p-4 sm:p-10 max-w-full sm:max-w-4xl w-full mb-8">
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-gray-900 mb-4 sm:mb-6 text-center">Our Courses & Curriculum</h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 text-center">At Krrid, we provide a curriculum meticulously crafted based on scientific principles, encompassing five essential levels. By the conclusion of Level 1, students will have exceeded the chess proficiency of many casual adult players, thereby establishing a robust foundation and a competitive advantage.</p>
        <div className="flex flex-col gap-3 sm:gap-4">
          {levels.map((lvl, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl shadow border border-gray-200">
              {/* Accordion Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 cursor-pointer" onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{lvl.title}</span>
                  {lvl.level && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 sm:px-3 py-1 rounded ml-2">{lvl.level}</span>
                  )}
                </div>
                <span className="text-2xl text-gray-500">{openIdx === idx ? '\u00d7' : '+'}</span>
              </div>
              {/* Accordion Content */}
              {openIdx === idx && (lvl.details?.length ?? 0) > 0 && (
                <div className="border-t border-gray-200 px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {(lvl.details ?? []).map((d, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-sm sm:text-base mb-1 text-gray-900">{d.question}</h3>
                      <p className="text-gray-700 text-xs sm:text-sm">{d.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Choose Your Plan Section */}
        <section className="w-full flex flex-col items-center justify-center mt-16">
          <h2 className="text-5xl font-bold text-gray-900 text-center mb-2">Choose Your Plan</h2>
          <p className="text-lg text-gray-500 text-center mb-10">Select from a variety of tailored pricing designed to meet your specific needs and budget.</p>
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto items-stretch">
            {/* Left: Plan List */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-300 shadow p-6 flex flex-col gap-4 justify-between">
              {plans.map((p) => (
                <div
                  key={p.key}
                  className={`flex items-center justify-between rounded-xl px-6 py-4 mb-2 cursor-pointer transition-all border ${selectedPlan === p.key ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105' : 'bg-gray-100 text-gray-900 border-transparent hover:border-gray-400'}`}
                  onClick={() => setSelectedPlan(p.key)}
                >
                  <div className="flex items-center gap-4">
                    {p.icon}
                    <div>
                      <span className={`font-bold text-lg ${selectedPlan === p.key ? 'text-white' : 'text-black'}`}>{p.title}</span>
                      <div className={`text-xs ${selectedPlan === p.key ? 'text-gray-300' : 'text-gray-500'}`}>{p.subtitle}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {p.sessions ? (
                      <span className={selectedPlan === p.key ? 'text-white' : 'text-gray-700'}>{p.price} <span className="text-base font-normal">{p.priceUnit}</span></span>
                    ) : (
                      <span className={selectedPlan === p.key ? 'text-white' : 'text-gray-700'}>{p.price}<span className="text-base font-normal">{p.priceUnit}</span></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Right: Selected Plan Card */}
            <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-300 shadow p-8 flex flex-col justify-between text-white">
              <div>
                <div className="text-lg font-semibold mb-2">{plan.title} Plan</div>
                <div className="text-xs text-gray-300 mb-4">{plan.subtitle}</div>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold mr-2">{plan.price}</span>
                  <span className="text-base font-normal">{plan.priceUnit === '/Mo' ? '| Free Plan' : plan.priceUnit}</span>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-6 text-white">
                  {plan.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
              <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 rounded-full mt-4 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-lg transition">Purchase Plan</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
} 