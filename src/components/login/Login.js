import React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom'

const Login = () => {

    const [error, setError] = React.useState('')

    return (
        <>
            <h1 className="text-4xl mt-4">Log In</h1>
            <LoginForm setError={setError} />
            <Link to="/signup" className="mt-4">Don't Have an Account?</Link>
            <p className="text-red-600">{error}</p>
        </>
    );
}

export default Login;
