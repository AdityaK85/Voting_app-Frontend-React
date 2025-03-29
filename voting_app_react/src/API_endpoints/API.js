import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api'
const token = localStorage.getItem('accessToken');
const user_id = localStorage.getItem('logged_user_id');
axios.defaults.withCredentials = true;

const HEADER = { 
    "Content-Type":"application/json",
    ...(token && { "Authorization": `Bearer ${token}` })
 }

var axioConfig = {
    method:"post",
    headers: HEADER            
}

export const VotingAPI = {
    login_api: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/login_api/`,
            data            
        };
        return await axios(axioConfig);
    },
    signup_api: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/signup_api/`,
            data            
        };
        return await axios(axioConfig);
    },
    signup_api: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/signup_api/`,
            data           
        };
        return await axios(axioConfig);
    },
    dashboard_api: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/admin_dashboard/`,
            data : data          
        };
        return await axios(axioConfig);
    },
    logout_api: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/logout_me/`,
            data : {'user_id' : user_id}            
        };
        return await axios(axioConfig);
    },
    create_voting_api: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER['Content-Type'] = 'multipart/form-data' ,
            url:`${BASE_URL}/create_voting_api/`,
            data : data           
        };
        return await axios(axioConfig);
    },
    get_votings_list: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/get_votings_list/`,
            data : data       
        };
        return await axios(axioConfig);
    } ,
    cast_vote: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/cast_vote/`,
            data : data       
        };
        return await axios(axioConfig);
    },
    total_voter: async(data) => {
        var axioConfig = {
            method:"post",
            headers: HEADER,
            url:`${BASE_URL}/total_voter/`,
            data : data       
        };
        return await axios(axioConfig);
    }
}
