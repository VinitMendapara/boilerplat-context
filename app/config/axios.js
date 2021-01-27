import axios from 'axios';
import constants from '../constants';

const headers = { 
    headers: { 
      'Content-Type': 'application/json'
    }
}

const apiHeaders= { 
    'Content-Type': 'application/json',
    'Authorization': "bearer " + sessionStorage.getItem("access_token")
}

export const login = async (identifier, password) => {
    await axios.post(constants.login,{identifier,password},headers).then(response => {
        if(response && response.data){
            sessionStorage.setItem("access_token", response.data.jwt)
        }else{
            message.error("Invalid Username or Password.")
        }
    }).catch(error => {
        message.error("Error while verifing your username and password.")
    })
}
