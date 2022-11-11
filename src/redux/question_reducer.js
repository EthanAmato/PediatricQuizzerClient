import { createSlice } from "@reduxjs/toolkit"


//Create slice creates a reducer with an initial value
export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [], //for questions
        answers: [], //stores answers
        trace: 0 //grab the question the user is working on
    },
    //allows us to dispatch actions to store
    reducers: {
        startExamAction: (state, action) => {
            //use action to access user input
            let {questions, answers} = action.payload;
            
            return {
                ...state, //return initial state
                queue: questions, //and update queue property
                answers: answers
            }
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1
            }

        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1
            }
        },
        resetAllAction: () => {
            return {
                queue: [], //for questions
                answers: [], //stores answers
                trace: 0
            }
        }

    }
})

export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;
export default questionReducer.reducer;