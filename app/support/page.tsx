'use client';
import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { 
    MapPin, Phone, Mail, Clock, Send, 
    Search, History, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { submitInquiry, getInquiriesByEmail } from '@/lib/actions/inquiry';
import { toast } from 'react-toastify';

export default function SupportPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Tracking State
    const [trackEmail, setTrackEmail] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [userTickets, setUserTickets] = useState<any[] | null>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackEmail) return;
        setIsTracking(true);
        try {
            const results = await getInquiriesByEmail(trackEmail);
            setUserTickets(results);
            if (results.length === 0) {
                toast.info("No tickets found for this email address.");
            }
        } catch (error) {
            toast.error("Error fetching status. Please try again.");
        } finally {
            setIsTracking(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const result = await submitInquiry(formState);
            if (result.success) {
                toast.success(result.message);
                setSubmitted(true);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                        Contact <span className="text-yellow-400">Support</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Need assistance with your gear or have a question about our products? 
                        Our elite support team is ready to help you optimize your gaming setup.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-black text-white mb-8 uppercase flex items-center gap-3 tracking-tight">
                                <span className="w-1.5 h-8 bg-yellow-400"></span>
                                Get In Touch
                            </h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed text-lg">
                                Whether you're tracking an order, need technical troubleshooting, or want to share feedback, we're committed to providing you with the best experience possible.
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

                {/* Tracking Status Section */}
                <div className="mt-24 pt-16 border-t border-zinc-800/50">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">
                            Track Your <span className="text-yellow-400">Inquiry</span>
                        </h2>
                        <p className="text-zinc-400">
                            Enter the email address you used to contact us to see the current status of your tickets.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <form onSubmit={handleTrack} className="flex gap-2 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl mb-12 focus-within:border-yellow-400/50 transition-all">
                            <div className="flex-1 flex items-center px-4">
                                <Search className="w-5 h-5 text-zinc-500 mr-3" />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address..."
                                    value={trackEmail}
                                    onChange={(e) => setTrackEmail(e.target.value)}
                                    className="w-full bg-transparent border-none text-white focus:outline-none placeholder-zinc-600 text-sm py-2"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={isTracking}
                                className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-8 rounded-xl h-12 uppercase tracking-tight disabled:opacity-50"
                            >
                                {isTracking ? 'Searching...' : 'Track Ticket'}
                            </Button>
                        </form>

                        {/* Results */}
                        <div className="space-y-4">
                            {userTickets && userTickets.length > 0 ? (
                                userTickets.map((ticket, idx) => (
                                    <div key={ticket._id} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <History className="w-4 h-4 text-yellow-400/50" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                        Ticket ID: {ticket._id.slice(-6).toUpperCase()}
                                                    </span>
                                                </div>
                                                <h3 className="text-white font-bold leading-tight mb-1">{ticket.subject}</h3>
                                                <p className="text-zinc-500 text-xs line-clamp-1">{ticket.message}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                {ticket.status === 'read' ? (
                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        <CheckCircle2 size={10} />
                                                        In Review
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        <Clock size={10} className="animate-pulse" />
                                                        Received
                                                    </span>
                                                )}
                                                <span className="text-[9px] text-zinc-600 font-bold">
                                                    {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : userTickets && (
                                <div className="text-center py-12 bg-zinc-900/20 border border-dashed border-zinc-900 rounded-3xl">
                                    <AlertCircle className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                                    <p className="text-zinc-600 text-sm font-medium italic">No tickets found for this address.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
