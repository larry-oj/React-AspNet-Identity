import { React, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import authService from './services/auth.service';


export async function loader() {
    if (authService.isAuthenticated) {
        return redirect("/");
    }
    return {};
}

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.login(username, password);
            navigate("/");
        }
        catch (e) {
            alert(e.message);
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: 300, alignItems: "flex-end" }}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}
