<template>
  <div class="suggestions-item">
    <div class="suggestions-item__header">
      <div class="suggestions-item__remove">&times;</div>
    </div>

    <div class="suggestions-item__body">
      <div class="suggestions-item__img-container">
        <img
        :src="user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image.jpg'"
          :alt="user.name"
          draggable="false"
          class="suggestions-item__img"
        />
      </div>

      <div class="suggestions-item__name">
        <a :href="`/profile/${user.id}`" class="suggestions-item__name-link">{{ user.name }}</a>
      </div>

      <div class="suggestions-item__subname">
        {{ user.userName }}
      </div>

      <button 
  @click="toggleFollow" 
  :class="['suggestions-item__follow-cta', { unfollow: user.followedByCurrentUser }]">
  {{ user.followedByCurrentUser ? 'Unfollow' : 'Follow' }}
</button>

    </div>
  </div>
</template>

<script>
import EventBus from '@/router/event-bus.js';

export default {
  name: 'UserSuggestionItem',
  props: {
    user: {
      type: Object,
      required: true,
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
        EventBus.$emit('following-updated');
      } catch (error) {
        console.error('Failed to follow/unfollow:', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.suggestions-item {
  height: 200px;
  min-width: 180px;
  border: 1px solid $lighter-gray;
  padding: 10px;
  border-radius: 4px;
  margin-right: 20px;
  margin-bottom: 25px;

  &__header {
    display: flex;
    justify-content: flex-end;
  }

  &__remove {
    color: $dark-gray;
    font-weight: 500;
    cursor: pointer;
  }

  &__img-container {
    margin-bottom: 10px;
  }

  &__img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: $font-size-2x;
  }

  &__name {
    font-weight: 600;
  }

  &__subname {
    color: $dark-gray;
  }

  &__follow-cta {
    border: 1px solid transparent;
    background-color: $main-color;
    margin-top: $font-size-3x;
    border-radius: 4px;
    color: $white;
    padding: 3px 40px;
    text-align: center;
  }
  &__name-link {
    color: black; 
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: $main-color;
      text-decoration: none;
    }
  }
}

.suggestions-item__follow-cta {
  padding: 0.3rem 1rem;
  width: 100px;
  text-align: center;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;

  &.follow {
    background-color: $main-color;
    color: white;
    outline: none;
    &:hover {
      background-color: darken($main-color, 10%);
    }
  }

  &.unfollow {
    background-color: lighten($dark-gray, 30%); 
    color: rgb(250, 99, 99);
    height: 100%; 
    border: none;
    outline: none;
    &:hover {
      background-color: lighten($dark-gray, 25%);
    }
  }
}

</style>
