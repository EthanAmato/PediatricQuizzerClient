import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResultAction } from "../../redux/result_reducer";

//Custom Hook
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { updateResult } from "../../hooks/setResult";

export default function Questions({onChecked}) {
    const [checked, setChecked] = useState(undefined);
    const {trace} = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{isLoading, apiData, serverError}] = useFetchQuestion();


    const questions = useSelector(state => {
        return state.questions.queue[state.questions.trace]
    });
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updateResult({trace, checked}));
    }, [checked]); //rerender upon dispatch change

    function onSelect(value) {
        onChecked(value); //throw up state using onChecked prop
        setChecked(value);
        dispatch(updateResult({trace, checked}))
    }

    if (isLoading) {
        <h3 className="text-light">Loading...</h3>
    }
    if (serverError) {
        <h3 className="text-light">{serverError || "Unknown Error"}</h3>
    }
    else {
    return (
    <div className="questions">
        <h2 className="text-dark question">{questions?.question}</h2>  
        {/* Only access question if we have it */}
        <ul key={questions?.id}>
            {
                questions?.options.map((q, i)=>{
                    return(
                        <li key={i}>
                            <input type="radio" 
                                   value={false} 
                                   name="options" 
                                   id={`q${i}-option`} 
                                   onChange={() => onSelect(i)}
                            />
                            
                            <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
                        </li>
                    );
                })    
            }
        </ul>
    
    </div>
    );
}}

