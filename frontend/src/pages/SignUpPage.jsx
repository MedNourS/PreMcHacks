import { useState } from 'react';

function SignUpPage() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [status, setStatus] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSignUp() {
        try {
            const res = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userInfo),
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
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={userInfo.username}
                    onChange={handleInput}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleInput}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleInput}
                />

                <button onClick={handleSignUp}>Sign Up!</button>

                <div className="status">{status}</div>
          </div>
        </>
    );
}

export default SignUpPage;