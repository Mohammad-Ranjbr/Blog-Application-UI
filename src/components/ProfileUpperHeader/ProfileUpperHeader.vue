<template>
  <div class="row">
    <div class="left">
      <img
        :src="userProfile.image ? `data:image/jpeg;base64,${userProfile.image}` : 'default-image.jpg'"
        alt="profile image"
        class="profile-img"
      />
    </div>
    <div class="right">
      <upper-header :username="userProfile.username"></upper-header>
      <profile-description 
        :about="userProfile.about"
        :email="userProfile.email"
        :name="userProfile.name"
   
      ></profile-description>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import upperHeader from './../ProfileHeaderTitle/ProfileHeaderTitle';
import profileDescription from './../ProfileDescription/ProfileDescription';

export default {
  name: 'ProfileUpperHeader',
  data() {
    return {
      userProfile: {
        image: '',
        username: 'hellomayuko',
        postsCount: 0,
        followersCount: '',
        followingCount: '',
      },
    };
  },
  methods: {
    fetchUserData() {
      const userId = this.$route.params.id;
      this.fetchUserProfile(userId);
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
            username: userProfile.username,
            postsCount: userProfile.postsCount,
            followersCount: userProfile.followersCount,
            followingCount: userProfile.followingCount,
            about:userProfile.about,
            email:userProfile.email,
            name:userProfile.name
          };
        })
        .catch((error) => {
          console.error('خطا در دریافت اطلاعات پروفایل کاربر:', error);
        });
    },
  },
  components: {
    upperHeader,
    profileDescription,
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
.left {
  display: flex;
  justify-content: center;
  width: 25%;

  @media (max-width: 768px) {
    max-width: 15%;
  }

  @media (max-width: 576px) {
    max-width: 100%;
    margin: auto;
  }

  .profile-img {
    width: 168px;
    height: 168px;
    border-radius: 50%;
    background-color: $white;
    border: 2px solid $light-gray;
    padding: 4px;

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
    }

    @media (max-width: 576px) {
      width: 150px;
      height: 150px;
    }
  }
}

.right {
  padding-top: 10px;
  width: 75%;

  @media (max-width: 768px) {
    width: 85%;
    padding-top: 0;
    padding-right: 0;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
}

.header-actions {
  @media (max-width: 420px) {
    margin-bottom: 1rem;
  }
}
</style>
