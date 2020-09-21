import React from 'react';
import io from 'socket.io-client'
import { useQuery } from 'react-query'
import Cookies from 'js-cookie'
const authToken = Cookies.get('AUTH_TOKEN')

const ChatPanel = ({ teamId }) => {

    const socket = io(`http://localhost:8080?teamid=${teamId}`)
    const [msg, setMsg] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        const socket = io(`http://localhost:8080?teamid=${teamId}`)
        socket.on('new-message', data => {
            messages.push(data)
        })
    }, [teamId])



    const { data, status } = useQuery('username', getUsername)
    const onSubmit = e => {
        e.preventDefault()
        messages.push({ username: data, message: msg, teamId })
        e.target.reset()
    }
    return (
        <>
            <div className="px-3 py-3 rounded-md shadow-md hover:translate-x-2 h-64 relative">
                <h1 className="text-xl">Chat</h1>

                <div className="msg-container">
                    {
                        messages.map(msg => (
                            <p className="text-lg text-left">{`${msg.username} - ${msg.message}`}</p>
                        ))
                    }
                </div>

                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Message" className="chat-input w-full px-2 absolute bottom-0 left-0" onChange={e => setMsg(e.target.value)} />
                </form>
            </div>
        </>
    );
}

async function getUsername() {
    try {
        const res = await fetch('http://localhost:8070/get-username', {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    return res.text()
    } catch (err) {
        console.error(err)
    }
}

export default ChatPanel;
