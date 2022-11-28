import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios, * as others from 'axios';
//Returns number of questions the user attempted for better scoring
export function calcNumOfAttemptedQuestions(result) {
    return result.filter(r => r !== undefined ).length;
}

export function calculateEarnedPoints(result, answers, points) {
    
    let pointArray = result.map((element, i) => element === answers[i]) //find number of user answers that match correct value
                 .filter(i=>i) // filter for only true values
                 .map(i=>points) // convert all true values to specified amount
    
    //Error handling if user doesn't answer any questions
    //Otherwise there is an attempt to reduce an empty array
    if (pointArray.length > 0) {
        return pointArray.reduce((prev,curr)=>prev+curr)
    }   else {
        return 0
    }
}

export function flagResult(total, earned) {
    return (total * 50 / 100) < earned; //less than 50 is a fail (returns false), otherwise passed (true) 
}

//Check user auth

export function CheckUserExist({children}) {
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'}></Navigate>
}


//Get Server Data
export async function getServerData(url, callback) {
    const data = await (await axios.get(url))?.data; 
    return callback ? callback(data) : data; //gives user the option of immediately applying a callback function to 
                                             //data
}

//post serverData
export async function postServerData(url, result, callback) {
    const data = await (await axios.post(url, result))?.data; 
    return callback ? callback(data) : data; //gives user the option of immediately applying a callback function to 
                                             //data
}

