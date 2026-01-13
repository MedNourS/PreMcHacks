import { useState } from 'react';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    async function handleSignUp() {
        try {
            const res = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                setStatus('Sign Up failed');
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
                <label htmlFor="identifier">Username</label>
                <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button onClick={handleSignUp}>Sign Up!</button>

                <div className="status">{status}</div>
          </div>
        </>
    );
}

export default SignUpPage;