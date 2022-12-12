import React, { useState } from "react"

const CountButton = () => {
    const [count, setCount] = useState(0)
    
    return (
        <button onClick={() => setCount((count) => count + 1)} data-testid='count-button'>
          count is {count}
        </button>
    )
}

export default CountButton