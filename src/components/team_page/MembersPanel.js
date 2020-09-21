import React from 'react';

const MembersPanel = ({members}) => {
    return (
        <>
            <div className="px-3 py-3 rounded-md shadow-md hover:translate-x-2 h-64 overflow-auto">
                <h1 className="text-xl">Members</h1>
                {
                    members.map(member => (
                        <div className="my-2 relative" key={member.id}>
                            <span className="text-lg mx-4">{member.username}</span>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default MembersPanel;
