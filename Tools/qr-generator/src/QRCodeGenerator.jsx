import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Premium Modern Fonts & Advanced UI/UX Effects
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
  
  body { 
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  
  .font-brand { font-family: 'Outfit', sans-serif; }

  /* Premium Multi-Layered Shadows */
  .shadow-premium {
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02), 0 20px 40px -10px rgba(255,177,27,0.1);
  }
  
  .shadow-btn-hover {
    box-shadow: 0 20px 25px -5px rgba(255,177,27,0.2), 0 10px 10px -5px rgba(255,177,27,0.1);
  }

  .qr-reveal-enter {
    animation: qrReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes qrReveal {
    from { transform: scale(0.9) translateY(20px); opacity: 0; filter: blur(10px); }
    to { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
  }

  /* Custom Scrollbar for Input */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const QRCodeGenerator = () => {
  const [text, setText] = useState("");

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas || !text) return;

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `Adheesha-QR-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 animate-in fade-in zoom-in duration-1000">
      <style>{fontStyles}</style>

      {/* Top Header Section (Outside Cards) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-6">
        <div className="group cursor-default">
          <h1 className="text-5xl md:text-7xl font-[900] text-[#25282B] mb-2 tracking-tighter leading-none font-brand transition-all duration-500 hover:tracking-[-0.05em]">
            QR Studio<span className="text-[#FFB11B] inline-block hover:scale-150 transition-transform">.</span>
          </h1>
          <p className="text-base text-gray-400 font-bold tracking-[0.4em] uppercase opacity-60">Architect of Connections</p>
        </div>
        <div className="hidden md:block h-[2px] flex-1 bg-gradient-to-r from-gray-100 to-transparent mx-10 mb-4"></div>
        <div className="text-right mt-4 md:mt-0 flex flex-col items-end">
          <span className="px-4 py-2 bg-[#25282B] text-white text-[9px] font-black rounded-full tracking-[0.3em] uppercase shadow-xl hover:bg-[#FFB11B] hover:text-[#25282B] transition-all cursor-crosshair">
            v2.0 Professional
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[500px]">
        {/* Visual Input Section (Light Card) */}
        <div className="flex-[0.8] bg-white p-12 py-16 rounded-[45px] shadow-premium flex flex-col justify-between relative border-b-[10px] border-[#FFB11B] overflow-hidden group/card transition-all duration-700 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBFBFF] rounded-bl-[80px] transition-all group-hover/card:scale-110"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FFB11B] flex items-center justify-center text-[9px] font-black"></div>
              <label className="text-sm font-[900] text-[#1A1D1F] uppercase tracking-[0.4em]">Configuration</label>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="relative group/input">
              <input
                type="text"
                placeholder="Insert secure link or data content..."
                className="w-full pl-14 pr-6 py-6 bg-gray-50 border-2 border-transparent rounded-[28px] focus:bg-white focus:border-[#FFB11B] focus:ring-[14px] focus:ring-[#FFB11B]/5 outline-none transition-all text-xl font-semibold placeholder:text-gray-200 shadow-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <i className="fa-solid fa-link absolute left-6 top-1/2 -translate-y-1/2 text-gray-200 text-2xl group-focus-within/input:text-[#FFB11B] group-focus-within/input:scale-110 transition-all"></i>
            </div>

            <button
              onClick={downloadQR}
              disabled={!text}
              className={`w-full py-6 rounded-[28px] font-black text-xl flex items-center justify-center gap-4 transition-all uppercase tracking-[0.2em] relative overflow-hidden group/btn
                ${text
                  ? 'bg-[#FFB11B] text-[#25282B] hover:shadow-btn-hover hover:scale-[1.01] active:scale-95'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'}`}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
              <i className={`fa-solid fa-cloud-arrow-down text-xl ${text ? 'animate-bounce' : ''}`}></i>
              Export QR
            </button>
          </div>
        </div>

        {/* Immersive Preview Section (Dark Card) */}
        <div className="flex-[0.7] bg-[#25282B] rounded-[45px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group/preview">
          {/* Atmospheric Glows with Smoother Pulse */}
          <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-[#FFB11B] opacity-[0.03] blur-[150px] animate-pulse pointer-events-none"></div>

          <div className="relative z-10 w-full flex flex-col items-center px-8">
            <div className={`p-10 bg-white rounded-[35px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all duration-1000 
              ${text ? 'qr-reveal-enter scale-100 opacity-100' : 'opacity-[0.03] scale-90 blur-lg'}`}>
              <QRCodeCanvas
                id="qr-canvas"
                value={text || "https://adheesha.me"}
                size={260}
                level="H"
                includeMargin={true}
                bgAlpha={0}
              />
            </div>

            <div className="mt-12 text-center space-y-3">
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${text ? 'bg-[#FFB11B] scale-125' : 'bg-gray-800'}`}></div>
                ))}
              </div>
              <h3 className="text-white text-xl font-black font-brand tracking-[0.2em] uppercase leading-none">Live Review</h3>
              <p className="text-gray-500 font-bold text-[9px] uppercase tracking-[0.4em] opacity-40">Ready for Export</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
