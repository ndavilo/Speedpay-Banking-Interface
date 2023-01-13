<template>
  <header>
    <nav class="navbar">
        <div class="navbar-end">
            <img src="https://speedpay.ng/img/speedpay.png" class= "navbar-logo" alt="david"/>
        </div> 
    </nav> 
  </header>
</template>

<script>

export default {
  name: 'Header-d',
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
  },
  computed: {
    homePage() {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    },
  },
  data() {
    return {
      active1:false,
      active2:false,
      active3:false,
    }
  },
  methods: {
    onClick() {
      this.active1=true;
      this.active2=false;
      this.active3=false;
    },
    onClick2() {
      this.active1=false;
      this.active2=true;
      this.active3=false;
    },
    onClick3() {
      this.active1=false;
      this.active2=false;
      this.active3=true;
    },
  },
}
</script>

<style scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  background: transparent;
}
.navbar {
    position: fixed;
    top: 0; 
    left: 0;
    height: 72px;
    width: 100%;
    background: #1c194c;
    z-index: 4;
    justify-content: center;
}
    
.navbar-logo{
    width: 150px;
    height: 60px;
}

.navbar-end {
    display: flex;
    gap: 6px;
    flex: 0 0 178px;
}
.navbar
.navbar-end:last-child > button > svg {
  color: #050505;
}

    
@media (max-width:600px) {
    .navbar-end {
        flex: 0.1 0.1 auto;
    }
}
@media (max-width:400px) {
    .navbar
    .navbar-end:last-child >
    button:nth-child(n + 2) {
        display: none;
    }
    
}
</style>
