import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
import MobileSidebar from './MobileSidebar';
import {motion} from 'framer-motion'

const Navbar = () => {

    const history = useHistory()

    const logOut = () => {
        Cookies.remove('AUTH_TOKEN')
        history.push('/login')
    }

    const mobileHamburgerClicked = () => {
        setMobileSidebarOpen(true)
    }

    const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)

    return (
        <>
            <nav id="desktop-navbar" className="bg-blue-600 w-full m-0 p-0 h-16 shadow-md text-white hidden lg:block relative">
                <motion.h1 className="text-4xl ml-4 cursor-pointer desktop-nav-header" onClick={()=> history.push('/dashboard')} whileHover={{scale: 1.1}} >Headquarters</motion.h1>
                <motion.button className="desktop-logout-btn focus:outline-none px-3 py-1 rounded-lg" onClick={() => logOut()} whileHover={{scale: 1.1}}>
                    <span className="mx-2 text-lg">Log Out</span>
                    <i className="material-icons relative" style={{top: '5px'}}>exit_to_app</i>
                </motion.button>
            </nav>

            <nav id="mobile-navbar" className="bg-blue-600 w-full m-0 p-0 h-16 shadow-md text-white lg:hidden">
                <div className="material-icons absolute text-4xl inline" style={{left: '15px', top: '15px'}} onClick={mobileHamburgerClicked}>reorder</div>
                <h1 className="text-4xl cursor-pointer inline relative" style={{top: '5px'}} onClick={() => history.push('/dashboard')}>
                    Headquarters
                </h1>
            </nav>
            <MobileSidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} logout={logOut}/>
        </>
    );
}

export default Navbar;
