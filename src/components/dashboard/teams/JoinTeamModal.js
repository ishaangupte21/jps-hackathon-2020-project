import React from 'react';
import ReactDOM from 'react-dom'
import JoinTeamForm from './JoinTeamForm';
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

// const modalStyles = {
//     position: 'fixed',
//     // top: '30%',
//     left: '10%',
//     transform: 'translate(-10%, -80%)',
//     backgroundColor: '#FFFFFF',
//     zIndex: 1000
// }

const overlayStyles = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

const modalTransitionStyles = {
    hidden: {
        y: '-100vh'
    },
    visible: {
        y: '20%'
    }
}

const overlayTransitionStyles = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const JoinTeamModal = ({ isOpen, onClose }) => {


    const onFormSubmit = teamId => {
        axios.post('http://localhost:8000/')
    }


    return ReactDOM.createPortal(
        <>
            <AnimatePresence exitBeforeEnter>
                {isOpen && (
                    <>
                        <motion.div style={overlayStyles} onClick={() => onClose()} variants={overlayTransitionStyles} initial="hidden" animate="visible" exit="hidden"></motion.div>
                        <motion.div className="p-6 rounded-md lg:w-1/2 w-3/4 text-center join-team-modal" variants={modalTransitionStyles} initial="hidden" animate="visible" exit="hidden">
                            <h1 className="text-3xl">Join a Team</h1>
                            <JoinTeamForm onFormSubmit={onFormSubmit} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>,
        document.querySelector('#portal')
    );
}

export default JoinTeamModal;
