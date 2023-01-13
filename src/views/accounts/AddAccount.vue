<template>
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
                <button class="btn btn-primary" @click="addaccount(); close()">
                    Create
                </button>
            </div>
        </form>
</template>
<script>
import axios from "axios";
const baseURL = "http://nonsodavilo.pythonanywhere.com/account/";
export default {
    name: 'AddAccount',
    props: {
        close: Function,
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
        }
    },
    methods: {
        async addaccount() {
            try {
                const res = await axios.post(baseURL, {
                    account_type: this.account_type,
                    amount: this.amount,
                    tansaction_key: this.transaction_key,
                    flag: this.flag,
                    closed: this.closed,
                    customer: this.customer,
                });
                this.accounts = [...this.accounts, res.data];

                this.account_type = "";
                this.amount = 0;
                this.transaction_key = 0;
                this.flag = false;
                this.closed = false;
                this.customer = 0;
            } catch (e) {
                alert(e);
            }
        },
    }
}
</script>