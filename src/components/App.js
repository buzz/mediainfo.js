import React from 'react'

const App = () => (
  <>
    <nav id="menu">
      <ul>
        <li />
        <li />
      </ul>
      <a href="#mediainfojs" className="pagelink active">
        mediainfo.js
      </a>
    </nav>
    <footer>
      <p>
        This is a JavaScript port of the excellent{' '}
        <a href="https://mediaarea.net/en/MediaInfo">MediaInfoLib</a>.
        mediainfo.js was created using
        <a href="https://emscripten.org/">Emscripten</a>.
      </p>
      <hr />
      <p>
        <a href="https://github.com/buzz/mediainfo.js">
          <i className="fa fa-github fa-lg fa-padded" />
          GitHub
        </a>
        <span className="pull-right">
          <i className="fa fa-copyright fa-flip-horizontal" />{' '}
          <a href="https://github.com/buzz">buzz</a> 2020
        </span>
      </p>
    </footer>
  </>
)

export default App
