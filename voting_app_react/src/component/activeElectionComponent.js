import React, { useEffect, useState } from 'react'
import { VotingAPI } from '../API_endpoints/API'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultComponent from './resultComponent';

const ActiveElectionComponent = () => {

    const [ votingList , setVotingList ] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [resultData, setResultData] = useState(null);

    const get_votings_list_callback = async function(){
        const user_id = localStorage.getItem('logged_user_id');
        var response = await VotingAPI.get_votings_list({'user_id': user_id});
        setVotingList(Array.isArray(response.data.payload) ? response.data.payload : []);
    }

    useEffect(()=>{
        get_votings_list_callback()
    }, [])

    useEffect(() => {
        console.log(votingList)
    }, [votingList]);

    const viewStatics = async function(data) {
        setResultData(data); 
        setShowResults(true);
    }

    const handleBack = () => {
        setShowResults(false);
      };

    if (showResults) {
        return <ResultComponent data={resultData} showOne={true}  onBack={handleBack} />; 
      }

  return (
    <div className="section" id="activeVotings">
        <h3>Active Elections Monitor</h3>
        <div className="security-badge">
            <p>Real-time Election Monitoring System</p>
        </div>
        <div className="voting-list">
            {
                votingList.map((ele, index)=>(

                    <div key={index} className="voting-card">
                        <span  
                            className={`status ${
                                new Date() < new Date(ele.start_date) 
                                    ? "coming-soon" 
                                    : new Date() > new Date(ele.end_date) 
                                    ? "closed" 
                                    : "active"
                            }`}
                            style={{ border: "#1a237e solid 1px" }}
                        >
                            {new Date() < new Date(ele.start_date) 
                                ? "Coming Soon" 
                                : new Date() > new Date(ele.end_date) 
                                ? "Closed" 
                                : "Active"}
                        </span>
                        <h4>{ele.name}</h4>
                        <div className="voting-info">
                            <div>
                                <h5>Start Date</h5>
                                <p>{new Date(ele.start_date).toLocaleString()}</p>
                            </div>
                            <div>
                                <h5>End Date</h5>
                                <p>{new Date(ele.end_date).toLocaleString()}</p>
                            </div>
                            <div>
                                <h5>Total Participants</h5>
                                <p>{ele.candidates.length}</p>
                            </div>
                            <div>
                                <h5>Total Votes Cast</h5>
                                <p>{ele.voting_completion_percentage}%</p>
                            </div>
                        </div>
                        {new Date() > new Date(ele.end_date) && (
                            <div className="winner">
                                <h5>Most Voted Candidate: {ele.winner_candidate?.name}</h5>
                                <p>Votes Received: {ele.winner_candidate?.vote_count}</p>
                            </div>
                        )}
                        <button className="btn" onClick={(e)=>{viewStatics(ele)}}  >View Detailed Statistics</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ActiveElectionComponent;