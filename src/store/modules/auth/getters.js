import { 
    IS_USER_AUTHENTICATE_GETTER,
    GET_USER_TOKEN_GETTER,
 } from "@/store/storeconstants"

export default{
    [IS_USER_AUTHENTICATE_GETTER](state){
        return !!state.token;
    },
    [GET_USER_TOKEN_GETTER](state){
        return state.token;
    }
};