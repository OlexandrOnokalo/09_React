import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import news from "./news.json"
import NewsOutput from './components/NewsOutput.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NewsOutput news={news[0]} />
      <NewsOutput news={news[1]} />
      <NewsOutput news={news[2]} />
      <NewsOutput news={news[3]} />
      <NewsOutput news={news[4]} />
    </>
  )
}

export default App
