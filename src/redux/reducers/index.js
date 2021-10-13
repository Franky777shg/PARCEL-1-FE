import {combineReducers} from 'redux'
import adminReducer from './adminReducer'
import userReducer from './userReducer'
import transactionReducer from './transactionReducer'

export default combineReducers({
    adminReducer,
    userReducer,
    transactionReducer
})
