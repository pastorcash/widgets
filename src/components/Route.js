import { useState, useEffect } from 'react'

const Route = ({ path, children }) => {
  // Add a piece of state whose sole purpose is to cause the
  // Route to re-render itself
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // This process prevents full page reloads while re-rendering the components
  // An SPA process
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', onLocationChange)

    // Cleanup in case we remove the component
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  return currentPath === path
    ? children
    : null
}

export default Route
