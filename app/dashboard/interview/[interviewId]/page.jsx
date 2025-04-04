"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Brain, Clock, Lightbulb, MessageCircle, Mic, Shield, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { UserButton } from '@clerk/nextjs'

function Interview({params}) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(params.interviewId);
        getInterviewDetails();
    }, []);

    // fetch interview details by mockID/interviewId
    const getInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockID, params.interviewId));
            setInterviewData(result[0]);
        } catch (error) {
            console.error("Error fetching interview data:", error);
        } finally {
            setIsLoading(false);
        }
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
            
            <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Header with User Button */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">Interview Setup</h2>
                        <h2 className="text-[#B0B0B0] mt-2">Prepare yourself for your AI mock interview session</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-[#B0B0B0] hover:text-white">
                                Back to Dashboard
                            </Button>
                        </Link>
                        <UserButton />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Interview Details Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#2A2B3F]/80 rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)] p-6">
                            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                                Interview Details
                            </h3>
                            
                            {isLoading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-6 bg-[#3D3E5A] rounded w-3/4"></div>
                                    <div className="h-6 bg-[#3D3E5A] rounded w-full"></div>
                                    <div className="h-6 bg-[#3D3E5A] rounded w-1/2"></div>
                                </div>
                            ) : interviewData ? (
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-[#FF007A]/20 mt-1">
                                            <Brain className="w-5 h-5 text-[#FF007A]" />
                                        </div>
                                        <div>
                                            <p className="text-[#B0B0B0] text-sm">Job Role/Job Position</p>
                                            <p className="text-lg font-medium">{interviewData.jobPosition}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-[#00FFFF]/20 mt-1">
                                            <MessageCircle className="w-5 h-5 text-[#00FFFF]" />
                                        </div>
                                        <div>
                                            <p className="text-[#B0B0B0] text-sm">Job Description/Tech Stack</p>
                                            <p className="text-base">{interviewData.jobDesc}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-[#8A2BE2]/20 mt-1">
                                            <Clock className="w-5 h-5 text-[#8A2BE2]" />
                                        </div>
                                        <div>
                                            <p className="text-[#B0B0B0] text-sm">Years of Experience</p>
                                            <p className="text-lg font-medium">{interviewData.jobExperience} years</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[#B0B0B0]">No interview data found.</p>
                            )}
                        </div>
                        
                        {/* Information Box */}
                        <div className="mt-6 bg-[#2A2B3F]/80 border-l-4 border-[#FFD700] rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)] p-6">
                            <div className="flex items-center space-x-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-[#FFD700]" />
                                <h3 className="text-lg font-semibold text-[#FFD700]">Tips for Success</h3>
                            </div>
                            <p className="text-[#E0E0E0]">
                                {process.env.NEXT_PUBLIC_INFORMATION || 
                                "Speak clearly, maintain eye contact, and take a moment to think before answering difficult questions. This AI interview will simulate a real interview experience to help you prepare."}
                            </p>
                        </div>
                    </div>
                    
                    {/* Camera Setup Panel */}
                    <div className="bg-[#2A2B3F]/80 rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)] p-6">
                        <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                            Setup Your Camera
                        </h3>
                        
                        <div className="flex flex-col items-center justify-center">
                            {webCamEnabled ? (
                                <div className="relative w-full aspect-video overflow-hidden rounded-lg border-2 border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                                    <Webcam
                                        onUserMedia={() => setWebCamEnabled(true)}
                                        onUserMediaError={() => setWebCamEnabled(false)}
                                        mirrored={true}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full aspect-video flex flex-col items-center justify-center bg-[#1D1E30] rounded-lg border border-dashed border-[#5D5E8D] p-6">
                                    <WebcamIcon className="w-20 h-20 text-[#5D5E8D] mb-4" />
                                    <p className="text-[#B0B0B0] text-center mb-6">Camera access required for the interview experience</p>
                                    <Button 
                                        variant="outline"
                                        className="bg-gradient-to-r from-[#FF007A] to-[#00FFFF] text-white border-none hover:opacity-90"
                                        onClick={() => setWebCamEnabled(true)}
                                    >
                                        <WebcamIcon className="w-4 h-4 mr-2" />
                                        Enable Camera
                                    </Button>
                                </div>
                            )}
                            
                            <div className="w-full mt-6 space-y-4">
                                <div className="flex items-center space-x-2 p-3 bg-[#1D1E30] rounded-lg">
                                    <Mic className="w-5 h-5 text-[#00FFFF]" />
                                    <div className="flex-1">
                                        <p className="text-[#B0B0B0] text-sm">Microphone</p>
                                        <p className="text-sm font-medium">{webCamEnabled ? "Connected" : "Not connected"}</p>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${webCamEnabled ? "bg-green-500" : "bg-red-500"}`}></div>
                                </div>
                                
                                <div className="flex items-center space-x-2 p-3 bg-[#1D1E30] rounded-lg">
                                    <WebcamIcon className="w-5 h-5 text-[#FF007A]" />
                                    <div className="flex-1">
                                        <p className="text-[#B0B0B0] text-sm">Camera</p>
                                        <p className="text-sm font-medium">{webCamEnabled ? "Connected" : "Not connected"}</p>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${webCamEnabled ? "bg-green-500" : "bg-red-500"}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { 
                            icon: Brain, 
                            title: "AI Interviewer", 
                            desc: "Powered by advanced AI to simulate real interviews", 
                            color: "#FF007A" 
                        },
                        { 
                            icon: Shield, 
                            title: "Privacy Protected", 
                            desc: "Your interview data stays private and secure", 
                            color: "#00FFFF" 
                        },
                        { 
                            icon: MessageCircle, 
                            title: "Instant Feedback", 
                            desc: "Get detailed feedback after your session", 
                            color: "#8A2BE2" 
                        }
                    ].map((card, i) => (
                        <div key={i} className="p-5 bg-[#2A2B3F]/80 rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)]">
                            <div className="p-3 rounded-lg w-fit" style={{ backgroundColor: `${card.color}20` }}>
                                <card.icon className="w-6 h-6" style={{ color: card.color }} />
                            </div>
                            <h4 className="text-lg font-semibold mt-3">{card.title}</h4>
                            <p className="text-[#B0B0B0] mt-1">{card.desc}</p>
                        </div>
                    ))}
                </div>
                
                {/* Start Button */}
                <div className="flex justify-end">
                    <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                        <Button 
                            className="bg-gradient-to-r from-[#FF007A] to-[#00FFFF] text-white hover:opacity-90 py-6 px-8 text-lg shadow-[0_0_30px_rgba(255,0,122,0.3)]"
                            disabled={!webCamEnabled}
                        >
                            {webCamEnabled ? "Start Interview" : "Enable Camera to Start"}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Interview;