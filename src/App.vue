<template>
  <div id="app">
    <navigation/>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from 'components/navigation'
import { USER_REQUEST } from 'actions/user'

export default {
  components: { Navigation },
  name: 'app',
  created: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST)
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: #2e426b;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
</style>

<style scoped>
  .main-container {
    min-height: calc(100vh - 70px);
  }
</style>
