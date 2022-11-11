

// fetch question hook to fetch api data
// and update the redux store

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"; //only accessible inside of hooks
import data, {answers} from "../database/data";

// redux actions
import * as Action from '../redux/question_reducer'

//'use' prefix tells react that there is a custom hook
export const useFetchQuestion = () => {
    const [getData, setGetData] = useState({
                                    isLoading: false,
                                    apiData: [],
                                    serverError: null
                                  });
    const dispatch = useDispatch();
    useEffect(() => {
        //update value of getData
        setGetData(prev => ({...prev, isLoading: true}));
        //essentially sets state to previous state but changes
        //isLoading property to true while we're fetching data

        //async function for fetching backend data
        //and appending it to apiData property in getData
        (async () => {

            try {
                let questions = await data;

                if (questions.length > 0){
                    setGetData(prev =>({...prev, isLoading: false }));
                    setGetData(prev =>({...prev, apiData: questions}));

                    //dispatch an action to update redux store
                    dispatch(Action.startExamAction({questions, answers}));
                } else {
                    throw new Error("No Questions Available")
                }
            } catch(error) {
                setGetData(prev =>({...prev, isLoading:false}));
                setGetData(prev =>({...prev, serverError:error}));
            }
        })() //final parentheses calls our async function immediately

    }, [dispatch]);

    return [getData, setGetData];
}

// Move action
export const moveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    } catch(error) {
        console.log(error)
    }
}
export const movePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())
    } catch(error) {
        console.log(error)
    }
}