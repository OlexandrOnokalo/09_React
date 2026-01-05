import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%BC%D1%96%D1%81%D1%82%D0%B0_%D0%A0%D1%96%D0%B2%D0%BD%D0%B5.svg/250px-%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%BC%D1%96%D1%81%D1%82%D0%B0_%D0%A0%D1%96%D0%B2%D0%BD%D0%B5.svg.png" alt="Logo" />
      <h1>Рівне</h1>
      <p>Рі́вне — місто в Україні, обласний центр Рівненської області, адміністративний центр Рівненського району та Рівненської міської громади. Машинобудування, хімічна (ПАТ «Рівне-Азот»), легка, харчова промисловість, торфова промисловість. Три виші, два театри. Історико-краєзнавчий музей. Успенська дерев'яна церква (XVIII ст.).

Відоме з 1283 року. Магдебурзьке право з 1492 року. Перша письмова згадка про Рівне у статусі міста — 1496 рік, у Волинському короткому літописі.</p>
    </>
  )
}

export default App
