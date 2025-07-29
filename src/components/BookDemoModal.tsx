'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BookDemoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookDemoModal({ open, onClose }: BookDemoModalProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    familiarity: '',
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 100); // 100ms delay
    } else {
      setShow(false);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Form submitted: ' + JSON.stringify(form));
    onClose();
  };

  if (!open && !show) return null;

  return (
    <div className={`fixed inset-0 overflow-x-hidden z-50 flex sm:justify-center sm:items-center bg-black/20 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-[#EDEDED] rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-4xl h-full  mt-20 relative p-0 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl  cursor-pointer text-white hover:text-white-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close demo dialog"
        >
          &times;
        </button>
        {/* Left: Image */}
        <div className="flex-shrink-0 w-[200px] md:w-[340px] h-[320px] md:h-[420px] flex items-center justify-center]">
          <Image
            src="/demo.svg"
            alt="Student learning chess"
            width={320}
            height={420}
            className="object-cover rounded-2xl md:rounded-3xl mt-20 sm:mt-90 ml-4 w-full h-full"
          />
        </div>
        {/* Right: Form */}
        <div className=" flex flex-col  sm:flex-col justify-center px-8 py-8">
          <div >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 sm:mt-0 mb-2">Schedule A Meeting</h2>
          <p className="text-gray-500 mb-6">Lets start journey with us</p></div>
          
             <form
            className="bg-white rounded-2xl  md:max-w-lg shadow-2xl p-4 sm:p-0 md:p-10 w-full max-w-xs  md:max-w-lg flex flex-col gap-3 sm:gap-4"
            style={{ boxShadow: '0 8px 40px 0 rgba(37,198,245,0.25)' }}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input className="flex-1 min-w-0 rounded border border-blue-200 text-black  p-3 text-base sm:text-lg" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name*" required />
              <input className="flex-1 min-w-0 rounded border border-blue-200 text-black p-3 text-base sm:text-lg" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required />
            </div>
            <input className="rounded border border-blue-200 p-3 text-base text-black sm:text-lg" name="email" value={form.email} onChange={handleChange} placeholder="Your email*" type="email" required />
            <select className="rounded border border-blue-200 p-3 text-base text-black sm:text-lg" name="type" value={form.type} onChange={handleChange} required>
               <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
            </select>
            
                <label className="block text-sm text-gray-700 mb-1">Date</label>
                <input
                  className="w-full  text-black  rounded border border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  type="date"
                  required
                />
             
            <textarea className="rounded border border-blue-200 p-3 text-base text-black sm:text-lg" name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={4} />
            <button className="bg-black text-white font-bold py-2 sm:py-3  cursor-pointer rounded-lg mt-0 text-base sm:text-lg hover:bg-gray-900 transition">Subbmit</button>
          </form>
        </div>
      </div>
    </div>
  );
} 