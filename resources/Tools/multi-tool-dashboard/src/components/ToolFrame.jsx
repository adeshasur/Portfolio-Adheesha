function ToolFrame({ tool, children }) {
  const Icon = tool.icon

  return (
    <section className="tool-frame">
      <div className="tool-frame-hero">
        <div>
          <p className="tool-frame-kicker">{tool.eyebrow}</p>
          <h1 className="tool-frame-title">{tool.label}</h1>
          <p className="tool-frame-description">{tool.description}</p>
        </div>

        <div className="tool-frame-stat">
          <span className="tool-frame-stat-icon">
            <Icon size={18} />
          </span>
          <div>
            <p>{tool.statsLabel}</p>
            <strong>{tool.statsValue}</strong>
          </div>
        </div>
      </div>

      <div className="tool-frame-canvas">{children}</div>
    </section>
  )
}

export default ToolFrame
