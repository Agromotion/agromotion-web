import { useTelemetry } from '@/providers/telemetry-provider'
import SectionTag from '../ui/SectionTag'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts'

const PERIODS = ['Ao vivo', '24H', '7 dias', '30 dias']

const METRICS_CONFIG = [
  {
    key: 'battery',
    label: 'Bateria',
    unit: '%',
    color: 'var(--green)',
    colorRaw: '#4ade80',
    size: 'large',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <rect x="6" y="6" width="11" height="14" rx="2.5" />
        <path d="M9 6V4.5a1.5 1.5 0 013 0V6" />
        <line x1="9" y1="13" x2="12" y2="13" />
        <line x1="10.5" y1="11.5" x2="10.5" y2="14.5" />
      </svg>
    ),
  },
  {
    key: 'cpu',
    label: 'CPU',
    unit: '%',
    color: 'var(--foreground)',
    colorRaw: '#e2e8f0',
    size: 'normal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2m16-6h2m-2 6h2" />
      </svg>
    ),
  },
  {
    key: 'temp',
    label: 'Temperatura',
    unit: '°C',
    color: 'var(--amber)',
    colorRaw: '#fbbf24',
    size: 'normal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
      </svg>
    ),
  },
  {
    key: 'ram',
    label: 'RAM',
    unit: '%',
    color: 'var(--foreground)',
    colorRaw: '#e2e8f0',
    size: 'normal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <rect x="2" y="8" width="20" height="10" rx="2" />
        <path d="M6 8V6m4 2V6m4 2V6m4 2V6M6 18v2m4-2v2m4-2v2m4-2v2M2 12h20" />
      </svg>
    ),
  },
  {
    key: 'wifi',
    label: 'Ligação',
    unit: '',
    color: 'var(--green)',
    colorRaw: '#4ade80',
    size: 'normal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.59 16.11a5.5 5.5 0 016.82 0M12 20h.01" />
      </svg>
    ),
  },
  {
    key: 'latency',
    label: 'Viewers',
    unit: '',
    color: 'var(--foreground)',
    colorRaw: '#e2e8f0',
    size: 'large',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

// Custom tooltip for recharts
const CustomTooltip = ({ active, payload, unit }: { active?: boolean; payload?: { value: number }[]; unit?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border-c)',
        borderRadius: 6,
        padding: '4px 10px',
        fontSize: 11,
        fontFamily: 'DM Mono, monospace',
        color: 'var(--foreground)',
        letterSpacing: '0.05em',
      }}>
        {payload[0].value.toFixed(1)}{unit}
      </div>
    )
  }
  return null
}

// Status pill component
function StatusPill({ online }: { online: boolean; color: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 8px',
      borderRadius: 999,
      background: online ? 'color-mix(in srgb, var(--green) 10%, transparent)' : 'color-mix(in srgb, var(--text3) 10%, transparent)',
      border: `1px solid ${online ? 'color-mix(in srgb, var(--green) 25%, transparent)' : 'color-mix(in srgb, var(--text3) 25%, transparent)'}`,
    }}>
      <span style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: online ? 'var(--green)' : 'var(--text3)',
        boxShadow: online ? '0 0 6px var(--green)' : 'none',
        animation: online ? 'pulse 2s ease-in-out infinite' : 'none',
      }} />
      <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: online ? 'var(--green)' : 'var(--text3)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {online ? 'live' : 'offline'}
      </span>
    </div>
  )
}

export default function Telemetry() {
  const { live, history, loading, period, setPeriod } = useTelemetry()

  const getMetricDisplay = (key: string) => {
    if (!live) return { value: '—', subtext: 'Offline' }
    switch (key) {
      case 'battery': return { value: `${live.battery_percentage}`, subtext: live.battery_is_charging ? 'A carregar' : 'Não está a carregar' }
      case 'cpu': return { value: `${live.system_cpu}`, subtext: 'Carga de Processamento' }
      case 'temp': return { value: `${live.system_temperature.toFixed(1)}`, subtext: 'Temperatura de Sistema' }
      case 'ram': return { value: `${live.system_ram}`, subtext: 'Memória em Uso' }
      case 'wifi': return { value: 'OK', subtext: 'Conectividade 2.4GHz' }
      case 'latency': return { value: `${live.video_client_count}`, subtext: 'Visualizadores Atuais' }
      default: return { value: '—', subtext: 'Desconhecido' }
    }
  }

  const getHistoryData = (key: string) => {
    return history.map((h, i) => {
      const raw = h[
        key === 'battery' ? 'battery_percentage' :
        key === 'cpu' ? 'system_cpu' :
        key === 'temp' ? 'system_temperature' :
        'system_ram'
      ]
      return { i, value: typeof raw === 'number' ? raw : 0 }
    })
  }

  // Stat bar at top — system-wide summary
  const systemOk = !!live && !loading

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .telemetry-card {
          animation: fadeSlideUp 0.4s ease both;
        }
        .telemetry-card:hover {
          border-color: color-mix(in srgb, var(--border-c) 60%, var(--green)) !important;
          transform: translateY(-1px);
          transition: border-color 0.2s, transform 0.2s;
        }
        .period-btn:hover {
          color: var(--foreground) !important;
        }
      `}</style>

      <section id="telemetry" style={{
        padding: '100px 40px 120px',
        background: 'var(--background)',
        borderBottom: '1px solid var(--border-c)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Background grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        {/* Header row */}
        <div style={{ position: 'relative', marginBottom: 56 }}>
          <SectionTag>Telemetria</SectionTag>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 24,
            marginTop: 20,
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: 10,
              }}>
                {loading ? 'A carregar...' : 'Diagnóstico de Sistema'}
              </h2>
              <p style={{ color: 'var(--text2)', fontWeight: 300, fontSize: 15, maxWidth: 400 }}>
                Métricas de saúde e performance do hardware em tempo real.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
              <StatusPill online={systemOk} color="var(--green)" />
              {/* Period selector */}
              <div style={{
                display: 'flex',
                background: 'var(--bg2)',
                padding: 3,
                borderRadius: 10,
                border: '1px solid var(--border-c)',
                gap: 2,
              }}>
                {PERIODS.map(p => (
                  <button
                    key={p}
                    className="period-btn"
                    onClick={() => setPeriod(p)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: 7,
                      border: 'none',
                      cursor: 'pointer',
                      background: period === p ? 'var(--surface)' : 'transparent',
                      color: period === p ? 'var(--green)' : 'var(--text3)',
                      fontSize: 12,
                      fontFamily: 'DM Mono, monospace',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      transition: 'all 0.15s',
                      boxShadow: period === p ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 14,
          position: 'relative',
        }}>
          {METRICS_CONFIG.map((m, idx) => {
            const display = getMetricDisplay(m.key)
            const histData = getHistoryData(m.key)
            const isLarge = m.size === 'large'
            const unit = m.unit

            // Determine which metrics show a graph vs just a value
            const hasGraph = ['battery', 'cpu', 'temp', 'ram'].includes(m.key)
            const isOnline = !!live && !loading

            // Staggered animation delay
            const delay = `${idx * 0.06}s`

            return (
              <div
                key={m.key}
                className="telemetry-card"
                style={{
                  animationDelay: delay,
                  gridColumn: isLarge ? 'span 4' : 'span 3',
                  background: 'var(--surface)',
                  border: '1px solid var(--border-c)',
                  borderRadius: 16,
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'default',
                  minHeight: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle top accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 24, right: 24,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${m.colorRaw}44, transparent)`,
                  borderRadius: 1,
                }} />

                {/* Card header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    color: 'var(--text3)',
                  }}>
                    <span style={{ color: m.color, opacity: 0.8 }}>{m.icon}</span>
                    <span style={{
                      fontSize: 11,
                      fontFamily: 'DM Mono, monospace',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}>
                      {m.label}
                    </span>
                  </div>

                  {/* Live dot */}
                  {isOnline && (
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: m.color,
                      boxShadow: `0 0 10px ${m.colorRaw}`,
                      flexShrink: 0,
                      animation: 'pulse 2.5s ease-in-out infinite',
                      animationDelay: `${idx * 0.3}s`,
                    }} />
                  )}
                </div>

                {/* Value display */}
                <div style={{ marginBottom: hasGraph ? 20 : 0, flex: hasGraph ? 0 : 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, lineHeight: 1 }}>
                    <span style={{
                      fontSize: isLarge ? 52 : 42,
                      fontWeight: 700,
                      fontFamily: 'DM Mono, monospace',
                      letterSpacing: '-0.03em',
                      color: 'var(--foreground)',
                      lineHeight: 1,
                    }}>
                      {display.value}
                    </span>
                    {unit && (
                      <span style={{
                        fontSize: 16,
                        fontFamily: 'DM Mono, monospace',
                        color: 'var(--text3)',
                        fontWeight: 400,
                        paddingBottom: 4,
                      }}>
                        {unit}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 12,
                    color: 'var(--text3)',
                    marginTop: 6,
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                  }}>
                    {display.subtext}
                  </p>
                </div>

                {/* Chart area */}
                {hasGraph && (
                  <div style={{ marginTop: 'auto', height: 70, marginLeft: -4 }}>
                    {histData.length > 1 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={histData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`grad-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={m.colorRaw} stopOpacity={0.25} />
                              <stop offset="100%" stopColor={m.colorRaw} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <YAxis domain={['auto', 'auto']} hide />
                          <Tooltip
                            content={<CustomTooltip unit={m.unit} />}
                            cursor={{ stroke: m.colorRaw, strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.5 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={m.colorRaw}
                            strokeWidth={1.5}
                            fill={`url(#grad-${m.key})`}
                            dot={false}
                            activeDot={{ r: 3, fill: m.colorRaw, strokeWidth: 0 }}
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 4,
                        fontSize: 11,
                        fontFamily: 'DM Mono, monospace',
                        color: 'var(--text3)',
                        letterSpacing: '0.08em',
                      }}>
                        A aguardar dados...
                      </div>
                    )}
                  </div>
                )}

                {/* For wifi/viewers — show a different visual treatment */}
                {!hasGraph && (
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: 16,
                    borderTop: '1px solid var(--border-c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontSize: 10,
                      fontFamily: 'DM Mono, monospace',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text3)',
                    }}>
                      {m.key === 'wifi' ? 'STATUS' : 'CONTAGEM'}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontFamily: 'DM Mono, monospace',
                      color: m.color,
                      letterSpacing: '0.08em',
                    }}>
                      {m.key === 'wifi' ? '2.4GHz · ESTÁVEL' : `↑ ${live?.video_client_count ?? 0} online`}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 32,
          position: 'relative',
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-c)' }} />
          <span style={{
            fontSize: 10,
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
            whiteSpace: 'nowrap',
          }}>
            Intervalo de actualização · 5s
          </span>
        </div>
      </section>
    </>
  )
}