<template>
    <form @submit.prevent="onSubmit(frmcustomer)">
        <div class="modal-body">
            <label>
                First Name
                <input class="form-control" v-model="first_name" type="first_name" />
            </label>
            <label>
                Middle Name
                <input class="form-control" v-model="middle_name" type="middle_name" />
            </label>
            <label>
                Last Name
                <input class="form-control" v-model="last_name" type="last_name" />
            </label>
            <label>
                Phone Number
                <input class="form-control" v-model="phone_number" type="phone_number" />
            </label>
            <label>
                Email
                <input class="form-control" v-model="email" type="email" />
            </label>
            <label>
                Address
                <input class="form-control" v-model="address" type="address" />
            </label>
            <label>
                Photo
                <input class="form-control" v-model="photo" type="photo" />
            </label>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" @click="addcustomer(); close()">
                Create
            </button>
        </div>
    </form>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
const baseURL = "http://nonsodavilo.pythonanywhere.com/customer/";
export default {
    name: 'AddCustomer',
    props: {
        close: Function,
    },
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    data() {
        return {
            customers: [],
            first_name: "",
            middle_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            address: "",
            photo: null,
        }
    },
    methods: {
        async addcustomer() {
            try {
                const res = await axios.post(baseURL, {
                    first_name: this.first_name,
                    middle_name: this.middle_name,
                    last_name: this.last_name,
                    phone_number: this.phone_number,
                    email: this.email,
                    address: this.address,
                    photo: this.photo,
                }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });

                this.customers = [...this.customers, res.data];

                this.first_name = "";
                this.middle_name = "";
                this.last_name = "";
                this.phone_number = "";
                this.email = "";
                this.address = "";
                this.photo = null;
            } catch (e) {
                alert(e);
            }
        },
    }
}
</script>