import React, { useState, useCallback } from 'react'

const VaultGuard = () => {
  const [passwords, setPasswords] = useState([])
  const [formData, setFormData] = useState({ title: '', password: '', username: '', url: '' })
  const [showForm, setShowForm] = useState(false)
  const [showPassword, setShowPassword] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleAddPassword = useCallback((e) => {
    e.preventDefault()
    if (!formData.title || !formData.password) {
      setMessage({ type: 'error', text: 'Title and Password are required!' })
      return
    }
    
    setPasswords(prev => [...prev, { ...formData, id: Date.now() }])
    setFormData({ title: '', password: '', username: '', url: '' })
    setShowForm(false)
    setMessage({ type: 'success', text: 'Password saved successfully!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }, [formData])

  const handleDeletePassword = useCallback((id) => {
    setPasswords(prev => prev.filter(p => p.id !== id))
    setMessage({ type: 'success', text: 'Password deleted!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }, [])

  const handleCopyPassword = useCallback((password) => {
    navigator.clipboard.writeText(password)
    setMessage({ type: 'success', text: 'Password copied to clipboard!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }, [])

  const toggleShowPassword = useCallback((id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  return (
    <div className="container" style={{ maxWidth: '700px' }}>
      <div className="glass-card">
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 className="font-brand" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            🔐 Vault Guard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Secure password manager and storage
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'} style={{ marginBottom: '16px' }}>
            {message.text}
          </div>
        )}

        {/* Add Password Button */}
        {!showForm && (
          <button 
            className="btn-primary" 
            onClick={() => setShowForm(true)}
            style={{ width: '100%', marginBottom: '24px', padding: '12px 24px' }}
          >
            + Add Password
          </button>
        )}

        {/* Form */}
        {showForm && (
          <form onSubmit={handleAddPassword} style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              name="title"
              placeholder="Service Name (e.g., Gmail, GitHub)"
              value={formData.title}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              name="username"
              placeholder="Username / Email"
              value={formData.username}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="url"
              name="url"
              placeholder="Website URL (optional)"
              value={formData.url}
              onChange={handleInputChange}
              className="input-field"
            />
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                Save Password
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowForm(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Password List */}
        {passwords.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
              Saved Passwords ({passwords.length})
            </h2>
            {passwords.map(item => (
              <div 
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  {item.username && (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      👤 {item.username}
                    </p>
                  )}
                </div>

                <div style={{ 
                  background: 'var(--bg-subtle)', 
                  borderRadius: '8px', 
                  padding: '12px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <code style={{ fontSize: '12px', letterSpacing: '1px' }}>
                    {showPassword[item.id] ? item.password : '•'.repeat(item.password.length)}
                  </code>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => toggleShowPassword(item.id)}
                    style={{ padding: '6px 12px', fontSize: '12px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  >
                    {showPassword[item.id] ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleCopyPassword(item.password)}
                    style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                  >
                    📋 Copy
                  </button>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '12px', textAlign: 'center', textDecoration: 'none' }}
                    >
                      🔗 Visit
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleDeletePassword(item.id)}
                    style={{ flex: 1, padding: '8px 12px', fontSize: '12px', color: 'var(--error)', borderColor: 'var(--error)' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !showForm ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>🔒 No passwords saved yet</p>
            <p style={{ fontSize: '12px' }}>Start by adding your first password</p>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '12px' }}>
        <p>⚠️ Note: Passwords are stored locally in your browser. Clear cache to delete all data.</p>
      </div>
    </div>
  )
}

export default VaultGuard
