<template>
  <div class="dropdown profile-options">
    <a
      class="dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img :src="userProfile.image ? `data:image/jpeg;base64,${userProfile.image}` : 'default-image.jpg'" class="profile-options__img" alt="profile" />
    </a>

    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
      <router-link :to="{ name: 'Profile', params: { id: userId } }">
        <img
          src="./../../assets/svgs/avatar.svg"
          alt="avatar image"
          class="profile-options__icon"
        />
        Profile
      </router-link>

      <a class="dropdown-item" href="/profile/saved">
        <img src="./../../assets/svgs/unsaved.svg" alt="saved icon" class="profile-options__icon" />
        Saved
      </a>

      <a class="dropdown-item" href="/profile/settings">
        <img
          src="./../../assets/svgs/settings.svg"
          alt="settings icon"
          class="profile-options__icon"
        />
        Settings
      </a>

      <div class="logout">
        <a class="dropdown-item" href="/" @click="logout">
          <img
            src="./../../assets/svgs/logout.svg"
            alt="logout icon"
            class="profile-options__icon"
          />
          Log Out
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileDropdown',
  data() {
    return {
      userId: null,
      userProfile: {
        image: '',
       }
    };
  },
  created() {
    // خواندن User ID از Local Storage
    this.userId = localStorage.getItem('userId');
  },
  methods: {
    logout: function() {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('user');
      window.location.reload();
    },
    fetchUserProfile(userId) {
      axios
        .get(`http://localhost:8082/api/v1/users/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          const userProfile = response.data;
          this.userProfile = {
            image: userProfile.image,
            username: userProfile.userName,
            name:userProfile.name
          };
        })
        .catch((error) => {
          console.error('خطا در دریافت اطلاعات پروفایل کاربر:', error);
        });
    }
  },
  mounted() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.fetchUserProfile(userId);
    }
  },
};
</script>

<style lang="scss" scoped>
@import './../Navbar/Navbar.scss';
</style>
