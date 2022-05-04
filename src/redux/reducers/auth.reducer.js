import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actionType"
const initialState = {
    accessToken: sessionStorage.getItem('ash-access-token') ? sessionStorage.getItem('ash-access-token') : null,
    user: sessionStorage.getItem('ash-user') ? JSON.parse(sessionStorage.getItem('ash-user')) : null,
    loading: false
}
export const authReducer = (previousState = initialState, action)=>{
    const {type, payload} = action
    switch(type){
        case LOGIN_REQUEST :
            return{
                ...previousState,
                loading:true
            }
        case LOGIN_SUCCESS :
            return{
                ...previousState,
                accessToken: payload,
                loading:false
            }
        case LOGIN_FAIL :
            return{
                ...previousState,
                accessToken:null,
                loading:false,
                error: payload
            }
        case LOAD_PROFILE : 
            return{
                ...previousState,
                user:payload
            }
        case LOG_OUT :
            return {
                ...previousState,
                accessToken:null,
                user:null
            }
        default :
        return previousState
    }
}