<template>
  <div class="follow-item">
    <img :src="user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image.jpg'" :alt="user.name"
      draggable="false" class="follow-item__icon" />

    <div class="follow-item__right">
      <div class="follow-item__info">
        <div class="follow-item__username">
          <a :href="`/profile/${user.id}`" class="follow-item__name-link">{{ user.name }}</a>
        </div>
        <div class="follow-item__nickname">
          {{ user.userName }}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import EventBus from '@/router/event-bus.js';

export default {
  name: 'FollowItem',
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
.follow-item {
  display: flex;
  align-items: center;
  margin-bottom: $font-size-2x;

  &__icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  &__right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 8px;
  }

  &__info {
    margin-left: 0.5rem;
  }

  &__nickname {
    font-size: $font-size-1x;
    color: $dark-gray;
  }

  &__cta {
    border: 1px solid transparent;
    background-color: $main-color;
    border-radius: 4px;
    color: $white;
    font-weight: 600;
    padding: 0 $font-size-3x;
    font-size: $font-size-2x;
    height: 32px;
  }

  &__name-link {
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

  .follow-item__cta {
    border: 1px solid transparent;
    background-color: $main-color;
    border-radius: 4px;
    color: $white;
    font-weight: 600;
    padding: 0 $font-size-3x;
    font-size: $font-size-2x;
    height: 32px;
    min-width: 100px;

    &.unfollow {
      background-color: lighten($dark-gray, 30%);
      color: $dark-gray;
      outline: none;

      &:hover {
        background-color: lighten($dark-gray, 25%);
      }
    }
  }
}
</style>