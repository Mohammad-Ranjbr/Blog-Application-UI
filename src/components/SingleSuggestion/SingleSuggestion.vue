<template>
  <div class="suggestion">
    <div class="suggestion__left">
      <img
        :src="user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image.jpg'"
        :alt="user.userName"
        class="suggestion__user-img"
        draggable="false"
      />
     
      <div class="suggestion__info">
        <a :href="`/profile/${user.id}`" class="suggestion__username">
          <span>{{ user.userName }}</span>
        </a>
        <span class="suggestion__relation">{{ user.name }}</span>
      </div>
    </div>

    <div class="suggestion__right">
      <a :href="'/' + user.id" class="suggestion__follow-link">Follow</a>
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
    margin-right: 1rem;
  }

  &__follow-link {
    text-decoration: none;
  }
}
</style>
