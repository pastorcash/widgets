import React, { useState } from 'react'
import Accordion from './components/Accordion'
import Search from './components/Search'
import Dropdown from './components/Dropdown'
import Translate from './components/Translate'

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

// An array of objects for the dropdown component
const options = [
  {
    label: 'The Color Red',
    value: 'red'
  },
  {
    label: 'The Color Green',
    value: 'green'
  },
  {
    label: 'A Shade of Blue',
    value: 'blue'
  },
]

// temp function to not show prev developed components
// until routing is wired up.
function ShowItems(props) {
  const showComponents = props.showComponents
  const [selected, setSelected] = useState(options[0]);
  if (showComponents) {
    return (
      <div>
        <Accordion items={items} />
        <Search />
        <Dropdown
          label="Select a Color"
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      </div>
    )
  }
  return <div></div>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {


  return (
    <div>
      <Translate />
      <ShowItems showComponents={false} />
    </div>
  );
};
