import React, { useState } from 'react';
import './login.css';
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setRegistering] = useState(false);
    const [showErrorMsg, showError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isRegistering ? '/register' : '/login';
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            onLogin(token);
        } else {
            console.error('Login/Register failed');
            showError(true);
        }
    };

    const handleError = () => {
        showError(false);
    };

    return (
        <div className="container" style={{ textAlign: 'center', color: 'white' }}>
            <h2>{isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nazwa Użytkownika:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Hasło:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">{isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}</button>
            </form>
            <p onClick={() => setRegistering(!isRegistering)}>
                {isRegistering ? 'Zaloguj się jeśli już posiadasz konto' : 'Nie masz konta? \ZAREJESTRUJ SIĘ'}
            </p>

            {showErrorMsg && (
                <div className="error-container">
                    <p>Zły username lub hasło</p>
                    <button className="close-button" onClick={handleError}>zamknij</button>
                </div>
            )}
        </div>
    );
};
export default Login;

