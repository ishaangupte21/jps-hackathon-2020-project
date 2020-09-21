import React from 'react';
import HomepageImage from '../../Screenshot 2020-09-20 192009.png'
import ProjectImage from '../../Screenshot 2020-09-20 193352.png'
import { motion, AnimatePresence } from 'framer-motion'

const imageTransitions = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const ImageCarousel = () => {

    const [carouselState, setCarouselState] = React.useState(0)

    return (
        <>
            <div className="image-carousel bg-gray-900 w-full relative">
                <AnimatePresence exitBeforeEnter>
                    {carouselState === 0 && (
                        <motion.img src={HomepageImage} alt="homepage image" className="mx-auto py-1" style={{ height: 'inherit' }} variants={imageTransitions} initial="hidden" animate="visible" exit="hidden"/>
                    )}
                    {carouselState === 1 && (
                        <motion.img src={ProjectImage} alt="homepage image" className="mx-auto py-1" style={{ height: 'inherit' }} variants={imageTransitions} initial="hidden" animate="visible" exit="hidden"/>
                    )}
                </AnimatePresence>

                <motion.div className="left-arrow absolute text-white opacity-50 cursor-pointer" whileHover={{opacity: 1.5}} onClick={() => setCarouselState(0)}>
                    <i className="material-icons text-5xl">arrow_back_ios</i>
                </motion.div>
                <motion.div className="right-arrow absolute text-white cursor-pointer opacity-50" whileHover={{opacity: 1.5}} onClick={() => setCarouselState(1)}>
                    <i className="material-icons text-5xl">arrow_forward_ios</i>
                </motion.div>

            </div>
        </>
    );
}

export default ImageCarousel;
