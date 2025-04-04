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
import { BrainCircuit, LoaderCircle, Plus, X, Briefcase, FileText, Clock } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
  
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async(e) => { 
      setLoading(true);
      e.preventDefault();
      console.log(jobDesc, jobPosition, jobExperience);

      const InputPrompt = "Job position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + ", Depends on Job Position, Job Description & Years of Experience give us " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " Interview question along with Answer in JSON format, Give us question and answer field on JSON"
      
      try {
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
        setJsonResponse(MockJsonResp);

        if(MockJsonResp) {
          const resp = await db.insert(MockInterview)
          .values({
            mockID: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
          }).returning({mockID: MockInterview.mockID})

          console.log('inserted ID:', resp);
          if(resp) {
            setOpenDialog(false);
            router.push('/dashboard/interview/' + resp[0]?.mockID)
          }
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error generating interview:", error);
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="">
      <div 
        className="p-6 border border-[#3D3E50] rounded-xl bg-gradient-to-br from-[#2A2B3F]/80 to-[#1D1E30] 
          hover:shadow-[0_0_25px_rgba(255,0,122,0.15)] transform hover:-translate-y-1 cursor-pointer transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="p-4 rounded-full bg-[#FF007A]/10 text-[#FF007A]">
            <Plus className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-medium text-white">Create New Interview</h2>
          <p className="text-sm text-[#B0B0B0] text-center">Set up a customized AI interview</p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-[#2A2B3F] border border-[#3D3E50] text-white shadow-[0_0_50px_rgba(138,43,226,0.2)]">
          <DialogHeader className="border-b border-[#3D3E50] pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FF007A]/20">
                  <BrainCircuit className="w-6 h-6 text-[#FF007A]" />
                </div>
                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#00FFFF]">
                  Create AI Mock Interview
                </DialogTitle>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setOpenDialog(false)} 
                className="h-8 w-8 p-0 rounded-full text-[#B0B0B0] hover:text-white hover:bg-[#3D3E50]"
              >
              </Button>
            </div>
          </DialogHeader>

          <DialogDescription className="pt-4 text-[#B0B0B0]">
            <p className="mb-6">
              Customize your AI interview by providing details about the position. Our AI will generate relevant questions based on your input.
            </p>
            
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white">
                    <Briefcase className="w-4 h-4 text-[#FF007A]" />
                    Job Role/Position
                  </label>
                  <Input 
                    placeholder="Ex. Full stack developer" 
                    required
                    className="bg-[#1D1E30] border-[#3D3E50] focus:border-[#FF007A] focus:ring-[#FF007A]/20"
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white">
                    <FileText className="w-4 h-4 text-[#00FFFF]" />
                    Job Description/Tech Stack
                  </label>
                  <Textarea  
                    placeholder="Ex. React.js, Next.js, Node.js, etc." 
                    required
                    className="bg-[#1D1E30] border-[#3D3E50] focus:border-[#00FFFF] focus:ring-[#00FFFF]/20 min-h-[100px]"
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-[#8A2BE2]" />
                    Years of Experience
                  </label>
                  <Input 
                    placeholder="Ex. 3" 
                    type="number" 
                    max="20" 
                    required
                    className="bg-[#1D1E30] border-[#3D3E50] focus:border-[#8A2BE2] focus:ring-[#8A2BE2]/20"
                    onChange={(event) => setJobExperience(event.target.value)}
                  /> 
                </div>
              </div>
              
              <div className="flex gap-4 justify-end pt-4 border-t border-[#3D3E50]">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setOpenDialog(false)}
                  className="text-[#B0B0B0] hover:text-white hover:bg-[#3D3E50]"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-[#FF007A] to-[#8A2BE2] hover:opacity-90 text-white"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin w-4 h-4" />
                      <span>Generating Questions...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4" />
                      <span>Start Interview</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview