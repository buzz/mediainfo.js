import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'

import HomepageFeatures from '@site/src/components/HomepageFeatures'
import LogoSvg from '@site/static/img/logo.svg'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row row--align-center">
          <div className={clsx('col', 'col--3', 'text--right', styles.heroLogoCol)}>
            <LogoSvg className={styles.heroLogo} />
          </div>
          <div className={clsx('col', 'col--9', 'text--left', styles.heroHeadingCol)}>
            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              {siteConfig.title}
            </Heading>
            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/category/getting-started"
              >
                ⚡ Getting Started
              </Link>
              <Link className="button button--primary button--lg" to="/demo">
                🚀 Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
