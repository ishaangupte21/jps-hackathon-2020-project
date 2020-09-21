import React from 'react';
import Navbar from '../../misc/Navbar';
import CreateTeamModal from './CreateTeamModal';
import JoinTeamModal from './JoinTeamModal';
import Team from './Team';
import { useQuery } from 'react-query'
import Cookies from 'js-cookie'

const authToken = Cookies.get('AUTH_TOKEN')

const Teams = () => {

    // const [teams, setTeams] = React.useState([
    //     {name: 'Team 1', id: 1},
    //     {name: 'Team 2', id: 2},
    //     {name: 'Team 3', id: 3},
    //     {name: 'Team 4', id: 4},
    //     {name: 'Team 5', id: 5},
    //     {name: 'Team 6', id: 6},
    //     {name: 'Team 7', id: 7},
    //     {name: 'Team 8', id: 8},
    //     {name: 'Team 9', id:9},
    // ])

    const [joinTeamModalOpen, setJoinTeamModalOpen] = React.useState(false)
    const [createTeamModalOpen, setCreateTeamModalOpen] = React.useState(false)

    const openJoinTeamDialog = () => {
        setJoinTeamModalOpen(true)
    }


    const openCreateTeamDialog = () => setCreateTeamModalOpen(true)

    const { data, status } = useQuery('teams', getTeams)

    return (
        <>
            <Navbar />
            <div className="relative z-10">
                <h1 className="text-2xl mt-3 mb-3">My Teams</h1>
                <button className="bg-blue-600 text-white px-3 py-2 mt-2 mx-2 rounded-md hover:shadow-md hover:opacity-75 transition-all duration-200 focus:outline-none" onClick={openJoinTeamDialog}>Join a Team</button>
                <button className="bg-blue-600 text-white px-3 py-2 mt-2 mx-2 rounded-md hover:shadow-md hover:opacity-75 transition-all duration-200 focus:outline-none" onClick={openCreateTeamDialog}>Create a Team</button>
                <div className="teamsDisplay grid grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 gap-10 lg:w-3/4 mx-auto p-3 lg:p-0 mt-6">
                    {status === 'success' && (
                        <>
                            {
                                data.map(team => <Team team={team} key={team.id} />)
                            }
                        </>
                    )}
                </div>
            </div>
            <JoinTeamModal isOpen={joinTeamModalOpen} onClose={() => setJoinTeamModalOpen(false)} />
            <CreateTeamModal isOpen={createTeamModalOpen} onClose={() => setCreateTeamModalOpen(false)} />
        </>
    );
}

async function getTeams() {
    const data = await fetch('http://localhost:8070/get-teams', {
        headers: { 'Authorization': `Bearer ${authToken}` }
    })
    return data.json()
}


export default Teams;
