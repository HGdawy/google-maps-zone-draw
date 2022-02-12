
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { setUserSession , getToken } from './Common';

//retries in faild api requst
axiosRetry(axios, {
  retries: 1, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    return error.response.status ;
  },
  
});

// post user data to halan servier and push the token to session 
export const postUserCre = (username , password , setLoading , props , setError)=>{
    axios.post('https://zones-backend-halan.herokuapp.com/login', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token);
      props.history.push('/map');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) {
      setError(error.response.data.message) ;}
      else setError("Something went wrong. Please try again later.");
    });
}

// get zones from halan servier 
export const getZones = ()=>{
   const data = axios.get('https://zones-backend-halan.herokuapp.com/zones',
   {headers: {
      'Authorization': 'Bearer ' + getToken(),
    }}).then(response => {
        return response.data.data
    }).catch(error => {
        if (error.response.status === 401) {
        console.log(error.response)
  }})
  return data
}

// post the drawn zone with name & color & paths
export const postZones = (path , color , zone)=>{
   axios.post('https://zones-backend-halan.herokuapp.com/zones',
  {
    'label':zone,
    'color':color,
    'points':path
  },
  {headers: {
    'Authorization': 'Bearer ' + getToken(),
  }}).then(response => {
        console.log(response)
  }).catch(error => {
      if (error.response.status === 401) {
      console.log(error.response)
  }});
}

//delete zone from servier
export const deleteZone = (id)=>{

  const config = {
    method: 'delete',
    url: `https://zones-backend-halan.herokuapp.com/zones/${id}`,
    headers: { 
      'Authorization': 'Bearer ' + getToken()
    }
  };
  axios(config).then(response => {
  
  }).catch(error => {
       
      console.log(error.response)
  });
  }

  //put changes to server 
  export const putZones = (path , color , zone,id)=>{
    axios.put(`https://zones-backend-halan.herokuapp.com/zones/${id}`,
    {
      'label':zone,
      'color':color,
      'points':path
    },
    {headers: {
      'Authorization': 'Bearer ' + getToken(),
    }}).then(response => {
           
    }).catch(error => {
        if (error.response.status === 401) {
        console.log(error.response)
    }});
    }