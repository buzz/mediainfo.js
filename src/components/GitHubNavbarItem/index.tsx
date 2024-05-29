import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import styles from './styles.module.css'

function GitHubNavbarItem() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <iframe
      className={styles.githubStarButton}
      src={`https://ghbtns.com/github-btn.html?user=${siteConfig.organizationName}&repo=${siteConfig.projectName}&type=star&count=true&size=large`}
      width="170"
      height="30"
      title="GitHub"
    ></iframe>
  )
}

export default GitHubNavbarItem
