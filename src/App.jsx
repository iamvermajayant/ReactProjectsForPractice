import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoadingBar from './LoadingBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoadingBar />
    </>
  )
}

export default App
