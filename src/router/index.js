import { createRouter, createWebHistory } from 'vue-router'
import Account from '../views/Account'
import Customer from '../views/Customer'
import Withdrawal from '../views/Withdrawal'
import Deposit from '../views/Deposit'
import Transfer from '../views/Transfer'
import PageNotFound from '../views/PageNotFound.vue'
import updateAccount from '../containers/updateAccount'
import updateCustomer from '../containers/updateCustomer'

const routes = [
  {
    path: '/',
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router