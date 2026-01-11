import { useState } from 'react';

function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    async function handleLogin() {
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            });

            if (!res.ok) {
                setStatus('Login failed');
            } else {
                window.location.reload();
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="login-box">
                <label htmlFor="identifier">Username or Email</label>
                <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                /><br />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /><br />

                <button onClick={handleLogin}>Login!</button>

                <div className="status">{status}</div>
            </div>
        </>
    );
}

export default LoginPage;
