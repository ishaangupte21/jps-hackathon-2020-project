import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../misc/Navbar';
import { useQuery } from 'react-query'
import Cookies from 'js-cookie'
const authToken = Cookies.get('AUTH_TOKEN')
const ProjectPage = () => {

    const params = useParams()
    const teamId = params.teamid
    const projectId = params.projectid

    const { data, status } = useQuery([teamId, projectId], getProject)

    return (
        <>
            <Navbar />
            {data && (
                <>
                    <h1 className="text-2xl mt-3">{data.projectName}</h1>
                    <p className="project-description-text w-3/4 mx-auto lg:w-1/2 mt-4" >{data.projectDescription}</p>
                </>
            )}
        </>
    );
}

async function getProject(teamId, projectId) {
    const res = await fetch(`http://localhost:8070/get-project?projectid=${projectId}&teamid=${teamId}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    return res.json()
}

export default ProjectPage;
