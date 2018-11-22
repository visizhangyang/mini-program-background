import * as actions from './constant'
import {combineReducers} from 'redux'
function isLogin(state=false,action){
    switch(action.type){
        case actions.LOGIN:
        return action.flag;
        default:
        return state
    }
}
function userInfo(state={},action){
    if(action.type===actions.SET_USER){
        return action.user
    }else{
        return state
    }
}
export default combineReducers({isLogin,userInfo})
