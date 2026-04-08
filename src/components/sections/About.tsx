import { AppMockup } from "../ui/app_mockup"
import SectionTag from "../ui/section_tag"

const PILLARS = [
  { num: '01 — Hardware', title: 'Agromotion Robot', desc: 'O hardware do projeto. Um sistema embebido capaz de processar comandos remotos e executar a alimentação com precisão - motores, câmara e comunicação em tempo real com a cloud.', tags: ['Arduino', 'Raspberry Pi', 'Python', 'Câmara'], authors: ['Júlio Faria'], wide: false },
  { num: '02 — Software', title: 'Agromotion App', desc: 'A central de comando. App Flutter multiplataforma que permite agendar horários, acionar o alimentador manualmente e monitorizar o robô em tempo real a partir de qualquer dispositivo.', tags: ['Flutter', 'Firebase', 'FCM', 'Dart'], authors: ['Miguel Areal'], wide: false },
  { num: '03 — Apresentação', title: 'Agromotion Website', desc: 'A montra digital do projeto. Este portal detalha a visão, os objectivos e os resultados alcançados, e inclui um painel de telemetria que apresentará dados em tempo real directamente do Firebase quando o sistema estiver em produção.', tags: ['React', 'TypeScript', 'Firebase SDK'], authors: ['Júlio Faria', 'Miguel Areal'], wide: true },
]

const tag: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'DM Mono, monospace',
  color: 'var(--text3)',
  background: 'var(--bg3)',
  border: '1px solid var(--border-c)',
  padding: '3px 9px',
  borderRadius: 5,
}
const tagGreen: React.CSSProperties = {
  ...tag,
  color: 'var(--green)',
  background: 'var(--green-m)',
  borderColor: 'rgba(61,212,74,.2)',
}

export default function About() {
  return (
    <section
      id="about"
      className="section about-section"
      style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)' }}
    >
      <SectionTag>Sobre o Projeto</SectionTag>

      {/* Wrapper principal — duas colunas em desktop, uma em tablet/mobile */}
      <div
        className="about-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Coluna esquerda: texto + cards */}
        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 44px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-.02em',
              marginBottom: 16,
            }}
          >
            Três vertentes num ecossistema.
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.8,
              color: 'var(--text2)',
              maxWidth: 640,
              fontWeight: 300,
              marginBottom: 40,
            }}
          >
            Apesar de ser o mesmo ecossistema, o projeto divide-se em dois projetos finais
            independentes que se complementam. <br />
            Um focado no hardware e firmware, outro no software e cloud.
          </p>

          {/* Grid de cards — 2 colunas em ≥ 480 px, 1 coluna abaixo */}
          <div
            className="about-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 12,
            }}
          >
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="about-card"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-c)',
                  borderRadius: 12,
                  padding: 'clamp(16px, 3vw, 28px)',
                  gridColumn: p.wide ? '1 / -1' : undefined,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontFamily: 'DM Mono, monospace',
                    color: 'var(--text3)',
                    marginBottom: 14,
                  }}
                >
                  {p.num}
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{p.title}</h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'var(--text2)',
                    fontWeight: 300,
                    marginBottom: 16,
                  }}
                >
                  {p.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map((t) => <span key={t} style={tag}>{t}</span>)}
                  {p.authors.map((a) => <span key={a} style={tagGreen}>{a}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita: mockup — sticky em desktop, centrado e menor em mobile */}
        <div
          className="about-mockup-col"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'sticky',
            top: '80px',
          }}
        >
          <AppMockup />
        </div>
      </div>

      {/* Estilos responsivos injetados via <style> para não depender de ficheiro externo */}
      <style>{`
        /* Em ecrãs estreitos o mockup deixa de ser sticky e vai para cima dos cards */
        @media (max-width: 860px) {
          .about-layout {
            grid-template-columns: 1fr !important;
          }
          /* Reordena: mockup sobe para antes dos cards */
          .about-mockup-col {
            order: -1;
            position: static !important;
          }
          .about-mockup-col > * {
            max-width: 220px !important;
          }
        }

        @media (max-width: 480px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-mockup-col > * {
            max-width: 180px !important;
          }
        }
      `}</style>
    </section>
  )
}