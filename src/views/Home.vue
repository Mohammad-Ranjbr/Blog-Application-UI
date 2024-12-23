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
import VueJwtDecode from 'vue-jwt-decode';

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
    decode() {
      let token = localStorage.getItem('accessToken');
      console.log(token)
      try {
        if (token) {
          let decoded = VueJwtDecode.decode(token);
          this.current_user = decoded;
          console.log('Decoded user:', this.current_user.id);
          localStorage.setItem('userId', this.current_user.id);
          localStorage.setItem('accessToken', token);

        } else {
          console.log('Token is null or undefined');
        }
      } catch (err) {
        console.log('Error decoding token: ', err);
      }
    },
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
