<template>
  <div>
    <AppNavbar/>
    <AppHome/>
  


  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'
import AppHome from './components/Home.vue'



export default {
  name: 'App',
  components: {
    AppNavbar,
    AppHome,


  }
}
</script>
