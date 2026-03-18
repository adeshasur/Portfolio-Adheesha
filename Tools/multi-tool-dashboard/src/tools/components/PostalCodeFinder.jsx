import React, { useState } from 'react'
import { postalCodes } from '../data/postalCodes.js'

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
    padding: 14px 16px;
    gap: 12px;
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

  .suggestion-pill {
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(229, 231, 235, 0.9);
    transition: all 0.25s ease;
  }

  .suggestion-pill:hover {
    border-color: rgba(255, 177, 27, 0.55);
    background: rgba(255, 248, 235, 0.92);
  }

  .suggestion-pill.active {
    border-color: rgba(255, 177, 27, 0.75);
    background: rgba(255, 248, 235, 0.96);
    color: #B45309;
  }

  .stagger-1 { animation-delay: 100ms; }
  .stagger-2 { animation-delay: 200ms; }
  .stagger-3 { animation-delay: 300ms; }
`;

const normalizeText = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

const enrichedPostalCodes = postalCodes.map((item) => {
  const cleanName = item.label.replace(/\s*\([^)]+\)/g, '').trim()
  const tags = [...item.label.matchAll(/\(([^)]+)\)/g)].map((match) => match[1].trim())

  return {
    ...item,
    cleanName,
    tags,
    searchName: normalizeText(cleanName),
    searchLabel: normalizeText(item.label),
  }
})

const rankMatches = (query) => {
  const trimmed = query.trim()
  const normalized = normalizeText(trimmed)

  if (!trimmed) {
    return []
  }

  const exactCode = []
  const codeStarts = []
  const exactName = []
  const startsWithName = []
  const includesName = []

  for (const item of enrichedPostalCodes) {
    if (item.code === trimmed) {
      exactCode.push(item)
      continue
    }

    if (/^\d+$/.test(trimmed) && item.code.startsWith(trimmed)) {
      codeStarts.push(item)
      continue
    }

    if (item.searchName === normalized || item.searchLabel === normalized) {
      exactName.push(item)
      continue
    }

    if (item.searchName.startsWith(normalized) || item.searchLabel.startsWith(normalized)) {
      startsWithName.push(item)
      continue
    }

    if (item.searchName.includes(normalized) || item.searchLabel.includes(normalized) || item.code.includes(trimmed)) {
      includesName.push(item)
    }
  }

  return [...exactCode, ...exactName, ...codeStarts, ...startsWithName, ...includesName]
}

const PostalCodeFinder = ({ embedded = false }) => {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [matches, setMatches] = useState([])
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden"

  const runSearch = () => {
    const trimmed = query.trim()

    if (!trimmed) {
      setError('Please enter a post office name or a 5-digit postal code')
      setResult(null)
      setMatches([])
      return
    }

    const nextMatches = rankMatches(trimmed).slice(0, 8)
    setIsSearching(true)
    setResult(null)
    setMatches([])

    window.setTimeout(() => {
      if (nextMatches.length === 0) {
        setError('No postal code matches found for that search')
        setResult(null)
        setMatches([])
      } else {
        setError('')
        setResult(nextMatches[0])
        setMatches(nextMatches)
      }

      setIsSearching(false)
    }, 650)
  }

  const selectMatch = (item) => {
    setResult(item)
    setError('')
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
              Postal Code Finder
            </h1>
            <p className="text-xs text-gray-500 font-medium">Find Sri Lanka postal codes and post office names instantly.</p>
          </div>
          
          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              Postal Code Finder
            </h1>
            <p className="text-sm text-gray-500 font-medium">Find Sri Lanka postal codes and post office names instantly.</p>
          </div>
        </>
      ) : null}

      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Post Office or Postal Code</label>
            <input
              type="text"
              placeholder="e.g. Kandy or 20000"
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                if (error) setError('')
              }}
              onKeyDown={(event) => event.key === 'Enter' && runSearch()}
            />
            {error ? (
              <p className="text-xs text-red-500 mt-2">{error}</p>
            ) : (
              <p className="text-xs text-gray-400 mt-2">Source: Sri Lanka Post office list. Search by area name or 5-digit code.</p>
            )}
          </div>

          <button
            onClick={runSearch}
            disabled={!query.trim()}
            className="clean-button w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
          >
            Find Postal Code
          </button>

          {matches.length > 1 ? (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-wide uppercase text-gray-400">Similar Matches</p>
              <div className="flex flex-wrap gap-2">
                {matches.slice(0, 6).map((item) => (
                  <button
                    key={`${item.code}-${item.label}`}
                    type="button"
                    onClick={() => selectMatch(item)}
                    className={`suggestion-pill ${result?.code === item.code && result?.label === item.label ? 'active' : ''} rounded-full px-3 py-2 text-xs font-medium text-gray-600`}
                  >
                    {item.cleanName}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-8 h-full justify-center min-h-[220px]">
          {isSearching ? (
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
                    <path d="M4 1.5A1.5 1.5 0 0 0 2.5 3v10A1.5 1.5 0 0 0 4 14.5h8A1.5 1.5 0 0 0 13.5 13V3A1.5 1.5 0 0 0 12 1.5H4ZM3.5 3A.5.5 0 0 1 4 2.5h8a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V3Zm2 1.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 0-1H5.5Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Postal Match</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{result.cleanName}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="data-row animate-in fade-in slide-in-from-left-4 duration-500 stagger-1 fill-mode-both">
                  <span className="text-sm text-gray-500">Post Office</span>
                  <span className="text-sm font-semibold text-gray-900 text-right">{result.cleanName}</span>
                </div>
                <div className="data-row animate-in fade-in slide-in-from-left-4 duration-500 stagger-2 fill-mode-both">
                  <span className="text-sm text-gray-500">Postal Code</span>
                  <span className="text-sm font-semibold text-gray-900">{result.code}</span>
                </div>
                <div className="data-row animate-in fade-in slide-in-from-left-4 duration-500 stagger-3 fill-mode-both">
                  <span className="text-sm text-gray-500">Area Tag</span>
                  <span className="text-sm font-semibold text-gray-900 text-right">{result.tags.join(', ') || 'Sri Lanka Post'}</span>
                </div>
              </div>

              {matches.length > 1 ? (
                <div className="mt-5 rounded-xl border border-dashed border-gray-200 bg-white/60 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 mb-2">Top Suggestions</p>
                  <p className="text-sm text-gray-600 leading-6">
                    {matches.slice(0, 3).map((item) => `${item.cleanName} (${item.code})`).join(' • ')}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
              <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V6a3 3 0 1 1 6 0v.75m-9 0h12A1.5 1.5 0 0 1 19.5 8.25v9A1.5 1.5 0 0 1 18 18.75H6A1.5 1.5 0 0 1 4.5 17.25v-9A1.5 1.5 0 0 1 6 6.75Zm3.75 3.75h4.5" />
              </svg>
              <p className="text-sm text-gray-400 font-medium text-center">Postal result will appear here</p>
            </div>
          )}
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

export default PostalCodeFinder
