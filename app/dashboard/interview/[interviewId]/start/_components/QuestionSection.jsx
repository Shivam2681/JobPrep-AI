import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech');
    }
  };

  return mockInterviewQuestions && (
    <div className="w-full">
      {/* Question Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mockInterviewQuestions.map((question, index) => (
          <h2
            key={index}
            className={`px-3 py-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-200 ${
              activeQuestionIndex === index
                ? 'bg-gradient-to-r from-[#FF007A] to-[#00FFFF] text-white shadow-[0_0_10px_rgba(255,0,122,0.3)]'
                : 'bg-[#1D1E30] text-[#B0B0B0] hover:bg-[#3D3E5A]'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Question Content */}
      <div className="bg-[#2A2B3F]/70 rounded-lg p-6 mb-6 shadow-[0_0_20px_rgba(138,43,226,0.1)]">
        <h2 className="text-xl font-medium text-white mb-6">
          {mockInterviewQuestions[activeQuestionIndex]?.question}
        </h2>
        
        <div 
          onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
          className="flex items-center gap-2 text-[#00FFFF] cursor-pointer hover:text-white transition-colors w-fit"
        >
          <Volume2 className="w-5 h-5" />
          <span className="text-sm">Listen to question</span>
        </div>
      </div>

      {/* Question Tip */}
      <div className="border-l-4 border-[#FFD700] bg-[#2A2B3F]/70 rounded-lg p-5 mt-6 shadow-[0_0_20px_rgba(138,43,226,0.1)]">
        <h2 className="flex gap-2 items-center text-[#FFD700]">
          <Lightbulb className="w-5 h-5" />
          <strong>Tip:</strong>
        </h2>
        <p className="text-sm text-[#E0E0E0] mt-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || 
            "Take a moment to organize your thoughts before answering. Focus on structuring your response with a clear beginning, middle, and end."}
        </p>
      </div>
    </div>
  );
}

export default QuestionSection;