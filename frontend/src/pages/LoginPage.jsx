import { useState } from 'react';

function LoginPage() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const [status, setStatus] = useState('');

    async function handleLogin() {
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userInfo),
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
                <label htmlFor="username">Username or Email</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={identifier}
                    onChange={handleInput}
                /><br />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleInput}
                /><br />

                <button onClick={handleLogin}>Login!</button>

                <div className="status">{status}</div>
            </div>
        </>
    );
}

export default LoginPage;
