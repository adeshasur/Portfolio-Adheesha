import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

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

  body { 
    font-family: 'Inter', sans-serif;
    color: var(--text-main);
  }

  .font-brand { font-family: 'Outfit', sans-serif; }

  /* Clean Minimalist Card */
  .clean-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }

  /* Refined Input */
  .clean-input {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    transition: all 0.2s ease;
  }
  .clean-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 177, 27, 0.1);
    outline: none;
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
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .title-glow {
    color: var(--primary);
    text-shadow: 0 0 20px rgba(255, 177, 27, 0.2);
    animation: textGlow 3s ease-in-out infinite alternate;
  }

  @keyframes textGlow {
    from {
      text-shadow: 0 0 10px rgba(255, 177, 27, 0.2), 0 0 20px rgba(255, 177, 27, 0.1);
      transform: translateY(0px);
    }
    to {
      text-shadow: 0 0 20px rgba(255, 177, 27, 0.5), 0 0 30px rgba(255, 177, 27, 0.3);
      transform: translateY(-2px);
    }
  }
`;

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState(200);

  useEffect(() => {
    const handleResize = () => setQrSize(window.innerWidth < 768 ? 160 : 200);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas || !text) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `QR-Code.png`;
    link.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen justify-center px-4 sm:px-6 pt-32 pb-20 animate-in fade-in duration-700 relative">
      <style>{styles}</style>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-float"></div>

      {/* Clean Header - Fixed to Top */}
      <div className="fixed top-8 left-0 w-full text-center z-10 hidden sm:block">
        <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 title-glow inline-block">
          QR Studio
        </h1>
        <p className="text-sm text-gray-500 font-medium">Create clean, scannable QR codes instantly.</p>
      </div>
      
      {/* Mobile Top Header (adjusts spacing for small screens) */}
      <div className="text-center mb-8 sm:hidden">
        <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 title-glow inline-block">
          QR Studio
        </h1>
        <p className="text-sm text-gray-500 font-medium">Create clean, scannable QR codes instantly.</p>
      </div>

      {/* Main Workspace - Centered Vertically */}
      <div className="clean-card p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        
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

        {/* Right: Preview Area (Aligned with NIC Finder Dashed States) */}
        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-10 h-full justify-center min-h-[220px]">
          {text ? (
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center w-full aspect-square max-w-[280px] mx-auto animate-in fade-in zoom-in-95 duration-300">
               <QRCodeCanvas
                   id="qr-canvas"
                   value={text}
                   size={qrSize}
                   level="Q"
                   includeMargin={false}
               />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 w-full max-w-[280px] aspect-square mx-auto">
                <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-sm text-gray-400 font-medium text-center">QR Code will appear here</p>
            </div>
          )}
        </div>

      </div>

      {/* Subtle Footer - Fixed to Bottom */}
      <div className="fixed bottom-6 left-0 w-full text-center text-gray-400 text-xs z-10 hidden sm:block">
          Powered by Adheesha Sooriyaarachchi | 2026
      </div>
      
      {/* Mobile Footer */}
      <div className="mt-8 text-center text-gray-400 text-xs sm:hidden">
          Powered by Adheesha Sooriyaarachchi | 2026
      </div>
    </div>
  );
};

export default QRCodeGenerator;
