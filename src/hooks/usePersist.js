import { useEffect } from 'react'

const restore = (key) => {
  const restoredJson = window.localStorage.getItem(key)
  if (restoredJson) {
    try {
      return JSON.parse(restoredJson)
    } catch {
      // Reset if data is corrupted
      window.localStorage.setItem(key, JSON.stringify({}))
      return {}
    }
  }
  return {}
}

const save = (key, state) =>
  window.localStorage.setItem(key, JSON.stringify(state))

const usePersist = ({ key, onRestore = (data) => data, setState, state }) => {
  useEffect(() => {
    setState(onRestore(restore(key)))
  }, [key, onRestore, setState])
  useEffect(() => {
    save(key, state)
  }, [key, state])
}

export default usePersist
