<template>
  <div id="app">
    <form @submint="createAccount">
      <div class="form-group row">
        <input type="text" class="form-control col-3 mx-2" placeholder="Account_number" v-model="account.account_number">
        <input type="text" class="form-control col-3 mx-2" placeholder="account_type" v-model="account.account_type">
        <input type="text" class="form-control col-3 mx-2" placeholder="amount" v-model="account.amount">
        <input type="text" class="form-control col-3 mx-2" placeholder="tansaction_key" v-model="account.tansaction_key">
        <input type="text" class="form-control col-3 mx-2" placeholder="customer" v-model="account.customer">
        <button class="btn btn-success">Submit</button>
      </div>
    </form>
    <table class="table">
      <thead>
        <th>Account id</th>
        <th>Account_number</th>
        <th>Account_type</th>
        <th>Amount</th>
        <th>Tansaction key</th>
        <th>Customer id</th>
        <th>No. Withdraw</th>
        <th>No. Deposits</th>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>{{ account.id }}</td>
          <td>{{ account.account_number }}</td>
          <td>{{ account.account_type }}</td>
          <td>{{ account.amount }}</td>
          <td>{{ account.tansaction_key }}</td>
          <td>{{ account.customer }}</td>
          <td>{{ account.withdraw_account.length }}</td>
          <td>{{ account.deposit_account.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      account: {
        "account_number": "",
        "account_type": "",
        "amount": "",
        "tansaction_key": "",
        "customer":"",
      },
      accounts: []
    }
  },
  async created(){
    var response = await fetch('http://127.0.0.1:8000/account/');
    this.accounts = await response.json();
  },
  methods:{
    async createAccount(){
      var response = await fetch('http://127.0.0.1:8000/account/',{
        mothod: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.account)
      });
      this.accounts.push(await response.json());
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
