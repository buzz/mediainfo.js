import BrowserOnly from '@docusaurus/BrowserOnly'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import StarGazersCount from './StarGazersCount'
import styles from './styles.module.css'

function GitHubNavbarItem() {
  const { siteConfig } = useDocusaurusContext()
  const { organizationName, projectName } = siteConfig

  if (!organizationName || !projectName) {
    return null
  }

  return (
    <a
      className={clsx(styles.github, 'navbar__item', 'navbar__link')}
      href={`http://github.com/${organizationName}/${projectName}`}
      rel="noreferrer"
      target="_blank"
      title="GitHub"
    >
      <FontAwesomeIcon className="margin-right--sm" icon={faGithub} size="xl" />
      <FontAwesomeIcon icon={faStar} />
      <div>
        <BrowserOnly>
          {() => <StarGazersCount organizationName={organizationName} projectName={projectName} />}
        </BrowserOnly>
      </div>
    </a>
  )
}

export default GitHubNavbarItem
