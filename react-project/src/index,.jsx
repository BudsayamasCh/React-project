import React, {useState} from "react"

function App() {
    const [count, setCount] = React.useState(0)

    const [text, setText] = useState('')
    
    const [logic, setLogic] = useState(false);
    return (
        
        <div>
           {count > 5 ? (
            <h1>Hello, more than 5</h1>
           ):(
            <h1>Hello, less than 5</h1>
           )}
           <h1>Counter: {count}</h1>
           <button onClick={() => setCount(count + 1)}>Click to increase</button>
           <button onClick={() => setCount(0)}>Rase the value</button>

           {text === ''? (
            <h1>Hello, Void!</h1>
           ):(
            <h1>Hello, {text}</h1>
           )}
           <input type="text" onChange={(event) => setText(event.target.value)}/><br />

           {logic && "Hello ,True"}
           <button onClick={() => setLogic(true)}> Set to true</button>
        </div>
        
    )
}
export default App