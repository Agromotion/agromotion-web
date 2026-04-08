import SectionTag from "../ui/SectionTag"

const FEATURES = [
  {
    title: 'Motores de precisão',
    desc: 'Ativação controlada do mecanismo de movimento, com tolerâncias ajustáveis para horários ou por controlo imediato.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="2.5"/>
        <path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.5 3.5l1.1 1.1M11.4 11.4l1.1 1.1M3.5 12.5l1.1-1.1M11.4 4.6l1.1-1.1"/>
      </svg>
    ),
  },
  {
    title: 'Módulo de câmara',
    desc: 'Captura e streaming integrado para monitorização visual remota em tempo real.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="12" height="8" rx="2"/>
        <circle cx="8" cy="8" r="2"/>
        <path d="M2 6.5h1.5M12.5 6.5H14"/>
      </svg>
    ),
  },
  {
    title: 'Sincronização em tempo real',
    desc: 'Ligação persistente ao Firebase Firestore. Escuta alterações de horário ou comandos manuais e executa-os sem intervenção adicional.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 8h3l2-5 2 10 2-5h3"/>
      </svg>
    ),
  },
  {
    title: 'Telemetria contínua',
    desc: 'Publica periodicamente métricas de saúde: bateria, CPU, temperatura, RAM, sinal Wi-Fi e latência para consulta no painel.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4l2.5 2.5"/>
        <circle cx="8" cy="8" r="6"/>
      </svg>
    ),
  },
  {
    title: 'Resiliência e arranque automático',
    desc: 'Horários guardados localmente para operação offline. Serviço de sistema com reinício automático em caso de falha.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 6.5A5 5 0 1 0 8 13"/>
        <path d="M13 10v3h-3M13 13l-2-2"/>
      </svg>
    ),
  },
]

const STACK = ['Python', 'C++ / Arduino', 'Raspberry Pi', 'Firebase Admin SDK', 'Camera Module', 'GPIO', 'Embedded Linux']
export default function Robot() {
  return (
    <section id="robot" className="section robot-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)' }}>
      <SectionTag>agromotion-robot</SectionTag>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-.025em', marginBottom: 14 }}>
        Hardware que responde.
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 600, fontWeight: 300, marginBottom: 40 }}>
        O robô é um sistema embebido construído sobre Arduino e Raspberry Pi. Recebe comandos do Firebase,
        acciona os motores, monitoriza os sensores e reporta o seu estado continuamente.
      </p>

      <div className="robot-grid" style={{
        display: 'grid',
        // 'auto-fit' faz com que os cards estiquem para ocupar o espaço vazio
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1px', // Cria a linha divisória fina
        borderRadius: 14,
        overflow: 'hidden',
        background: 'var(--border-c)', // Cor da "linha" divisória
        border: '1px solid var(--border-c)',
        marginBottom: 32,
      }}>
        {FEATURES.map((f) => (
          <div key={f.title} className="robot-card" style={{
            background: 'var(--surface)',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            transition: 'background 0.2s ease',
            cursor: 'default'
          }}>
            <div style={{
              width: 42, height: 42,
              borderRadius: 10,
              background: 'color-mix(in srgb, var(--green) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--green) 20%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ width: 20, height: 20 }}>{f.icon}</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text1)', margin: 0 }}>
                {f.title}
              </h3>
              <p style={{ 
                fontSize: 14, 
                color: 'var(--text2)', 
                lineHeight: 1.6, 
                fontWeight: 300, 
                margin: 0,
                opacity: 0.9 
              }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {STACK.map((s) => (
          <span key={s} style={{
            fontSize: 10,
            textTransform: 'uppercase',
            fontFamily: 'DM Mono, monospace',
            color: 'var(--text3)',
            background: 'var(--bg2)',
            border: '1px solid var(--border-c)',
            padding: '6px 12px',
            borderRadius: 6,
            letterSpacing: '.05em',
            fontWeight: 500
          }}>{s}</span>
        ))}
      </div>
    </section>
  )
}

