'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<null | 'ok' | 'fail'>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('/api/submit-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'ok' : 'fail');
    if (res.ok) form.reset();
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900">
            nexBT Holdings Inc.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-700">
            A conduit between investors and brilliant Filipino founders with <em>malasakit</em>—building
            solutions for the Philippines and the world.
          </p>
          <a
            href="#interest"
            className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-3 text-white hover:opacity-90"
          >
            Show your interest
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-5xl px-6 py-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="mt-3 text-slate-700">
            To be the leading technology hub that drives innovation and pioneers the next big thing—by
            empowering Filipino founders who solve real problems with integrity and impact.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">What We Do</h2>
          <p className="mt-3 text-slate-700">
            We connect capital, mentorship, and government/industry partners to mission-driven teams.
            nexBT is itself a startup—built to help other startups rise.
          </p>
        </div>
      </section>

      {/* INTEREST FORM */}
      <section id="interest" className="mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">I want to help build nexBT</h2>
          <p className="mt-2 text-slate-600">
            Tell us who you are and how you’d like to be involved (founder, investor, partner, advisor).
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            {/* honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" required placeholder="Full name" className="rounded-xl border p-3" />
              <input type="email" name="email" required placeholder="Email" className="rounded-xl border p-3" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="role" placeholder="Role (Founder/Investor/Partner)" className="rounded-xl border p-3" />
              <input name="org" placeholder="Organization (optional)" className="rounded-xl border p-3" />
            </div>

            <textarea name="message" required placeholder="Share your idea, interest, or how you'd like to help…" rows={5} className="rounded-xl border p-3"></textarea>

            <button className="rounded-xl bg-slate-900 px-6 py-3 text-white hover:opacity-90 w-fit">
              Submit interest
            </button>

            {status === 'ok'   && <p className="text-green-700">Thanks! We’ll get in touch via email.</p>}
            {status === 'fail' && <p className="text-red-700">Sorry—something went wrong. Please try again.</p>}
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} nexBT Holdings Inc.
        </p>
      </section>
    </main>
  );
}
