'use client';

import React from "react"

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Welcome back!');
        // Check role and redirect accordingly
        if (data.user && data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-32 pb-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-gray-900 border-2 border-yellow-400/30 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2 italic">SIGN IN</h1>
            <p className="text-gray-400 mb-8">Welcome back to DROP ZONE</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border-2 border-yellow-400/30 focus:border-yellow-400 text-white px-4 py-3 transition-colors outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border-2 border-yellow-400/30 focus:border-yellow-400 text-white px-4 py-3 transition-colors outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition-all disabled:opacity-70"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                SIGN UP HERE
              </Link>
            </p>

            <p className="text-center text-gray-400 mt-4 text-sm">
              <Link href="/" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
