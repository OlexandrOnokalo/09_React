
      
function Button ({ count, setCount, value }) {
  return (       
      
        <button onClick={() => setCount((count) => count + value)}>
          {value}
        </button>

      )}

export default Button;