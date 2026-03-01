import { useState, useEffect } from 'react'

type GeoapifyFeature = {
  type: 'Feature'
  properties: GeoapifyProperties
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
  bbox: [number, number, number, number]
}

type GeoapifyProperties = {
  place_id: string
  formatted: string
  address_line1: string
  address_line2: string
  category: string
  country: string
  country_code: string
  rank: {
    importance: number
    confidence: number
    match_type: 'full_match' | 'partial_match' | 'inner_part'
  }
  timezone: {
    name: string
    offset_STD: string
    abbreviation_STD: string
  }
}

export const usePlacesSearch = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    const timeoutId = setTimeout(() => {
      setLoading(true)
      fetch('http://localhost:3001/api/places/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch places')
          return res.json()
        })
        .then((result) => setSuggestions(result.features))
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const search = (q: string) => {
    setQuery(q)
  }

  const clear = () => {
    setQuery('')
    setSuggestions([])
    setLoading(false)
  }

  return { query, suggestions, loading, search, clear }
}
