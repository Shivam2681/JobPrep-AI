import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <img src="/logo.svg" alt="" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Welcome to JobPrep AI
            </h2>

            <p className="mt-4 md:text-lg leading-relaxed text-white/90">
              Welcome to your AI-powered interview coach! Elevate your
              preparation with personalized feedback, real-time analysis, and
              expert insights—designed to help you ace your next interview with
              confidence.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden mb-5">
              <div className="flex items-center mt-10 gap-4">
                <a className="block text-white" href="#">
                  <img src="/logo.svg" alt="" />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to JobPrep AI
                </h1>
              </div>

              <p className="mt-4 leading-relaxed text-gray-500">
                Welcome to your AI-powered interview coach! Elevate your
                preparation with personalized feedback, real-time analysis, and
                expert insights—designed to help you ace your next interview
                with confidence.
              </p>
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
