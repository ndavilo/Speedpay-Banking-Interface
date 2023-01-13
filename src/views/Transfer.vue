<template>
    <h1>Transfer</h1>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="frmtransfer()">
            Transfer Form
        </button>
        <transition id="frmtransfer" v-if="Logintransition">
            <form @submit.prevent="onSubmit(frmtransfer)">
                <h4 class="modal-header">
                    transfer
                    <button type="button" tabindex="-1" class="btn btn-danger" @click="closetransfer()">close</button>
                </h4>
                <div class="modal-body">
                    <label>
                        Debit Account
                        <input class="form-control" v-model="debitAccount" required type="account" />
                    </label>
                    <br />
                    <label>
                        Credit Account
                        <input class="form-control" v-model="creditAccount" required type="account" />
                    </label>
                    <br />
                    <label>
                        Amount
                        <input class="form-control" v-model="transferAmount" type="amount" required />
                    </label>
                    <br />
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="addtransfer()">
                        transfer
                    </button>
                </div>
            </form>
        </transition>
    </div>

</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const baseURL = "http://nonsodavilo.pythonanywhere.com/transfer/";
export default {

    name: 'TransfeR',
    data() {
        return {
            Logintransition: false,
            transfers: [],
            transferAmount: 0,
            debitAccount: "",
            creditAccount: "",
        }
    },
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    methods: {
        frmtransfer() {
            this.Logintransition = true;
        },
        closetransfer() {
            this.Logintransition = false;
        },
        async addtransfer() {
            try {
                const res = await axios.post(baseURL, { debit: this.debitAccount, credit: this.creditAccount, amount: this.transferAmount }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });

                this.transfers = [...this.transfers, res.data];

                this.transferAmount = 0;
                this.debitAccount = "";
                this.creditAccount = "";
            } catch (e) {
                alert(e);
            }
        }
    },

}

</script>

