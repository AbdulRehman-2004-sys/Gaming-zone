'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black border-b border-yellow-400/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider">
                        Contact <span className="text-yellow-400">Support</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Our dedicated team is here to help. Reach out to us for technical support,
                        product inquiries, or just to say hello.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-8 uppercase flex items-center gap-3">
                                <span className="w-1 h-8 bg-yellow-400"></span>
                                Get in Touch
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Whether you have a question about our products, need assistance with your order,
                                or want to provide feedback, we're ready to assist you.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover:border-yellow-400 transition-colors">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wide mb-1">Phone</h3>
                                    <p className="text-gray-400">+92 303 2607771</p>
                                    <p className="text-xs text-gray-500 mt-1">Mon-Fri from 8am to 5pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover:border-yellow-400 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wide mb-1">Email</h3>
                                    <p className="text-gray-400">support@dropzone.com</p>
                                    <p className="text-xs text-gray-500 mt-1">We'll respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover:border-yellow-400 transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wide mb-1">Headquarters</h3>
                                    <p className="text-gray-400">123 Gaming Street, Tech District</p>
                                    <p className="text-gray-400">Lahore, Pakistan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover:border-yellow-400 transition-colors">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wide mb-1">Business Hours</h3>
                                    <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase">Send us a message</h2>

                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thank you for contacting us. We will get back to you shortly.</p>
                                <Button
                                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                                    className="mt-8 bg-yellow-400 text-black hover:bg-yellow-300 font-bold"
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-600"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-600"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formState.subject}
                                        onChange={(e: any) => handleChange(e)}
                                        className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                                    >
                                        <option value="" disabled>Select a topic</option>
                                        <option value="support">Technical Support</option>
                                        <option value="sales">Sales Inquiry</option>
                                        <option value="warranty">Warranty Claim</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-600 resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-6 uppercase tracking-wider text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
