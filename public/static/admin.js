const version = Date.now().toString(36)

if (!document.querySelector('link[href^="/static/app.css"]')) {
  const stylesheet = document.createElement('link')
  stylesheet.rel = 'stylesheet'
  stylesheet.href = `/static/app.css?v=${version}`
  document.head.appendChild(stylesheet)
}

import(`/static/app.js?v=${version}`)
