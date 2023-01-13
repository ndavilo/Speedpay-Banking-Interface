<template>
  <Header @toggle-add-task="toggleAddTask" title="Speedpay" :showAddTask="showAddTask" />
  <loader-vue v-if="showLoading"></loader-vue>
  <div class="container" v-if="isAuthenticated">
    <SideBar />
    <router-view :showAddTask="showAddTask"></router-view>
  </div>
  <div class="container" v-if="!isAuthenticated">
    <LogInVue/>
  </div>
    <footer>
      <Footer />
    </footer>
</template>

<script>
import Header from './components/Header'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer'
import LogInVue from './views/LogIn.vue';
import LoaderVue from './components/Loader.vue';
import { mapState, mapGetters } from "vuex";
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

export default {
  name: 'App',
  components: {
    Header,
    SideBar,
    Footer,
    LogInVue,
    LoaderVue,
  },
  computed: {
    ...mapState('auth', {
      status: (state) => state.status,
    }),
    ...mapState({
      showLoading: (state) => state.showLoading,
    }),
    ...mapGetters('auth',{
      isAuthenticated:IS_USER_AUTHENTICATE_GETTER,
    }),
  },
  data() {
    return {
      showAddTask: false,
    }
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  position: absolute;
  left: 200px;
  max-width: 82%;
  overflow: auto;
  padding: 30px;
  border-radius: 5px;
}

footer {
  position: relative;
  margin-top: 10%;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;

  display: inline-block;
  padding: 15px 25px;
  background: inherit;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}

button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

@media (max-width:1000px) {
  .container {
    left: 13%;
  }
}
</style>
