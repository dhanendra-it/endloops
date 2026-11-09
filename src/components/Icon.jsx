import { FileText, GitCompare, ListChecks, Layers, Files } from 'lucide-react'

const ICONS = { doc: FileText, compare: GitCompare, check: ListChecks, layers: Layers, stack: Files }

// Full class strings so Tailwind can see them at build time.
export const TONES = {
  green: { chip: 'bg-green/12 text-green-deep', bar: 'bg-green', text: 'text-green-deep', ring: 'ring-green/40' },
  teal: { chip: 'bg-teal/12 text-teal-deep', bar: 'bg-teal', text: 'text-teal-deep', ring: 'ring-teal/40' },
  blue: { chip: 'bg-blue/12 text-blue-deep', bar: 'bg-blue', text: 'text-blue-deep', ring: 'ring-blue/40' },
  purple: { chip: 'bg-purple/12 text-purple-deep', bar: 'bg-purple', text: 'text-purple-deep', ring: 'ring-purple/40' },
}

export function IconChip({ name, tone = 'green', size = 20 }) {
  const I = ICONS[name] || FileText
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${TONES[tone].chip}`}>
      <I size={size} aria-hidden />
    </span>
  )
}
