<template>
  <div id="app">
    <navbar v-if="!$route.meta.hideNavbar"></navbar>
    <main class="container main">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar';

export default {
  name: 'app',
  data: function() {
    return {
      user: null,
    };
  },
  components: {
    navbar: Navbar,
  },
  mounted: function() {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.user = JSON.parse(user);
    } else {
      this.user = null;
    }
  },
};
</script>

<style lang="scss">
body {
  background-color: $white-smoke;
}

.main {
  margin-top: 92px;
}
</style>
