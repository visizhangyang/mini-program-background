import {LOGIN,LOGOUT,SET_USER} from './constant'
export function login(flag){
    return {
        type:LOGIN,
        flag
    }
}
export function logout(flag){
    return {
        type:LOGOUT,
        flag
    }
}
export function setUser(user){
    return {
        type:SET_USER,
        user
    }
}