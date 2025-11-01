'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<null | 'ok' | 'fail'>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch('/api/submit-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'ok' : 'fail');
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="https://cdn.coverr.co/videos/coverr-network-cables-8573/1080p.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg">
            nexBT Holdings Inc.
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Empowering Filipino innovators with <em>malasakit</em> to solve real problems — for the
            Philippines and the world.
          </p>
          <a href="#interest" className="btn mt-8 inline-block">
            Show your interest
          </a>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="glass p-8">
          <h2 className="text-2xl font-semibold text-cyan-400">Our Vision</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            To be the leading technology hub that drives innovation and pioneers the next big thing —
            by empowering Filipino founders who solve real problems with integrity and impact.
          </p>
        </div>
        <div className="glass p-8">
          <h2 className="text-2xl font-semibold text-cyan-400">What We Do</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            We connect capital, mentorship, and government partnerships to mission-driven teams.
            nexBT is a startup built to help other startups rise.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="interest" className="mx-auto max-w-3xl px-6 pb-24">
        <div className="glass p-8">
          <h2 className="text-2xl font-semibold text-cyan-400">Join Our Vision</h2>
          <p className="mt-2 text-gray-300">
            Share your details and how you want to collaborate — as a founder, investor, or partner.
          </p>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" required placeholder="Full name" className="rounded-xl bg-transparent border border-white/20 p-3 text-gray-100 placeholder-gray-400" />
              <input type="email" name="email" required placeholder="Email" className="rounded-xl bg-transparent border border-white/20 p-3 text-gray-100 placeholder-gray-400" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="role" placeholder="Role (Founder/Investor/Partner)" className="rounded-xl bg-transparent border border-white/20 p-3 text-gray-100 placeholder-gray-400" />
              <input name="org" placeholder="Organization (optional)" className="rounded-xl bg-transparent border border-white/20 p-3 text-gray-100 placeholder-gray-400" />
            </div>
            <textarea name="message" required placeholder="Share your idea or how you'd like to help…" rows={5} className="rounded-xl bg-transparent border border-white/20 p-3 text-gray-100 placeholder-gray-400"></textarea>
            <button className="btn w-fit">Submit interest</button>
            {status === 'ok' && <p className="text-green-400">✅ Thanks! We’ll be in touch.</p>}
            {status === 'fail' && <p className="text-red-400">❌ Something went wrong. Try again.</p>}
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} nexBT Holdings Inc.
        </p>
      </section>
    </main>
  );
}
