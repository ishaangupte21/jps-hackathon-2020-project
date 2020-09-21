import React from 'react';
import CreateTeamForm from './CreateTeamForm';
import { motion, AnimatePresence } from 'framer-motion'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

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

const CreateTeamModal = ({ isOpen, onClose }) => {
    const authToken = Cookies.get('AUTH_TOKEN')
    const onFormSubmit = teamName => {
        axios.post('http://localhost:8070/create-team', {teamName}, {headers: {'Authorization': `Bearer ${authToken}`}}).then(res => onClose())
        .catch(err => console.error(err.response))
    }

    return ReactDOM.createPortal(
        <>
            <AnimatePresence exitBeforeEnter>
                {isOpen && (
                    <>
                        <motion.div style={overlayStyles} onClick={() => onClose()} variants={overlayTransitionStyles} initial="hidden" animate="visible" exit="hidden"></motion.div>
                        <motion.div className="p-6 rounded-md lg:w-1/2 w-3/4 text-center join-team-modal" variants={modalTransitionStyles} initial="hidden" animate="visible" exit="hidden">
                            <h1 className="text-3xl">Create a Team</h1>
                            <CreateTeamForm onFormSubmit={onFormSubmit} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>,
        document.querySelector('#portal')
    );

}

export default CreateTeamModal;
