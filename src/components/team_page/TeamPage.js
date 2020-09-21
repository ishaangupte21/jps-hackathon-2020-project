import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../misc/Navbar';
import ChatPanel from './ChatPanel';
import MembersPanel from './MembersPanel';
import ProjectsPanel from './ProjectsPanel';
import TasksPanel from './TasksPanel';
import Cookies from 'js-cookie'
import { useQuery } from 'react-query';
const authToken = Cookies.get('AUTH_TOKEN')
const TeamPage = () => {

    const params = useParams()
    const teamId = params.teamid
   

    const [members, setMembers] = React.useState([
        {name: 'Ishaan Gupte', id: 1},
        {name: 'Ishaan Gupte #2', id: 2},
        {name: 'Ishaan Gupte #3', id: 3},
    ])

    const [projects, setProjects] = React.useState([
        {id: 1, name: 'Project #1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In eaque id laboriosam non quod, hic sint accusamus nostrum reprehenderit facere cum dolores placeat ipsa laudantium exercitationem dicta nobis deleniti! A.'},
        {id: 2, name: 'Project #2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In eaque id laboriosam non quod, hic sint accusamus nostrum reprehenderit facere cum dolores placeat ipsa laudantium exercitationem dicta nobis deleniti! A.'},
        {id: 3, name: 'Project #3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In eaque id laboriosam non quod, hic sint accusamus nostrum reprehenderit facere cum dolores placeat ipsa laudantium exercitationem dicta nobis deleniti! A.'},
    ])

    
    const [tasks, setTasks] = React.useState([
        {id: 1, description: 'Task #1', completed: true},
        {id: 2, description: 'Task #2', completed: false},
        {id: 3, description: 'Task #3', completed: false},
    ])

    const {data, status} = useQuery([teamId,], getTeamData)

    return (
        <>
        
            <Navbar />
            {status === 'success' && (
               <>
                 <h1 className="text-2xl mt-3">{data.teamName}</h1>
                <main className="team-page-main grid grid-cols-1 grid-rows-1 lg:grid-rows-2 lg:grid-cols-2 gap-10 lg:w-3/4 mx-auto p-3 lg:p-0 mt-6">
                    <ProjectsPanel projects={data.projects} teamId={data.id}/>
                    <TasksPanel tasks={data.tasks} teamId={teamId}/>
                    <MembersPanel members={data.members}/>
                    <ChatPanel teamId={data.id} />
                </main>
               </>
            )}
            {
                status==='error' && <span>error</span>
            }
        </>
    );
}

async function getTeamData(teamId) {
    const res = await fetch(`http://localhost:8070/get-team?teamid=${teamId}`, {
        headers: {'Authorization': `Bearer ${authToken}`}
    })
    return res.json()
}

export default TeamPage;
