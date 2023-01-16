import { 
    SET_USER_TOKEN_MUTATION, 
    SIGNIN_ACTION, SIGNOUT_ACTION, 
    AUTH_ACTION, AUTO_LOGIN_ACTION, 
    LOADING_SPINNER_SHOW_MUTATION 
} from "@/store/storeconstants";

import Axios from "axios";

export default {
    [SIGNOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_MUTATION, {
            token: null,
            user: null,
        });
        localStorage.removeItem('userData');
    },

    async[SIGNIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: `https://nonsodavilo.pythonanywhere.com/auth/`
        });
    },

    [AUTO_LOGIN_ACTION](context) {
        let userData = localStorage.getItem('userData');
        if (userData) {
            context.commit(
                SET_USER_TOKEN_MUTATION,
                JSON.parse(userData)
            );
        }
    },

    async [AUTH_ACTION](context, payload) {
        let postData = {
            username: payload.username,
            password: payload.password,
        };
        let response = '';
        context.commit(LOADING_SPINNER_SHOW_MUTATION, true, {root:true});
        try{
            response = await Axios.post(payload.url,
                postData
            );
        } catch(err){
            let errorMessage = err.response.data.error;
            context.commit(LOADING_SPINNER_SHOW_MUTATION, false, {root:true});
            console.log(errorMessage)
            throw errorMessage;
        }
        context.commit(LOADING_SPINNER_SHOW_MUTATION, false, {root:true});
        if(response.status === 200){
            let tokenData ={
                token: response.data.token,
                user: response.data.user
            };
            localStorage.setItem('userData',JSON.stringify(tokenData));
            context.commit(SET_USER_TOKEN_MUTATION, tokenData)
        }
    },
};