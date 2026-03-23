import { useState } from 'react'

const PERIODS = ['Ao vivo', '24H', '7 dias', '30 dias']

const METRICS = [
  { key: 'battery', label: 'Bateria',     color: 'var(--green)', sparks: [20,45,30,70,55,80,40,60],
    icon: <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:'var(--text3)',fill:'none',strokeWidth:2,strokeLinecap:'round' }}><rect x="7" y="2" width="10" height="18" rx="3"/><line x1="11" y1="17" x2="13" y2="17"/></svg> },
  { key: 'cpu',     label: 'Uso CPU',     color: 'var(--foreground)', sparks: [40,60,25,80,50,35,65,45],
    icon: <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:'var(--text3)',fill:'none',strokeWidth:2,strokeLinecap:'round' }}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg> },
  { key: 'temp',    label: 'Temperatura', color: 'var(--amber)', sparks: [55,60,70,65,75,80,72,78],
    icon: <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:'var(--text3)',fill:'none',strokeWidth:2,strokeLinecap:'round' }}><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg> },
  { key: 'ram',     label: 'Memória RAM', color: 'var(--foreground)', sparks: [50,52,48,55,53,51,57,54],
    icon: <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:'var(--text3)',fill:'none',strokeWidth:2,strokeLinecap:'round' }}><path d="M22 12H2M22 12l-4-4M22 12l-4 4M2 12l4-4M2 12l4 4"/></svg> },
  { key: 'wifi',    label: 'Sinal Wi-Fi', color: 'var(--foreground)', sparks: [85,80,75,82,78,88,83,79],
    icon: <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:'var(--text3)',fill:'none',strokeWidth:2,strokeLinecap:'round' }}><path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M3.157 11.157a11 11 0 0117.686 0M6.634 13.634a7 7 0 0110.732 0"/></svg> },
  { key: 'latency', label: 'Latência',    color: 'var(--foreground)', sparks: [20,15,25,18,30,22,17,20],
    icon: <svg viewBox="0 0 24 24" style={{ width:13,height:13,stroke:'var(--text3)',fill:'none',strokeWidth:2,strokeLinecap:'round' }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
]

export default function Telemetry() {
  const [period, setPeriod] = useState('Ao vivo')

  return (
    <section id="telemetry" className="section telemetry-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)' }}>
      <SectionTag>Telemetria em Tempo Real</SectionTag>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>O que está a acontecer agora.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 640, fontWeight: 300, marginBottom: 32 }}>
        Quando o robô estiver em funcionamento, este painel apresentará dados reais lidos diretamente do Firebase — os mesmos que a app monitoriza em tempo real.
      </p>

      <div className="telemetry-toolbar" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 32, flexWrap: 'wrap' as const }}>
        <div className="telemetry-periods" style={{ display: 'flex', gap: 6 }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                fontSize: 12, padding: '6px 14px', borderRadius: 20,
                border: period === p ? '1px solid var(--green)' : '1px solid var(--border2-c)',
                color: period === p ? 'var(--green)' : 'var(--text3)',
                background: 'transparent', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', transition: 'all .15s',
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="telemetry-note" style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', background: 'var(--surface)', border: '1px solid var(--border-c)', borderRadius: 8, padding: '10px 14px', lineHeight: 1.6, maxWidth: 300 }}>
          <strong style={{ color: 'var(--amber)' }}>⚠ Em desenvolvimento</strong><br />
          Ligação ao Firebase ainda não activa. Valores estáticos — integração com dados reais será feita quando o sistema estiver em produção.
        </div>
      </div>

      <div className="telemetry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {METRICS.map((m) => (
          <div key={m.key} style={{ background: 'var(--surface)', border: '1px solid var(--border-c)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
              {m.icon}
              {m.label}
            </div>
            <p style={{ fontSize: 28, fontWeight: 600, color: m.color, fontFamily: 'DM Mono, monospace', letterSpacing: '-.02em', marginBottom: 8 }}>—</p>
            <p style={{ fontSize: 11, color: 'var(--text3)' }}>Aguarda ligação Firebase</p>
            <div style={{ height: 32, marginTop: 12, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
              {m.sparks.map((h, i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg3)', borderRadius: 2, height: h + '%' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--green)', marginBottom: 20 }}>
      <span style={{ width: 16, height: 1, background: 'var(--green)', display: 'inline-block' }} />
      {children}
    </div>
  )
}