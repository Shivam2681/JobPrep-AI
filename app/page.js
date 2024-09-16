// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h1>Hello</h1>
//       <Button>Hii</Button>
//     </div>
//   );
// }

// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect from '/' to '/dashboard'
//     router.replace("/dashboard");
//   }, [router]);

//   return (
//     <div>
//       <h1>Redirecting to dashboard...</h1>
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { PenSquare, Share2, Atom } from 'lucide-react'

// const FeatureCard = ({ icon: Icon, title, description }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg">
//     <Icon className="w-12 h-12 mb-4 text-gray-800" />
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// )

// export default function Home() {
//   const router = useRouter()

//   const handleGetStarted = () => {
//     router.push('/dashboard')
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center flex-1">
//             <Image src="/logo.svg" alt="Logoipsum" width={40} height={40} />
//             <span className="ml-2 text-xl font-bold text-gray-900">AI-Interview Mocker</span>
//           </div>
//           <nav className="flex-1 flex justify-center">
//             <ul className="flex space-x-4">
//               <li><a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-gray-900">Questions</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-gray-900">Upgrade</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-gray-900">How it Works?</a></li>
//             </ul>
//           </nav>
//           <div className="flex-1"></div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Personal AI Interview Coach</h1>
//           <p className="text-xl text-gray-600 mb-8">Double your chances of landing that job offer with our AI-powered interview prep</p>
//           <div className="flex justify-center space-x-4">
//             <button 
//               onClick={handleGetStarted}
//               className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
//             >
//               Get Started →
//             </button>
//             <button className="bg-white text-gray-700 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition">
//               📹 Watch video
//             </button>
//           </div>
//         </div>

//         <div className="mt-20 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">How it Works?</h2>
//           <p className="text-xl text-gray-600">Give mock interview in just 3 simple easy step</p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-5">
//             <FeatureCard 
//               icon={Atom}
//               title={<span className="text-gray-900 dark:text-gray-100">Fill in Your Details</span>}
//               description="Enter the job position, tech stack, and years of experience."
//             />
//             <FeatureCard 
//               icon={PenSquare}
//               title={<span className="text-gray-900 dark:text-gray-100">Set Up Your Equipment</span>}
//               description="Turn on your camera and microphone to be ready for the interview."
//             />
//             <FeatureCard 
//               icon={Share2}
//               title={<span className="text-gray-900 dark:text-gray-100">Complete Your Interview</span>}
//               description="Start your interview and receive AI-generated feedback."
//             />
//           </div>
          
//           <button 
//             onClick={handleGetStarted}
//             className="bg-pink-500 text-white px-8 py-3 rounded-md hover:bg-pink-600 transition"
//           >
//             Get Started Today
//           </button>
//         </div>
//       </main>
//     </div>
//   )
// }

'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PenSquare, Share2, Atom } from 'lucide-react'

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <Icon className="w-12 h-12 mb-4 text-indigo-600" />
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
)

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Logoipsum" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold text-gray-900">AI-Interview Mocker</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-700 hover:text-gray-900 transition">Dashboard</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 transition">Questions</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 transition">Upgrade</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 transition">How it Works?</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Your Ultimate AI Interview Coach</h1>
          <p className="text-xl text-gray-600 mb-8">Transform your interview skills with our advanced AI-driven preparation tools.</p>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={handleGetStarted}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              Get Started →
            </button>
            <button className="bg-white text-gray-800 px-8 py-3 rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors">
              📹 Watch Video
            </button>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">How It Works?</h2>
          <p className="text-xl text-gray-600 mb-12">Give a mock interview in just 3 simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Atom}
              title="Enter Your Details"
              description="Enter the job position, tech stack, and years of experience."
            />
            <FeatureCard 
              icon={PenSquare}
              title="Prepare Your Setup"
              description="Turn on your camera and microphone to be ready for the interview."
            />
            <FeatureCard 
              icon={Share2}
              title="Take the Interview"
              description="Start your interview and receive AI-generated feedback."
            />
          </div>

          <button 
            onClick={handleGetStarted}
            className="mt-8 bg-pink-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-pink-600 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </main>
    </div>
  )
}


