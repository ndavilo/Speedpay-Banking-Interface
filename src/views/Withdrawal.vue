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
import { mapMutations, mapState } from "vuex";
import { LOADING_SPINNER_SHOW_MUTATION } from "@/store/storeconstants";
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
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    async created() {
        this.showLoading(true);
        try {
            const res = await axios.get(baseURL, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            this.withdrawals = res.data;
            this.showLoading(false);
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async addwithdrawal() {
            this.showLoading(true);
            try {
                const res = await axios.post(baseURL, { account: this.withdrawalAccount, amount: this.withdrawalAmount }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });

                this.withdrawals = [...this.withdrawals, res.data];

                this.withdrawalAccount = "";
                this.withdrawalAmount = 0;
                this.showLoading(false);
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