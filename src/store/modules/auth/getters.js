import { IS_USER_AUTHENTICATE_GETTER } from "@/store/storeconstants"

export default{
    [IS_USER_AUTHENTICATE_GETTER](state){
        return !!state.token;
    },
};