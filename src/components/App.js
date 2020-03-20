import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faCopyright } from '@fortawesome/free-regular-svg-icons'
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons'

import About from './About'
import MediaInfoJs from './MediaInfoJs'

const App = () => {
  const [page, setPage] = useState('mediainfojs')
  const onClickMediaInfoJs = useCallback(() => setPage('mediainfojs'), [])
  const onClickAbout = useCallback(() => setPage('about'), [])

  return (
    <>
      <nav id="menu">
        <ul>
          <li>
            <a
              href="#mediainfojs"
              className={classNames('pagelink', {
                active: page === 'mediainfojs',
              })}
              onClick={onClickMediaInfoJs}
            >
              <FontAwesomeIcon className="fa-padded" icon={faPhotoVideo} />
              mediainfo.js
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={classNames('pagelink', {
                active: page === 'about',
              })}
              onClick={onClickAbout}
            >
              <FontAwesomeIcon className="fa-padded" icon={faAddressCard} />
              about
            </a>
          </li>
        </ul>
        <hr />
      </nav>
      <MediaInfoJs
        className={classNames({ 'page-hidden': page === 'about' })}
      />
      <About
        className={classNames({ 'page-hidden': page === 'mediainfojs' })}
      />
      <footer>
        <p>
          This is a JavaScript port of the excellent{' '}
          <a href="https://mediaarea.net/en/MediaInfo">MediaInfoLib</a>.
          mediainfo.js was created using{' '}
          <a href="https://emscripten.org/">Emscripten</a>.
        </p>
        <hr />
        <p>
          <a href="https://github.com/buzz/mediainfo.js">
            <FontAwesomeIcon className="fa-padded" icon={faGithub} size="lg" />
            GitHub
          </a>
          <span className="pull-right">
            <FontAwesomeIcon flip="horizontal" icon={faCopyright} />{' '}
            <a href="https://github.com/buzz">buzz</a> 2020
          </span>
        </p>
      </footer>
    </>
  )
}

export default App
