import { createSlice } from "@reduxjs/toolkit"
import { questionReducer } from "./question_reducer";

export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        userId: null,
        result: [] //store answer index values in here
    },
    reducers: {
        setUserId: (state,action) => {
            state.userId = action.payload //eventually pass value from user
                                          //to set userId
        },
        pushResultAction: (state, action) => {
            state.result.push(action.payload) //add new element to array
        },
        updateResultAction: (state, action) => {
            const {trace, checked} = action.payload;
            state.result.fill(checked, trace, trace + 1); //update current question index in results
        },
        resetResultAction : () => {
            return {
                userId: null, //may want to modify this later to maintain login
                result: []
            }
        }
    }
})

export const { setUserId, pushResultAction, resetResultAction, updateResultAction } = resultReducer.actions;
export default resultReducer.reducer;