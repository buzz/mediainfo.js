import MediaInfoEnvironment from './jest/environment'

declare global {
  const analyzeFile: (typeof MediaInfoEnvironment)['analyzeFile']
}
