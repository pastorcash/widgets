import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  // set up a piece of state to toggle dropdown
  const[open, setOpen] = useState(false)
  const ref = useRef()

  // Manually set up a listener event to monitor for clicks outside
  // of the react component.
  // Using 'ref', determine the DOM element
  useEffect(() => {
    // Return early if the click is happening WITHIN the component.
    // (React V17+ adjustment)
    const onBodyClick = (event) => {
     if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    // Remove listener when component's visibility is toggled off
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    }
  }, []);


  const renderedOptions = options.map((option) => {
    // filter the currently selected value out of the dropdown list
    if (option.value === selected.value) {
      return null
    }
    // build the list
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    )
  })

  // build the JSX
  // includes onClick event handler to toggle drop down
  // class name are dynamically added/removed based upon a useState value
  return (
    // bind the ref to the div
    <div ref= {ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open) }
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''} `}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
