import React from 'react';
import ReactDOM from 'react-dom'
import {motion, AnimatePresence} from 'framer-motion'
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

const AddTaskModal = ({isOpen, onClose, teamId}) => {
    const [taskName, setTaskName] = React.useState('')
    const authToken = Cookies.get('AUTH_TOKEN')
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:8070/add-task', {
            teamId,
            description: taskName
        }, {headers: {
            'Authorization': `Bearer ${authToken}`
        }}).then(res => {
            onClose()
        }).catch (err => console.error(err.response))
    }

    return ReactDOM.createPortal(
        <>
            <AnimatePresence exitBeforeEnter>
                <>
                    {isOpen && (
                        <>
                            <motion.div style={overlayStyles} onClick={() => onClose()} variants={overlayTransitionStyles} initial="hidden" animate="visible" exit="hidden"></motion.div>
                            <motion.div className="p-6 rounded-md lg:w-1/2 w-3/4 text-center join-team-modal" variants={modalTransitionStyles} initial="hidden" animate="visible" exit="hidden">
                                <h1 className="text-3xl">Create a Task</h1>
                                <form className="mx-auto text-center w-full" onSubmit={handleSubmit}>
                                    <div className="input-group relative lg:w-3/4 px-2 mx-auto">
                                        <label htmlFor="" className="text-lg absolute" style={{ left: '0.5rem' }}>Enter Task Name</label> <br />
                                        <input type="text" onChange={e => setTaskName(e.target.value)} className="bg-gray-200 px-3 py-2 w-full rounded-md" required />
                                    </div>
                                    <button type="submit" className="text-white bg-blue-600 px-4 py-2 rounded-md focus:outline-none hover:opacity-75 transition-all duration-200 mt-3">Create Task</button>
                                </form>
                            </motion.div>
                        </>
                    )}
                </>
            </AnimatePresence>
        </>,
        document.querySelector('#portal')
    )
}

export default AddTaskModal;
