import React from 'react';
import '../styles/result.css'
import { Link } from 'react-router-dom';
import ResultTable from './ResultComponents/ResultTable';

export default function Result() {
    function onRestart() {
        console.log("on restart")
    }
    return(
        <div className='container'>
            <div className='inner-container result'>
                <h1 className='title'>Results</h1>
                <div className='result flex-center'>
                    <div className='flex'>
                        <span>Total Quiz Points : </span>
                        <span className='bold'>50</span>
                    </div>
                    <div className='flex'>
                        <span>Total Questions : </span>
                        <span className='bold'>5</span>
                    </div>
                    <div className='flex'>
                        <span>Total Attempts : </span>
                        <span className='bold'>03</span>
                    </div>
                    <div className='flex'>
                        <span>Total Points Earned : </span>
                        <span className='bold'>50</span>
                    </div>
                    <div className='flex'>
                        <span>Quiz Results : </span>
                        <span className='bold'>Passed</span>
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
