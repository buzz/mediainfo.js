import { useEffect, useState } from 'react'

import { isObject } from '@site/src/utils'

const CACHE_KEY = 'stargazers_count'
const CACHE_TIME_KEY = 'stargazers_cache_time'
const ONE_HOUR = 60 * 60 * 1000 // 1h

const apiUrl = (owner: string, repo: string) => `https://api.github.com/repos/${owner}/${repo}`

const isValidResponse = (thing: unknown): thing is RepoInfo =>
  isObject(thing) && typeof thing.stargazers_count === 'number'

function StarGazersCount({ organizationName, projectName }: StarGazersCountProps) {
  const [stargazersCount, setStargazersCount] = useState<number | null>(null)

  useEffect(() => {
    const cachedCountStr = localStorage.getItem(CACHE_KEY)
    const cachedTimeStr = localStorage.getItem(CACHE_TIME_KEY)

    const cachedCount = cachedCountStr ? Number.parseInt(cachedCountStr) : null
    const cachedTime = cachedTimeStr ? Number.parseInt(cachedTimeStr) : null

    if (cachedCount && cachedTime && Date.now() - cachedTime < ONE_HOUR) {
      setStargazersCount(cachedCount)
    } else {
      const fetchStargazers = async () => {
        const response = await fetch(apiUrl(organizationName, projectName))
        const data: unknown = await response.json()
        if (isValidResponse(data)) {
          setStargazersCount(data.stargazers_count)
          localStorage.setItem(CACHE_KEY, data.stargazers_count.toString())
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())
        }
      }

      fetchStargazers().catch((error: unknown) => {
        console.error('Failed to fetch stargazers:', error)
      })
    }
  }, [organizationName, projectName])

  return <>{stargazersCount ?? ''}</>
}

interface StarGazersCountProps {
  organizationName: string
  projectName: string
}

interface RepoInfo {
  stargazers_count: number
}

export default StarGazersCount
