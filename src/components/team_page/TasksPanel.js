import React from 'react';
import AddTaskModal from './modals/AddTaskModal';

const TasksPanel = ({ tasks, teamId }) => {

    const [addTaskModalOpen, setAddTaskModalOpen] = React.useState(false)

    return (
        <>
            <div className="px-3 py-3 rounded-md shadow-md hover:translate-x-2 h-64 relative">
                <h1 className="text-xl">Tasks</h1>
                <i className="material-icons absolute cursor-pointer" style={{top: '10px', right: '10px' }} onClick={() => setAddTaskModalOpen(true)}>add_circle_outline</i>
                {tasks.map(task => (
                    <div className="relative my-2" key={task.id}>
                        <p className="text-lg cursor-pointer" style={{textDecoration: task.todoCompleted ? 'line-through' : 'none'}}>{task.todoDescription}</p>
                    </div>
                ))}

                <AddTaskModal isOpen={addTaskModalOpen} onClose={() => setAddTaskModalOpen(false)} teamId={teamId}/>
            </div>
        </>
    );
}

export default TasksPanel;
