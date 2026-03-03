import { useState } from 'react';
import './variables.css';
import Button from './components/Button/Button.tsx';
import Card from './components/Card/Card.tsx'

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
            <Card title='Test'>
                <Button label='Test It' onClick={() => createLobbyClick("TestUser2")} />
            </Card>
            <p>{result}</p>
        </div >
    )
}

export default App
