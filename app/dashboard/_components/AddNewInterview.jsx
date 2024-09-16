"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
  

function AddNewInterview() {
    const [openDialog,setopenDialog] = useState(false);
    const [jobPostion,setjobPositon] = useState(false);
    const [jobDesc,setjobDesc] = useState(false);
    const [jobExperience,setjobExperience] = useState(false);
    const [loading,setloading] = useState(false);
    const [jsonResponse,setjsonResponse] = useState([]);
    const {user} = useUser();
    const router = useRouter();

    const onSubmit=async(e)=>{ 
      setloading(true);
      e.preventDefault();
      console.log(jobDesc,jobPostion,jobExperience);

      const InputPrompt = "Job position: "+jobPostion+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+", Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field on JSON"
      
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
      // console.log(JSON.parse(MockJsonResp));
      setjsonResponse(MockJsonResp);

      if(MockJsonResp){
      const resp = await db.insert(MockInterview)
      .values({
        mockID:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPostion,
        jobDesc:jobDesc,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      }).returning({mockID:MockInterview.mockID})

      console.log('inserted ID:',resp);
        if(resp){
          setopenDialog(false);
          router.push('/dashboard/interview/'+ resp[0]?.mockID )
        }
      }
      else{
        console.log("error");
      } 

      setloading(false);
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary
            hover:scale-105 hover:shadow-md cursor-pointer transition-all'
            onClick={()=>setopenDialog(true)}>
            <h2 className='text-lg text-center '>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
           <DialogContent className='max-w-2xl'>
             <DialogHeader>
               <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
               <DialogDescription>
                <form onSubmit={onSubmit}>
                  <div>
                    <h2>Add details about your job positon/role, job description and years of experience</h2>
                  </div>
                  <div className='mt-7 my-3'>
                    <label>Job Role/Job Position</label>
                    <Input placeholder="Ex. Full stack developer" required
                    onChange={(event)=> setjobPositon(event.target.value)}/>
                  </div>
                  <div className='my-3'>
                    <label>Job Description/Tech stack (In Short)</label>
                    <Textarea  placeholder="Ex. React.js, Next.js etc" required
                    onChange={(event)=> setjobDesc(event.target.value)}/>
                  </div>
                  <div className='my-3'>
                    <label>Years of Experience</label>
                    <Input placeholder="Ex. 3" type="number" max="20" required
                    onChange={(event)=> setjobExperience(event.target.value)}/> 
                  </div>
                  <div className='flex gap-5 justify-end'>
                    <Button type="button" variant="ghost" onClick={()=> setopenDialog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                      {loading?
                        <>
                         <LoaderCircle className='animate-spin'/>'Generating from AI'
                        </>:'Start Interview'
                      }
                      </Button>
                  </div>
                  </form>
               </DialogDescription>
             </DialogHeader>
           </DialogContent>
       </Dialog>

    </div>
  )
}

export default AddNewInterview