import './Search.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Search = () => {
  // Initialze state data
  const [term, setTerm] = useState('programming')
  const [debouncedTerm, setDebouncedTerm] = useState(term)
  const [results, setResults] = useState([])

  //* Lifecycle hook 'useEffect'
  // Using the 'debouncedTerm' allows us to track the users entry and delay API access by 1 sec
  // after final keystroke.
  // This will prevent unnecessary multiple/double api calls.
  useEffect(() => {
    const timerId= setTimeout(() => {
      setDebouncedTerm(term)
    }, 1000)

    // The 'return' is the "CLEANUP" portion of this lifecycle hook where we cancel
    //   the timer and then reinitialize it through the hook's normal processing.
    return () => {
      clearTimeout(timerId)
    }
  }, [term])

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
          srsearch: debouncedTerm
        }
      })
      setResults(data.query.search)
    }
    search()
  }, [debouncedTerm])

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
