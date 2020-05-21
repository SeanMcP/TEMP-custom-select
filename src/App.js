import React from 'react';
import { Listbox, ListboxOption } from '@reach/listbox'
import "@reach/listbox/styles.css";
import './App.css';

const DEFAULT_STATUS = {
  label: 'Add Status',
  value: 'DEFAULT'
}

const STATUSES = [
  "Researching",
  "Scheduled Tour",
  "Visited Campus",
  "Started Application",
  "Applied",
  "Accepted",
  "Enrolled",
]

const initialColor = {
  hue: 202,
  saturation: 100,
  lightness: 26
}

const finalColor = {
  hue: 131.1,
  saturation: 45.3,
  lightness: 35.1
}

const hueStep = (finalColor.hue - initialColor.hue) / STATUSES.length
const saturationStep = (finalColor.saturation - initialColor.saturation) / STATUSES.length
const lightnessStep = (finalColor.lightness - initialColor.lightness) / STATUSES.length

const getColor = (i) => `hsl(${initialColor.hue + (hueStep * i)}, ${initialColor.saturation + (saturationStep * i)}%, ${initialColor.lightness + (lightnessStep * i)}%)`

const COLOR_BY_STATUS = STATUSES.reduce((acc, status, i) => {
  acc[status] = getColor(i)
  return acc
}, {})

console.log(COLOR_BY_STATUS)

function App() {
  let [status, setStatus] = React.useState(DEFAULT_STATUS.value)

  function handleChange(value) {
    switch (value) {
      case 'CLEAR': {
        setStatus(DEFAULT_STATUS.value)
        break
      }
      default: {
        setStatus(value)
      }
    }
  }
  
  return (
    <div className="App">
      <main>
        <Listbox arrow={<Arrow />} value={status} onChange={handleChange} defaultValue={DEFAULT_STATUS.value} style={{ backgroundColor: COLOR_BY_STATUS[status] }}>
          <ListboxOption value={DEFAULT_STATUS.value}>{DEFAULT_STATUS.label}</ListboxOption>
          {STATUSES.map(status => <ListboxOption key={status} value={status} style={{ backgroundColor: COLOR_BY_STATUS[status] }}>{status}</ListboxOption>)}
          <ListboxOption key="CLEAR" value="CLEAR">Clear Status</ListboxOption>
        </Listbox>
      </main>
    </div>
  );
}

function Arrow() {
  return <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" id="arrow_down" d="M19.6,9.4c-0.7-0.7-1.6-0.3-2.1,0.2L12,15.2L6.5,9.7C6,9.2,5.1,8.7,4.4,9.4S4.1,11,4.6,11.5l7.4,7.4   l7.4-7.4C19.9,11,20.3,10.2,19.6,9.4z"></path></svg>
}

export default App;
