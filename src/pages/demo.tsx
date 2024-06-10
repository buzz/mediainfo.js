import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import MediaInfoDemo from '@site/src/components/MediaInfoDemo'
import Layout from '@theme/Layout'

export default function Demo(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title="Demo" description={siteConfig.tagline}>
      <main>
        <MediaInfoDemo />
      </main>
    </Layout>
  )
}