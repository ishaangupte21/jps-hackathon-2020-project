import React from 'react';
import {Link } from 'react-router-dom'
import AddProjectModal from './modals/AddProjectModal';

const ProjectsPanel = ({projects, teamId}) => {

    const [modalOpen, setModalOpen] = React.useState(false)
    return (
        <>
            <div className="px-3 py-3 rounded-md shadow-md hover:translate-x-2 h-64 overflow-auto relative">
                <h1 className="text-xl inline mx-auto">Projects</h1>
                <i className="material-icons absolute cursor-pointer" style={{top: '10px', right: '10px' }} onClick={() => setModalOpen(true)}>add_circle_outline</i>
                {projects.map(project => (
                    <div className="relative my-2" key={project.id}>
                        <Link to={`/team/${teamId}/project/${project.id}`} className="text-lg">{project.projectName}</Link>
                    </div>
                ))}
            </div>
            <AddProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} teamId={teamId}/>
        </>
    );
}

export default ProjectsPanel;
