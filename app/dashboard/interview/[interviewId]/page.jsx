"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

// function Interview({params}) {
//     const [interviewData,setinterviewData] = useState();
//     const [webCamEnabled,setwebCamEnabled] = useState(false);
//     useEffect(()=>{
//         console.log(params.interviewId)
//         getInterviewDetails();
//     },[])
 
//     // fetch interview details by mockID/interviewId
//     const getInterviewDetails = async ()=>{
//         const result = await db.select().from(MockInterview)
//         .where(eq(MockInterview.mockID,params.interviewId))

//         setinterviewData(result[0]);
//     }
//   return (
//     <div className='my-10'>
//         <h2 className='font-bold text-2xl items-center'>Let's get started</h2>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
//             <div className='flex flex-col my-5 gap-5'>
//                 <div className='flex flex-col p-5 rounded-lg border gap-5'>
//                   <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
//                   <h2 className='text-lg'><strong>Job Desc/Tech Stack:</strong>{interviewData.jobDesc}</h2>
//                   <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>
//                 </div>
//                 <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
//                     <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb/><strong>Information</strong></h2>
//                     <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//                 </div>
//             </div>
//             <div>
//                 {webCamEnabled? <Webcam
//                    onUserMedia={()=>setwebCamEnabled(true)}
//                    onUserMediaError={()=>setwebCamEnabled(false)}
//                    mirrored={true}
//                    style={{
//                     height:300,
//                     width:300
//                    }}
//                 />
//                 :
//                 <>
//                   <WebcamIcon className='h-72 w-full p-20 my-7 rounded-lg border '/>
//                   <Button variant="ghost" className='w-full' onClick={()=>setwebCamEnabled(true)}>Enable web cam and Microphone</Button>
//                   </>
//                 }
//             </div>
            
//         </div>

//         <div className='flex justify-end items-end'>
//             <Button>Start Interview</Button>
//         </div>
        
//     </div>
//   )
// }

// export default Interview

function Interview({params}) {
    const [interviewData, setInterviewData] = useState(null); // initialize as null
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log(params.interviewId);
        getInterviewDetails();
    }, []);

    // fetch interview details by mockID/interviewId
    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockID, params.interviewId));

        setInterviewData(result[0]);
    };

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl items-center'>Let's get started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        {interviewData ? (
                          <>
                            <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Desc/Tech Stack:</strong> {interviewData.jobDesc}</h2>
                            <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
                          </>
                        ) : (
                          <p>Loading interview details...</p> // Render a placeholder while data is loading
                        )}
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className='h-72 w-full p-20 my-7 rounded-lg border ' />
                            <Button variant="ghost" className='w-full' onClick={() => setWebCamEnabled(true)}>Enable web cam and Microphone</Button>
                        </>
                    )}
                </div>
            </div>

            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                   <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
