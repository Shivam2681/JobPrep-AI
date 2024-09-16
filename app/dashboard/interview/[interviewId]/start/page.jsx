"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {

    const [interviewData,setinterviewData] = useState();
    const [mockInterviewQuestions,setmockInterviewQuestions] = useState();
    const [activeQuestionIndex,setactiveQuestionIndex] = useState(0);

    useEffect(() => {
        // console.log(params.interviewId);
        getInterviewDetails();
    }, []);

    // fetch interview details by mockID/interviewId
    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockID, params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp); 
        setmockInterviewQuestions(jsonMockResp);
        setinterviewData(result[0]);
    };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
           <QuestionSection mockInterviewQuestions={mockInterviewQuestions}
           activeQuestionIndex={activeQuestionIndex}/>

           <RecordAnswerSection mockInterviewQuestions={mockInterviewQuestions}
           activeQuestionIndex={activeQuestionIndex}
           interviewData={interviewData}/> 
        </div>
        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0 && 
          <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestions?.length-1 && 
          <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestions?.length-1 && 
          <Link href={'/dashboard/interview/'+interviewData?.mockID+"/feedback"}>
          <Button>End Interview</Button> </Link>}
        </div>  
    </div>
  )
}

export default StartInterview