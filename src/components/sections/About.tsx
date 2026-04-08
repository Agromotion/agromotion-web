import { AppMockup } from "../ui/appmockup"

const PILLARS = [
  { num: '01 — Hardware', title: 'Agromotion Robot', desc: 'O hardware do projeto. Um sistema embebido capaz de processar comandos remotos e executar a alimentação com precisão - motores, câmara e comunicação em tempo real com a cloud.', tags: ['Arduino', 'Raspberry Pi', 'Python', 'Câmara'], authors: ['Júlio Faria'], wide: false },
  { num: '02 — Software', title: 'Agromotion App', desc: 'A central de comando. App Flutter multiplataforma que permite agendar horários, acionar o alimentador manualmente e monitorizar o robô em tempo real a partir de qualquer dispositivo.', tags: ['Flutter', 'Firebase', 'FCM', 'Dart'], authors: ['Miguel Areal'], wide: false },
  { num: '03 — Apresentação', title: 'Agromotion Website', desc: 'A montra digital do projeto. Este portal detalha a visão, os objectivos e os resultados alcançados, e inclui um painel de telemetria que apresentará dados em tempo real directamente do Firebase quando o sistema estiver em produção.', tags: ['React', 'TypeScript', 'Firebase SDK'], authors:[ 'Júlio Faria','Miguel Areal'], wide: true },
]

const tag: React.CSSProperties = { fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', background: 'var(--bg3)', border: '1px solid var(--border-c)', padding: '3px 9px', borderRadius: 5 }
const tagGreen: React.CSSProperties = { ...tag, color: 'var(--green)', background: 'var(--green-m)', borderColor: 'rgba(61,212,74,.2)' }

export default function About() {
  return (
    <section id="about" className="section about-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)' }}>
      <SectionTag>Sobre o Projeto</SectionTag>
      
      <div className="about-layout" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 300px', // Coluna da esquerda para texto, direita para o mockup
        gap: '60px',
        alignItems: 'start'
      }}>
        
        {/* Lado Esquerdo: Texto e Cards */}
        <div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>
            Três vertentes num ecossistema.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 640, fontWeight: 300, marginBottom: 40 }}>
            Apesar de ser o mesmo ecossistema, o projeto divide-se em dois projetos finais independentes que se complementam. <br />
            Um focado no hardware e firmware, outro no software e cloud.
          </p>

          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {PILLARS.map((p) => (
              <div key={p.title} className="about-card" style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--border-c)', 
                borderRadius: 12, 
                padding: 28, 
                gridColumn: p.wide ? '1 / -1' : undefined 
              }}>
                <p style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', marginBottom: 14 }}>{p.num}</p>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text2)', fontWeight: 300, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map((t) => <span key={t} style={tag}>{t}</span>)}
                  {p.authors.map((author) => <span key={author} style={tagGreen}>{author}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Direito: Mockup (Fica fixo enquanto fazes scroll ou centralizado) */}
        <div style={{ position: 'sticky', top: '100px', display: 'flex', justifyContent: 'center' }}>
          <AppMockup />
        </div>

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