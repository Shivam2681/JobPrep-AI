"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  ChevronRight,
  Star,
  Users,
  Zap,
  Settings,
  LineChart,
  ArrowRight,
  Plus,
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1E30] to-black text-white relative">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10">
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-[#1A1A2E]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* <Brain className="w-8 h-8 text-[#FF007A]" /> */}
                <Image src="/logo.svg" alt='' width={50} height={50}/>
                <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">JobPrep AI</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="hover:text-[#FF007A] transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-[#FF007A] transition-colors">How it Works</a>
                <a href="#testimonials" className="hover:text-[#FF007A] transition-colors">Testimonials</a>
                <a href="#pricing" className="hover:text-[#FF007A] transition-colors">Pricing</a>
              </nav>
              <button onClick={handleGetStarted} className="bg-[#FF007A] hover:bg-[#FF007A]/90 text-white px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
              Master Your Interviews with AI
            </h1>
            <p className="text-[#B0B0B0] text-xl mb-12">
              Elevate your interview skills with our cutting-edge AI-driven preparation platform. Practice, learn, and succeed.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleGetStarted} className="bg-[#FF007A] hover:bg-[#FF007A]/90 text-white px-6 py-3 rounded-lg font-semibold flex items-center hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
                Start Practicing <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="mt-12 relative rounded-xl overflow-hidden border-2 border-[#8A2BE2] shadow-[0_0_30px_rgba(138,43,226,0.3)] aspect-video">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Interview Practice with AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[#1D1E30]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Choose JobPrep AI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Brain, 
                  title: "AI-Powered Insights", 
                  desc: "Get personalized feedback and recommendations to improve your interview performance." 
                },
                { 
                  icon: Settings, 
                  title: "Customizable Scenarios", 
                  desc: "Practice with industry-specific questions tailored to your experience level." 
                },
                { 
                  icon: LineChart, 
                  title: "Real-time Analysis", 
                  desc: "Receive immediate feedback on your responses, body language, and tone." 
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-[#2A2B3F]/80 border-none rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                  <item.icon className="w-12 h-12 mb-4 text-[#FF007A]" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#B0B0B0]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: 1, title: "Create Your Profile", desc: "Enter your details, job preferences, and experience level." },
                { number: 2, title: "Choose Your Interview", desc: "Select from various interview types and difficulty levels." },
                { number: 3, title: "Practice and Improve", desc: "Receive AI feedback and track your progress over time." }
              ].map((step, i) => (
                <div key={i} className="p-6 bg-[#2A2B3F]/80 border-none rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.3)] text-center">
                  <div className="w-12 h-12 bg-[#FF007A]/20 text-[#FF007A] rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-[#B0B0B0]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[#1D1E30]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  rating: 5,
                  text: "JobPrep AI helped me land my dream job! The personalized feedback was invaluable.",
                  name: "Karan",
                  title: "Software Engineer"
                },
                {
                  rating: 5,
                  text: "I've never felt more prepared for interviews. This platform is a game-changer!",
                  name: "Vivek",
                  title: "Data Scientist"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-6 bg-[#2A2B3F]/80 border-none rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-[#FF007A] fill-[#FF007A]" />
                    ))}
                  </div>
                  <p className="text-white mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-[#B0B0B0] text-sm">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              Simple, Transparent Pricing
            </h2>
            <div className="p-8 bg-[#2A2B3F]/80 border-2 border-[#8A2BE2] rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.3)] max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
              <p className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                $19<span className="text-xl text-[#B0B0B0]">/month</span>
              </p>
              <ul className="text-left mb-8 space-y-4">
                {[
                  "Unlimited AI-powered mock interviews",
                  "Personalized feedback and improvement tracking",
                  "Access to industry-specific question banks"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <ChevronRight className="text-[#FF007A] mr-2 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={handleGetStarted} className="w-full bg-[#FF007A] hover:bg-[#FF007A]/90 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
                Start Your Free Trial
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[#1D1E30] to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ace Your Interviews?
            </h2>
            <p className="text-[#B0B0B0] text-xl mb-12">
              Join thousands of job seekers who have transformed their interview skills with JobPrep AI.
            </p>
            <button onClick={handleGetStarted} className="bg-[#FF007A] hover:bg-[#FF007A]/90 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] text-lg px-8 py-6 rounded-lg transition-all">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5 inline" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-[#1A1A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  {/* <Brain className="w-6 h-6 text-[#FF007A]" /> */}
                  <Image src="/logo.svg" alt='' width={50} height={50}/>
                  <span className="font-bold">JobPrep AI</span>
                </div>
                <p className="text-[#B0B0B0]">
                  Empowering job seekers with AI-driven interview preparation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <p className="text-[#B0B0B0]">support@jobprepai.com</p>
                <p className="text-[#B0B0B0]">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Users, href: '#' },
                    { icon: Brain, href: '#' },
                    { icon: LineChart, href: '#' },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="text-[#FF007A] hover:text-[#FF007A]/80 hover:shadow-[0_0_15px_rgba(255,0,122,0.5)] transition-all"
                    >
                      <item.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#28293E] text-center text-[#B0B0B0]">
              © 2025 JobPrep AI. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}