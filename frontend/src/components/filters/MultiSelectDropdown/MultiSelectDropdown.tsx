import { useEffect, useRef, useState } from 'react'
import './MultiSelectDropdown.css'

type MultiSelectDropdownProps = {
  label: string
  options: string[]
  selected: string[]
  onChange: (values: string[]) => void
}

export function MultiSelectDropdown({ label, options, selected, onChange }: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggle = (value: string) => {
    onChange(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value])
  }

  const summary = selected.length === 0 ? 'All' : selected.length === 1 ? selected[0] : `${selected.length} selected`

  return (
    <div className="msd" ref={ref}>
      <button className="msd-trigger" onClick={() => setOpen(o => !o)}>
        {label}: {summary} ▾
      </button>
      {open && (
        <div className="msd-panel">
          {options.map(opt => (
            <label key={opt} className="msd-option">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
