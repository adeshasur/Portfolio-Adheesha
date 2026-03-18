import React, { useState } from 'react'

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

  .toggle-pill {
    border: 1px solid rgba(229, 231, 235, 0.9);
    background: rgba(255, 255, 255, 0.82);
    transition: all 0.25s ease;
  }

  .toggle-pill.active {
    background: rgba(255, 248, 235, 0.95);
    border-color: rgba(255, 177, 27, 0.7);
    color: #B45309;
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
`

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)

const InterestCalcPro = ({ embedded = false }) => {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('2')
  const [mode, setMode] = useState('simple')
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden"

  const principalValue = Number.parseFloat(principal) || 0
  const rateValue = Number.parseFloat(rate) || 0
  const yearValue = Number.parseFloat(years) || 0

  const interest =
    mode === 'simple'
      ? (principalValue * rateValue * yearValue) / 100
      : principalValue * ((1 + rateValue / 100) ** yearValue - 1)

  const total = principalValue + interest

  const result = {
    principalValue,
    rateValue,
    yearValue,
    interest,
    total,
  }

  const isValid =
    result.principalValue > 0 &&
    result.rateValue >= 0 &&
    result.yearValue > 0

  return (
    <div className={wrapperClasses}>
      <style>{styles}</style>

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/15 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-delayed"></div>

      {!embedded ? (
        <>
          <div className="fixed top-6 left-0 w-full text-center z-10 hidden sm:block">
            <h1 className="text-2xl sm:text-3xl font-bold font-brand tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              InterestCalc Pro
            </h1>
            <p className="text-xs text-gray-500 font-medium">Calculate simple and compound interest with instant loan insights.</p>
          </div>
          
          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              InterestCalc Pro
            </h1>
            <p className="text-sm text-gray-500 font-medium">Calculate simple and compound interest with instant loan insights.</p>
          </div>
        </>
      ) : null}

      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Principal Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 100000"
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
              value={principal}
              onChange={(event) => setPrincipal(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 12"
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time Period in Years</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 2"
              className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
              value={years}
              onChange={(event) => setYears(event.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Calculation Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('simple')}
                className={`toggle-pill rounded-xl px-4 py-3 text-sm font-medium ${mode === 'simple' ? 'active' : 'text-gray-600'}`}
              >
                Simple Interest
              </button>
              <button
                type="button"
                onClick={() => setMode('compound')}
                className={`toggle-pill rounded-xl px-4 py-3 text-sm font-medium ${mode === 'compound' ? 'active' : 'text-gray-600'}`}
              >
                Compound Interest
              </button>
            </div>
          </div>

          <button
            type="button"
            disabled={!isValid}
            className="clean-button w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
          >
            {mode === 'simple' ? 'Simple Interest Ready' : 'Compound Interest Ready'}
          </button>
        </div>

        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-8 h-full justify-center min-h-[220px]">
          {isValid ? (
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.5 13.5a.5.5 0 0 1 .5-.5h1V3H3v10h1a.5.5 0 0 1 0 1H3A1 1 0 0 1 2 13V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a.5.5 0 0 1-.5-.5ZM7 5a2 2 0 0 0-2 2 .5.5 0 0 0 1 0 1 1 0 1 1 1 1 .5.5 0 0 0-.5.5V10a.5.5 0 0 0 1 0v-.551A2 2 0 0 0 7 5Zm.002 6a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Calculation Summary</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{mode} interest</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="data-row">
                  <span className="text-sm text-gray-500">Principal</span>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(result.principalValue)}</span>
                </div>
                <div className="data-row">
                  <span className="text-sm text-gray-500">Interest Earned</span>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(result.interest)}</span>
                </div>
                <div className="data-row">
                  <span className="text-sm text-gray-500">Total Payable</span>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(result.total)}</span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-dashed border-gray-200 bg-white/60 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400 mb-2">Breakdown</p>
                <p className="text-sm text-gray-600 leading-6">
                  {result.rateValue}% annual rate for {result.yearValue} year{result.yearValue === 1 ? '' : 's'} on {formatCurrency(result.principalValue)}.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
              <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4 1.343 4 3-1.79 3-4 3m0-15v2m0 13v2m8-9h-2M6 12H4" />
              </svg>
              <p className="text-sm text-gray-400 font-medium text-center">Results will appear here</p>
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

export default InterestCalcPro
