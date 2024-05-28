import clsx from 'clsx'

import AnalyzeSvg from '@site/static/img/feature-analyze.svg'
import FeatureSvg from '@site/static/img/feature-metadata.svg'
import WasmSvg from '@site/static/img/feature-wasm.svg'
import Heading from '@theme/Heading'

import styles from './styles.module.css'

interface FeatureItem {
  title: string
  Image: React.ComponentType<React.ComponentProps<'svg'>> | string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Analyze media files',
    Image: AnalyzeSvg,
    description: <>Extracts file metadata directly in the browser without server-side code.</>,
  },
  {
    title: 'Comprehensive Metadata',
    Image: FeatureSvg,
    description: (
      <>
        Get detailed metadata such as codec info, bit rate, resolution, and duration for media files
        with ease.
      </>
    ),
  },
  {
    title: 'Powered by WebAssembly',
    Image: WasmSvg,
    description: (
      <>Efficiently process media files using WebAssembly, ensuring a compact and fast solution.</>
    ),
  },
]

function Feature({ title, Image, description }: FeatureItem) {
  const img =
    typeof Image === 'string' ? (
      <img className={styles.featureImage} src={Image} alt={title} />
    ) : (
      <Image className={styles.featureImage} role="img" />
    )

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">{img}</div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
