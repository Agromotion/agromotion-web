import { Cpu, Smartphone, Github, type LucideIcon, Globe } from 'lucide-react'

interface Repo {
  Icon: LucideIcon
  name: string
  desc: string
  url: string
}

const REPOS: Repo[] = [
  { Icon: Cpu,        name: 'agromotion-robot', desc: 'Firmware do robô.', url: 'https://github.com/Agromotion/agromotion-robot' },
  { Icon: Smartphone, name: 'agromotion-app', desc: 'Aplicação de controlo.', url: 'https://github.com/Agromotion/agromotion-app' },
  { Icon: Globe, name: 'agromotion.github.io', desc: 'Website informativo.', url: 'https://github.com/Agromotion/agromotion.github.io' },  
  { Icon: Github,     name: 'Agromotion', desc: 'Organização GitHub · Todos os repositórios do projeto', url: 'https://github.com/Agromotion' },
]

function RepoRow(props: Repo) {
  return (
    <a href={props.url} target="_blank" rel="noreferrer" className="repo-row flex items-center gap-4 px-6 py-5 bg-card hover:bg-surface transition-colors group">
      <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
        <props.Icon size={15} className="text-text-muted" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-mono font-semibold mb-1">{props.name}</p>
        <p className="text-xs text-text-muted">{props.desc}</p>
      </div>
      <span className="text-text-dim group-hover:text-green transition-colors">↗</span>
    </a>
  )
}

export default function Repositories() {
  return (
    <section id="repositories" className="section repositories-section px-10 py-20 border-b border-border">
      <p className="flex items-center gap-2 text-xs font-mono text-green mb-5 before:content-[''] before:w-4 before:h-px before:bg-green">
        Repositórios
      </p>
      <h2 className="text-4xl font-semibold tracking-tight mb-3">Código aberto.</h2>
      <p className="text-base text-text-muted font-light leading-relaxed max-w-150 mb-10">
        Todos os projetos estão disponíveis publicamente no GitHub, sob a organização Agromotion.
      </p>

      <div className="repositories-list rounded-xl overflow-hidden border border-border divide-y divide-border mb-3">
        {REPOS.map((r) => (
          <RepoRow key={r.name} {...r} />
        ))}
      </div>
    </section>
  )
}