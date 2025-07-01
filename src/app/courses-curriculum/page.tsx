'use client';

import React, { useState } from 'react';
import { FaGift, FaUser, FaUsers, FaUserFriends } from 'react-icons/fa';

const levels = [
  {
    title: 'Beginner',
    suited: "This level is ideal for complete beginners who are curious and excited to learn chess from the very basics. Whether you're 4 or 40, if you're starting your chess journey, this is the perfect place to begin, no prior knowledge needed, just enthusiasm to learn!",
    takeaways: "Understanding the game | Naming squares | Piece movement | Special moves | Check | Checkmate | Attacking basics | Capturing techniques | Stalemate | Defensive ideas | Types of exchange | Drawing methods | Basic strategies",
    outcome: "By the end of this course, students will not only understand how to play chess correctly using international rules but also gain confidence to participate in games, use basic tactics, and think strategically. They'll be ready to take on tougher opponents with a solid foundation and fearless mindset.",
    description: "Begin your chess journey with Krrid's Beginner Level, a thoughtfully designed program that introduces students to the world of chess in the most engaging and structured way. Through a mix of lessons, guided play, tests, and analysis, students aged 4+ will develop confidence and core skills. Whether it's mastering checkmate or unleashing your first powerful attack, this level sets the stage for a lifelong love of the game.",
    details: [
      {
        

        question: 'Best Suited For:',
        answer: `This level is ideal for complete beginners who are curious and excited to learn chess from the very basics. Whether you're 4 or 40, if you're starting your chess journey, this is the perfect place to begin, no prior knowledge needed, just enthusiasm to learn!`
      },
      {
        question: 'Key Takeaways:',
        answer: `Understanding the game | Naming squares | Piece movement | Special moves | Check | Checkmate | Attacking basics | Capturing techniques | Stalemate | Defensive ideas | Types of exchange | Drawing methods | Basic strategies`
      },
      {
        question: 'Outcome:',
        answer: `By the end of this course, students will not only understand how to play chess correctly using international rules but also gain confidence to participate in games, use basic tactics, and think strategically. They'll be ready to take on tougher opponents with a solid foundation and fearless mindset.`
      },
      {
        question: 'Description:',
        answer: `Begin your chess journey with Krrid's Beginner Level, a thoughtfully designed program that introduces students to the world of chess in the most engaging and structured way. Through a mix of lessons, guided play, tests, and analysis, students aged 4+ will develop confidence and core skills. Whether it's mastering checkmate or unleashing your first powerful attack, this level sets the stage for a lifelong love of the game.`
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
        
        question: 'Best Suited For:',
        answer: `This level is designed for students who have completed the Beginner level at Krrid or those with equivalent knowledge of the topics covered in the Beginner course.`
      },
      {
        
        question: 'Key Takeaways:',
        answer: `Mate in 1 positions | Queen and 2 Rooks Checkmate | Basic Opening Principles | Writing Chess Notation | Tactics (Difficulty Level: Easy) – Double Attack | Knight Fork | Skewer | Back Rank Checkmate | Pin | Mate in 2 positions | Capture the Defender | Deflection | Discovered Attack & Check | Mixed Tactical Motifs`
      },
      {
        
        question: 'Outcome:',
        answer: `By the end of the Foundational level, students will have a solid grasp of basic tactics and opening strategies. This level focuses not just on theory but also on practical skills, preparing students to confidently challenge and defeat amateur players in competitive games.`
      },
      {
        
        question: 'Description:',
        answer: `At Krrid, we're here to boost your chess skills! This level takes your learning a step forward by introducing powerful tactical patterns and solid opening principles through interactive coaching that combines theory and real-game practice.
With our expert coaches, students receive personalized weekly study plans, assignments, and regular tests to monitor growth and sharpen their competitive edge.`
      },
      
      
    ]
  },
  {
    title: 'Intermediate',
        suited: 'This level is perfect for students who have completed the Foundational level at Krrid or have equivalent knowledge of the topics covered in the Foundational course.',
    takeaways: 'Basic King and Pawn endgames | Berger\'s "Rule of the square" | Openings (development of pieces) | Tactics (Difficulty Level : Normal) – Double attack | Knight Fork | Skewer | Back Rank | Pin | Destroying the defender | Deflection | Discovered attack & check | 1 Rook Checkmate | Queen vs pawn on 7th Rank | Defending against checkmate | Mixed motifs',
    outcome: 'By the end of the Intermediate level, students will have a solid understanding of endgames, an introduction to opening theory, and a deeper grasp of tactics. They\'ll be ready to take on the Advanced level and master more complex tactics!',
    description: 'After mastering the basics, students will dive deeper into endgame strategies and opening theory at Krrid. With plenty of practice in coaching sessions, they\'ll refine their skills and gain a stronger grasp on the game. Upon completing this level, students will be prepared to compete in local tournaments and continue advancing in their chess journey!',
    details: [ 
      {
        
        question: 'Best Suited For:',
        answer: `This level is perfect for students who have completed the Foundational level at Krrid or possess equivalent knowledge of the topics covered in that course.`
      },
      {
        
        question: 'Key Takeaways:',
        answer: ` King & Pawn Endgames | Berger's Rule of the Square | Opening Principles & Development |
Tactics (Normal Difficulty) – Double Attack | Knight Fork | Skewer | Backrank Checkmate | Pin |
1 Rook Checkmate | Defending Against Checkmate | Queen vs Pawn on 2nd & 7th Rank |
Capture the Defender | Deflection | Discovered Attack & Check | Mixed Tactical Motifs`
      },
      {
        
        question: 'Outcome:',
        answer: `By the end of the Intermediate level, students will have a firm grasp of essential endgame knowledge, structured opening play, and intermediate-level tactical skills. This course prepares them to transition smoothly into the Advanced level and explore more complex, competitive concepts.`
      },
      {
        
        question: 'Description:',
        answer: `After completing the Foundational level, students at Krrid take a significant leap forward in this Intermediate course. They explore deeper endgame strategies and advance their tactical vision through structured coaching, regular practice, and real-game scenarios.
With expert guidance and carefully designed sessions, students sharpen their thinking and decision-making, preparing them to face tougher opponents and participate confidently in competitive chess environments.`
      },
      
      
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
        
        question: 'Best Suited For:',
        answer: `This level is ideal for students who have completed the Intermediate level at Krrid or possess equivalent knowledge of the topics covered in the Intermediate course.`
      },
      {
        
        question: 'Key Takeaways:',
        answer: `Mate in 3 | Forced Moves | Smothered Mate | Windmill | X-Ray Attack | Line Opening | Line Closing |
Positional Strengths of Pieces | Pawn Structures | Imbalance Concepts | Overloaded Pieces | Square Vacation |
Combination & Calculation | Two Bishops Checkmate | The Wrong-Square Bishop Endgame`
      },
      {
        
        question: 'Outcome:',
        answer: `By the end of the Advanced level, students will be equipped to confidently apply advanced tactics, recognize deeper patterns, and elevate their strategic play. They'll have a strong base in both tactical execution and positional understanding - key traits of a competitive chess player.`
      },
      {
        
        question: 'Description:',
        answer: `The Advanced level at Krrid is designed to raise students to a semi-professional standard by strengthening their grasp of advanced tactics and endgame concepts. Along with mastering sophisticated tactical ideas, students will develop critical positional insights and learn how to convert advantages in practical games.
This level ensures players transition from strong learners to confident, independent thinkers on the board.`
      },
      
      
    ]
  },
  {
    title: 'Elite',

    suited: 'This level is for students who have completed Advanced Level Part 1 at Krrid or have equivalent knowledge of the topics covered in Part 1.',
    takeaways: 'Instructive short games | Pawn endgames | Mating motifs | Positional weakness | Gambits in the opening | Master games of world champions',
    outcome: 'By the end of the Master level, students will have completed all 5 foundational levels and will be well-versed in the fundamentals of chess. They will be able to understand and apply strategies used by world chess champions.',
    description: 'At Krrid, the Master level is designed to refine your chess skills and bring you closer to a semi-professional level. This course dives deeper into Advanced tactics, endgame concepts, and positional play. You\'ll also study classic games from world champions, with detailed analysis to uncover the strategies that elevate their play, helping you sharpen your own game.',
    details: [ 
      {
        
        question: 'Best Suited For:',
        answer: `This level is for students who have completed the Advanced level at Krrid or have equivalent knowledge of the topics covered in that course.`
      },
      {
        
        question: 'Key Takeaways:',
        answer: `Instructive Short Games | Pawn Endgames | Mating Motifs | Positional Weakness | Gambits in the Opening | Master Games of World Champions`
      },
      {
        
        question: 'Outcome:',
        answer: `By the end of the Elite level, students will have completed all 5 foundational levels of the Krrid curriculum and will be well-versed in both the fundamentals and deeper strategic layers of chess. They'll be able to understand and apply advanced techniques and champion-level strategies in their own games.`
      },
      {
        
        question: 'Description:',
        answer: `At Krrid, the Elite level is crafted to refine and polish every aspect of a student's chess ability, bringing them to the doorstep of a semi-professional standard.
This course emphasizes the study of advanced tactics, deeper endgame concepts, and critical positional play, while also immersing students in legendary games played by world champions.
Through structured analysis and practical sessions, students will learn how great players think, calculate, and dominate, sharpening their own skills in the process.`
      },
      
      
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
      { text: 'Personalized Learning' },
      { text: 'Flexible Scheduling' },
      { text: 'Immediate Feedback' },
      { text: 'Accelerated Progress' },
    ],
    sessions: null,
    description: '',
  },
  {
    key: 'OneonOne',
    icon: <FaUser className="text-2xl text-gray-400" />, 
    title: 'One-on-One',
    // subtitle: 'One-on-one live interactive session',
    price: '20 ',
    priceUnit: 'sessions',

    heading: 'One-on-one private interactive session',
    subheading: 'No of Sessions – 20',
    subheading2: 'Duration – 2.5 Months',
    details: [
      { text: 'Personalized Learning' },
      { text: 'Flexible Scheduling' },
      { text: 'Immediate Feedback' },
      { text: 'Accelerated Progress' },
    ],
    description: "Get the coach's complete focus with guidance made just for you!",
  },
  {
    key: 'buddy',
    icon: <FaUserFriends className="text-2xl text-gray-400" />, 
    title: 'Buddy',
    price: '24 ',
    priceUnit: 'sessions',
    heading: 'Interactive small group session for 2 kids (ideal for siblings or friends)',
    subheading: 'No of Sessions – 24',
    subheading2: 'Duration – 3 Months',
    details: [
      { text: 'Collaborative Learning' },
      { text: 'Social Interaction' },
      { text: 'Enhanced Motivation' },
      { text: 'Cost-Effectiveness' },
    ],
    // sessions: null,
    description: 'Collaborative and engaging learning with a partner',
  },
  {
    key: 'group',
    icon: <FaUsers className="text-2xl text-gray-400" />, 
    title: 'Group',
    price: '24 ',
    priceUnit: 'sessions',
    heading: 'Interactive small group session for 4 kids',
    subheading: 'No of Sessions – 24',
    subheading2: 'Duration – 3 Months',
    details: [
      { text: 'Collaborative Learning' },
      { text: 'Social Interaction' },
      { text: 'Enhanced Motivation' },
      { text: 'Cost-Effectiveness' },
    ],
    // sessions: null,
    description: 'Fun and engaging learning with a group of friends',
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
            <div key={idx} className="bg-[#E9E9E9] rounded-2xl shadow border border-gray-200">
              {/* Accordion Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 cursor-pointer" onClick={() => setOpenIdx(openIdx === idx ? -1 : idx) }>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{lvl.title}</span>
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
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto items-center justify-center">
            {/* Left: Plan List */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-300 w-[380px] h-[400px]  shadow p-6 flex flex-col gap-4 justify-between">
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
                    <span className={selectedPlan === p.key ? 'text-white' : 'text-gray-700'}>{p.price}<span className="text-base font-normal">{p.priceUnit}</span></span>
                  </div>
                </div>
              ))}
            </div>
            {/* Right: Selected Plan Card */}
            <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-300 shadow p-8 flex flex-col justify-between text-white">
              <div>
                <div className="text-2xl font-poppins font-bold mb-2 text-center text-white">{plan.title} </div>
                {/* <div className="text-xs text-gray-300 mb-4">{plan.subtitle}</div> */}
                {/* <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold mr-2">{plan.price}</span>
                  <span className="text-base font-normal">{plan.priceUnit === '/Mo' ? '| Free Plan' : plan.priceUnit}</span>
                </div> */}
                <div className="text-base font-semibold mb-2">{plan.heading} </div>
                <div className="text-base text-white mb-2">{plan.subheading}</div>
                <div className="text-base text-white mb-4">{plan.subheading2}</div>
                <ul className="list-disc list-inside space-y-2 mb-6 text-white">
                  {plan.details.map((d, i) => <li key={i}>{d.text}</li>)}
                 
                </ul>
                {plan.description && (
                  <p className="text-base text-white mb-6">{plan.description}</p>
                )}
              </div>
              <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 rounded-full mt-4 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-lg transition">Book Now</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
} 