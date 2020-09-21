import React from 'react';
import Navbar from '../misc/Navbar';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import DashboardOptions from './DashboardOptions';

const Dashboard = () => {
    const authToken = Cookies.get('AUTH_TOKEN')
    const history = useHistory()

    React.useEffect(() => {
        if (!authToken) {
            history.push('/login')
        }
    }, [authToken, history])

    return (
        <>
            <Navbar />
            <h1 className="text-2xl mt-3">Dashboard</h1>
            <DashboardOptions />
        </>
    );
}

export default Dashboard;
