import { useEffect, useState } from 'react'

const restore = (key) => {
  const restoredJson = window.localStorage.getItem(key)
  if (restoredJson) {
    try {
      return JSON.parse(restoredJson)
    } catch (err) {
      // Reset if data is corrupted
      window.localStorage.setItem(key, JSON.stringify({}))
      return {}
    }
  }
  return {}
}

const save = (key, state) =>
  window.localStorage.setItem(key, JSON.stringify(state))

const usePersist = ({ key, onRestore = (data) => data }) => {
  const [results, setResults] = useState({})
  const [isRestored, setIsRestored] = useState(false)

  // Restore results
  useEffect(() => {
    const restored = restore(key)
    setResults(restored)
    onRestore(restored)
    setIsRestored(true)
  }, [key, onRestore, setResults])

  // Save results
  useEffect(() => {
    if (isRestored) {
      save(key, results)
    }
  }, [key, isRestored, results])

  return [results, setResults]
}

export default usePersist
