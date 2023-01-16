import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default{
    namespaced: true,
    state(){
        return {
            name:'Ilonze Chukwunonso David',
            token:'',
            user:'',
        }
    },
    mutations,
    getters,
    actions,
};