<template>
    <div class="saved container">
      <div class="saved__left">
        <newsfeed :posts="posts"></newsfeed>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Saved',
    data: function() {
      return {
        posts: [],
      };
    },
    mounted() {
      this.decode();
    },
    methods: {
      fetchSavedPosts() {
        const userId = localStorage.getItem('userId');
        axios
          .get(`http://localhost:8082/api/v1/users/saved/${userId}`, {
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            },
          })
          .then((response) => {
            this.posts = response.data;
          })
          .catch((error) => {
            console.error('Error fetching user saved posts:', error);
          });
      }
    },
    components: {
      newsfeed: () => import('./../components/Newsfeed/Newsfeed'),
      'user-suggestions': () => import('./../components/UserSuggestions/UserSuggestions'),
    },
    mounted() {
      this.fetchSavedPosts(); 
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .saved {
    display: flex; 
    justify-content: center; 
    align-items: flex-start; 
    padding: 20px; 

    &__left {
      float: left;
      width: 60%;
      margin-bottom: 30px;
    }
  
    &__right {
        display: none;
    }
  
    @media (max-width: 768px) {
    flex-direction: column;
      &__left {
        width: 100%;
      }
  
      &__right {
        display: none;
      }
    }
  }
  </style>
  