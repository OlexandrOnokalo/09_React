import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Shape from "./components/Shape";

function App() {
  const [count, setCount] = useState(0)

return (
    <>

      <Shape type="circle" width={100} height={100} color="yellow" />


      <Shape type="rect" width={250} height={200} color="blue" />


      <Shape type="rect" width={250} height={250} color="purple" />



      <Shape type="circle" width={150} height={150} color="green" />
    </>
  );
}

export default App;
