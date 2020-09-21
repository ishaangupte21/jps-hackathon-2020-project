import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {motion} from 'framer-motion'

const SignupForm = ({ setError }) => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [verifyPassword, setVerifyPassword] = React.useState('')
    const [passwordVisible, setPasswordVisible] = React.useState(false)

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        if (password !== verifyPassword) {
            setError('Passwords do not match')
            return
        }
        axios.post('http://localhost:8000/auth/register/', {
            username, email, password1: password, password2: verifyPassword
        }).then(res => {
            const resData = res.data
            if (resData && resData['data']) {
                Cookies.set('AUTH_TOKEN', resData['data'], { expires: 10 })
                history.push('/dashboard')
            }
        }).catch(err => {
            const resData = err.response.data
            setError(resData)
        })
    }

    const visibilityIconClick = () => setPasswordVisible(!passwordVisible)

    return (
        <>
            <form className="w-3/4 lg:w-1/3 mx-auto mb-4" onSubmit={handleSubmit}>
                <div className="auth-input-group w-full relative">
                    <input type="text" required className="w-full bg-gray-200 px-3 py-2 mt-2 rounded-t-md" onChange={e => setUsername(e.target.value)} autoComplete="on"/>
                    <label htmlFor="">Username</label>
                </div>
                <div className="auth-input-group w-full relative">
                    <input type={passwordVisible ? "text" : "password"} className="w-full bg-gray-200 px-3 py-2 mt-2 rounded-t-md" onChange={e => setPassword(e.target.value)} required autoComplete="on" />
                    <label htmlFor="">Password</label>
                    <i className="material-icons cursor-pointer absolute password-visibility-icon" onClick={visibilityIconClick}>{passwordVisible ? "visibility_off" : "visibility"}</i>
                </div>
                <div className="auth-input-group w-full relative">
                    <input type="email" className="w-full bg-gray-200 px-3 py-2 mt-2 rounded-t-md" onChange={e => setEmail(e.target.value)} required autoComplete="on"/>
                    <label htmlFor="">Email Address</label>
                </div>
                <motion.button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 focus:outline-none transition duration-200" whileHover={{scale: 1.1}}>Sign Up</motion.button>
            </form>
        </>
    );
}

export default SignupForm;
