import { Cpu, Smartphone, Github, type LucideIcon } from 'lucide-react'

interface Repo {
  Icon: LucideIcon
  name: string
  desc: string
  url: string
}

const REPOS: Repo[] = [
  { Icon: Cpu,        name: 'agromotion-robot', desc: 'Firmware IoT · Python · Arduino · Raspberry Pi · Camera · Embedded',                    url: 'https://github.com/Agromotion/agromotion-robot' },
  { Icon: Smartphone, name: 'agromotion-app',   desc: 'Flutter · Dart · Firebase Auth · Firestore · FCM · Android · iOS · Windows',            url: 'https://github.com/Agromotion/agromotion-app' },
  { Icon: Github,     name: 'Agromotion',        desc: 'Organização GitHub · todos os repositórios do projeto',                                url: 'https://github.com/Agromotion' },
]

interface QsLine {
  cmd: string
  arg: string
}

const QS_LINES: QsLine[] = [
  { cmd: 'git clone',    arg: 'https://github.com/Agromotion/agromotion-app.git' },
  { cmd: 'flutter pub get', arg: '' },
  { cmd: 'flutter run',  arg: '-d chrome --web-port 5555 --dart-define-from-file secrets.json' },
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

function QsRow(props: QsLine) {
  return (
    <div className="flex gap-3 font-mono text-xs">
      <span className="text-green select-none">$</span>
      <span className="text-foreground">{props.cmd}</span>
      {props.arg && <span className="text-text-dim break-all">{props.arg}</span>}
    </div>
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
        Ambos os projetos estão disponíveis publicamente no GitHub, organizados sob a organização Agromotion.
      </p>

      <div className="repositories-list rounded-xl overflow-hidden border border-border divide-y divide-border mb-3">
        {REPOS.map((r) => (
          <RepoRow key={r.name} {...r} />
        ))}
      </div>

      <div className="repositories-quickstart bg-card border border-border rounded-xl overflow-hidden">
        <div className="repositories-quickstart-head flex items-center justify-between px-5 py-3.5 border-b border-border">
          <span className="text-sm font-medium">Quick start: App</span>
          <span className="text-xs font-mono text-text-dim">Flutter SDK v3.x · secrets.json necessário</span>
        </div>
        <div className="px-5 py-4 space-y-2.5">
          {QS_LINES.map((line) => (
            <QsRow key={line.cmd} cmd={line.cmd} arg={line.arg} />
          ))}
        </div>
      </div>
    </section>
  )
}