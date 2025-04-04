"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { Clock, Calendar, RefreshCw } from 'lucide-react';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        user && getInterviewList();
    }, [user]);

    const getInterviewList = async () => {
        setIsLoading(true);
        try {
            const result = await db.select() 
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
                .orderBy(desc(MockInterview.id));

            setInterviewList(result);
        } catch (error) {
            console.error("Failed to fetch interviews:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleRefresh = () => {
        getInterviewList();
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                    Previous Mock Interviews
                </h2>
                <button 
                    onClick={handleRefresh}
                    className="flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-white bg-[#1D1E30]/80 px-3 py-2 rounded-lg transition-all"
                >
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF007A]"></div>
                </div>
            ) : interviewList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
                    {interviewList.map((interview, index) => (
                        <InterviewItemCard 
                            interview={interview}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-[#B0B0B0]">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg">No interviews found</p>
                    <p className="text-sm mt-2">Create your first interview to get started</p>
                </div>
            )}

            {interviewList.length > 0 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#3D3E50]">
                    <div className="flex items-center gap-2 text-[#B0B0B0]">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Last updated: {new Date().toLocaleString()}</span>
                    </div>
                    <button className="text-sm text-[#00FFFF] hover:text-[#00FFFF]/80 transition-all">
                        View All History
                    </button>
                </div>
            )}
        </div>
    )
}

export default InterviewList