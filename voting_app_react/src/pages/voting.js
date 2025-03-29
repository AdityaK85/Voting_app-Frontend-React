import React , {useEffect, useState} from 'react'
import { VotingAPI } from '../API_endpoints/API'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export const Voting = () => {
    const navingate = useNavigate();
    const [ votingList , setVotingList ] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState({});
    const user_id = localStorage.getItem('logged_user_id');

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

    
    const get_votings_list_callback = async function(){
            var response = await VotingAPI.get_votings_list({'user_id': user_id});
            setVotingList(Array.isArray(response.data.payload) ? response.data.payload : []);
        }
    
    useEffect(()=>{
        get_votings_list_callback()
    }, [])

    useEffect(() => {
        console.log(votingList)
    }, [votingList]);

    const cast_vote_callback = async function (election_id, candidate_id) {
        var data = {
            'user_id' : user_id ,
            'election_id' : election_id ,
            'candidate_id' : candidate_id ,
        }
        console.log('data------', data)
        var response = await VotingAPI.cast_vote(data)
        if (response.data.status == 200) {
            toast.success(response.data.msg)
            get_votings_list_callback()
        }
        else if (response.data.status == 404) navingate('/login');
        else toast.error(response.data.msg)

    }

    const getTimeRemaining = (endDate) => {
        const now = new Date();
        const end = new Date(endDate);
        const diff = end - now;
        if (diff <= 0) return "Voting Ended";
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        return `${days} days, ${hours} hours`;
    };

  return (
    <div className="panel " id="userPanel">
        <header>
            <h2>Official Voting Portal</h2>
            <button className="btn-logout" onClick={logout_me_callback}>Secure Sign Out</button>
        </header>
        <div className="user-content">
            <div className="main-content">
                <h3>Available Elections</h3>
                <div className="security-badge">
                    <p>Secure Voting Environment - Your Vote is Private & Protected</p>
                </div>
                <div className="voting-list">
                    {
                        votingList.map((ele, index)=>(
                            <div className="voting-card">
                                <span 
                                    className={`status ${
                                        new Date() < new Date(ele.start_date) 
                                            ? 'coming-soon' 
                                            : new Date() > new Date(ele.end_date) 
                                            ? 'closed' 
                                            : 'active'
                                    }`}
                                    style={{ border: "#1a237e solid 1px" }}
                                >
                                    {new Date() < new Date(ele.start_date) 
                                        ? 'Coming Soon' 
                                        : new Date() > new Date(ele.end_date) 
                                        ? 'Closed' 
                                        : 'Active'}
                                        
                                </span>
                                <h4>{ele.name}</h4>
                                <div className="voting-info">
                                    <div>
                                        <h5>Time Remaining</h5>
                                        <p>{getTimeRemaining(ele.end_date)}</p>
                                    </div>
                                    <div>
                                        <h5>Your Status</h5>
                                        <p>
                                            { (ele.isVoted) ? 'Voted ✅' : 'Not Voted ❌' }
                                        </p>
                                    </div>
                                </div>
                                
                                {new Date() > new Date(ele.end_date) && ele.winner_candidate && (
                                    <div className="winner-card">
                                        <h4>🏆 Most Voted Candidate</h4>
                                        <div className="winner-details">
                                            <img 
                                                src={ele.winner_candidate.image} 
                                                alt={ele.winner_candidate.name} 
                                                className="winner-image"
                                            />
                                            <div className="winner-info">
                                                <h4><span>{ele.winner_candidate.name}</span></h4>
                                                <p><strong>Votes Received:</strong> {ele.winner_candidate.vote_count}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="candidates">
                                    {ele.candidates.map((candidate, index) => (
                                        <div key={index} className="candidate">
                                            <label>
                                                <input 
                                                        type="radio" 
                                                        name={`vote-${ele.id}`} 
                                                        value={candidate.id}
                                                        disabled={ele.isVoted} 
                                                        checked={ele.isVoted ? candidate.is_voted : selectedCandidate[ele.id] === candidate.id}
                                                        onChange={() => 
                                                            setSelectedCandidate(prev => ({
                                                                ...prev, [ele.id]: candidate.id
                                                            }))
                                                        }
                                                    />
                                                <span>{candidate.name}</span>
                                            </label>
                                            <p>Platform: {candidate.platform}</p>
                                        </div>
                                    ))}
                                </div>

                                {
                                    (new Date() > new Date(ele.start_date)) && (new Date() < new Date(ele.end_date)) && (
                                        <button 
                                            className="btn"
                                            onClick={() => {
                                                if (selectedCandidate[ele.id]) {
                                                    cast_vote_callback(ele.id, selectedCandidate[ele.id]);
                                                } else {
                                                    toast.error("Please select a candidate before voting!");
                                                }
                                            }}
                                        >
                                            Cast Official Vote
                                        </button>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <div className="official-seal"></div>
        <ToastContainer />
    </div>
  )
}
