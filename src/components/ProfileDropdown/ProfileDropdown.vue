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
      <img src="./../../assets/me.jpg" class="profile-options__img" alt="profile" />
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

export default {
  name: 'ProfileDropdown',
  data() {
    return {
      userId: null, // متغیری برای نگهداری User ID
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
  },
};
</script>

<style lang="scss" scoped>
@import './../Navbar/Navbar.scss';
</style>
