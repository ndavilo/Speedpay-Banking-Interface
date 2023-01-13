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
            <form @submit.prevent="onSubmit(showModal = false)">
                <div class="modal-body">
                    <label>
                        Account Type
                        <input class="form-control" v-model="account_type" type="account_type" />
                    </label>
                    <label>
                        Amount
                        <input class="form-control" v-model="amount" type="amount" required />
                    </label>
                    <br />
                    <label>
                        Transaction Key
                        <input class="form-control" v-model="transaction_key" required type="transaction_key" />
                    </label>
                    <label>
                        Flag
                        <input class="form-control" v-model="flag" type="flag" required />
                    </label>
                    <br />
                    <label>
                        Closed
                        <input class="form-control" v-model="closed" type="closed" required />
                    </label>
                    <label>
                        Customer
                        <input class="form-control" v-model="customer" type="customer" required />
                    </label>
                    <br />
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="addaccount(); closeaccount()">
                        Create
                    </button>
                </div>
            </form>
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
import { mapMutations, mapState } from "vuex";
import { LOADING_SPINNER_SHOW_MUTATION } from "@/store/storeconstants";
const baseURL = "http://nonsodavilo.pythonanywhere.com/account/";
export default {

    name: 'AccounT',
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    data() {
        return {
            accounts: [],
            account_type: "Savings",
            amount: 0,
            transaction_key: 0,
            flag: false,
            closed: false,
            customer: 0,
            showModal: false,
        }
    },
    async created() {
        this.showLoading(true);
        try {
            const res = await axios.get(`${baseURL}`, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            this.accounts = res.data;
            this.showLoading(false);
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        closeaccount() {
            this.showModal = false;
        },
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async addaccount() {
            this.showLoading(true);
            try {
                const res = await axios.post(baseURL, {
                    account_type: this.account_type,
                    amount: this.amount,
                    tansaction_key: this.transaction_key,
                    flag: this.flag,
                    closed: this.closed,
                    customer: this.customer,
                }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });
                this.accounts = [...this.accounts, res.data];

                this.account_type = "";
                this.amount = 0;
                this.transaction_key = 0;
                this.flag = false;
                this.closed = false;
                this.customer = 0;
                this.showLoading(false);
            } catch (e) {
                alert(e);
            }
        },
    },

}

</script>

<style scoped>
@import '../../../public/css/popup.css';
</style>

