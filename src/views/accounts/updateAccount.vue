<template>
    <form @submit.prevent="onSubmit(frmupdate)">
        <h4 class="modal-header">
            Account Number: {{ number }}
            <button type="button" tabindex="-1" class="btn btn-danger" @click="$router.push('/account/')">close</button>
        </h4>
        <div class="modal-body">
            <label>
                Account Type
                <input class="form-control" v-model="account_type" type="account_type" />
            </label>
            <br />
            <label>
                Transaction Key
                <input class="form-control" v-model="transaction_key" type="transaction_key" />
            </label>
            <br />
            <label>
                Flag
                <input class="form-control" v-model="flag" type="flag" />
            </label>
            <label>
                Closed
                <input class="form-control" v-model="closed" type="closed" required />
            </label>
            <label>
                Customer
                <input class="form-control" v-model="customer" type="customer" />
            </label>
            <br />
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" @click="updateAccount(); $router.push('/account/')">
                Update
            </button>
        </div>
    </form>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Type</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Flagged</th>
                    <th scope="col">Withdrawals</th>
                    <th scope="col">Deposits</th>
                    <th scope="col">Trasfers</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ account.customer }}</td>
                    <td>{{ account.account_type }}</td>
                    <td>{{ account.amount }}</td>
                    <td>{{ account.flag }}</td>
                    <td>{{ account.withdraw_account.length }}</td>
                    <td>{{ account.deposit_account.length }}</td>
                    <td>{{ account.debit_account.length + account.credit_account.length }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from "axios";
import { useRoute } from 'vue-router';
import { mapMutations, mapState } from "vuex";
import { LOADING_SPINNER_SHOW_MUTATION } from "@/store/storeconstants";
const baseURL = "http://nonsodavilo.pythonanywhere.com/account/";
export default {
    name: 'UpdateAccount',
    props: {
    },
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    data() {
        return {
            account: [],
            account_type: "",
            amount: 0,
            transaction_key: 0,
            flag: false,
            closed: false,
            customer: 0,
            number: useRoute().params.number,
        }
    },
    async created() {
        this.showLoading(true);
        try {
            const res = await axios.get(`${baseURL}${this.number}`, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            this.account = res.data;
            this.account_type = this.account.account_type;
            this.amount = this.account.amount;
            this.transaction_key = this.account.tansaction_key;
            this.flag = this.account.flag;
            this.closed = this.account.closed;
            this.customer = this.account.customer;
            this.showLoading(false);
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async updateAccount() {
            this.showLoading(true);
            try {
                await axios.patch(`${baseURL}${this.number}/`, {
                    account_type: this.account_type,
                    tansaction_key: this.transaction_key,
                    flag: this.flag,
                    closed: this.closed,
                    customer: this.customer,
                }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });
                this.showLoading(false);
            } catch (e) {
                alert(e);
            }
        },
    }
}
</script>