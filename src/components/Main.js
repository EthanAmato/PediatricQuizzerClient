import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';
import '../styles/main.css'

export default function Main() {


    const inputRef = useRef();
    const dispatch = useDispatch()
    function startQuiz() {
        if(inputRef.current?.value) {
            dispatch(setUserId(inputRef.current.value))
        }
    }

    return(
        <div className='container'>
            <div className='inner-container main'>        
                <h1 className='title'>Pediatric Quizzer</h1>
            
                <ol>
                    <li>You will be asked 10 questions one after another.</li>
                    <li>You will receive 10 points for each correct answer</li>
                    <li>You can review and change answers before the quiz finishes</li>
                    <li>You will receive your score at the end of the quiz</li>
                </ol>
                <form id="form">
                    <input ref = {inputRef} className="userid" type="text" placeholder='Username'></input>
                </form>

                <div className='start'>
                    <Link className='btn btn-hover color-1' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
                </div>
            </div>
        </div>
    )
}
