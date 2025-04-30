import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <h1 className="logo-title chatbot-logo text-4xl font-bold text-center mb-2">
              <span className="outfit-modern">OutFIT</span> <span className="ai-modern">AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized outfit recommendations based on weather and your activities. 
            Our AI-powered chatbot helps you plan your outfits for any occasion.
          </p>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
            <ChatInterface />
          </div>
        </div>
      </main>
      <footer className="w-full bg-white border-t border-indigo-200 shadow-inner py-5 mt-8">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <div className="text-center text-indigo-700 text-base font-semibold tracking-wide">
            Created with <span className="text-pink-500">♥</span> by
            <span className="font-bold mx-2">Raman Kumar</span>
            <span className="text-indigo-400">|</span>
            <span className="font-bold mx-2">Ritu Raj</span>
            <span className="text-indigo-400">|</span>
            <span className="font-bold mx-2">Tejas V. Krishna</span>
          </div>
          <div className="text-indigo-500 text-xs mt-2">&copy; {new Date().getFullYear()} OutFIT AI. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
