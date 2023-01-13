import { SET_USER_TOKEN_MUTATION } from "@/store/storeconstants";

export default {
    [SET_USER_TOKEN_MUTATION](state, payload){
        state.token = payload.token,
        state.status = payload.status
    }
}