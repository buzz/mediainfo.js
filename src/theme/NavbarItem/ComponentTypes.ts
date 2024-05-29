import type { ComponentTypesObject } from '@theme/NavbarItem/ComponentTypes'

import GitHubNavbarItem from '@site/src/components/GitHubNavbarItem'
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem'
import DocNavbarItem from '@theme/NavbarItem/DocNavbarItem'
import DocSidebarNavbarItem from '@theme/NavbarItem/DocSidebarNavbarItem'
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem'
import DocsVersionNavbarItem from '@theme/NavbarItem/DocsVersionNavbarItem'
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem'
import HtmlNavbarItem from '@theme/NavbarItem/HtmlNavbarItem'
import LocaleDropdownNavbarItem from '@theme/NavbarItem/LocaleDropdownNavbarItem'
import SearchNavbarItem from '@theme/NavbarItem/SearchNavbarItem'

const ComponentTypes: ComponentTypesObject = {
  default: DefaultNavbarItem,
  localeDropdown: LocaleDropdownNavbarItem,
  search: SearchNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docsVersionDropdown: DocsVersionDropdownNavbarItem,
  'custom-gitHubNavbarItem': GitHubNavbarItem,
}

export default ComponentTypes
