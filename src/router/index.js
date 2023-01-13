import { createRouter, createWebHistory } from 'vue-router'
import Account from '../views/accounts/Account'
import Customer from '../views/customers/Customer'
import Withdrawal from '../views/Withdrawal'
import Deposit from '../views/Deposit'
import Transfer from '../views/Transfer'
import PageNotFound from '../views/PageNotFound.vue'
import updateAccount from '../views/accounts/updateAccount'
import updateCustomer from '../views/customers/updateCustomer'
import Card from '../views/Card'
import LogIn from '../views/LogIn'

const routes = [
    {
        path: '/',
        name: 'LogIn',
        component: LogIn,
    },
    {
        path: '/account/',
        name: 'Account',
        component: Account,
    },
    {
        path: '/customer/',
        name: 'Customer',
        component: Customer,
    },
    {
        path: '/withdrawal/',
        name: 'Withdrawal',
        component: Withdrawal,
    },
    {
        path: '/deposit/',
        name: 'deposit',
        component: Deposit,
    },
    {
        path: '/transfer/',
        name: 'transfer',
        component: Transfer,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: PageNotFound,
    },
    {
        path: '/account/:number',
        name: 'updateAccount',
        component: updateAccount,
    },
    {
        path: '/customer/:number',
        name: 'updateCustomer',
        component: updateCustomer,
    },
    {
        path: '/card/',
        name: 'Card',
        component: Card,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router