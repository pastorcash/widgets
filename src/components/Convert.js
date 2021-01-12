// Google Translate API Key = AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('')
  const [debouncedText, setDebouncedText] = useState(text)

  // Set timer to update 'debounced text' and return a cleanup funciton
  // that cancels the timer if additional text is still being keyed in
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text)
    }, 500)

    // The 'return' is the "CLEANUP" portion of this lifecycle hook where we cancel
    //   the timer and then reinitialize it through the hook's normal processing.
    return () => {
      clearTimeout(timerId)
    }
  }, [text])

  // When debounced text is update, call translation API
  useEffect (() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
          }
        }
      )

      setTranslated(data.data.translations[0].translatedText)
    }

    doTranslation()
  }, [language, debouncedText])

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  )
}

export default Convert
