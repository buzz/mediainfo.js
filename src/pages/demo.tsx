import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import Layout from '@theme/Layout'

import MediaInfoDemo from '../components/MediaInfoDemo'

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
