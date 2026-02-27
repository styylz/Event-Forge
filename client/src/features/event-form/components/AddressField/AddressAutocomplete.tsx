import { useState, useRef, useEffect } from 'react'
import { usePlacesSearch } from '../../../../hooks'
import { Spinner, CheckCircle, PinIcon } from '../../../../components/atoms'

type AddressAutocompleteProps = {
  onChange: (value: string) => void
  hasError: boolean
  isValid: boolean
}

export function AddressAutocomplete({ onChange, hasError, isValid }: AddressAutocompleteProps) {
  const { query, suggestions, loading, search, clear } = usePlacesSearch()
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleConfirm = (suggestion: string) => {
    setInputValue(suggestion)
    setOpen(false)
    setHoveredIndex(-1)
    clear()
    onChange(suggestion)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    search(value)
    setOpen(value.length >= 2)

    if (value.length > 0) {
      onChange('')
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const inputState = hasError
    ? 'state-error'
    : isValid && inputValue
      ? 'state-valid'
      : 'state-neutral'

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <PinIcon color={isValid ? '#4ade80' : '#475569'} />
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Search venues & addresses…"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`inp ${inputState}`}
          style={{ paddingLeft: 38, paddingRight: 40 }}
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {loading ? <Spinner /> : isValid && inputValue ? <CheckCircle /> : null}
        </span>
      </div>
      {open && (
        <ul
          role="listbox"
          className="anim-drop-down absolute top-full left-0 right-0 mt-2 rounded-xl overflow-auto z-[9999] py-1.5"
          style={{
            background: '#0a1018',
            border: '1px solid #1e2d3d',
            maxHeight: 260,
            boxShadow: '0 16px 60px rgba(0,0,0,.7)',
          }}
        >
          {loading && suggestions.length === 0 && (
            <li className="flex items-center gap-3 px-4 py-3 text-slate-500 text-sm">
              <Spinner /> Searching places…
            </li>
          )}
          {!loading && suggestions.length === 0 && (
            <li className="px-4 py-3 text-slate-500 text-sm">
              No results for "<span className="text-slate-300 font-medium">{query}</span>"
            </li>
          )}
          {suggestions.map((place, i) => (
            <li
              key={place.properties.place_id}
              role="option"
              aria-selected={i === hoveredIndex}
              className="flex items-start gap-2.5 px-4 py-3 cursor-pointer text-sm transition-colors"
              style={{
                color: i === hoveredIndex ? '#f1f5f9' : '#64748b',
                background: i === hoveredIndex ? 'rgba(245,158,11,.09)' : 'transparent',
                borderLeft: `2px solid ${i === hoveredIndex ? '#f59e0b' : 'transparent'}`,
              }}
              onMouseDown={() => handleConfirm(place.properties.formatted)}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <span className="mt-0.5">
                <PinIcon color={i === hoveredIndex ? '#f59e0b' : '#475569'} />
              </span>
              <span className="leading-relaxed">{place.properties.formatted}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
