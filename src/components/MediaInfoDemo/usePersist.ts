import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { isResults, type Results } from './Result/Result'

const EMPTY_RESULTS = {}

const restore = (key: string): Results => {
  const restoredJson = window.localStorage.getItem(key)
  if (restoredJson) {
    try {
      const results: unknown = JSON.parse(restoredJson)
      if (isResults(results)) {
        return results
      }
    } catch {
      // Reset if data is corrupted
      window.localStorage.setItem(key, JSON.stringify(EMPTY_RESULTS))
    }
  }

  return EMPTY_RESULTS
}

const save = (key: string, state: Results) => {
  window.localStorage.setItem(key, JSON.stringify(state))
}

const usePersist = (key: string): [Results, Dispatch<SetStateAction<Results | undefined>>] => {
  const [results, setResults] = useState<Results | undefined>()

  // Restore results
  useEffect(() => {
    setResults(restore(key))
  }, [key, setResults])

  // Save results
  useEffect(() => {
    if (results !== undefined) {
      save(key, results)
    }
  }, [key, results])

  return [results ?? EMPTY_RESULTS, setResults]
}

export default usePersist
