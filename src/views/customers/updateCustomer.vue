<template>
    <form @submit.prevent="onSubmit(frmupdate)">
        <h4 class="modal-header">
            Customer Number: {{ number }}
            <button type="button" tabindex="-1" class="btn btn-danger"
                @click="$router.push('/customer/')">close</button>
        </h4>
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
            <button class="btn btn-primary" @click="updateCustomer(); $router.push('/customer/')">
                Update
            </button>
        </div>
    </form>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Middle Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Photo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.middle_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>{{ customer.phone_number }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.address }}</td>
                    <td>{{ customer.photo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from "axios";
import { useRoute } from 'vue-router';
import { mapState } from "vuex";
const baseURL = "http://nonsodavilo.pythonanywhere.com/customer/";
export default {
    name: 'UpdateCustomer',
    props: {
    },
    computed: {
        ...mapState('auth', {
            token: (state) => state.token,
        }),
    },
    data() {
        return {
            customer: [],
            first_name: "",
            middle_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            address: "",
            photo: null,
            number: useRoute().params.number,
        }
    },
    async created() {
        try {
            const res = await axios.get(`${baseURL}${this.number}`, {
                headers: {
                    'Authorization': `token ${this.token}`
                }
            });
            this.customer = res.data;
            this.first_name = this.customer.first_name;
            this.middle_name = this.customer.middle_name;
            this.last_name = this.customer.last_name;
            this.phone_number = this.customer.phone_number;
            this.email = this.customer.email;
            this.address = this.customer.address;
            this.photo = this.customer.photo;
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        async updateCustomer() {
            try {
                await axios.patch(`${baseURL}${this.number}/`, {
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
            } catch (e) {
                alert(e);
            }
        },
    }
}
</script>