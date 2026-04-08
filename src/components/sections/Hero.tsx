import React from 'react'
import { IpcaBadge } from '../ui/ipca_badge'

const META = [
  { label: 'Instituição',  value: 'Instituto Politécnico do Cávado e do Ave' },
  { label: 'Curso',         value: 'Engenharia de Sistemas Informáticos' },
  { label: 'Stack',         value: 'Flutter · Python · C++' },
  { label: 'Plataformas',   value: 'Android · iOS · Windows' },
]

const sec: React.CSSProperties = {
  minHeight: 'calc(100vh - 52px)',
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center',
  padding: '72px 40px', 
  borderBottom: '1px solid var(--border-c)',
  background: 'var(--bg2)' 
}

export default function Hero() {

  return (
    <section id="hero" className="section hero-section" style={sec}>
      <IpcaBadge />

      <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-.025em', marginBottom: 20 , marginTop: 20}}>
        Sistema automatizado<br />
        de alimentação<br />
        <em style={{ color: 'var(--green)', fontStyle: 'normal' }}>para animais.</em>
      </h1>

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text2)', maxWidth: 580, fontWeight: 300, marginBottom: 40 }}>
        O Agromotion é um ecossistema IoT desenvolvido como Projeto Final de Curso.
        Permite agendar, controlar e monitorizar remotamente um alimentador animal
        inteligente, unindo hardware embebido a uma interface multiplataforma e infraestrutura cloud.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 56 }}>
        <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--green-d)', color: '#ffffff', fontSize: 13, fontWeight: 600, padding: '11px 22px', borderRadius: 8, textDecoration: 'none' }}>
          Conhecer o projeto
        </a>
        <a href="https://github.com/Agromotion" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text2)', fontSize: 13, padding: '11px 22px', borderRadius: 8, textDecoration: 'none', border: '1px solid var(--border2-c)' }}>
          Ver no GitHub ↗
        </a>
      </div>

      <div className="hero-meta-grid" style={{ display: 'flex', flexWrap: 'wrap' as const, borderTop: '1px solid var(--border-c)', borderBottom: '1px solid var(--border-c)' }}>
        {META.map((m, i) => (
          <div key={m.label} style={{ padding: '18px 6px', flex: 1, minWidth: 140, borderRight: i < META.length - 1 ? '1px solid var(--border-c)' : 'none', paddingRight: 24 }}>
            <p style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'var(--text3)', textTransform: 'uppercase' as const, letterSpacing: '.08em', marginBottom: 6 }}>{m.label}</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)' }}>{m.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}