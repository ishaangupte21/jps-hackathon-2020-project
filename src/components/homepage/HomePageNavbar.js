import React from 'react';
import {motion} from 'framer-motion'
import {useHistory} from 'react-router-dom'

const HomePageNavbar = () => {

    const history = useHistory()

    return (
        <>
            <nav className="bg-blue-600 text-white h-16 relative">
                <motion.h1 className="text-4xl ml-4 cursor-pointer desktop-nav-header hidden lg:block" onClick={()=> history.push('/')} whileHover={{scale: 1.1}} >Headquarters</motion.h1>
                <motion.h1 className="text-4xl ml-4 cursor-pointer desktop-nav-header lg:hidden" onClick={()=> history.push('/')} whileHover={{scale: 1.1}} >HQ</motion.h1>
                <div className="homepage-nav-btns flex absolute" style={{right: '10px', top: '0.8rem'}}>
                    <motion.button onClick={() => history.push('/signup')} className="mx-2 bg-blue-400 px-3 py-2 rounded-md focus:outline-none" whileHover={{scale: 1.1}}>Sign Up</motion.button>
                    <motion.button onClick={() => history.push('/login')} className="mx-2 bg-blue-400 px-3 py-2 rounded-md focus:outline-none"whileHover={{scale: 1.1}}> Log In</motion.button>
                </div>
            </nav>
        </>
    );
}

export default HomePageNavbar;
