'use client';

import React from "react"

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'confirmPassword' || name === 'password') {
      const pass = name === 'password' ? value : formData.password;
      const confirm = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(pass === confirm);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Account created successfully!');
        router.push('/signin');
      } else {
        toast.error(data.message || 'Registration failed');
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
            <h1 className="text-3xl font-bold text-yellow-400 mb-2 italic">JOIN US</h1>
            <p className="text-gray-400 mb-8">Create your DROP ZONE account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border-2 border-yellow-400/30 focus:border-yellow-400 text-white px-4 py-3 transition-colors outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border-2 border-yellow-400/30 focus:border-yellow-400 text-white px-4 py-3 transition-colors outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm">PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-black border-2 border-yellow-400/30 focus:border-yellow-400 text-white px-4 py-3 transition-colors outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-black border-2 px-4 py-3 transition-colors outline-none text-white ${passwordMatch ? 'border-yellow-400/30 focus:border-yellow-400' : 'border-red-500'
                    }`}
                  placeholder="••••••••"
                  required
                />
                {!passwordMatch && <p className="text-red-500 text-xs mt-1">Passwords do not match</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !passwordMatch}
                className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition-all disabled:opacity-70"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                SIGN IN
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
