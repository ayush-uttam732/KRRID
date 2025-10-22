"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin as supabase } from "@/utils/supabaseClient";

interface User {
  email?: string;
  id: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  position: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  position: number;
  chapter: string;
  white: string;
  black: string;
  result: string;
  date: string;
  pgn: string;
  fen: string;
}

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chapters' | 'lessons'>("chapters");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [chapterForm, setChapterForm] = useState({ title: "", description: "", position: 1 });
  const [lessonForm, setLessonForm] = useState({ chapter: "", title: "", description: "", position: 1, white: "", black: "", result: "", date: "", pgn: "", fen: "" });
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
      fetchChapters();
      fetchLessons();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email && !ADMIN_EMAILS.includes(user.email)) {
      setUnauthorized(true);
      supabase.auth.signOut().then(() => {
        window.location.reload();
      });
    }
  }, [user]);

  async function fetchChapters() {
    const { data, error } = await supabase.from("chapters").select("*").order("position");
    if (!error) setChapters(data || []);
  }
  async function fetchLessons() {
    const { data, error } = await supabase.from("lessons").select("*").order("position");
    if (!error) setLessons(data || []);
  }

  async function handleChapterSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!chapterForm.title) { setError("Title required"); return; }
    if (editingChapter) {
      await supabase.from("chapters").update({ ...chapterForm }).eq("id", editingChapter.id);
      setEditingChapter(null);
    } else {
      await supabase.from("chapters").insert([{ ...chapterForm }]);
    }
    setChapterForm({ title: "", description: "", position: 1 });
    fetchChapters();
  }
  async function handleLessonSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!lessonForm.title || !lessonForm.chapter) { setError("Title and chapter required"); return; }
    if (editingLesson) {
      await supabase.from("lessons").update({ ...lessonForm }).eq("id", editingLesson.id);
      setEditingLesson(null);
    } else {
      await supabase.from("lessons").insert([{ ...lessonForm }]);
    }
    setLessonForm({ chapter: "", title: "", description: "", position: 1, white: "", black: "", result: "", date: "", pgn: "", fen: "" });
    fetchLessons();
  }
  async function handleDeleteChapter(id: string) {
    await supabase.from("chapters").delete().eq("id", id);
    fetchChapters();
  }
  async function handleDeleteLesson(id: string) {
    await supabase.from("lessons").delete().eq("id", id);
    fetchLessons();
  }
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-black">Loading...</div>;
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200">
          <h1 className="text-2xl font-heading font-bold mb-6 text-black text-center">Admin Login</h1>
          <form onSubmit={async e => { e.preventDefault(); setLoginError(null); setLoginLoading(true); const { email, password } = loginForm; const { data, error } = await supabase.auth.signInWithPassword({ email, password }); setLoginLoading(false); if (error) setLoginError(error.message); else setUser(data.user); }} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} required />
            <input type="password" placeholder="Password" className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-primary outline-none bg-white text-black" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} required />
            <button type="submit" className="bg-primary text-white rounded-lg px-4 py-2 font-heading text-lg transition-transform duration-200 hover:scale-105 hover:bg-primary disabled:opacity-60" disabled={loginLoading}>{loginLoading ? "Logging in..." : "Login"}</button>
            {loginError && <div className="text-red-500 text-center">{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }
  if (unauthorized) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl bg-gray-50">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black p-0 m-0">
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-heading font-bold mb-2">Chess Platform Admin</h1>
        <p className="mb-6 text-gray-500">Manage chapters and lessons for your chess teaching platform</p>
        <div className="flex gap-2 mb-6">
          <button className={`px-4 py-2 rounded font-semibold ${activeTab === 'chapters' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border'}`} onClick={() => setActiveTab('chapters')}>Chapters</button>
          <button className={`px-4 py-2 rounded font-semibold ${activeTab === 'lessons' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border'}`} onClick={() => setActiveTab('lessons')}>Lessons</button>
          <a href="/admin/TeachingPlatform" className="px-4 py-2 rounded font-semibold bg-purple-700 text-white hover:bg-purple-800 transition-colors">Teaching Platform</a>
          <a href="/admin/blog" className="px-4 py-2 rounded font-semibold bg-green-700 text-white hover:bg-green-800 transition-colors">Manage Blog Posts</a>
        </div>
        {activeTab === 'chapters' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chapters</h2>
            </div>
            <form className="bg-white rounded-xl shadow p-6 mb-6 max-w-xl" onSubmit={handleChapterSave}>
              <div className="mb-2 font-semibold">{editingChapter ? "Edit Chapter" : "New Chapter"}</div>
              <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Chapter Title" value={chapterForm.title} onChange={e => setChapterForm(f => ({ ...f, title: e.target.value }))} />
              <textarea className="w-full mb-2 px-3 py-2 border rounded" placeholder="Chapter Description" value={chapterForm.description} onChange={e => setChapterForm(f => ({ ...f, description: e.target.value }))} />
              <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Position" type="number" value={chapterForm.position} onChange={e => setChapterForm(f => ({ ...f, position: Number(e.target.value) }))} />
              <div className="flex gap-2">
                <button className="bg-gray-900 text-white px-4 py-2 rounded font-semibold" type="submit">Save</button>
                <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded font-semibold" type="button" onClick={() => { setEditingChapter(null); setChapterForm({ title: "", description: "", position: 1 }); }}>Cancel</button>
              </div>
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
            {chapters.map((ch) => (
              <div key={ch.id} className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{ch.title}</div>
                  <div className="text-gray-500 text-sm mb-1">{ch.description}</div>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-200 rounded px-2 py-1">{ch.title.toLowerCase()}</span>
                    <span className="bg-gray-200 rounded px-2 py-1">Position: {ch.position}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-100 px-2 py-1 rounded" onClick={() => { setEditingChapter(ch); setChapterForm({ title: ch.title, description: ch.description, position: ch.position }); }}>✏️</button>
                  <button className="bg-gray-100 px-2 py-1 rounded" onClick={() => handleDeleteChapter(ch.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'lessons' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Lessons</h2>
            </div>
            <form className="bg-white rounded-xl shadow p-6 mb-6 max-w-xl" onSubmit={handleLessonSave}>
              <div className="mb-2 font-semibold">{editingLesson ? "Edit Lesson" : "New Lesson"}</div>
              <select className="w-full mb-2 px-3 py-2 border rounded" value={lessonForm.chapter} onChange={e => setLessonForm(f => ({ ...f, chapter: e.target.value }))}>
                <option value="">Select Chapter</option>
                {chapters.map(ch => <option key={ch.id} value={ch.title}>{ch.title}</option>)}
              </select>
              <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Lesson Title" value={lessonForm.title} onChange={e => setLessonForm(f => ({ ...f, title: e.target.value }))} />
              <textarea className="w-full mb-2 px-3 py-2 border rounded" placeholder="Lesson Description" value={lessonForm.description} onChange={e => setLessonForm(f => ({ ...f, description: e.target.value }))} />
              <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="Position" type="number" value={lessonForm.position} onChange={e => setLessonForm(f => ({ ...f, position: Number(e.target.value) }))} />
              <div className="flex gap-2 mb-2">
                <input className="w-full px-3 py-2 border rounded" placeholder="White Player" value={lessonForm.white} onChange={e => setLessonForm(f => ({ ...f, white: e.target.value }))} />
                <input className="w-full px-3 py-2 border rounded" placeholder="Black Player" value={lessonForm.black} onChange={e => setLessonForm(f => ({ ...f, black: e.target.value }))} />
              </div>
              <div className="flex gap-2 mb-2">
                <input className="w-full px-3 py-2 border rounded" placeholder="Result (e.g., 1-0, 0-1, 1/2-1/2)" value={lessonForm.result} onChange={e => setLessonForm(f => ({ ...f, result: e.target.value }))} />
                <input className="w-full px-3 py-2 border rounded" placeholder="Date Played" value={lessonForm.date} onChange={e => setLessonForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="PGN (e.g., 1. e4 e5 2. Nf3 Nc6)" value={lessonForm.pgn} onChange={e => setLessonForm(f => ({ ...f, pgn: e.target.value }))} />
              <input className="w-full mb-2 px-3 py-2 border rounded" placeholder="FEN Position" value={lessonForm.fen} onChange={e => setLessonForm(f => ({ ...f, fen: e.target.value }))} />
              <div className="flex gap-2">
                <button className="bg-gray-900 text-white px-4 py-2 rounded font-semibold" type="submit">Save</button>
                <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded font-semibold" type="button" onClick={() => { setEditingLesson(null); setLessonForm({ chapter: chapters[0]?.title || "", title: "", description: "", position: 1, white: "", black: "", result: "", date: "", pgn: "", fen: "" }); }}>Cancel</button>
              </div>
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
            {lessons.map((ls) => (
              <div key={ls.id} className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg">{ls.title}</div>
                  <div className="text-gray-500 text-sm mb-1">{ls.description}</div>
                  <div className="flex gap-2 text-xs mb-1">
                    <span className="bg-gray-200 rounded px-2 py-1">{ls.chapter}</span>
                    <span className="bg-gray-200 rounded px-2 py-1">Position: {ls.position}</span>
                    <span className="bg-gray-200 rounded px-2 py-1">{ls.date}</span>
                  </div>
                  <div className="text-xs text-gray-400">PGN: {ls.pgn}</div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-100 px-2 py-1 rounded" onClick={() => { setEditingLesson(ls); setLessonForm({ chapter: ls.chapter, title: ls.title, description: ls.description, position: ls.position, white: ls.white, black: ls.black, result: ls.result, date: ls.date, pgn: ls.pgn, fen: ls.fen }); }}>✏️</button>
                  <button className="bg-gray-100 px-2 py-1 rounded" onClick={() => handleDeleteLesson(ls.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button onClick={handleLogout} className="mt-10 bg-gray-200 hover:bg-gray-400 text-gray-800 rounded-lg px-4 py-2 font-heading font-semibold shadow">Logout</button>
      </div>
    </div>
  );
} 