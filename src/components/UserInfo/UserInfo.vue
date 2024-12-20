<template>
  <div class="user-info">
    <img
      src="./../../assets/me.jpg"
      alt="Hemdan's profile image"
      class="user-info__img"
      draggable="false"
    />

    <div class="user-names">
      <div class="user-info__username">Mohammad</div>
      <span class="user-info__sub-name">Mohammad Ranjbar</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
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
