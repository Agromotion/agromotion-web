import { useTelemetry } from '@/providers/telemetry-provider'
import { AreaChart, Area, ResponsiveContainer, Tooltip,  XAxis } from 'recharts'
import SectionTag from '../ui/section_tag'

export default function Telemetry() {
  const { live, history, loading, period, setPeriod } = useTelemetry()
  const systemOk = !!live && !loading

  // Função para formatar a data do Firebase para o Gráfico
  const formatXAxis = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate()
    
    if (period === 'Ao vivo') {
      return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' })
  }

  const METRICS = [
    {
      id: 'battery',
      key: 'battery_percentage',
      label: 'Bateria',
      unit: '%',
      color: live?.battery_is_charging ? 'var(--green)' : 'var(--text3)',
      icon: '⚡',
      val: live?.battery_percentage ?? '—',
      sub: live?.battery_is_charging ? 'A carregar' : 'A descarregar'
    },
    {
      id: 'cpu',
      key: 'system_cpu',
      label: 'CPU',
      unit: '%',
      color: 'var(--foreground)',
      icon: '⚙️',
      val: live?.system_cpu ?? '—',
      sub: 'Utilização total'
    },
    {
      id: 'temp',
      key: 'system_temperature',
      label: 'Temperatura',
      unit: '°C',
      color: 'var(--amber)',
      icon: '🌡️',
      val: live?.system_temperature?.toFixed(1) ?? '—',
      sub: 'Sensor de sistema'
    },
    {
      id: 'ram',
      key: 'system_ram',
      label: 'RAM',
      unit: '%',
      color: 'var(--foreground)',
      icon: '📊',
      val: live?.system_ram ?? '—',
      sub: 'Memória em uso'
    }
  ]

  return (
    <section id="telemetry" className="py-20 px-6 border-b border-border bg-background relative">
      <div className="max-w-7xl mx-auto">
        <SectionTag>Telemetria</SectionTag>
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter text-foreground">Diagnóstico</h2>
            <p className="text-text3 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">
              {systemOk ? '● Sistema Online' : '○ Sistema Offline'}
            </p>
          </div>

          <div className="flex bg-bg2 p-1 rounded-xl border border-border shadow-sm">
            {['Ao vivo', '24H', '7 dias', '30 dias'].map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-medium transition-all ${period === p ? 'bg-surface text-green shadow-sm' : 'text-text3 hover:text-foreground'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <div key={m.id} className="bg-surface border border-border rounded-2xl p-5 hover:border-green/30 transition-colors group">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[16px] font-mono text-text3 uppercase tracking-wider flex items-center gap-2">
                  <span style={{ color: m.color }}>{m.icon}</span> {m.label}
                </span> 
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-bold tracking-tighter text-foreground">{m.val}</span>
                  <span className="text-sm text-text3">{m.unit}</span>
                </div>
                <p className="text-[10px] text-text2 mt-1 font-medium">{m.sub}</p>
              </div>

              {/* Gráfico com Eixo de Data/Hora */}
              <div className="h-20 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history.map(h => ({
                    val: h[m.key] || 0,
                    time: formatXAxis(h.timestamp)
                  }))}>
                    <XAxis 
                      dataKey="time" 
                      hide={false} 
                      axisLine={false} 
                      tickLine={false} 
                      minTickGap={30}
                      tick={{ fill: 'var(--text3)', fontSize: 9, fontFamily: 'var(--font-mono)' }}
                    />
                    <Tooltip 
                      content={({ active, payload }) => (
                        active && payload?.length ? (
                          <div className="bg-bg2 border border-border px-2 py-1 rounded shadow-xl">
                            <p className="text-[10px] font-mono text-foreground font-bold">{payload[0].value}{m.unit}</p>
                            <p className="text-[8px] font-mono text-text3">{payload[0].payload.time}</p>
                          </div>
                        ) : null
                      )}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="val" 
                      stroke={m.color} 
                      fill={m.color} 
                      fillOpacity={0.05} 
                      strokeWidth={2} 
                      dot={false}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}