"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const IconPlaceholder = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <IconPlaceholder className="w-12 h-12 mb-4 text-indigo-600" />
    <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Testimonial = ({ name, role, content }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-black">{name}</h3>
    <p className="text-gray-600 mb-2">{role}</p>
    <p className="text-gray-700 italic">"{content}"</p>
  </div>
);

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="logo.svg" alt="AI-Interview Mocker logo" className="w-10 h-10" />
            <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">JobPrep AI</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">How it Works</a></li>
              <li><a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition">Testimonials</a></li>
              <li><a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition">Pricing</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">Master Your Interviews with AI</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Elevate your interview skills with our cutting-edge AI-driven preparation platform. Practice, learn, and succeed.</p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleGetStarted} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center">
              Start Practicing <ChevronRight className="ml-2 h-4 w-4" />
            </button>
            {/* <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold flex items-center">
              <IconPlaceholder className="mr-2 h-4 w-4" /> Watch Demo
            </button> */}
          </div>
        </section>

        <section id="features" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Why Choose AI-Interview Mocker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI-Powered Insights"
              description="Get personalized feedback and recommendations to improve your interview performance."
            />
            <FeatureCard 
              title="Customizable Scenarios"
              description="Practice with industry-specific questions tailored to your experience level."
            />
            <FeatureCard 
              title="Real-time Analysis"
              description="Receive immediate feedback on your responses, body language, and tone."
            />
          </div>
        </section>

        <section id="how-it-works" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: 1, title: "Create Your Profile", description: "Enter your details, job preferences, and experience level." },
              { number: 2, title: "Choose Your Interview", description: "Select from various interview types and difficulty levels." },
              { number: 3, title: "Practice and Improve", description: "Receive AI feedback and track your progress over time." }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              name="Sarah Johnson"
              role="Software Engineer"
              content="AI-Interview Mocker helped me land my dream job! The personalized feedback was invaluable."
            />
            <Testimonial
              name="Michael Chen"
              role="Data Scientist"
              content="I've never felt more prepared for interviews. This platform is a game-changer!"
            />
          </div>
        </section>

        <section id="pricing" className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-10 text-primary">Simple, Transparent Pricing</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-4xl font-bold mb-6">$19<span className="text-xl text-gray-500">/month</span></p>
            <ul className="text-left mb-8">
              <li className="flex items-center mb-2">
                <ChevronRight className="text-green-500 mr-2 h-4 w-4" />
                Unlimited AI-powered mock interviews
              </li>
              <li className="flex items-center mb-2">
                <ChevronRight className="text-green-500 mr-2 h-4 w-4" />
                Personalized feedback and improvement tracking
              </li>
              <li className="flex items-center mb-2">
                <ChevronRight className="text-green-500 mr-2 h-4 w-4" />
                Access to industry-specific question banks
              </li>
            </ul>
            <button onClick={handleGetStarted} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold">
              Start Your Free Trial
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/logo.svg" alt="AI-Interview Mocker logo" className="w-10 h-10 inline-block mr-2" />
              <span className="text-xl font-bold">JobPrep AI</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-400 transition"><IconPlaceholder className="h-6 w-6" /></a>
              <a href="#" className="hover:text-indigo-400 transition"><IconPlaceholder className="h-6 w-6" /></a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            © 2024 JobPrep AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}