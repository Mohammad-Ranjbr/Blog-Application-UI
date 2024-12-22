<template>
  <div class="dropdown profile-options" autoClose="false">
    <a
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      aria-hidden="false"
    >
      <img src="https://img.icons8.com/ios/30/000000/like.png" class="profile-img" alt="profile" />
    </a>

    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
      <notification-item
      v-for="(user, index) in suggestions"
                  :key="index"
                  :user="user"
      >
      </notification-item>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NotificationsDropdown',
  data: function() {
    return {
      suggestions: [],
    };
  },
  methods: {
    fetchUserSuggestions() {
      axios
        .get('http://localhost:8082/api/v1/users/suggestions', {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          this.suggestions = response.data; 
          console.log("121212", this.suggestions)
        })
        .catch((error) => {
          console.error('خطا در دریافت کاربران پیشنهاد‌شده:', error);
        });
    },
  },
  components: {
    'notification-item': () => import('./../NotificationItem/NotificationItem'),
  },
  mounted() {
    this.fetchUserSuggestions(); 
  },
};
</script>

<style lang="scss" scoped>
@import './../Navbar/Navbar.scss';

.dropdown-menu {
  min-width: 20rem;
  padding: 0.5rem 0 0;
  margin: 0.5rem 0 0;
  right: -290%;
  max-height: 300px;
  overflow-y: scroll;
}
</style>
