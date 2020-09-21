import React from 'react';
import { useHistory } from 'react-router-dom';
import {motion} from 'framer-motion'

const Team = ({ team }) => {

    const history = useHistory()

    const handleClick = () => {
        history.push(`/team/${team.id}`)
    }

    return (
        <motion.div className="px-3 py-3 rounded-md shadow-md cursor-pointer hover:translate-x-2 h-32" onClick={handleClick} whileHover={{scale: 1.1}}>
            <p className="text-xl mt-8">{team.teamName}</p>
        </motion.div>
    );
}

export default Team;
