import {combineReducers, configureStore} from '@reduxjs/toolkit'

//Call reducers
import questionReducer from './question_reducer'
import resultReducer from './result_reducer'

//functions that will manipulate central storage
const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer,
})

// create a central storage with our reducer
 export default configureStore({reducer: rootReducer})