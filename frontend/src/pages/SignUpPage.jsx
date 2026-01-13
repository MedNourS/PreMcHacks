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
        <div className="w-screen h-screen flex justify-center items-center bg-[url(../../public/Wave.svg)] bg-cover">
            <div className="w-[500px] p-18 flex flex-col shadow-2xl/60 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
                <h1 className="mb-12 font-Domine text-center text-6xl text-neutral-100">TimeFrame</h1>
                <h1 className="mb-2 font-Sans text-md text-neutral-400">Sign Up</h1>
                <label className="font-Sans text-lg text-neutral-100" htmlFor="username">Username</label>
                <input
                    className="mb-4 p-0.5 rounded-md text-neutral-900 bg-neutral-100"
                    type="text"
                    name="username"
                    id="username"
                    value={userInfo.username}
                    onChange={handleInput}
                />

                <label className="font-Sans text-lg text-neutral-100" htmlFor="email">Email</label>
                <input
                    className="mb-4 p-0.5 rounded-md text-neutral-900 bg-neutral-100"
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleInput}
                />

                <label className="font-Sans text-lg text-neutral-100" htmlFor="password">Password</label>
                <input
                    className="mb-4 p-0.5 rounded-md text-neutral-900 bg-neutral-100"
                    type="password"
                    name="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleInput}
                />

                <button 
                  onClick={handleSignUp}
                  className="p-2 font-Sans text-xl font-semibold text-neutral-100 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 transition hover:from-blue-400 hover:to-blue-500"
                >Sign Up!</button>
                <div className="status">{status}</div>
                <button 
                  className="p-2 w-fit font-Sans text-lg text-blue-300 rounded-lg transition hover:bg-neutral-800"
                  
                >Français</button>
            </div>
        </div>
    );
}

export default SignUpPage;