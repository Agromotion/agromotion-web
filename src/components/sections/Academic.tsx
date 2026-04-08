import SectionTag from "../ui/section_tag"

const ITEMS = [
  { label: 'Instituição',        value: 'IPCA',                                sub: 'Instituto Politécnico do Cávado e do Ave' },
  { label: 'Curso',              value: 'Engenharia de Sistemas Informáticos',  sub: 'Regime Pós-Laboral' },
  { label: 'Unidade Curricular', value: 'Projeto Final de Curso',              sub: 'Avaliação anual' },
  { label: 'Ano Letivo',        value: '2025–2026',                            sub: 'Em desenvolvimento' },
]

export default function Academic() {
  return (
    <section id="academic" className="section academic-section" style={{ padding: '72px 40px', borderBottom: '1px solid var(--border-c)', background: 'var(--bg2)' }}>
      <SectionTag>Contexto Académico</SectionTag>
      <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>Projeto Final de Curso.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 640, fontWeight: 300, marginBottom: 40 }}>
        O Agromotion foi desenvolvido no âmbito da Unidade Curricular de Projecto Final de Curso da Licenciatura em Engenharia de Sistemas Informáticos do IPCA.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {ITEMS.map((item) => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border-c)', borderRadius: 12, padding: 24 }}>
            <p style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 8 }}>{item.label}</p>
            <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{item.value}</p>
            <p style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 300, marginTop: 3 }}>{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
