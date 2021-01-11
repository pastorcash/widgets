import './Search.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Search = () => {
  // Initialze a piece of state
  const [term, setTerm] = useState('programming')
  const [results, setResults] = useState([])

  //* Use lifecycle hook 'useEffect'
  useEffect(() => {
    // Declare a helper function
    // Async/Promise is not allowed in the param brackets of useEffect
    // React.org recommends using async over promise although both will work

    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      })

      setResults(data.query.search)

    }

    // If rendered for the first time (using a default search term)
    // ... and a result has not been fetched ... (skips timeout) ...
    // (Wikipedi api doesn't like a blank search term.)
    if (term && !results.length) {
      search()
    }
    // Call the helper function after a 500ms delay of last change of input
    const timeoutId = setTimeout(() => {
      if (term) { search() }
    }, 500)

    // The 'return' is the "CLEANUP" portion of this lifecycle hook where we cancel
    //   the time and then reinitialize it through the hook's normal processing.
    // Another solution for canceling the timer would be to initialize another
    //   piece of state and then track the change
    return () => {clearTimeout(timeoutId)}

  }, [term])

  //* Map the search results into JSX
  const renderedResults = results.map((result) => {
    return (
      // Add key for the list to alleviate warning message.

      // NOTE: Wikipedi returns preformated HTML to 'highlight' matching text
      // I am using a little known command which will render the text as HTML in the JSX
      // However, this will open up the application for XSS - Cross Site Scripting attacks

      // In a production environment, additional helper functions should be written to handle
      // this issue by stripping out all HTML code and recoding it internally.
      // For purposes of this project as a "code demo" only, it should not become an issue.
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https:\\en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet}}/>
          <hr />
        </div>
      </div>

    )
  })

  return (

    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="input"
            type="text"
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
}

export default Search
