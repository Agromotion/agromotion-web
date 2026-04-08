const MEMBERS = [
  { initials: 'JF', name: 'Júlio Faria', role: 'Firmware & Hardware', desc: 'Responsável pela construção física do robô, eletrónica, montagem mecânica, lógica de controlo em Arduino e Raspberry Pi. Implementa a ponte entre o hardware e a cloud, garantindo que os comandos remotos se traduzem em ações precisas no robô.', tags: ['Arduino', 'Raspberry Pi', 'Python', 'C++', 'Eletrónica', 'Modelação 3D'] },
  { initials: 'MA', name: 'Miguel Areal', role: 'Software & Backend', desc: 'Responsável pelo desenvolvimento da aplicação multiplataforma e pela arquitetura cloud. Define como os dados fluem entre o utilizador, o Firebase e o robô, desde a autenticação até às notificações e ao painel de telemetria em tempo real.', tags: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'JavaScript','C++'] },
]

const tag: React.CSSProperties = { fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', background: 'var(--bg3)', border: '1px solid var(--border-c)', padding: '3px 9px', borderRadius: 5 }

export default function Team() {
  return (
    <section id="team" className="section team-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)', background: 'var(--bg2)' }}>
      <SectionTag>Equipa</SectionTag>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>Dois domínios.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 640, fontWeight: 300, marginBottom: 40 }}>
        A divisão do trabalho reflete as duas camadas do sistema: Quem constrói o hardware e quem desenvolve o software que o controla.
      </p>

      <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {MEMBERS.map((m) => (
          <div key={m.name} className="team-card" style={{ background: 'var(--surface)', border: '1px solid var(--border-c)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--border-c)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--green-m)', border: '1px solid rgba(61,212,74,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, color: 'var(--green)', marginBottom: 16, fontFamily: 'DM Mono, monospace' }}>
                {m.initials}
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{m.name}</p>
              <p style={{ fontSize: 12, color: 'var(--green)', fontFamily: 'DM Mono, monospace' }}>{m.role}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text2)', fontWeight: 300, marginTop: 12 }}>{m.desc}</p>
            </div>
            <div style={{ padding: '16px 28px', display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {m.tags.map((t) => <span key={t} style={tag}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="team-collab" style={{ background: 'var(--surface)', border: '1px solid var(--border-c)', borderRadius: 12, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--green-m)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg style={{ width: 16, height: 16, stroke: 'var(--green)', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>Colaboração no Website</strong>: Apesar da divisão clara de responsabilidades, ambos os alunos participaram no desenvolvimento e design deste portal informativo.
        </p>
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