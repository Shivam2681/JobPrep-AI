"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserAnswer } from '@/utils/schema';

function RecordAnswerSection({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer('');
      setResults([]);
      setAnswerFeedback(null);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    try {
      const feedbackPrompt = "Question:" + mockInterviewQuestions[activeQuestionIndex]?.question +
        ", User Answer:" + userAnswer + ",Depends on question and user answer for given interview question " +
        "please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      const jsonFeedbackResp = JSON.parse(mockJsonResp);
      
      setAnswerFeedback(jsonFeedbackResp);

      const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockID,
          question: mockInterviewQuestions[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: jsonFeedbackResp?.feedback,
          rating: jsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        });

      if (resp) {
        toast('Answer recorded successfully');
      }
    } catch (error) {
      console.error("Error updating answer:", error);
      toast.error('Failed to record answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Webcam Section */}
      <div className="relative mb-6 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] border-2 border-[#2A2B3F]">
        <Webcam
          mirrored={true}
          className="w-full h-64 object-cover bg-black"
        />
        
        {/* Recording Status Indicator */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full flex items-center gap-2 ${
          isRecording 
            ? "bg-red-500/80 text-white" 
            : "bg-[#2A2B3F]/80 text-[#B0B0B0]"
        }`}>
          <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-white animate-pulse" : "bg-[#00FFFF]"}`}></div>
          <span className="text-xs">{isRecording ? "Recording" : "Ready"}</span>
        </div>
      </div>

      {/* Answer Text Area */}
      <div className="mb-6">
        <div className="bg-[#2A2B3F]/70 rounded-lg p-4 min-h-24 max-h-40 overflow-y-auto">
          {userAnswer ? (
            <p className="text-[#E0E0E0]">{userAnswer}</p>
          ) : (
            <p className="text-[#5D5E8D] italic">Your answer will appear here as you speak...</p>
          )}
        </div>
      </div>

      {/* Feedback Section (when available) */}
      {answerFeedback && (
        <div className={`mb-6 rounded-lg p-4 border-l-4 ${
          parseInt(answerFeedback.rating) > 7 
            ? "border-green-500 bg-green-500/10" 
            : parseInt(answerFeedback.rating) > 4 
              ? "border-yellow-500 bg-yellow-500/10" 
              : "border-red-500 bg-red-500/10"
        }`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Quick Feedback</h3>
            <div className="bg-[#1D1E30] px-3 py-1 rounded-full">
              <span className="text-sm">Rating: {answerFeedback.rating}/10</span>
            </div>
          </div>
          <p className="text-sm text-[#E0E0E0]">{answerFeedback.feedback}</p>
        </div>
      )}

      {/* Record Button */}
      <div className="flex justify-center">
        <Button 
          disabled={loading} 
          onClick={StartStopRecording}
          className={`rounded-full w-16 h-16 p-0 shadow-lg ${
            isRecording 
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-[#FF007A] to-[#00FFFF] hover:opacity-90"
          }`}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isRecording ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Recording Status Text */}
      <div className="text-center mt-3">
        <p className="text-sm text-[#B0B0B0]">
          {loading ? "Processing your answer..." : 
           isRecording ? "Recording your answer..." : 
           userAnswer ? "Answer recorded" : "Click to record your answer"}
        </p>
      </div>
    </div>
  );
}

export default RecordAnswerSection;