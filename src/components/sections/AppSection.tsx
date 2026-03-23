const FEATURES = [
  { num: '01', title: 'Dashboard e controlo manual',  badge: 'Home',         desc: 'Estado do robô em tempo real, com acesso rápido ao nível de bateria e ao mapa de localização.' },
  { num: '02', title: 'Agendamento de horários',      badge: 'Agenda',       desc: 'Criar horários recorrentes com seleção de dias da semana. Ativar e desativar sem apagar, sincronização instantânea com o robô e outros utilizadores.' },
  { num: '03', title: 'Painel de telemetria',         badge: 'Estatísticas', desc: 'Bateria, CPU, temperatura, memória, sinal Wi-Fi, latência e carga do motor, filtráveis por período.' },
  { num: '04', title: 'Gestão de utilizadores',       badge: 'Definições',   desc: 'Autorizar ou revogar acesso de outros utilizadores por email. Lista de administradores ativos gerida via Firebase Authentication.' },
  { num: '05', title: 'Notificações push',            badge: 'FCM',          desc: 'Alertas via Firebase Cloud Messaging: alimentação concluída, bateria baixa, perda de conectividade.' },
]

const STACK = ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Messaging', 'Android', 'iOS', 'Windows']

export default function AppSection() {
  return (
    <section id="app" className="section app-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)', background: 'var(--bg2)' }}>
      <SectionTag>agromotion-app</SectionTag>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>Uma app. Várias plataformas.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 640, fontWeight: 300, marginBottom: 40 }}>
        Desenvolvida em Flutter para funcionar nativamente em Android, iOS e Windows a partir de uma única codebase. Toda a comunicação com o robô passa pelo Firebase.
      </p>

      <div className="app-features" style={{ background: 'var(--border-c)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, gap: 1, marginBottom: 20 }}>
        {FEATURES.map((f) => (
          <div key={f.num} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: 'var(--surface)' }}>
            <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', minWidth: 24, flexShrink: 0 }}>{f.num}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{f.title}</p>
              <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55, fontWeight: 300 }}>{f.desc}</p>
            </div>
            <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', background: 'var(--bg3)', border: '1px solid var(--border-c)', padding: '3px 9px', borderRadius: 5, whiteSpace: 'nowrap' as const }}>{f.badge}</span>
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