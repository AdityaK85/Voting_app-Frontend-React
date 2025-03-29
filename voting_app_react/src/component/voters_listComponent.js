import { useEffect, useState } from "react";
import { VotingAPI } from '../API_endpoints/API'

const VotersListComponent = () => {
    const [voters, setVoters] = useState([]);

    const get_voter_list_callback = async function(){
            const user_id = localStorage.getItem('logged_user_id');
            var response = await VotingAPI.total_voter({'user_id': user_id});
            setVoters(Array.isArray(response.data.payload) ? response.data.payload : []);
        }
    
    useEffect(()=>{
        get_voter_list_callback()
        }, [])

  return (
    <div className="container mt-4">
      <h2 className="mb-3" style={{marginBottom:'10px'}} >Voters</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped" style={{zoom:'75%'}} >
          <thead className="table-dark">
            <tr>
              <th>Voter ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>City</th>
              <th>State</th>
              <th>Nationality</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Joined DT</th>
            </tr>
          </thead>
          <tbody>
            {voters.length > 0 ? (
              voters.map((voter, index) => (
                <tr key={index}>
                  <td>{voter.voter_id}</td>
                  <td>{voter.full_name}</td>
                  <td>{voter.email}</td>
                  <td>{voter.phone_no}</td>
                  <td>{voter.city}</td>
                  <td>{voter.state}</td>
                  <td>{voter.nationality}</td>
                  <td>{new Date(voter.dob).toLocaleDateString()}</td>
                  <td>{voter.gender}</td>
                  <td>{new Date(voter.created_dt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">No voters found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VotersListComponent;
