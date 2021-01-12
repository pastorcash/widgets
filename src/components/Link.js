import React from 'react'

const Link = ({className, href, children}) => {
  const onClick = (event) => {
    // Add in the cmd/ctrl click function which opens the page in a new window
    if (event.metaKey || event.ctrlKey) {
      return
    }

    // Prevent a full auto page refresh
    event.preventDefault();
    // Change to the correct URL
    window.history.pushState({}, '', href)

    // Produce and emit a navigation event
    // Communicate that the URL has changed
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  return <a
            onClick={onClick}
            className={className}
            href={href}
          >
            {children}
          </a>
}

export default Link
