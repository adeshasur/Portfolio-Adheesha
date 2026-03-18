import React, { useEffect, useState } from 'react'

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

  .clean-card {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 32px;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

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

  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
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

  .color-preview {
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
`

const clampHex = (value) => {
  const cleaned = value.replace(/[^0-9a-f]/gi, '').slice(0, 6)
  if (!cleaned) {
    return '#FFB11B'
  }

  if (cleaned.length === 3) {
    return `#${cleaned.split('').map((char) => char + char).join('').toUpperCase()}`
  }

  return `#${cleaned.padEnd(6, cleaned[cleaned.length - 1] || '0').toUpperCase()}`
}

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized, 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

const rgbToHsl = ({ r, g, b }) => {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  let hue = 0
  let saturation = 0
  const lightness = (max + min) / 2

  if (max !== min) {
    const delta = max - min
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0)
        break
      case green:
        hue = (blue - red) / delta + 2
        break
      default:
        hue = (red - green) / delta + 4
        break
    }

    hue /= 6
  }

  return {
    h: Math.round(hue * 360),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  }
}

const randomHex = () => {
  const value = Math.floor(Math.random() * 0xffffff)
  return `#${value.toString(16).padStart(6, '0').toUpperCase()}`
}

const ChromaCraft = ({ embedded = false }) => {
  const [hexValue, setHexValue] = useState('#FFB11B')
  const [statusMessage, setStatusMessage] = useState('')
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden"

  const rgb = hexToRgb(hexValue)
  const hsl = rgbToHsl(rgb)
  const rgbText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslText = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  useEffect(() => {
    if (!statusMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setStatusMessage(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [statusMessage])

  const handleHexInput = (event) => {
    const value = event.target.value
    const normalized = clampHex(value.startsWith('#') ? value : `#${value}`)
    setHexValue(normalized)
  }

  const generateRandomColor = () => {
    const nextColor = randomHex()
    setHexValue(nextColor)
    setStatusMessage('Random color generated')
  }

  const copyValue = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value)
      setStatusMessage(`${label} copied`)
    } catch {
      setStatusMessage('Copy failed')
    }
  }

  return (
    <div className={wrapperClasses}>
      <style>{styles}</style>

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/15 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-delayed"></div>

      {!embedded ? (
        <>
          <div className="fixed top-6 left-0 w-full text-center z-10 hidden sm:block">
            <h1 className="text-2xl sm:text-3xl font-bold font-brand tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              ChromaCraft
            </h1>
            <p className="text-xs text-gray-500 font-medium">Pick, preview, convert, and copy colors instantly.</p>
          </div>
          
          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              ChromaCraft
            </h1>
            <p className="text-sm text-gray-500 font-medium">Pick, preview, convert, and copy colors instantly.</p>
          </div>
        </>
      ) : null}

      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        <div className="flex flex-col space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Color Picker</label>
            <input
              type="color"
              value={hexValue}
              onChange={(event) => setHexValue(event.target.value.toUpperCase())}
              className="w-full h-20 rounded-2xl cursor-pointer border border-gray-200 bg-white p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">HEX Code</label>
            <input
              type="text"
              value={hexValue}
              onChange={handleHexInput}
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400 uppercase"
              placeholder="#FFB11B"
            />
            <p className="text-xs text-gray-400 mt-2">
              {statusMessage || 'Use the picker, edit HEX manually, or generate a random color.'}
            </p>
          </div>

          <button
            type="button"
            onClick={generateRandomColor}
            className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
          >
            Random Color
          </button>

          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => copyValue(hexValue, 'HEX')}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              Copy HEX
            </button>
            <button
              type="button"
              onClick={() => copyValue(rgbText, 'RGB')}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              Copy RGB
            </button>
            <button
              type="button"
              onClick={() => copyValue(hslText, 'HSL')}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              Copy HSL
            </button>
          </div>
        </div>

        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-8 h-full justify-center min-h-[220px]">
          <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
            <div
              className="color-preview w-full h-44 rounded-2xl mb-6"
              style={{ backgroundColor: hexValue }}
            ></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.498.795a1 1 0 0 1 1.414 1.414l-1.043 1.043-2.12-2.121L12.792.088a1 1 0 0 1 1.414 0l-.708.707ZM11.04 1.84 3.06 9.82a1.5 1.5 0 0 0-.374.638l-.558 2.233a.5.5 0 0 0 .606.606l2.233-.558a1.5 1.5 0 0 0 .638-.374l7.98-7.98-2.121-2.121ZM1 13.5A1.5 1.5 0 0 0 2.5 15h11A1.5 1.5 0 0 0 15 13.5v-4a.5.5 0 0 0-1 0v4a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h4a.5.5 0 0 0 0-1h-4A1.5 1.5 0 0 0 1 2.5v11Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Color Values</h3>
                <p className="text-xs text-gray-500 font-medium">Live conversion preview.</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="data-row">
                <span className="text-sm text-gray-500">HEX</span>
                <span className="text-sm font-semibold text-gray-900">{hexValue}</span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">RGB</span>
                <span className="text-sm font-semibold text-gray-900 text-right">{rgbText}</span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">HSL</span>
                <span className="text-sm font-semibold text-gray-900 text-right">{hslText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!embedded ? (
        <>
          <div className="fixed bottom-6 left-0 w-full text-center text-gray-400 text-xs z-10 hidden sm:block">
            Powered by Adheesha Sooriyaarachchi | 2026
          </div>
          
          <div className="mt-8 text-center text-gray-400 text-xs sm:hidden">
            Powered by Adheesha Sooriyaarachchi | 2026
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ChromaCraft
