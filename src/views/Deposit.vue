<template>
    <h1>Deposit</h1>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="showModal = true">
            Deposit Form
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
                            <input class="form-control" v-model="depositAccount" required type="account" />
                        </label>
                        <br />
                        <label>
                            Amount
                            <input class="form-control" v-model="depositAmount" type="amount" required />
                        </label>
                        <br />
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" @click="addDeposit()">
                            Deposit
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
                <tr v-for="deposit in deposits" v-bind:key="deposit.id">
                    <th scope="row">{{ deposit.id }}</th>
                    <td>{{ deposit.amount }}</td>
                    <td>{{ deposit.date }}</td>
                    <td>{{ deposit.account }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const baseURL = "http://nonsodavilo.pythonanywhere.com/deposit/";
export default {

    name: 'DeposiT',
    data() {
        return {
            showModal: false,
            deposits: [],
            depositAccount: "",
            depositAmount: 0,
        }
    },
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    async created() {
        try {
            const res = await axios.get(baseURL, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            this.deposits = res.data;
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        async addDeposit() {
            try {
                const res = await axios.post(baseURL, { account: this.depositAccount, amount: this.depositAmount }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });

                this.deposits = [...this.deposits, res.data];

                this.depositAccount = "";
                this.depositAmount = 0;
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