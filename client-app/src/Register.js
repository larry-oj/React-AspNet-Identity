import authService from "./services/auth.service";
import { React, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

export async function loader() {
    if (authService.isAuthenticated) {
        return redirect("/");
    }
    return {};
}

export default function Register() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputs.password !== inputs.passwordRepeat) {
            alert("Passwords do not match");
            return;
        }

        try {
            await authService.register(inputs.username, inputs.email, inputs.password);
            await authService.login(inputs.username, inputs.password);
            navigate("/");
        }
        catch (e) {
            alert(e.message);
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: 300, alignItems: "flex-end"}}>
                <label>
                    Username:
                    <input type="text" name="username" value={inputs.username || ''} onChange={handleInput} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={inputs.email || ''} onChange={handleInput} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={inputs.password || ''} onChange={handleInput} />
                </label>
                <label>
                    Repeat password:
                    <input type="password" name="passwordRepeat" value={inputs.passwordRepeat || ''} onChange={handleInput} />
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}