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
`;

const countWords = (text) => {
  const trimmed = text.trim()
  if (!trimmed) {
    return 0
  }

  return trimmed.split(/\s+/).filter(Boolean).length
}

const getReadingTime = (words) => {
  if (words === 0) {
    return '0 min'
  }

  return `${Math.max(1, Math.ceil(words / 200))} min`
}

const TextTransformerPro = ({ embedded = false }) => {
  const [text, setText] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden"

  const wordCount = countWords(text)
  const characterCount = text.length
  const readingTime = getReadingTime(wordCount)
  const previewText = text.trim() ? text : 'Transformed text preview will appear here.'

  useEffect(() => {
    if (!statusMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setStatusMessage(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [statusMessage])

  const transformToUppercase = () => {
    setText((current) => current.toUpperCase())
    setStatusMessage('Converted to uppercase')
  }

  const transformToLowercase = () => {
    setText((current) => current.toLowerCase())
    setStatusMessage('Converted to lowercase')
  }

  const clearText = () => {
    setText('')
    setStatusMessage('Text cleared')
  }

  const copyToClipboard = async () => {
    if (!text) {
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setStatusMessage('Copied to clipboard')
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
              Text Transformer Pro
            </h1>
            <p className="text-xs text-gray-500 font-medium">Transform text and monitor live writing stats instantly.</p>
          </div>
          
          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              Text Transformer Pro
            </h1>
            <p className="text-sm text-gray-500 font-medium">Transform text and monitor live writing stats instantly.</p>
          </div>
        </>
      ) : null}

      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Input Text</label>
            <textarea
              placeholder="Type or paste your content here..."
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400 min-h-[220px] resize-none"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <p className="text-xs text-gray-400 mt-2">
              {statusMessage || 'Stats update in real-time while you type.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={transformToUppercase}
              disabled={!text}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              UPPERCASE
            </button>
            <button
              type="button"
              onClick={transformToLowercase}
              disabled={!text}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              lowercase
            </button>
            <button
              type="button"
              onClick={clearText}
              disabled={!text}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              Clear Text
            </button>
            <button
              type="button"
              onClick={copyToClipboard}
              disabled={!text}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>

        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-8 h-full justify-center min-h-[220px]">
          <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 4.5V14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5L14 4.5ZM10.5 2v2.5a.5.5 0 0 0 .5.5H13L10.5 2ZM6 7.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Zm0 2.5a.5.5 0 0 0 0 1h4.5a.5.5 0 0 0 0-1H6Zm0 2.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H6Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Live Text Stats</h3>
                <p className="text-xs text-gray-500 font-medium">Auto-updates while you type.</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="data-row">
                <span className="text-sm text-gray-500">Word Count</span>
                <span className="text-sm font-semibold text-gray-900">{wordCount}</span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">Character Count</span>
                <span className="text-sm font-semibold text-gray-900">{characterCount}</span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">Reading Time</span>
                <span className="text-sm font-semibold text-gray-900">{readingTime}</span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-white/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 mb-2">Preview</p>
              <p className={`text-sm leading-6 ${text ? 'text-gray-700' : 'text-gray-400'}`}>
                {previewText.length > 220 ? `${previewText.slice(0, 220)}...` : previewText}
              </p>
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

export default TextTransformerPro
