import { LOADING_SPINNER_SHOW_MUTATION, SET_USER_TOKEN_MUTATION, SIGNIN_ACTION, SIGNOUT_ACTION } from "@/store/storeconstants";
import axios from "axios";

export default {
    [SIGNOUT_ACTION](context){
        context.commit(SET_USER_TOKEN_MUTATION,{
            token: null,
            status: null,
        });
    },
    async[SIGNIN_ACTION](context, payload){
        let postData = {
            username: payload.username,
            password: payload.password,
        };

        context.commit(LOADING_SPINNER_SHOW_MUTATION, true, {
            root:true
        });

        let response = await axios.post(`https://nonsodavilo.pythonanywhere.com/api-token-auth/`,
        postData,);

        context.commit(LOADING_SPINNER_SHOW_MUTATION, false, {
            root:true
        });

        if (response.status === 200){
            context.commit(SET_USER_TOKEN_MUTATION,{
                token: response.data.token,
                status: response.status,
            })
        }
    },
};