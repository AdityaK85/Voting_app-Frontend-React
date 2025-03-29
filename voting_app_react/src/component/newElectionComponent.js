import React , { useState, useEffect } from 'react'
import { VotingAPI } from '../API_endpoints/API'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActiveElectionComponent from './activeElectionComponent';
import Swal from 'sweetalert2';

const NewElectionComponent = ({ showActiveElection, setShowActiveElection }) => {

    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([{ name: '', platform: '', image: '' }]);
    const [electionName, setElectionName ] = useState('');
    const [startDt, setStartDt ] = useState('');
    const [endDt, setEndDt ] = useState('');
    useEffect(() => {
        if (!showActiveElection) {
            console.log("Active Election is now hidden");
        }
    }, [showActiveElection]);

    // Add new candidate field
    const addCandidateField = () => {
        setCandidates([...candidates, { name: '', platform: '', image: '' }]);
    };

    // Handle input changes
    const handleChange = (index, event) => {
        const newCandidates = [...candidates];
        newCandidates[index][event.target.name] = event.target.value;
        setCandidates(newCandidates);
    };

    // Handle image upload
    const handleImageChange = (index, event) => {
        const newCandidates = [...candidates];
        newCandidates[index].image = URL.createObjectURL(event.target.files[0]);
        setCandidates(newCandidates);
    };

    const removeCandidate = (index) => {
        setCandidates(candidates.filter((_, i) => i !== index));
    };

    const createElection = async function () {
        const user_id = localStorage.getItem('logged_user_id');
        
        if (electionName.trim() == "" ) return toast.error('Please enter election name')
        else if (startDt.trim() == "" ) return toast.error('Please select voting starting date')
        else if (endDt.trim() == "" ) return toast.error('Please select voting ending date')

        const formData = new FormData();
        formData.append('user_id', user_id)
        formData.append('election_name', electionName)
        formData.append('start_date', startDt)
        formData.append('end_date', endDt)
        for (const [index, item] of candidates.entries()) {
            formData.append(`data[${index}][name]`, item.name);
            formData.append(`data[${index}][platform]`, item.platform);
            const response = await fetch(item.image);
            const blob = await response.blob();
            const file = new File([blob], `image_${index}.jpg`, { type: blob.type });
            formData.append(`data[${index}][image]`, file);
        }
    
        const response = await VotingAPI.create_voting_api(formData);
        if (response.data.status === 200) {
            Swal.fire({
                title: 'Success!',
                text: response.data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setShowActiveElection(true); 
            });
        }
        else if (response.data.status == 404) {
            navigate('/login')
            toast.success(response.data.msg)
        }
        else {
            toast.error(response.data.msg)
        }
      
    };

    return (
        showActiveElection ? (
            <ActiveElectionComponent />
        ) : (
            <div className="section" id="createVoting">
                <h3>Create Official Election</h3>
                <div className="security-badge">
                    <p>Secure Election Creation Portal</p>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Official Election Title"
                        onInput={(e) => setElectionName(e.target.value)}
                    />
                </div>
                <div className="voting-info">
                    <div className="form-group">
                        <h5>Start Date & Time</h5>
                        <input
                            type="datetime-local"
                            onInput={(e) => setStartDt(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <h5>End Date & Time</h5>
                        <input
                            type="datetime-local"
                            onInput={(e) => setEndDt(e.target.value)}
                        />
                    </div>
                </div>
                <div id="candidates" className="container mt-4">
                    {candidates.map((candidate, index) => (
                        <div
                            key={index}
                            className="candidate-entry mb-4 border p-4 rounded shadow-sm position-relative"
                        >
                            {/* Cross Icon */}
                            {index !== 0 && (
                                <button
                                    type="button"
                                    className="btn-close"
                                    style={{ top: "10px", right: "10px" }}
                                    onClick={() => removeCandidate(index)}
                                    aria-label="Remove Candidate"
                                >
                                    x
                                </button>
                            )}
    
                            <div className="row mb-3">
                                <div className="col-md-6" style={{margin:'10px'}} >
                                    <label>Candidate Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={candidate.name}
                                        placeholder="Candidate Full Name"
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div className="col-md-6" style={{margin:'3px'}} >
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                    {candidate.image && (
                                        <img
                                            src={candidate.image}
                                            alt="Candidate"
                                            className="mt-2"
                                            style={{
                                                maxWidth: "150px",
                                                maxHeight: "150px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <textarea
                                className="form-control mt-3"
                                name="platform"
                                value={candidate.platform}
                                placeholder="Official Candidate Platform & Details"
                                onChange={(e) => handleChange(index, e)}
                            />
                            <hr style={{marginTop:'9px', marginBottom:'-25px'}} ></hr>
                        </div>
                    ))}
    
                    <div
                        className="d-flex justify-content-between align-items-center mb-4"
                        style={{ float: "inline-end" }}
                    >
                        <button
                            type="button"
                            className="btn btn-success rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                padding: "0",
                                fontSize: "20px",
                            }}
                            onClick={addCandidateField}
                        >
                            +
                        </button>
                    </div>
    
                    <button
                        type="button"
                        className="btn btn-dark btn-block"
                        onClick={createElection}
                    >
                        Create Official Election
                    </button>
                </div>
                <ToastContainer />
            </div>
        )
    );
}


export default NewElectionComponent;