<template>
  <div class="profile">
    <profile-header></profile-header>
    <!-- <profile-stories></profile-stories> -->

    
    <div v-if="isCurrentUserProfile" class="suggestions" style="margin-top: 30px;">
      <div class="direc direc--left" @click="scroll_left">
        <img src="./../assets/left-arrow.png" alt="left arrow" class="arrow" />
      </div>

      <div class="direc direc--right" @click="scroll_right">
        <img src="./../assets/right-arrow.png" alt="right arrow" class="arrow" />
      </div>

      <div class="suggestions__header">
        <div class="suggestions__title">Suggested</div>
        <div class="suggestions__seeall" data-toggle="modal" data-target="#seeall" style="cursor: pointer;">
          See All
        </div>
      </div>

      <div
          class="modal fade"
          id="seeall"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal__header">
                <div class="modal__title">Similar Accounts</div>
                <div class="modal__close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </div>
              </div>

              <div class="modal-body">
                <follow-item
                  v-for="(user, index) in suggestions"
                  :key="index"
                  :user="user"
                ></follow-item>
              </div>
            </div>
          </div>
        </div>
      

      <div class="suggestions__items">
        <user-suggestion v-for="(user, index) in suggestions" :key="index" :user="user"></user-suggestion>
      </div>
    </div>

    <hr />

    <div class="gallery-nav">
      <div class="gallery-nav__posts gallery-nav__type" :class="{ 'active-type': !postsOrTagged }">
        <div class="nav-cta" @click="setGalleryPosts">
          <img src="./../assets/grid.png" alt="grid system" class="gallery-nav__icon" /> POSTS
        </div>
      </div>
      <!-- <div class="gallery-nav__tagged gallery-nav__type" :class="{ 'active-type': postsOrTagged }">
        <div class="nav-cta" @click="setGalleryTagged">
          <img src="./../assets/tag.png" alt="tagged person" class="gallery-nav__icon" /> TAGGED
        </div>
      </div> -->
    </div>
    <profile-gallery :items="posts" />
    <!-- <component :is="type" :items="items"></component> -->
  </div>
</template>


<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';


export default {
  name: 'Profile',
  data: function() {
    return {
      posts: [],
      suggestions: [],
      postsOrTagged: false,
      galleryPosts: [],
      galleryTagged: [],
      current_user: null,
    };
  },
  components: {
    'profile-header': () => import('./../components/ProfileHeader/ProfileHeader'),
    'profile-stories': () => import('./../components/ProfileStories/ProfileStories'),
    'profile-gallery': () => import('./../components/ProfileGallery/ProfileGallery'),
    'user-suggestion': () => import('./../components/UserSuggestionItem/UserSuggestionItem'),
    'follow-item': () => import('./../components/FollowItem/FollowItem'),
  },
  methods: {
    fetchUserData() {
      const userId = this.$route.params.id;
      this.decode();
      this.fetchUserProfile(userId);
      this.fetchUserPosts(userId);
      this.fetchUserSuggestions();
    },
    fetchUserSuggestions() {
      axios
        .get('http://localhost:8082/api/v1/users/suggestions', {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          this.suggestions = response.data; 
    
        })
        .catch((error) => {
          console.error('There was an error fetching the user suggestion:', error);
        this.$router.push('/notfound');
        });
    },
    scroll_left() {
      let content = document.querySelector('.suggestions__items');
      content.scrollLeft -= 200;
    },

    scroll_right() {
      let content = document.querySelector('.suggestions__items');
      content.scrollLeft += 200;
    },
    setGalleryPosts() {
      this.postsOrTagged = false;
    },
    setGalleryTagged() {
      this.postsOrTagged = true;
    },
    decode() {
      let token = localStorage.getItem('accessToken');
      try {
        if (token) {
          let decoded = VueJwtDecode.decode(token);
          this.current_user = decoded; 
          let userId = this.current_user.id;
          this.fetchUserProfile(userId)
        } else {
          console.log('Token is null or undefined');
        }
      } catch (err) {
        console.log('Error decoding token: ', err);
        this.$router.push('/notfound');
      }
    },
    fetchUserPosts(userId) {
    axios
      .get(`http://localhost:8082/api/v1/posts/user/${userId}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        this.posts = response.data.content;
        this.posts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
        this.$router.push('/notfound');
      });
    },
    fetchUserProfile(userId) {
      axios.get(`http://localhost:8082/api/v1/users/${userId}`, {
      headers: {
      Authorization: `${localStorage.getItem('accessToken')}`
    }
      })
      .then(response => {
        const userProfile = response.data; 
        this.userProfile = userProfile;
      })
      .catch(error => {
        console.error('There was an error fetching the user profile:', error);
        this.$router.push('/notfound');
      });
    },
    
  },
  computed: {
    type: function() {
      return this.postsOrTagged ? 'profile-gallery' : 'profile-gallery';
    },
    items: function() {
      return this.postsOrTagged ? this.galleryPosts : this.galleryTagged;
    },
    isCurrentUserProfile() {
      const userIdFromRoute = this.$route.params.id;
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = VueJwtDecode.decode(token);
        return decoded.id === userIdFromRoute;
      }
      return false;
    },
  },
  mounted() {
    this.fetchUserData();
  },
  '$route.params.id': function (newId) {
    console.log('Route param changed:', newId);
    this.fetchUserData();
  },
};
</script>


<style lang="scss" scoped>
.suggestions {
  width: 100%;
  background-color: $white;
  border: 1px solid $lighter-gray;
  padding: 20px 25px;
  border-radius: 4px;
  position: relative;

  &__header {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-2x;
    font-weight: 600;
    margin-bottom: 1rem;

    &__title {
      color: $dark-gray;
    }

    &__seeall {
      color: $main-color;
      cursor: pointer;
    }
  }

  &__items {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  .direc {
    position: absolute;
    top: 45%;
    cursor: pointer;

    &--left {
      left: $font-size-3x;
    }

    &--right {
      right: $font-size-3x;
    }
  }
}

.modal__header {
  display: flex;
  border-bottom: 1px solid $lighter-gray;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: $font-size-2x;

  .modal__close {
    position: absolute;
    right: 24px;
    font-size: 2rem;
    cursor: pointer;
  }

  .modal__title {
    font-weight: 600;
  }
}

.modal-content {
  border-radius: 12px;
  width: 400px;
  height: 400px;
  margin: auto;
}

.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
}

.arrow {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  z-index: 1500;
  background-color: $white;
}

.gallery-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: $font-size-3x;

  &__icon {
    width: $font-size-2x;
    height: $font-size-2x;
    margin-right: 8px;
  }

  &__type {
    padding-top: 8px;
    color: $dark-gray;
  }
}

.nav-cta {
  border: none;
  padding: 0px 32px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:active {
    outline: none;
  }
}

hr {
  margin-bottom: 0;
}

.active-type {
  border-top: 1px solid $dark-gray;
  color: $black;
}
</style>
