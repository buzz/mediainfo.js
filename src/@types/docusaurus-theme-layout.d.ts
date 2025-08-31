declare module '@theme/Layout' {
  import type { ReactNode } from 'react'

  export interface Props {
    readonly title?: string
    readonly description?: string
    readonly children?: ReactNode
  }

  export default function Layout(props: Props): ReactNode
}
