import React from 'react';
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MobileSidebar = ({ isOpen, onClose, logout }) => {

    const sidebarStyles = {
        position: 'fixed',
        // left: -200,
        top: 0,
        bottom: 0,
        width: '10rem',
        backgroundColor: '#FFFFFF',
        zIndex: 1000
    }

    const overlayStyles = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000
    }

    const sidebarMotionStyles = {
        hidden: {
            x: -200,
        },
        visible: {
            x: 0
        }
    }

    const overlayMotionStyles = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    }

    return ReactDOM.createPortal(
        <>
            <AnimatePresence exitBeforeEnter>
                {isOpen && (
                    <>
                        <motion.div className="mobile-sidebar-overlay" style={overlayStyles} onClick={() => onClose()} variants={overlayMotionStyles} initial="hidden" animate="visible" exit="hidden" tranition={{ ease: 'easeOut', duration: 2 }}></motion.div>
                        <motion.div className="mobile-sidebar" style={sidebarStyles} variants={sidebarMotionStyles} initial="hidden" animate="visible" exit="hidden">
                            <button onClick={() => logout()} className="focus:outline-none text-xl p-4">
                                <span className="mx-2">Log Out</span>
                                <i className="material-icons text-3xl relative" style={{ top: '7px' }}>exit_to_app</i>
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>,
        document.querySelector('#portal')
    );
}

export default MobileSidebar;
