"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Mic,
  WebcamIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    getInterviewDetails();

    // Start timer when component mounts
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // fetch interview details by mockID/interviewId
  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockID, params.interviewId));

      if (result && result[0]) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestions(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
  };

  const progressPercentage = mockInterviewQuestions
    ? ((activeQuestionIndex + 1) / mockInterviewQuestions.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1E30] to-black text-white relative">
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header with Session Info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
              Interview Session
            </h2>
            <h2 className="text-[#B0B0B0] mt-2">
              {isLoading
                ? "Loading..."
                : `${interviewData?.jobPosition} - ${
                    activeQuestionIndex + 1
                  } of ${mockInterviewQuestions?.length} questions`}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#2A2B3F]/80 rounded-full px-4 py-2 shadow-[0_0_15px_rgba(138,43,226,0.15)]">
              <Clock className="w-4 h-4 text-[#00FFFF] mr-2" />
              <span className="text-[#E0E0E0]">{formatTime(timer)}</span>
            </div>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-[#B0B0B0] hover:text-white"
              >
                Exit Interview
              </Button>
            </Link>
            <UserButton />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#2A2B3F] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF007A] to-[#00FFFF] transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00FFFF]"></div>
          </div>
        ) : (
          <>
            {/* Main Interview Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Question Section */}
              <div className="bg-[#2A2B3F]/80 rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)] p-6">
                <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                  Question {activeQuestionIndex + 1}
                </h3>

                <QuestionSection
                  mockInterviewQuestions={mockInterviewQuestions}
                  activeQuestionIndex={activeQuestionIndex}
                />

                {/* Question Navigation Mini-Tabs */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {mockInterviewQuestions?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveQuestionIndex(index)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                        activeQuestionIndex === index
                          ? "bg-gradient-to-r from-[#FF007A] to-[#00FFFF] text-white"
                          : "bg-[#1D1E30] text-[#B0B0B0] hover:bg-[#3D3E5A]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Record Answer Section */}
              <div className="bg-[#2A2B3F]/80 rounded-lg shadow-[0_0_30px_rgba(138,43,226,0.15)] p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                    Your Response
                  </h3>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isRecording
                          ? "bg-red-500 animate-pulse"
                          : "bg-green-500"
                      } mr-2`}
                    ></div>
                    <span className="text-sm text-[#B0B0B0]">
                      {isRecording ? "Recording" : "Ready"}
                    </span>
                  </div>
                </div>

                <RecordAnswerSection
                  mockInterviewQuestions={mockInterviewQuestions}
                  activeQuestionIndex={activeQuestionIndex}
                  interviewData={interviewData}
                />

                {/* Recording Controls */}
                {/* <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleRecordingToggle}
                    className={`rounded-full w-14 h-14 p-0 ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-[#FF007A] to-[#00FFFF] hover:opacity-90"
                    }`}
                  >
                
                  </Button>
                </div> */}

                {/* Visual Hints */}
                <div className="mt-6 p-4 bg-[#1D1E30] rounded-lg border-l-2 border-[#00FFFF]">
                  <p className="text-[#B0B0B0] text-sm">
                    Speak clearly, maintain proper posture, and take a moment to
                    organize your thoughts before answering.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                disabled={activeQuestionIndex === 0}
                className="bg-[#2A2B3F] hover:bg-[#3D3E5A] text-white border-none"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Question
              </Button>

              {activeQuestionIndex === mockInterviewQuestions?.length - 1 ? (
                <Link
                  href={
                    "/dashboard/interview/" +
                    interviewData?.mockID +
                    "/feedback"
                  }
                >
                  <Button className="bg-gradient-to-r from-[#FF007A] to-[#00FFFF] text-white hover:opacity-90 shadow-[0_0_15px_rgba(255,0,122,0.3)]">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Interview
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() =>
                    setActiveQuestionIndex(activeQuestionIndex + 1)
                  }
                  className="bg-gradient-to-r from-[#FF007A] to-[#00FFFF] text-white hover:opacity-90 shadow-[0_0_15px_rgba(255,0,122,0.3)]"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
