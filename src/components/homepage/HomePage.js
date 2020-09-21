import React from 'react';
import HomePageNavbar from './HomePageNavbar';
import ImageCarousel from './ImageCarousel';
import {motion} from 'framer-motion'
import { useHistory } from 'react-router-dom';

const HomePage = () => {

    const history = useHistory()

    return (
        <>
            <HomePageNavbar />
            <ImageCarousel />

            <h1 className="text-4xl mt-4" style={{fontFamily: 'Permanent Marker'}}>The Most Advanced Management Tool for Remote Working</h1> 

            <motion.button className="bg-indigo-700 text-white px-4 py-3 text-3xl rounded-lg shadow-lg focus:outline-none mt-8" whileHover={{scale: 1.2}} onClick={() => history.push('/signup')}>Sign Up for FREE</motion.button>
        </>
    );
}

export default HomePage;
