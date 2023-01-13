import { SET_USER_TOKEN_MUTATION, SIGNIN_ACTION } from "@/store/storeconstants";
import axios from "axios";

export default {
    async[SIGNIN_ACTION](context, payload){
        let postData = {
            username: payload.username,
            password: payload.password,
        };
        let response = await axios.post(`https://nonsodavilo.pythonanywhere.com/api-token-auth/`,
        postData,);

        if (response.status === 200){
            context.commit(SET_USER_TOKEN_MUTATION,{
                token: response.data.token,
                status: response.status,
            })
        }
    },
};