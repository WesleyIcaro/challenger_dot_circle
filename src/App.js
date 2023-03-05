import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

const API = 'http://localhost:5000'

function App() {
  const [list, setList] = useState([])
  const [undid, setUndid] = useState([])

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   const circles = {
  //     id: Math.random,
  //     circle
  //   }

  const handleClick = event => {
    // event.preventDefault()

    const newDot = {
      id: uuidv4(),
      clientX: event.clientX,
      clientY: event.clientY
    }

    // await fetch(API + '/dots', {
    //   method: 'POST',
    //   body: JSON.stringify(newDot),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // // setItems(prevState => [...prevState, newDot])
    console.log(newDot)
    setList(prev => [...prev, newDot])
    setUndid([])
  }

  const handleUndo = event => {
    event.stopPropagation()
    console.log('undo')

    if (list.length === 0) {
      return
    }

    const lastItem = list[list.length - 1]
    setUndid(prev => [...prev, lastItem])

    setList(prev => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
  }

  const handleRedo = event => {
    event.stopPropagation()
    console.log('handleRedo')

    if (undid.length === 0) {
      return
    }

    const recoveredItem = undid[undid.length - 1]
    setUndid(prev => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
    setList(prev => [...prev, recoveredItem])
  }

  return (
    <div className="page" onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map(item => (
        <span
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default App
