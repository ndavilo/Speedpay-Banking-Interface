<template>
    <h1>Account</h1>

    <button class="button" @click="showModal = true">
        Account Form
    </button>
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
        <div class="edit" v-if="showModal">
            <AddAccountVue :close="closeaccount" />
            <button class="button btn btn-danger" @click="showModal = false">
                Close Modal
            </button>
        </div>
    </transition>


    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Account No.</th>
                    <th scope="col">Type</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Flagged</th>
                    <th scope="col">Customer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" v-bind:key="account.id">
                    <th scope="row">{{ account.id }}</th>
                    <td>{{ account.account_type }}</td>
                    <td>{{ account.amount }}</td>
                    <td>{{ account.flag }}</td>
                    <td>{{ account.customer }}</td>
                    <td @click="$router.push(`/account/${account.id}`)">Edit
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import AddAccountVue from "@/containers/AddAccount.vue";
const baseURL = "http://nonsodavilo.pythonanywhere.com/account/";

export default {

    name: 'AccounT',
    components: {
        AddAccountVue,
    },
    data() {
        return {
            accounts: [],
            account_type: "",
            amount: 0,
            transaction_key: 0,
            flag: false,
            closed: false,
            customer: 0,
            showModal: false,
        }
    },
    async created() {
        try {
            const res = await axios.get(`${baseURL}`);
            this.accounts = res.data;
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        closeaccount() {
            this.showModal = false;
        },
    },

}

</script>

<style scoped>
@import '../../public/css/popup.css';
</style>

