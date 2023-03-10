import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <div>
            <h1 className='login-header'>Log In</h1>
            <form onSubmit={handleSubmit} className='login-container'>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className='login-username'>
                    <input
                        placeholder="Username or Email"
                        className="input-field"
                        type="text"
                        value={credential}
                        onChange={(e) => { setCredential(e.target.value) }}
                        required
                    />
                </label>
                <label className="login-password">
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                </label>
                <span>
                    <button disabled={!credential || !password || (password.length < 6) || (credential.length < 4)} className={!credential || !password || (password.length < 6) || (credential.length < 4) ? "disabled-btn" : "login-button"} type="submit">Log In</button>
                </span>
                <button onClick={() => { setCredential('demo@user.io'); setPassword('password'); }} type="submit" className='demo-user-btn'>Log In Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
