import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div>
        <Footer/>
        <Header/>
       </div>
     
  )
}

export default App
