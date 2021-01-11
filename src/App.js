import React from 'react'
import Accordion from './components/Accordion'
import Search from './components/Search'

// An internal array of objects that simulates external data
const items = [
  {
    title: 'What is React?',
    content: 'React is a front end javascript framework.'
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite JS library among engineers.'
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components.'
  }
]

// temp function to not show prev developed components
// until routing is wired up.
function ShowItems(props) {
  const showComponents = props.showComponents
  if (showComponents) {
    return <Accordion items={items} />
  }
  return <div></div>
}

class App extends React.Component {

  render() {
    return (
      <div >
        <Search />
        <ShowItems showComponents={false} />
      </div>
    )
  }
}

export default App
