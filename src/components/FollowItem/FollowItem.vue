<template>
  <div class="follow-item">
    <img
        :src="user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image.jpg'"
          :alt="user.name"
          draggable="false"
          class="follow-item__icon"
        />

    <div class="follow-item__right">
      <div class="follow-item__info">
        <div class="follow-item__username">{{ user.name }}</div>
        <div class="follow-item__nickname">
          {{ user.userName }}
        </div>
      </div>

      <button class="follow-item__cta">Follow</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowItem',
  props: {
    user: {
      type: Object,
      required: true,
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
}
</style>
