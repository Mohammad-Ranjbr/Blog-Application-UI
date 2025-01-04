<template>
  <a class="dropdown-item notification">
    <img :src="user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image.jpg'" alt="avatar image"
      class="notification__icon" />

    <div class="notification__right">
      <div class="notification__info">
        <a :href="`/profile/${user.id}`" class="user">
          {{ user.name }}
        </a>

        <div class="notification__description">
          {{ user.userName }}
        </div>
      </div>

      <button @click="toggleFollow" :class="['follow-item__cta', { unfollow: user.followedByCurrentUser }]">
        {{ user.followedByCurrentUser ? 'Unfollow' : 'Follow' }}
      </button>

    </div>
  </a>
</template>

<script>
export default {
  name: 'NotificationItem',
  data: function () {
    return {};
  },
  methods: {
    handleClick(event) {
      event.stopPropagation();
    },
    async toggleFollow() {
      event.stopPropagation();
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
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &__description {
    font-size: $font-size-1x;
  }

  &__right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__btn {
    border-radius: 4px;
    font-weight: 600;
    padding: 2px 9px;
    font-size: $font-size-2x;

    &--follow {
      border: 1px solid transparent;
      background-color: $main-color;
      border-radius: 4px;
      color: $white;
      font-weight: 600;
      padding: 2px 9px;
      font-size: $font-size-2x;
    }

    &--followed {
      border: 1px solid $lighter-gray;
      border-radius: 4px;
      background-color: transparent;
      color: $darker-gray;
      font-weight: 600;
      padding: 2px 9px;
      font-size: $font-size-2x;
    }
  }

  &__info {
    margin-left: 8px;
  }

  .user {
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
