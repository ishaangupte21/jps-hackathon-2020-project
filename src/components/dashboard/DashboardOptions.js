import React from 'react';
import { useHistory } from 'react-router-dom';
import {motion} from 'framer-motion'
import SetTimeModal from './SetTimeModal';

const DashboardOptions = () => {

    const history = useHistory()
    const [timeModalOpen, setTimeModalOpen] = React.useState(false)
    const [startTime, setStartTime] = React.useState('')
    const [endTime, setEndTime] = React.useState('')

    React.useEffect(() => {
        if(localStorage.getItem('start-time')) {
            setStartTime(localStorage.getItem('start-time'))
        }
        if(localStorage.getItem('end-time')) {
            setEndTime(localStorage.getItem('end-time'))
        }
    })

    return (
        <>
            <div className="w-full flex flex-col lg:flex-row justify-evenly mt-10">
                <motion.div className="bg-white rounded-md shadow-md flex-grow flex-shink mx-10 cursor-pointer h-32 lg:h-48 mb-10" id="teams-button" onClick={() => history.push('/teams')} whileHover={{scale: 1.1}}>
                    <span className="text-3xl relative my-teams-text">My Teams</span>
                </motion.div>
                <div className="bg-white rounded-md shadow-md flex-grow flex-shrink mx-10 h-48 relative" id="work-time-button">
                    <span className="text-xl">Work Time</span> 
                    <button onClick={() => setTimeModalOpen(true)} className="absolute focus:outline-none " style={{right: '3rem', top: '5px'}}>Set work Times</button>

                    {startTime && endTime && (
                        <h1 className="text-3xl">{`${startTime} - ${endTime}`}</h1>
                    )}
                </div>
            </div>

            <SetTimeModal isOpen={timeModalOpen} onClose={() => setTimeModalOpen(false)}/>
        </>
    );
}

export default DashboardOptions;
