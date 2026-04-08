function Footer() {
  return (
    <footer className="app-footer" style={{
            padding: '32px 40px',
            borderTop: '1px solid var(--border-c)',
            background: 'var(--bg2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Agromotion</span>
              <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)' }}>v1.0.0</span>
            </div>
            <p style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', textAlign: 'right', lineHeight: 1.7 }}>
              IPCA · Engenharia de Sistemas Informáticos<br />
              Júlio Faria &amp; Miguel Areal · 2025–2026
            </p>
          </footer>
  )
}

export { Footer }
          
          
          
          