import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Calendar, Play, MessageSquare, Clock, Briefcase } from 'lucide-react'

function InterviewItemCard({ interview }) {
    const router = useRouter();

    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockID)
    }

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/' + interview.mockID + "/feedback")
    }
  
    return (
      <div className='bg-[#2A2B3F]/80 border border-[#3D3E50] rounded-xl p-5 hover:shadow-[0_0_25px_rgba(138,43,226,0.15)] transform hover:-translate-y-1 transition-all duration-300'>
        <div className='flex justify-between items-start mb-4'>
          <div className='flex-1'>
            <h2 className='font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]'>
              {interview.jobPosition}
            </h2>
            <div className='space-y-2 mt-2'>
              <div className='flex items-center text-sm text-[#B0B0B0]'>
                <Briefcase className='w-4 h-4 mr-2 text-[#00FFFF]' />
                <span>{interview.jobDesc.length > 30 ? interview.jobDesc.substring(0, 30) + '...' : interview.jobDesc}</span>
              </div>
              <div className='flex items-center text-sm text-[#B0B0B0]'>
                <Clock className='w-4 h-4 mr-2 text-[#8A2BE2]' />
                <span>{interview.jobExperience} Years of Experience</span>
              </div>
              <div className='flex items-center text-xs text-[#B0B0B0]'>
                <Calendar className='w-3 h-3 mr-2 text-[#FF007A]' />
                <span>Created: {interview.createdAt}</span>
              </div>
            </div>
          </div>
          
          <div className='bg-[#1D1E30] rounded-lg p-2 ml-3'>
            <span className='text-xs font-medium text-[#00FFFF]'>
              {JSON.parse(interview.jsonMockResp).length || 0} Questions
            </span>
          </div>
        </div>

        <div className='flex justify-between mt-4 gap-4 pt-3 border-t border-[#3D3E50]'>
          <Button 
            size="sm" 
            variant="outline" 
            className='w-full border-[#FF007A] text-[#FF007A] hover:bg-[#FF007A]/10 hover:text-white flex items-center justify-center gap-2'
            onClick={onFeedbackPress}
          >
            <MessageSquare className='w-4 h-4' />
            Feedback
          </Button>
          
          <Button 
            size="sm" 
            className='w-full bg-gradient-to-r from-[#FF007A] to-[#8A2BE2] hover:opacity-90 flex items-center justify-center gap-2'
            onClick={onStart}
          >
            <Play className='w-4 h-4' fill="white" />
            Start
          </Button>
        </div>
      </div>
    )
}

export default InterviewItemCard 