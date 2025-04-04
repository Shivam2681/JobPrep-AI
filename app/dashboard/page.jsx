import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { Brain, Clock, History, Plus, Search } from 'lucide-react'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1E30] to-black text-white relative">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0"
        // style={{
        //   backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        //                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        //   backgroundSize: '50px 50px'
        // }}
      ></div>
      
      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header with User Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">Dashboard</h2>
            <h2 className="text-[#B0B0B0] mt-2">Create and start your AI Mockup Interview</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search interviews..." 
                className="pl-10 pr-4 py-2 rounded-lg bg-[#2A2B3F]/80 border-none focus:outline-none focus:ring-2 focus:ring-[#FF007A] text-white w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: Brain, title: "Total Interviews", value: "12", color: "#FF007A" },
            { icon: Clock, title: "Practice Hours", value: "8.5", color: "#00FFFF" },
            { icon: History, title: "Last Session", value: "2 days ago", color: "#8A2BE2" }
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-[#2A2B3F]/80 border-none rounded-lg ">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Interview Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Create New Interview</h3>
            
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddNewInterview />
          </div>
        </div>

        {/* Previous Interview List Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Interviews</h3>
          </div>
          
          <div className="bg-[#2A2B3F]/80 border-none rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)] p-6">
            <InterviewList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard