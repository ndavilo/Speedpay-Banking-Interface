<template>
    <h1>Customer</h1>

    <button class="button" @click="showModal = true">
        Customer Form
    </button>
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
        <div class="edit" v-if="showModal">
            <form @submit.prevent="onSubmit(showModal = false)">
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
                    <button class="btn btn-primary" @click="addcustomer(); closecustomer()">
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
                    <th scope="col">ID</th>
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
                <tr v-for="customer in customers" v-bind:key="customer.id">
                    <th scope="row">{{ customer.id }}</th>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.middle_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>{{ customer.phone_number }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.address }}</td>
                    <td>{{ customer.photo }}</td>
                    <td @click="$router.push(`/customer/${customer.id}`)">Edit
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
const baseURL = "http://nonsodavilo.pythonanywhere.com/customer/";
export default {

    name: 'CustmeR',
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
            this.customers = res.data;
            this.showLoading(false);
        } catch (e) {
            alert(e);
        }
    },
    methods: {
        closecustomer() {
            this.showModal = false;
        },
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async addcustomer() {
            this.showLoading(true);
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

