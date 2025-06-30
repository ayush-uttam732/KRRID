'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useBookDemoModal } from '@/components/BookDemoModalContext';

export default function ContactPage() {
  const router = useRouter();
  const { openBookDemoModal } = useBookDemoModal();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', type: '', message: '' });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Form submitted: ' + JSON.stringify(form)); };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-0">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch justify-center min-h-screen">
        {/* Left: Heading & Buttons */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 py-10 md:py-0">
          <button className="mb-4 px-4 py-2 rounded-full bg-gray-200 text-black font-semibold w-max text-sm sm:text-base">● Contact Us</button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">How can we<br />help you?</h1>
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-md">We&apos;re here to help—explore the resources below and reach out anytime with questions.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-xs sm:max-w-none">
            <button
              className="bg-white text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 text-base sm:text-lg transition w-full sm:w-auto"
              onClick={() => router.push('/#faqs')}
            >
              Search FAQs
            </button>
            <button
              className="bg-[#25C6F5] hover:bg-[#199ed8] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 text-base sm:text-lg transition w-full sm:w-auto"
              onClick={openBookDemoModal}
            >
              Get Free Demo
            </button>
          </div>
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <form
            className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-3 sm:gap-4"
            style={{ boxShadow: '0 8px 40px 0 rgba(37,198,245,0.25)' }}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input className="flex-1 min-w-0 rounded border border-blue-200 p-3 text-base sm:text-lg" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name*" required />
              <input className="flex-1 min-w-0 rounded border border-blue-200 p-3 text-base sm:text-lg" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required />
            </div>
            <input className="rounded border border-blue-200 p-3 text-base sm:text-lg" name="email" value={form.email} onChange={handleChange} placeholder="Your email*" type="email" required />
            <select className="rounded border border-blue-200 p-3 text-base sm:text-lg" name="type" value={form.type} onChange={handleChange} required>
              <option value="">Please Select</option>
              <option value="demo">Book Free Demo</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
            <textarea className="rounded border border-blue-200 p-3 text-base sm:text-lg" name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={4} />
            <button className="bg-black text-white font-bold py-2 sm:py-3 rounded-lg mt-2 text-base sm:text-lg hover:bg-gray-900 transition">Subbmit</button>
          </form>
        </div>
      </div>
      <style jsx global>{`
        ::placeholder {
          color: #222 !important;
          opacity: 1 !important;
          font-weight: 500;
        }
        select, select option, select optgroup {
          color: #222 !important;
          background: #fff !important;
          font-weight: 500;
        }
        select:focus, select:active {
          color: #222 !important;
          background: #f3f4f6 !important;
        }
      `}</style>
    </main>
  );
} 