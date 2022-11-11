import React from 'react';
import '../styles/result.css'

import { Link } from 'react-router-dom';
import ResultTable from './ResultComponents/ResultTable';

import { useDispatch, useSelector } from 'react-redux';

//import actions
import { useEffect } from 'react';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import {calculateEarnedPoints, calcNumOfAttemptedQuestions, flagResult} from '../helper/helper';

export default function Result() {
    const dispatch = useDispatch()
    //Retrieve answers, queue, userId, and result from state variables
    const {questions: {answers, queue}, result:{userId, result}} = useSelector(state => state)

    useEffect(() => {
        console.log(answers, queue, userId, result)
        console.log(numOfattemptedQuestions)
        console.log(earnedPoints);
        console.log(flag)
    }, [])
    
    const totalPoints = queue.length * 10; //total possible points given length of quiz
    const numOfattemptedQuestions = calcNumOfAttemptedQuestions(result);
    const earnedPoints = calculateEarnedPoints(result, answers, 10);
    const flag = flagResult(totalPoints, earnedPoints);

    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    return(
        <div className='container'>
            <div className='inner-container result'>
                <h1 className='title'>Results</h1>
                <div className='result flex-center'>
                    <div className='flex'>
                        <span>Total Possible Points : </span>
                        <span className='bold'>{totalPoints || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Questions : </span>
                        <span className='bold'>{queue.length || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Attempted Questions : </span>
                        <span className='bold'>{numOfattemptedQuestions || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Points Earned : </span>
                        <span className='bold'>{earnedPoints  || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Quiz Results : </span>
                        <span style={{color: `${flag ? "green" : "red"}`}}className='bold'>{flag ? "Passed" : "Failed"}</span>
                    </div>
                </div>

                <div className='start'>
                    <Link className="btn btn-hover color-2"to={"/"} onClick={onRestart}>Restart</Link>
                </div>

                <div className='inner-container table'>
                    {/* displays table of results regarding player's performance */}
                    {<ResultTable/>}
                </div>
            </div>
        </div>
    )
}
