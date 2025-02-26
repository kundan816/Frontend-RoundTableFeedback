import "./globals.css";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-purple-900 via-purple-800 to-blue-800 text-white p-6">
     
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in">
        Welcome to <span className="text-purple-300">RoundTable Feedback</span>
      </h1>

     
      <p className="text-lg md:text-xl max-w-2xl">
        Streamline your <span className="text-blue-300 font-semibold">Monthly</span> and{" "}
        <span className="text-purple-300 font-semibold">RT Feedback</span> process efficiently.
      </p>

      
      <div className="mt-8 flex space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Get Started
        </a>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Go to Dashboard
        </a>
      </div>

      
      <div className="mt-12">
        <img
          src="/rt-feedback-illustration.svg"
          alt="RT Feedback Illustration"
          className="w-72 md:w-96 opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      
      <footer className="absolute bottom-4 text-sm opacity-80">
        Built by <span className="text-purple-300 font-medium">Webknot</span>
      </footer>
    </main>
  );
}

