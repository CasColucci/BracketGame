import { useState } from 'react'
import './variables.css'
function App() {
    const [result, setResult] = useState<string>('')

    async function createLobbyClick(displayName: string) {
        try {
            const response = await fetch('/api/lobby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ displayName }),
            })
            const data = await response.json()
            setResult(JSON.stringify(data))
        } catch (err) {
            console.error(err)
            setResult('Something went wrong')
        }
    }

    return (
        <div>
            <button onClick={() => createLobbyClick("TestUser")}
            >Test It</button>
            <p>{result}</p>
        </div >
    )
}

export default App
