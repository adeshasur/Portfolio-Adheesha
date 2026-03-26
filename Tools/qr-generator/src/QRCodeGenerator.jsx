import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap');
  
  :root {
    --primary: #111111;
    --panel-border: rgba(17, 17, 17, 0.14);
    --panel-bg: rgba(255, 255, 255, 0.58);
    --panel-muted: rgba(255, 255, 255, 0.42);
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

  .qr-container {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .qr-container:hover {
    transform: scale(1.02) translateY(-4px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
  }
  body { 
    font-family: 'Inter', sans-serif;
    color: var(--text-main);
  }

  .font-brand { font-family: 'Outfit', sans-serif; }

  /* Clean Minimalist Card -> Glassmorphism */
  .clean-card {
    background: transparent;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  /* Refined Input */
  .clean-input {
    background: var(--bg-surface);
    border: 1.5px solid var(--panel-border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .clean-input:focus {
    border-color: rgba(17, 17, 17, 0.36);
    background: rgba(255,255,255,0.9);
    box-shadow: 0 0 0 4px rgba(17, 17, 17, 0.08);
    outline: none;
    transform: translateY(-1px);
  }

  /* Elegant Button */
  .clean-button {
    background: #111111;
    color: #FFFFFF;
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
    box-shadow: 0 10px 24px -10px rgba(17, 17, 17, 0.38);
  }
  .clean-button:hover:not(:disabled)::after {
    opacity: 1;
  }
  .clean-button:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(17, 17, 17, 0.24);
  }
  .clean-button:disabled {
    background: rgba(229, 231, 235, 0.82);
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
`;

const QRCodeGenerator = ({ embedded = false }) => {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [isGenerating, setIsGenerating] = useState(false);
  const [debouncedText, setDebouncedText] = useState("");
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden";

  useEffect(() => {
    const handleResize = () => setQrSize(window.innerWidth < 768 ? 160 : 200);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debounce the text input and show a generating animation
  useEffect(() => {
    setDebouncedText(""); // Clear immediate view
    if (text) {
      setIsGenerating(true);
      const timer = setTimeout(() => {
        setDebouncedText(text);
        setIsGenerating(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
       setIsGenerating(false);
    }
  }, [text]);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas || !debouncedText) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `QR-Code.png`;
    link.click();
  };

  return (
    <div className={wrapperClasses}>
      <style>{styles}</style>

      {/* Background Glow Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-black/6 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-black/4 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-delayed"></div>

      {!embedded ? (
        <>
          {/* Clean Header - Fixed to Top */}
          <div className="fixed top-6 left-0 w-full text-center z-10 hidden sm:block">
            <h1 className="text-2xl sm:text-3xl font-bold font-brand tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">
              QR Studio
            </h1>
            <p className="text-xs text-gray-500 font-medium">Create clean, scannable QR codes instantly.</p>
          </div>
          
          {/* Mobile Top Header */}
          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">
              QR Studio
            </h1>
            <p className="text-sm text-gray-500 font-medium">Create clean, scannable QR codes instantly.</p>
          </div>
        </>
      ) : null}

      {/* Main Workspace - Centered Vertically */}
      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-none hover:shadow-none transition-shadow duration-500">
        
        {/* Left: Input Form */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Destination URL or Text</label>
            <textarea
              placeholder="https://example.com"
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400 min-h-[120px] resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            onClick={downloadQR}
            disabled={!text}
            className="clean-button w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download PNG
          </button>
        </div>

        {/* Right: Preview Area */}
        <div className="flex flex-col md:border-l md:border-[rgba(17,17,17,0.08)] md:pl-8 h-full justify-center min-h-[220px]">
          {isGenerating ? (
              <div className="bg-[rgba(255,255,255,0.58)] p-6 rounded-2xl border border-[rgba(17,17,17,0.12)] flex items-center justify-center w-full aspect-square max-w-[280px] mx-auto">
                 <div className="w-full h-full rounded-xl animate-shimmer scale-95 origin-center transition-all"></div>
              </div>
          ) : debouncedText ? (
            <div className="bg-[rgba(255,255,255,0.58)] p-6 rounded-2xl border border-[rgba(17,17,17,0.12)] flex items-center justify-center w-full aspect-square max-w-[280px] mx-auto animate-in fade-in zoom-in-95 duration-500 qr-container">
               <div className="animate-in fade-in zoom-in-50 duration-700">
                 <QRCodeCanvas
                     id="qr-canvas"
                     value={debouncedText}
                     size={qrSize}
                     level="Q"
                     includeMargin={false}
                 />
               </div>
            </div>
          ) : (
            <div className="bg-[rgba(255,255,255,0.34)] rounded-2xl border border-dashed border-[rgba(17,17,17,0.12)] flex flex-col items-center justify-center p-8 w-full max-w-[280px] aspect-square mx-auto">
                <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-sm text-gray-400 font-medium text-center">QR Code will appear here</p>
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

export default QRCodeGenerator;




