import React, { useState } from 'react'

// Component written as a function component
// to demonstrate use of the hook system

const Accordion = ({ items }) => {
  // Initialise a new piece of state (using a "primitive" hook)
  // This is accomplished by using array destructuring
  // 'activeIndex' is the piece of state
  // 'setActiveIndex' is the function to change the piece of state (setter)
  const [activeIndex, setActiveIndex] = useState(null)

  // *** Helper function ****
  const onTitleClick = (index) => {
    // Update the state & trigger a re-render
    setActiveIndex(index)
  }

  // Main function activity
  const renderedItems = items.map((item, index) => {
    // Determine 'selected item' to create 'accordion' effect
    const active = index === activeIndex ? 'active' : ''

    return (
      // React Fragment used to prevent double border from Semantic UI
      <React.Fragment key={item.title}>
        <div
          className={`title  ${active}`}
          onClick={()=> onTitleClick(index)}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    )
  })

  return <div className="ui styled accordion">
    {renderedItems}
  </div>
}
export default Accordion
