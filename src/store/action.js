import {LOGIN} from './constant'
export function login(flag){
    return {
        type:LOGIN,
        flag
    }
}