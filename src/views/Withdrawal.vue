<template>
    <h1>Withdrawal</h1>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="showModal = true">
            Withdrawal Form
        </button>
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
        </transition>
        <transition name="slide" appear>
            <div class="edit" v-if="showModal">
                <form @submit.prevent="onSubmit(showModal = false)">
                    <div class="modal-body">
                        <label>
                            Account
                            <input class="form-control" v-model="withdrawalAccount" required type="account" />
                        </label>
                        <br />
                        <label>
                            Amount
                            <input class="form-control" v-model="withdrawalAmount" type="amount" required />
                        </label>
                        <br />
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" @click="addwithdrawal()">
                            withdrawal
                        </button>
                    </div>
                </form>
                <button class="button btn btn-danger" @click="showModal = false">
                    Close Modal
                </button>
            </div>
        </transition>
    </div>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Account</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="withdrawal in withdrawals" v-bind:key="withdrawal.id">
                    <th scope="row">{{ withdrawal.id }}</th>
                    <td>{{ withdrawal.amount }}</td>
                    <td>{{ withdrawal.date }}</td>
                    <td>{{ withdrawal.account }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://nonsodavilo.pythonanywhere.com/withdraw/";
export default {

    name: 'WithdrawaL',
    data() {
        return {
            showModal: false,
            withdrawals: [],
            withdrawalAccount: "",
            withdrawalAmount: 0,
        }
    },
    async created() {
        try {
            const res = await axios.get(baseURL);
            this.withdrawals = res.data;
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        async addwithdrawal() {
            try {
                const res = await axios.post(baseURL, { account: this.withdrawalAccount, amount: this.withdrawalAmount });

                this.withdrawals = [...this.withdrawals, res.data];

                this.withdrawalAccount = "";
                this.withdrawalAmount = 0;
            } catch (e) {
                alert(e);
            }
        }
    },

}

</script>

<style scoped>
@import '../../public/css/popup.css';
</style>