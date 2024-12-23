<template>
  <div class="home container">
    <div class="home__left">
      <home-stories></home-stories>
      <newsfeed :posts="posts"></newsfeed>
    </div>

    <div class="home__right">
      <user-suggestions></user-suggestions>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data: function() {
    return {
      posts: [],
      current_user: null
    };
  },
  mounted() {
    this.decode();
  },
  methods: {
    fetchHomePosts() {
      axios
        .get(`http://localhost:8082/api/v1/posts/home-posts`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error fetching user posts:', error);
        });
    }
  },
  components: {
    newsfeed: () => import('./../components/Newsfeed/Newsfeed'),
    'user-suggestions': () => import('./../components/UserSuggestions/UserSuggestions'),
  },
  mounted() {
    this.fetchHomePosts(); 
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__left {
    float: left;
    width: 60%;
    margin-bottom: 30px;
  }

  &__right {
    position: fixed;
    left: 62%;
    width: 40%;
  }

  @media (max-width: 768px) {
    &__left {
      width: 100%;
    }

    &__right {
      display: none;
    }
  }
}
</style>
