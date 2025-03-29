import React , { useEffect, useState } from 'react'
import  NewElectionComponent  from '../component/newElectionComponent'
import  VotersListComponent  from '../component/voters_listComponent.js'
import  ActiveElectionComponent  from '../component/activeElectionComponent'
import { VotingAPI } from '../API_endpoints/API'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Admin_dashboard = () => {
    const navingate = useNavigate();
    const [activeSection, setActiveSection] = useState('createVoting');
    const [showActiveElection, setShowActiveElection] = useState(false);

    const showSection = (section) => {
        console.log(activeSection)
        setActiveSection(section);
        if (section == 'createVoting') {
            setShowActiveElection(false)
        }
    };

    const admin_dashboard_callback = async function() {
        const user_id = localStorage.getItem('logged_user_id');
        var response = await VotingAPI.dashboard_api({'user_id': user_id});
        if (response.data.status == 200) toast.success(response.data.msg)
        else navingate('/login')
    }

    
    const logout_me_callback = async function() {
        const user_id = localStorage.getItem('logged_user_id');
        var response = await VotingAPI.logout_api({'user_id': user_id})
        navingate('/login')
    }

    useEffect(()=>{
        admin_dashboard_callback()
    }, [])

  return (
    <div className="panel" id="adminPanel">
        <header>
            <h2>Election Administration Portal</h2>
            <button className="btn-logout" onClick={logout_me_callback}>Secure Sign Out</button>
        </header>
        <div className="admin-content">
            <div className="sidebar">
                <button className="btn" onClick={()=>{showSection('voters')}}>Voters</button>
                <button className="btn" onClick={()=>{showSection('createVoting')}}>Create New Election</button>
                <button className="btn" onClick={()=>{showSection('activeVotings')}}>Monitor Active Elections</button>
            </div>
            <div className="main-content" style={{height:'500px', overflowY:'auto'}} >
                {activeSection === 'voters' && <VotersListComponent  />}
                {activeSection === 'createVoting' && <NewElectionComponent showActiveElection={showActiveElection} setShowActiveElection={setShowActiveElection}  />}
                {activeSection === 'activeVotings' && <ActiveElectionComponent   />}
            </div>
        </div>
        <div className="official-seal"></div>
        <ToastContainer />
    </div>
  )
}


export default Admin_dashboard;