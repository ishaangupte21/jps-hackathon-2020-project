import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const LoginForm = ({ setError }) => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('http://localhost:8070/auth/login', {username, password}).then(res => {
            setIsLoading(false)
            const token = res.data.data
            Cookies.set('AUTH_TOKEN', token, {expires: 10})
            history.push('/dashboard')
        }).catch(err => {
            setIsLoading(false)
            const resData = err.response.data
            setError(resData.data)
        })
    }

    const visibilityIconClick = () => setPasswordVisible(!passwordVisible)

    return (
        <>
            <form className="w-3/4 lg:w-1/3 mx-auto mb-4" onSubmit={handleSubmit}>
                <div className="auth-input-group w-full relative mb-5">
                    <input type="text" onChange={e => setUsername(e.target.value)} required className="w-full bg-gray-200 px-3 py-2 mt-2 rounded-t-md"/>
                    <label htmlFor="">Username</label>
                </div>
                <div className="auth-input-group w-full relative">
                    <input type={passwordVisible ? "text" : "password"} className="w-full bg-gray-200 px-3 py-2 mt-2 rounded-t-md" onChange={e => setPassword(e.target.value)} required />
                    <label htmlFor="">Password</label>
                    <i className="material-icons cursor-pointer absolute password-visibility-icon" onClick={visibilityIconClick}>{passwordVisible ? "visibility_off" : "visibility"}</i>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 focus:outline-none hover:opacity-75 transition duration-200">Log In</button>

                {isLoading && (
                    <div className="auth-loader"></div>
                )}
            </form>
        </>
    );
}

export default LoginForm;
