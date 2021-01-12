import React, { useState } from 'react'
import Dropdown from './Dropdown'
import Convert from './Convert'

// An array of objects for the dropdown component
const options = [
  {
    label: 'Afrikaans',
    value: 'af'
  },
  {
    label: 'Abrabic',
    value: 'ar'
  },
  {
    label: 'German',
    value: 'de'
  },
  {
    label: 'Greek',
    value: 'el'
  },
  {
    label: 'Hebrew',
    value: 'he'
  },
  {
    label: 'Hindi',
    value: 'hi'
  },
  {
    label: 'Spanish',
    value: 'es'
  }
]

const Translate = () => {
  const [language, setLanguage] = useState(options[0])
  const [text, setText] = useState('')

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value) }
          />
        </div>
      </div>
      <Dropdown
        label="Select a Language"
        selected={language}
        onSelectedChange={setLanguage}
        options={options}
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <Convert
        text={text}
        language={language}
      />
    </div>
  )
}

export default Translate
