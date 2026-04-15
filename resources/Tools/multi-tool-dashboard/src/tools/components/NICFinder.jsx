import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap');
  
  :root {
    --primary: #FFB11B;
    --text-main: #111827;
    --text-muted: #6B7280;
    --border: #E5E7EB;
    --bg-surface: #FFFFFF;
    --bg-subtle: #F9FAFB;
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, #f6f7f8 4%, #edeef1 25%, #f6f7f8 36%);
    background-size: 1000px 100%;
  }

  body { 
    font-family: 'Inter', sans-serif;
    color: var(--text-main);
  }

  .font-brand { font-family: 'Outfit', sans-serif; }

  /* Clean Minimalist Card -> Glassmorphism */
  .clean-card {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 32px;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  /* Refined Input */
  .clean-input {
    background: var(--bg-surface);
    border: 1.5px solid var(--border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .clean-input:focus {
    border-color: var(--primary);
    background: rgba(255,255,255,0.9);
    box-shadow: 0 0 0 4px rgba(255, 177, 27, 0.15), 0 4px 6px -1px rgba(0,0,0,0.05);
    outline: none;
    transform: translateY(-1px);
  }

  /* Elegant Button */
  .clean-button {
    background: var(--primary);
    color: var(--text-main);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .clean-button::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .clean-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(255, 177, 27, 0.6), 0 4px 10px -4px rgba(255, 177, 27, 0.4);
  }
  .clean-button:hover:not(:disabled)::after {
    opacity: 1;
  }
  .clean-button:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(255, 177, 27, 0.4);
  }
  .clean-button:disabled {
    background: #E5E7EB;
    color: #9CA3AF;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  
  /* Animations */
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: -4s;
  }
  
  @keyframes float {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
    100% { transform: translateY(0px) scale(1); }
  }

  /* Key-Value Data Row */
  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  }
  .data-row:last-child {
    border-bottom: none;
  }
  .data-row:hover {
    background: rgba(255, 177, 27, 0.05);
    transform: translateX(4px);
  }

  .stagger-1 { animation-delay: 100ms; }
  .stagger-2 { animation-delay: 200ms; }
  .stagger-3 { animation-delay: 300ms; }
`;

const NICFinder = ({ embedded = false }) => {
  const [nic, setNic] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden";

  const calculateNIC = () => {
    let dayCount = 0;
    let year = 0;
    let gender = "Male";
    
    const cleanNic = nic.trim().toUpperCase();

    if (cleanNic.length === 10) { 
      year = 1900 + parseInt(cleanNic.substring(0, 2));
      dayCount = parseInt(cleanNic.substring(2, 5));
    } else if (cleanNic.length === 12) {
      year = parseInt(cleanNic.substring(0, 4));
      dayCount = parseInt(cleanNic.substring(4, 7));
    } else {
      setError("Please enter a valid National ID (10 or 12 digits)");
      setResult(null);
      return;
    }

    if (dayCount > 500) {
      gender = "Female";
      dayCount -= 500;
    }

    try {
        const date = new Date(year, 0);
        const birthDate = new Date(date.setDate(dayCount));
        const birthdayEn = birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const birthdaySi = birthDate.toLocaleDateString('si-LK', { year: 'numeric', month: 'long', day: 'numeric' });
        const age = new Date().getFullYear() - year;

        setIsGenerating(true);
        setResult(null);
        setTimeout(() => {
            setResult({ birthdayEn, birthdaySi, gender, age, original: cleanNic });
            setError("");
            setIsGenerating(false);
        }, 800);
    } catch (e) {
        setError("Invalid identity number sequence");
        setResult(null);
        setIsGenerating(false);
    }
  };

  return (
    <div className={wrapperClasses}>
      <style>{styles}</style>
      
      {/* Background Glow Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/15 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-delayed"></div>

      {!embedded ? (
        <>
          {/* Clean Header - Fixed to Top */}
          <div className="fixed top-6 left-0 w-full text-center z-10 hidden sm:block">
            <h1 className="text-2xl sm:text-3xl font-bold font-brand tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              NIC Decoder
            </h1>
            <p className="text-xs text-gray-500 font-medium">Extract Sri Lankan resident details instantly.</p>
          </div>
          
          {/* Mobile Top Header */}
          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              NIC Decoder
            </h1>
            <p className="text-sm text-gray-500 font-medium">Extract Sri Lankan resident details instantly.</p>
          </div>
        </>
      ) : null}

      {/* Main Workspace - Centered Vertically */}
      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        
        {/* Left: Input Form */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">National Identity Number</label>
            <input
              type="text"
              maxLength="12"
              placeholder="e.g. 981234567V"
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
              value={nic}
              onChange={(e) => {
                  setNic(e.target.value);
                  if (error) setError("");
              }}
              onKeyDown={(e) => e.key === 'Enter' && calculateNIC()}
            />
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>

          <button
            onClick={calculateNIC}
            disabled={!nic}
            className="clean-button w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
          >
            Decode Identity
          </button>
        </div>

        {/* Right: Results Display */}
        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-8 h-full justify-center min-h-[220px]">
          {isGenerating ? (
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 h-full flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full animate-shimmer"></div>
                    <div className="w-32 h-5 rounded animate-shimmer"></div>
                </div>
                <div className="space-y-4 mt-2">
                    <div className="w-full h-8 rounded animate-shimmer"></div>
                    <div className="w-3/4 h-8 rounded animate-shimmer"></div>
                    <div className="w-5/6 h-8 rounded animate-shimmer"></div>
                </div>
            </div>
          ) : result ? (
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Resident Profile</h3>
                        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{result.original}</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="data-row animate-in fade-in slide-in-from-left-4 duration-500 stagger-1 fill-mode-both">
                        <span className="text-sm text-gray-500">Date of Birth</span>
                        <span className="text-sm font-semibold text-gray-900">{result.birthdayEn}</span>
                    </div>
                    <div className="data-row animate-in fade-in slide-in-from-left-4 duration-500 stagger-2 fill-mode-both">
                        <span className="text-sm text-gray-500">Gender</span>
                        <span className="text-sm font-semibold text-gray-900">{result.gender}</span>
                    </div>
                    <div className="data-row animate-in fade-in slide-in-from-left-4 duration-500 stagger-3 fill-mode-both">
                        <span className="text-sm text-gray-500">Current Age</span>
                        <span className="text-sm font-semibold text-gray-900">{result.age} Years</span>
                    </div>
                </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
                <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                </svg>
                <p className="text-sm text-gray-400 font-medium text-center">Results will appear here</p>
            </div>
          )}
        </div>

      </div>

      {!embedded ? (
        <>
          {/* Subtle Footer - Fixed to Bottom */}
          <div className="fixed bottom-6 left-0 w-full text-center text-gray-400 text-xs z-10 hidden sm:block">
              Powered by Adheesha Sooriyaarachchi | 2026
          </div>
          
          {/* Mobile Footer */}
          <div className="mt-8 text-center text-gray-400 text-xs sm:hidden">
              Powered by Adheesha Sooriyaarachchi | 2026
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NICFinder;
