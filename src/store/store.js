import { createStore } from 'vuex';
import auth from './modules/auth/index';
import { LOADING_SPINNER_SHOW_MUTATION } from './storeconstants';

// Create a new store instance.

const store = createStore({
    modules: {
        auth,  
    },
    // creating state for Loader
    state(){
        return{
            showLoading:false,
        };
    },
    mutations:{
        [LOADING_SPINNER_SHOW_MUTATION](state, payload){
            state.showLoading = payload;
        },
    },
})

export default store;