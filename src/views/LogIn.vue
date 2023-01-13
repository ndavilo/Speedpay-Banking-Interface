<template>
    <router-link v-if="status === 200" to="/account/"></router-link>
    <transition name="slide" appear>
        <div class="login-card edit" :class="{ active: showLoading }" v-if="showModal">
            <h2>Login</h2>
            <form class="login-form" @submit.prevent="onSignin()">
                <input type="text" v-model="username" placeholder="Username" />
                <input type="password" v-model="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button @click="onSignin(); $router.push('/account/')">LOGIN</button>
            </form>
        </div>
    </transition>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { SIGNIN_ACTION } from '../store/storeconstants';
export default {
    name: 'LogIn',
    data() {
        return {
            showModal: true,
            username: "",
            password: "",
        }
    },
    computed: {
        ...mapState('auth', {
            status: (state) => state.status,
        }),
        ...mapState({
            showLoading: (state) => state.showLoading,
        }),

    },
    methods: {
        ...mapActions('auth', {
            signin: SIGNIN_ACTION
        }),
        onSignin() {
            this.signin({
                username: this.username,
                password: this.password,
            });
        }
    },
}

</script>

<style scoped>
@import '../../public/css/popup.css';

.login-card {
    width: 100%;
    padding: 70px 30px 44px;
    border-radius: 24px;
    background: rgb(121, 149, 225);
    text-align: center;
}
.active{
    opacity: 0.1;
}

.login-card>h2 {
    margin: 0 0 12px;
    font-size: 36px;
    font-weight: 600;
    color: rgb(161, 242, 161);
}

.login-form {
    width: 100%;
    margin: 0;
    display: grid;
    gap: 16px;
}


.login-form>a {
    color: green;
}

.login-form>input,
.login-form>button {
    width: 100%;
    height: 56px;
    padding: 0 16px;
    border-radius: 8px;
}

.login-form>input {
    border: 2px solid #ebebeb;
}

.login-form>button {
    width: 100%;
    height: 56px;
    border: 0;
    background: #216ce7;
    color: #f9f9f9;
    font-weight: 600;
}
</style>