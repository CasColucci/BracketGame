export async function createLobby(displayName: string)
{
    const response = await fetch('/api/lobby', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName }),
    });

    if (!response.ok) {
        throw new Error('Failed to create lobby!');
    }

    return await response.json();
}

export async function joinLobby(displayName: string, code: string)
{
    const response = await fetch('/api/lobby/join', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName, code }),
    });

    if (!response.ok) {
        throw new Error('Failed to join lobby!');
    }

    return await response.json();
}

 export async function validateLobby(code: string)
{
    const response = await fetch(`/api/lobby/validate?code=${code}`, 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to validate lobby!');
    }

    return await response.json();
}
