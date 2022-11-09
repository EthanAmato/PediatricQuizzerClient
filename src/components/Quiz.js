import React from 'react';
import Questions from '../components/QuizComponents/Questions'
import '../styles/quiz.css'
export default function Quiz() {
    function onNext() {
        console.log("Next")
    }
    function onPrevious() {
        console.log("Previous")
    }

    return(
        <div className='container'>
            <div className='inner-container quiz'>
                <h1 className='title'>Quiz</h1>

                {<Questions/>}
                <div className='grid'>
                    <button className='btn btn-hover color-1 prev' onClick={onPrevious}>Prev</button>
                    <button className='btn btn-hover color-2 next' onClick={onNext}>Next</button>
                </div>
            </div>
        </div>
    )
}
