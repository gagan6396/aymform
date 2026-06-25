// ThankYouPage.jsx
import React from 'react';

const ThankYouPage = ({ onReset }) => {
  const BgWrapper = ({ children }) => (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 0 }} />
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );

  return (
    <BgWrapper>
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img src="/aym-logo.png" alt="AYM Yoga School" className="h-24 w-auto object-contain drop-shadow-lg" />
        <p className="text-white text-xl italic mt-2 tracking-wide drop-shadow font-medium">
          || योग: कर्मसु कौशलम् ||
        </p>
      </div>

      {/* Thank You Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-fadeIn">
        <div className="mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-10 h-10 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You! 🙏</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your enrollment request has been received successfully.
          </p>
        </div>

        <div className="bg-orange-50 rounded-xl p-4 mb-6 text-left">
          <h3 className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
            What happens next?
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">1.</span>
              <span>Our team will review your application within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold mt-0.5">2.</span>
              <span>You'll receive a confirmation email with course details</span>
            </li>
           
          </ul>
        </div>

        <div className="space-y-3">
          {/* <button
            onClick={onReset}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl text-sm tracking-wide transition-colors"
          >
            Submit Another Application
          </button> */}
          
          <a
            href="/"
            className="block w-full py-3 border border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700 font-medium rounded-xl text-sm transition-colors"
          >
            Back to Homepage
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Accredited by the Ministry of AYUSH, Govt. of India
          </p>
          <p className="text-xs text-orange-400 mt-1 font-medium">
            AYM Yoga School · Rishikesh
          </p>
        </div>
      </div>
    </BgWrapper>
  );
};

export default ThankYouPage;