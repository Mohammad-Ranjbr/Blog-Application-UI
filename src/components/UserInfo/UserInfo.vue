<template>
  <div class="user-info">
    <img
      :src="userProfile.image ? `data:image/jpeg;base64,${userProfile.image}` : 'default-image.jpg'"
      class="user-info__img"
      draggable="false"
    />

    <div class="user-names">
      <div class="user-info__username">{{ userProfile.username }}</div>
      <span class="user-info__sub-name">{{  userProfile.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserInfo',
  data() {
    return {
      userProfile: {
        image: '',
        username: '',
        name: ''
      },
    };
  },
  methods: {
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
    },
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
.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid rgb(23, 192, 122);
    padding: 2px;
    margin-right: 15px;
  }

  &__username {
    font-size: 1rem;
    font-weight: 600;
  }

  &__sub-name {
    font-size: 0.8rem;
    color: $dark-gray;
  }
}
</style>
