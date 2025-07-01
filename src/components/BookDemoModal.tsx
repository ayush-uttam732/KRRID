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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-[#EDEDED] rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-4xl w-full mx- relative p-0 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl  cursor-pointer text-white hover:text-white-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close demo dialog"
        >
          &times;
        </button>
        {/* Left: Image */}
        <div className="flex-shrink-0 w-full md:w-[340px] h-[320px] md:h-[420px] flex items-center justify-center]">
          <Image
            src="/demo.svg"
            alt="Student learning chess"
            width={320}
            height={420}
            className="object-cover rounded-2xl md:rounded-3xl mt-20 ml-4 w-full h-full"
          />
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex flex-col justify-center px-8 py-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Schedule A Meeting</h2>
          <p className="text-gray-500 mb-6">Lets start journey with us</p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1">First name</label>
                <input
                  className="w-full rounded border text-black border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1">Last name</label>
                <input
                  className="w-full rounded border text-black  border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Your email</label>
              <input
                className="w-full text-black  rounded border border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1">Date</label>
                <input
                  className="w-full  text-black  rounded border border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  type="date"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1">Familiarity</label>
                <select
                  className="w-full rounded border border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="familiarity"
                  value={form.familiarity}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <button
              className="w-full bg-black text-white font-bold py-4 rounded-xl cursor-pointer mt-4 text-xl hover:bg-gray-900 transition"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 