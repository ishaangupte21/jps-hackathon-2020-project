import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';

const Signup = () => {

    const [error, setError] = React.useState('')

    return (
        <>
            <h1 className="text-4xl mt-4">Sign Up</h1>
            <SignupForm setError={setError}/>
            <Link to="/login">Already Have an Account?</Link>
            <p className="text-red-600">{error}</p>
        </>
    );
}

export default Signup;
