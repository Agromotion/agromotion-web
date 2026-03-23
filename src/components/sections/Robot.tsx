const FEATURES = [
  { title: 'Motores de precisão',              desc: 'Activação controlada do mecanismo de movimento, com tolerâncias ajustáveis para horários ou por comando imediato.' },
  { title: 'Módulo de câmara',                 desc: 'Captura e streaming integrado para monitorização visual remota.' },
  { title: 'Sincronização em tempo real',      desc: 'Ligação persistente ao Firebase Firestore. O robot escuta alterações de horário ou comandos manuais e executa-os sem intervenção adicional.' },
  { title: 'Telemetria contínua',              desc: 'Publica periodicamente métricas de saúde do sistema: Bateria, CPU, temperatura, RAM, sinal Wi-Fi e latência para consulta no painel da app e deste website.' },
  { title: 'Resiliência e arranque automático', desc: 'Horários guardados localmente para garantir operação mesmo sem ligação à internet. Serviço de sistema com reinício automático em caso de falha.' },
]

const STACK = ['Python 3', 'C++ / Arduino', 'Raspberry Pi', 'Firebase Admin SDK', 'Camera Module', 'GPIO', 'Embedded Linux']

export default function Robot() {
  return (
    <section id="robot" className="section robot-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)' }}>
      <SectionTag>agromotion-robot</SectionTag>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>Hardware que responde.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 640, fontWeight: 300, marginBottom: 40 }}>
        O robô é um sistema embebido construído sobre Arduino e Raspberry Pi. Recebe comandos do Firebase, acciona os motores, monitoriza os sensores e reporta o seu estado continuamente.
      </p>

      <div className="robot-features" style={{ background: 'var(--border-c)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, gap: 1, marginBottom: 20 }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '22px 24px', background: 'var(--surface)' }}>
            <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 8, background: 'var(--bg3)', border: '1px solid var(--border-c)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{f.title}</p>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
        {STACK.map((s) => (
          <span key={s} style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', background: 'var(--surface)', border: '1px solid var(--border-c)', padding: '5px 12px', borderRadius: 6 }}>{s}</span>
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