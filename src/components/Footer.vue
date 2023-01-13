<template>
  <footer>
    <p>
      {{ owner }} © {{ currentYear }}
    </p>
  </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'Footer-r',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
  computed:{
        ...mapState('auth',{
            owner: (state) => state.name,
        }),
    },
}
</script>
<style scoped>
a {
  color: #333;
}

footer {
  position: fixed;
  background-color: rgb(36, 62, 135);
  color: aliceblue;
  opacity: 0.3;
  bottom: 0;
  left:0;
  margin-top: 30px;
  text-align: center;
  width: 100%;
}
</style>
