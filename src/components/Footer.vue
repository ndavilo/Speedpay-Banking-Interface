<template>
<footer>
    <p>
      Copyright © {{currentYear}} 
    </p>
  </footer>
</template>

<script> 
export default {
  name: 'Footer-r',
  data(){
        return{
          currentYear: new Date().getFullYear(),
        }
  },
}
</script>
<style scoped>
a {
  color: #333;
}

footer {
  margin-top: 30px;
  text-align: center;
}
</style>
