
import { useState } from "react";
import Button from "../components/Button";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <p>
        Count is {count}
      </p>
      <Button count={count} setCount={setCount} value={+1}/>
      <Button count={count} setCount={setCount} value={+10}/>
      <Button count={count} setCount={setCount} value={+100}/>
      <Button count={count} setCount={setCount} value={-10}/>
    </div>
  );
}

export default Counter;