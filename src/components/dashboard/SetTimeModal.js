import React from 'react';
import ReactDOM from 'react-dom'
import {motion, AnimatePresence} from 'framer-motion'


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

const SetTimeModal = ({ isOpen, onClose }) => {
    
    const [startTime, setStartTime] = React.useState('')
    const [endTime, setEndTime] = React.useState('')

    const handleSubmit = e => {
        e.preventDefault()
        localStorage.setItem('start-time', startTime)
        localStorage.setItem('end-time', endTime)
        onClose()
    }

    return ReactDOM.createPortal(
        <>
            <AnimatePresence exitBeforeEnter>
                {isOpen && (
                    <>
                        <motion.div style={overlayStyles} onClick={() => onClose()} variants={overlayTransitionStyles} initial="hidden" animate="visible" exit="hidden"></motion.div>
                        <motion.div className="p-6 rounded-md lg:w-1/2 w-3/4 text-center join-team-modal" variants={modalTransitionStyles} initial="hidden" animate="visible" exit="hidden">
                            <h1 className="text-3xl">Join a Team</h1>
                            <form onSubmit={handleSubmit} className="mx-auto text-center w-full">
                                <div className="input-group relative lg:w-3/4 px-2 mx-auto">
                                    <label htmlFor="" className="text-lg">Set Start Time</label> <br />
                                    <input type="time" onChange={e => setStartTime(e.target.value)}/>
                                </div>
                                <div className="input-group relative lg:w-3/4 px-2 mx-auto">
                                    <label htmlFor="" className="text-lg">Set End Time</label> <br />
                                    <input type="time" onChange={e => setEndTime(e.target.value)}/>
                                </div>
                                <button type="submit" className="text-white bg-blue-600 px-4 py-2 rounded-md focus:outline-none hover:opacity-75 transition-all duration-200 mt-3">Set Times</button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>,
        document.querySelector('#portal')
    );
}

export default SetTimeModal;
