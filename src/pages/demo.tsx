import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import type { ReactElement } from 'react'

import MediaInfoDemo from '@site/src/components/MediaInfoDemo'
import Layout from '@theme/Layout'

export default function Demo(): ReactElement {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title="Demo" description={siteConfig.tagline}>
      <main>
        <MediaInfoDemo />
      </main>
    </Layout>
  )
}
