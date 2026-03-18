import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'vault-guard-items';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap');

  :root {
    --primary: #FFB11B;
    --text-main: #111827;
    --text-muted: #6B7280;
    --border: #E5E7EB;
    --bg-surface: #FFFFFF;
    --bg-subtle: #F9FAFB;
    --success: #15803D;
    --error: #DC2626;
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
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 32px;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  }

  .clean-input {
    background: var(--bg-surface);
    border: 1.5px solid var(--border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .clean-input:focus {
    border-color: var(--primary);
    background: rgba(255,255,255,0.94);
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

  .clean-button:disabled {
    background: #E5E7EB;
    color: #9CA3AF;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .subtle-button {
    border: 1px solid rgba(229, 231, 235, 0.9);
    background: rgba(255, 255, 255, 0.86);
    color: var(--text-main);
    transition: all 0.25s ease;
  }

  .subtle-button:hover {
    border-color: rgba(255, 177, 27, 0.5);
    background: rgba(255, 248, 235, 0.9);
  }

  .danger-button:hover {
    color: var(--error);
    border-color: rgba(220, 38, 38, 0.22);
    background: rgba(254, 242, 242, 0.95);
  }

  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(229, 231, 235, 0.55);
  }

  .data-row:last-child { border-bottom: none; }

  .data-row:hover {
    background: rgba(255, 177, 27, 0.05);
    transform: translateX(4px);
  }

  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, #f6f7f8 4%, #edeef1 25%, #f6f7f8 36%);
    background-size: 1000px 100%;
  }

  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: -4s;
  }

  .vault-chip {
    border: 1px solid rgba(229, 231, 235, 0.85);
    background: rgba(249, 250, 251, 0.9);
    transition: all 0.25s ease;
  }

  .vault-chip:hover {
    border-color: rgba(255, 177, 27, 0.45);
    background: rgba(255, 248, 235, 0.85);
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes float {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
    100% { transform: translateY(0px) scale(1); }
  }
`;

const emptyForm = {
  title: '',
  username: '',
  password: '',
  url: '',
};

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const buildId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const normalizeUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const maskPassword = (value) => '•'.repeat(Math.max(8, Math.min(value.length, 18)));

const SecurePasswordGenerator = ({ embedded = false }) => {
  const [passwords, setPasswords] = useState(() => loadItems());
  const [formData, setFormData] = useState(emptyForm);
  const [selectedId, setSelectedId] = useState(() => loadItems()[0]?.id ?? '');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);
  const wrapperClasses = embedded
    ? "w-full max-w-5xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden"
    : "w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 animate-in fade-in duration-700 relative overflow-hidden";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    if (!selectedId && passwords.length > 0) {
      setSelectedId(passwords[0].id);
    }

    if (selectedId && !passwords.some((item) => item.id === selectedId)) {
      setSelectedId(passwords[0]?.id ?? '');
    }
  }, [passwords, selectedId]);

  useEffect(() => {
    if (!message.text) return undefined;
    const timeoutId = window.setTimeout(() => setMessage({ type: '', text: '' }), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [message]);

  const selectedItem = passwords.find((item) => item.id === selectedId) ?? null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.password.trim()) {
      setMessage({ type: 'error', text: 'Service name and password are required.' });
      return;
    }

    setIsSaving(true);
    window.setTimeout(() => {
      const nextItem = {
        id: buildId(),
        title: formData.title.trim(),
        username: formData.username.trim(),
        password: formData.password.trim(),
        url: normalizeUrl(formData.url),
      };

      setPasswords((current) => [nextItem, ...current]);
      setSelectedId(nextItem.id);
      setFormData(emptyForm);
      setShowPassword(false);
      setIsSaving(false);
      setMessage({ type: 'success', text: 'Credential secured successfully.' });
    }, 450);
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    setPasswords((current) => current.filter((item) => item.id !== selectedItem.id));
    setShowPassword(false);
    setMessage({ type: 'success', text: 'Credential deleted from the vault.' });
  };

  const handleCopy = async () => {
    if (!selectedItem) return;

    try {
      await navigator.clipboard.writeText(selectedItem.password);
      setMessage({ type: 'success', text: `${selectedItem.title} password copied.` });
    } catch {
      setMessage({ type: 'error', text: 'Clipboard access failed.' });
    }
  };

  return (
    <div className={wrapperClasses}>
      <style>{styles}</style>

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/15 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-delayed"></div>

      {!embedded ? (
        <>
          <div className="fixed top-6 left-0 w-full text-center z-10 hidden sm:block">
            <h1 className="text-2xl sm:text-3xl font-bold font-brand tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              Vault Guard
            </h1>
            <p className="text-xs text-gray-500 font-medium">Protect and manage saved credentials instantly.</p>
          </div>

          <div className="text-center mb-8 sm:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
              Vault Guard
            </h1>
            <p className="text-sm text-gray-500 font-medium">Protect and manage saved credentials instantly.</p>
          </div>
        </>
      ) : null}

      <div className="clean-card p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full relative z-20 shadow-2xl shadow-gray-200/50 hover:shadow-yellow-100/50 transition-shadow duration-500">
        <div className="flex flex-col space-y-5">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Service Name</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. GitHub"
                className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username / Email</label>
              <input
                type="text"
                name="username"
                placeholder="name@example.com"
                className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="text"
                name="password"
                placeholder="Enter a secure password"
                className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Website URL</label>
              <input
                type="text"
                name="url"
                placeholder="github.com"
                className="clean-input w-full p-4 rounded-xl text-base text-gray-900 placeholder:text-gray-400"
                value={formData.url}
                onChange={handleInputChange}
              />
            </div>

            {message.text ? (
              <p className={`text-xs font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {message.text}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSaving}
              className="clean-button w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
            >
              {isSaving ? 'Saving Credential' : 'Save Credential'}
            </button>
          </form>

          {passwords.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {passwords.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setShowPassword(false);
                  }}
                  className={`vault-chip rounded-full px-3 py-1.5 text-xs font-medium ${
                    selectedId === item.id ? 'border-yellow-300 bg-yellow-50 text-yellow-700' : 'text-gray-600'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col md:border-l md:border-gray-100 md:pl-8 h-full justify-center min-h-[320px]">
          {isSaving ? (
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
          ) : selectedItem ? (
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a4 4 0 0 0-4 4v2H3.5A1.5 1.5 0 0 0 2 8.5v5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 7H12V5a4 4 0 0 0-4-4Zm3 6H5V5a3 3 0 1 1 6 0v2Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Credential Preview</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{selectedItem.title}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="data-row">
                  <span className="text-sm text-gray-500">Username</span>
                  <span className="text-sm font-semibold text-gray-900 text-right break-all">
                    {selectedItem.username || 'Not provided'}
                  </span>
                </div>
                <div className="data-row">
                  <span className="text-sm text-gray-500">Password</span>
                  <span className="text-sm font-semibold text-gray-900 text-right break-all">
                    {showPassword ? selectedItem.password : maskPassword(selectedItem.password)}
                  </span>
                </div>
                <div className="data-row">
                  <span className="text-sm text-gray-500">Website</span>
                  <span className="text-sm font-semibold text-gray-900 text-right break-all">
                    {selectedItem.url || 'Not linked'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="subtle-button rounded-xl px-4 py-3 text-sm font-medium"
                >
                  {showPassword ? 'Hide' : 'Reveal'}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="subtle-button rounded-xl px-4 py-3 text-sm font-medium"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="subtle-button danger-button rounded-xl px-4 py-3 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
              <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm6 0h-1v8H7v-8H6a1 1 0 01-1-1v-1a2 2 0 012-2h10a2 2 0 012 2v1a1 1 0 01-1 1z" />
              </svg>
              <p className="text-sm text-gray-400 font-medium text-center">Saved credentials will appear here</p>
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
  );
};

export default SecurePasswordGenerator;
