<template>
  <div class="header">
    <div class="header__first">
      <div class="header__username">{{userProfile.username}}</div>

      <div v-if="isCurrentUserProfile" class="header__actions">
        <button class="header__action-btn">Message</button>

        <button class="header__action-btn">
          <img src="./../../assets/svgs/following.svg" alt="following avatar" class="icon" />
        </button>

        <button class="header__action-btn">
          <img
            src="./../../assets/svgs/dropdown-arrow.svg"
            alt="dropdown-arrow image"
            class="header__arrow-icon"
          />
        </button>

        <button class="header__options-menu" data-toggle="modal" data-target="#exampleModalCenter" style="outline: none;">
          <span class="dots">●●●</span>
        </button>

        <div
          class="modal fade modal-create-post"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <button class="post-modal-choice danger-choice" 
                onclick="window.location.href='/create-post'">Create Post</button>
                <button class="post-modal-choice lst-choice" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header__second">
      <div class="profile-posts header__statistics-item"><span class="bold">{{ userProfile.postsCount }}</span> posts</div>

      <div
        class="profile-followers header__statistics-item"
        data-toggle="modal"
        data-target="#following"
      >
        <span class="bold">{{ userProfile.followersCount }}</span> followers
      </div>

      <div
        class="modal fade"
        id="following"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal__header">
              <div class="modal__title">Followers</div>
              <div class="modal__close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </div>
            </div>

            <div class="modal-body">
              <follow-item
                v-for="(user, index) in listOfFollowers"
                :key="index"
                :user="user"
              ></follow-item>
            </div>
          </div>
        </div>
      </div>

      <div
        class="profile-following header__statistics-item"
        data-toggle="modal"
        data-target="#followers"
      >
        <span class="bold">{{ userProfile.followingCount }}</span> following
      </div>

      <div
        class="modal fade"
        id="followers"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal__header">
              <div class="modal__title">Following</div>

              <div class="modal__close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </div>
            </div>

            <div class="modal-body">
              <follow-item
                v-for="(user, index) in listOfFollowing"
                :key="index"
                :user="user"
              ></follow-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProfileHeaderTitle',
 
  data: function() {
    return {
      listOfFollowers: [],
      listOfFollowing: [],
      userProfile: {
        image: '',
        username: null,
        postsCount: 0,
        followersCount: '',
        followingCount: '',
      },
    };
  },
 
  components: {
    'follow-item': () => import('./../FollowItem/FollowItem'),
  },

  methods: {
    fetchUserData() {
      const userId = this.$route.params.id;;
      this.fetchUserProfile(userId);
      this.fetchUserFollowers(userId);
      this.fetchUserFollowing(userId);
    },
    fetchUserProfile(userId) {
      axios
        .get(`http://localhost:8082/api/v1/users/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          if (response.data) {
            const userProfile = response.data;
            this.userProfile = {
              image: userProfile.image || '',
              username: userProfile.userName || 'Unknown',
              name: userProfile.name || '',
              postsCount: userProfile.postsCount || 0,
              followersCount: userProfile.followersCount || 0,
              followingCount: userProfile.followingCount || 0,
            };
          }
        })
        .catch((error) => {
          console.error('خطا در دریافت اطلاعات پروفایل کاربر:', error);
        });
    },
    fetchUserFollowers(userId) {
      axios
        .get(`http://localhost:8082/api/v1/users/${userId}/followers`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          this.listOfFollowers = response.data;
        })
        .catch((error) => {
          console.error('خطا در دریافت اطلاعات پروفایل کاربر:', error);
        });
    },
    fetchUserFollowing(userId) {
      axios
        .get(`http://localhost:8082/api/v1/users/${userId}/following`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          this.listOfFollowing = response.data;
        })
        .catch((error) => {
          console.error('خطا در دریافت اطلاعات پروفایل کاربر:', error);
        });
    },
  },
  computed: {
    isCurrentUserProfile() {
      const userIdFromRoute = this.$route.params.id;
      const userIdInLocalStorage = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken');
      if (token) {
        return userIdInLocalStorage === userIdFromRoute;
      }
      return false;
    },
  },
  mounted() {
    this.fetchUserData();
  },
  watch: {
    '$route.params.id': function () {
      this.fetchUserData();
    },
  },

};
</script>

<style lang="scss" scoped>
.header {
  padding-left: 0.5rem;

  @media (max-width: 768px) {
    padding-left: 1.5rem;
  }

  @media (max-width: 576px) {
    padding-left: 0;
    margin-top: 1rem;
  }

  &__first {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 576px) {
      justify-content: center;
    }
    @media (max-width: 420px) {
      flex-direction: column;
    }
  }

  &__username {
    font-size: 28px;
    font-weight: 300;
    margin-right: 1rem;

    @media (max-width: 420px) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }

  &__action-btn {
    border: 1px solid $lighter-gray;
    padding: 4px $font-size-3x;
    background-color: transparent;
    margin-right: 0.5rem;
    border-radius: 4px;
    font-weight: 600;
    font-size: $font-size-2x;

    @media (max-width: 768px) {
      padding: 4px 12px;
    }
  }

  &__second {
    display: flex;
    margin-top: 1rem;

    @media (max-width: 576px) {
      margin-top: 0.5rem;
      justify-content: center;
    }
  }

  &__arrow-icon {
    width: 10px;
    height: 10px;
  }

  &__options-menu {
    border: none;
    background-color: transparent;
  }

  &__statistics-item {
    margin-right: 2rem;

    @media (max-width: 768px) {
      margin-right: 1rem;
    }

    @media (max-width: 420px) {
      margin-right: 0.5rem;
    }
  }
}

.bold {
  font-weight: 600;
}

.icon {
  width: $font-size-3x;
  height: $font-size-3x;
}

.profile-following,
.profile-followers {
  cursor: pointer;
}

.modal__header {
  display: flex;
  border-bottom: 1px solid $lighter-gray;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: $font-size-2x;
}

.modal-content {
  border-radius: 12px;
  width: 400px;
  height: 400px;
  margin: auto;
}

.modal__close {
  position: absolute;
  right: 24px;
  font-size: 2rem;
  cursor: pointer;
}

.modal__title {
  font-weight: 600;
}

.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content2 {
  border-radius: 12px;
  width: 400px;
  height: 400px;
  margin: auto;
}

.modal-create-post .modal-content {
  border-radius: 12px;
  width: 400px; 
  height: 100px; 
  margin: auto;
}

.modal-create-post .modal-body {
  padding: 1rem;
}

.post-modal-choice {
  width: 100%;
  border: none;
  border-bottom: 1px solid $lighter-gray;
  padding-top: 0.3rem; 
  padding-bottom: 0.3rem; 
  background-color: transparent;
  font-size: 0.875rem;

  &:hover {
    outline: none;
  }

  &:active {
    outline: none;
  }
}

.danger-choice {
  color: rgb(0, 0, 0);
  font-weight: 600;
  outline: none;
}

.lst-choice {
  color: red;
  border-bottom: none;
  font-size: 0.875rem;
  padding: 0.3rem 0;
  outline: none;
}

.dots {
  font-size: 10px;
  margin-top: 5px;
}
</style>