// loadConfigFile typings not exported currently
// https://github.com/rollup/rollup/issues/4841

declare module 'rollup/loadConfigFile' {
  import type { MergedRollupOptions, RollupWarning } from 'rollup'

  interface BatchWarnings {
    add: (warning: RollupWarning) => void
    readonly count: number
    flush: () => void
    readonly warningOccurred: boolean
  }

  function loadConfigFile(
    fileName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    commandOptions?: any
  ): Promise<{
    options: MergedRollupOptions[]
    warnings: BatchWarnings
  }>

  export { loadConfigFile }
}
