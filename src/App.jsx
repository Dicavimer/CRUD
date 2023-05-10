import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form></Form>







      <hr/>
      <p className="read-the-docs">
        ©Diana Vidal
      </p>
    </>
  )
}

export default App
