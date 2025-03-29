import React from 'react'

const ResultComponent = ({ data , showOne, onBack  }) => {

    console.log(showOne,  data)

    if (showOne) {
        return (
            <div className="section" id="results">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Official Election Results</h3>
                    <button className='btn' style={{ width: 'auto', height: 'fit-content' }} onClick={onBack}>Back</button>
                </div>
                <div className="security-badge">
                    <p>Verified Election Results Portal</p>
                </div>
                <div className="results-list">
                        
                    <div className="result-card">
                        <span  
                            className={`status ${
                                new Date() < new Date(data.start_date) 
                                    ? "coming-soon" 
                                    : new Date() > new Date(data.end_date) 
                                    ? "closed" 
                                    : "active"
                            }`}
                        >
                            {new Date() < new Date(data.start_date) 
                                ? "Coming Soon" 
                                : new Date() > new Date(data.end_date) 
                                ? "Closed" 
                                : "Active"}
                        </span>

                        <hr style={{margin:'6px'}} ></hr>

                        <h4>{(data.name) ? data.name : 'Unknown'}</h4>
                        <div className="voting-info">
                            <div>
                                <h5>Total Eligible Voters</h5>
                                <p>{data.eligible_voter}</p>
                            </div>
                            <div>
                                <h5>Total Votes Cast</h5>
                                <p>{data.total_vote_cast}</p>
                            </div>
                            <div>
                                <h5>Voter Turnout</h5>
                                <p>{data.voting_completion_percentage}%</p>
                            </div>
                        </div>

                        {
                            (data.winner_candidate) && (
                                <div className="winner">
                                    <h5>Most Voted Candidate : {data.winner_candidate.name}</h5>
                                    <p>Votes Received: {data.winner_candidate.vote_count}</p>
                                </div>
                            )
                        }

                        
                        <div className="candidates" style={{ marginTop: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                            <h5 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>Candidates:</h5>
                            {data.candidates.map(candidate => (
                                <div 
                                    key={candidate.id} 
                                    className="candidate-card" 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        marginBottom: '15px', 
                                        padding: '10px', 
                                        borderRadius: '8px', 
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
                                        backgroundColor: '#fff' 
                                    }}
                                >
                                    <img 
                                        src={candidate.image} 
                                        alt={`${candidate.name}'s image`} 
                                        style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            borderRadius: '50%', 
                                            marginRight: '15px', 
                                            border: '2px solid #4caf50' 
                                        }} 
                                    />
                                    <div>
                                        <h6 style={{ fontSize: '18px', fontWeight: '600', margin: '0', color: '#333' }}>{candidate.name}</h6>
                                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>Details: {candidate.platform}</p>
                                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#000', fontWeight: '500' }}>Total Votes: {candidate.vote_count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        ) 
    }
    else {
        return (
            <div className="section" id="results">
                <h3>Official Election Results</h3>
                <div className="security-badge">
                    <p>Verified Election Results Portal</p>
                </div>
                <div className="results-list">
                    <div className="result-card">
                        <h4>Test</h4>
                        <div className="voting-info">
                            <div>
                                <h5>Total Eligible Voters</h5>
                                <p>5,000</p>
                            </div>
                            <div>
                                <h5>Total Votes Cast</h5>
                                <p>4,230</p>
                            </div>
                            <div>
                                <h5>Voter Turnout</h5>
                                <p>84.6%</p>
                            </div>
                        </div>
                        <div className="winner">
                            <h5>Winner: Sarah Johnson</h5>
                            <p>Votes Received: 2,345 (55.4%)</p>
                        </div>
                    </div>
                </div>
            </div>
          ) 
    }

}

export default ResultComponent;