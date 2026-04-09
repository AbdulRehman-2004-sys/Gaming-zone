'use client';

import React from "react"

import { Keyboard, Radio, Zap, Settings, Wifi, RotateCcw } from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'connection',
    icon: <Wifi className="w-8 h-8" />,
    title: 'Connection Type',
    description: 'Choose between wireless with ultra-low latency SLIPSTREAM technology, Bluetooth for multi-device compatibility, or reliable wired USB connections. All options deliver lag-free gaming performance.',
  },
  {
    id: 'usecase',
    icon: <Settings className="w-8 h-8" />,
    title: 'Your Use Case',
    description: 'Whether you are a competitive esports player, casual gamer, or productivity-focused user, we have a keyboard tailored to your specific needs with features that matter most to you.',
  },
  {
    id: 'switches',
    icon: <Radio className="w-8 h-8" />,
    title: 'Mechanical Switches',
    description: 'From linear to tactile to clicky switches, each offers a unique typing experience. Customize actuation points and trigger sensitivity for your perfect keystroke response.',
  },
  {
    id: 'multidevice',
    icon: <Zap className="w-8 h-8" />,
    title: 'Multi-Device Support',
    description: 'Seamlessly switch between up to 4 different devices. Perfect for streamers and professionals who need to quickly transition between gaming PC, console, and work setup.',
  },
  {
    id: 'mechanical',
    icon: <Keyboard className="w-8 h-8" />,
    title: 'Mechanical Design',
    description: 'Mechanical keyboards provide superior responsiveness compared to membrane designs. Experience the difference with every keystroke in gaming and typing.',
  },
  {
    id: 'layout',
    icon: <RotateCcw className="w-8 h-8" />,
    title: 'Size & Layout',
    description: 'From compact 60% layouts to full-size boards. Select the size that matches your desk space and playstyle. We offer 60%, 75%, TKL, and full-size options.',
  },
];

export function KeyFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Key Features to Consider
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Understanding these essential factors will help you choose the perfect gaming keyboard for your needs and playstyle.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-900 border border-yellow-400/20 rounded-lg p-6 hover:border-yellow-400/50 transition-all duration-300 hover:bg-gray-800/50"
            >
              {/* Icon */}
              <div className="text-yellow-400 mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Link */}
              <a href="#" className="text-yellow-400 text-sm font-bold hover:text-yellow-300 transition-colors inline-flex items-center gap-2">
                Learn More
                <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
