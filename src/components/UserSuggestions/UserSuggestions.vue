<template>
  <div class="user-suggestions">
    <user-info></user-info>

    <suggestion-header></suggestion-header>

    <single-suggestion v-for="(user, index) in usersToSuggest" :key="index" :user="user">
    </single-suggestion>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserSuggestions',
  data: function() {
    return {
      usersToSuggest: [],
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
          this.usersToSuggest = response.data; 
        })
        .catch((error) => {
          console.error('خطا در دریافت کاربران پیشنهاد‌شده:', error);
        });
    },
  },
  mounted() {
    this.fetchUserSuggestions(); 
  },
  computed: {},
  components: {
    'user-info': () => import('./../UserInfo/UserInfo'),
    'suggestion-header': () => import('./../SuggestionHeader/SuggestionHeader'),
    'single-suggestion': () => import('./../SingleSuggestion/SingleSuggestion'),
  },
};
</script>

<style lang="scss" scoped>
.footer {
  float: left;
  margin-top: 2rem;
  margin-left: 8px;
  font-size: 15px;
  color: $dark-gray;
  text-align: center;

  &__link {
    text-decoration: none;
  }
}
</style>
