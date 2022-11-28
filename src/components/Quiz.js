import React, { useEffect, useState } from 'react';
import Questions from '../components/QuizComponents/Questions'
import '../styles/quiz.css'
/* Get initial state from reducers - redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { moveNextQuestion, movePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom';

export default function Quiz() {

    const [check, setChecked] = useState(undefined) //holds currently selected

    const result = useSelector(state => state.result.result) //user choices array

    const {queue, trace} = useSelector(state => state.questions);

    const dispatch = useDispatch()

    function onNext() {
        //update the trace value by one using redux reducer
        if(trace < queue.length) {
            dispatch(moveNextQuestion()) //increments trace by one
            if(result.length <= trace){ //only push new value if we are answering previously unanswered question
                dispatch(PushAnswer(check))
            }
        }

        //if they don't select an option, set selected to undefined
        setChecked(undefined);
    }
    function onPrevious() {
        if(trace > 0) {
            dispatch(movePrevQuestion()) //decreases trace by one
        }
    }

    function onChecked(check) {
        setChecked(check)
    }

    //finish exam after last question reached
    if(result.length && result.length >= queue.length) {
        return(
            <Navigate to={'/result'} replace={true}></Navigate>
        );
    }    
    
    return(
        <div className='container'>
            <div className='inner-container quiz'>
                <h1 className='title'>Quiz</h1>

                <Questions onChecked = {onChecked}/>
                <div className='grid'>
                    {trace > 0 ? <button className='btn btn-hover color-1 prev' onClick={onPrevious}>Prev</button> : <></>}
                    <button className='btn btn-hover color-2 next' onClick={onNext}>Next</button>
                </div>
            </div>
        </div>
    );
}
