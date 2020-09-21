import React from 'react';

const JoinTeamForm = ({ onFormSubmit }) => {

    const [teamID, setTeamID] = React.useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onFormSubmit(teamID)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto text-center w-full">
                <div className="input-group relative lg:w-3/4 px-2 mx-auto">
                    <label htmlFor="" className="text-lg absolute" style={{left: '0.5rem'}}>Enter Team ID</label> <br/>
                    <input type="text" onChange={e => setTeamID(e.target.value)} className="bg-gray-200 px-3 py-2 w-full rounded-md" required/>
                </div>
                <button type="submit" className="text-white bg-blue-600 px-4 py-2 rounded-md focus:outline-none hover:opacity-75 transition-all duration-200 mt-3">Join Team</button>
            </form>
        </>
    );
}

export default JoinTeamForm;
