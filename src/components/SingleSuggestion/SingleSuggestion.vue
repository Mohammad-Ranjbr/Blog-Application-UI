<template>
  <div class="suggestion">
    <div class="suggestion__left">
      <img :src="user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image.jpg'" :alt="user.userName"
        class="suggestion__user-img" draggable="false" />

      <div class="suggestion__info">
        <a :href="`/profile/${user.id}`" class="suggestion__username">
          <span>{{ user.userName }}</span>
        </a>
        <span class="suggestion__relation">{{ user.name }}</span>
      </div>
    </div>

    <div class="suggestion__right">
      <button @click="toggleFollow" 
      :class="['suggestion__follow-link', { unfollow: user.followedByCurrentUser }]">
        {{ user.followedByCurrentUser ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleSuggestion',
  props: {
    user: {
      type: Object,
      requires: true,
    },
  },
  methods: {
    async toggleFollow() {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken'); 

      const url = this.user.followedByCurrentUser
        ? `http://localhost:8082/api/v1/users/${userId}/unfollow/${this.user.id}`
        : `http://localhost:8082/api/v1/users/${userId}/follow/${this.user.id}`;

      try {
        const response = await fetch(url, {
          method: this.user.followedByCurrentUser ? 'DELETE' : 'POST',
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        this.user.followedByCurrentUser = !this.user.followedByCurrentUser;
      } catch (error) {
        console.error('Failed to follow/unfollow:', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.suggestion {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.5rem;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  &__username {
    color: black;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: $main-color;
      text-decoration: none;
    }
  }

  &__relation {
    color: $dark-gray;
    font-size: 12px;
    font-weight: 400;
  }

  &__left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 6rem;
    margin-right: 134px;
  }

  &__user-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgb(80, 141, 233);
    background-color: $white;
    margin-right: 1rem;
  }

  &__follow-link {
    text-decoration: none;
  }
}

.suggestion__follow-link {
  padding: 0.3rem 1rem; 
  width: 100px;  
  text-align: center;  
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  background-color: $main-color;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($main-color, 10%);
  }

  &.unfollow {
    background-color: #ff4d4f;
    &:hover {
      background-color: darken(#ff4d4f, 10%);
    }
  }
}


</style>
