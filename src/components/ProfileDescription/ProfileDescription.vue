<template>
  <div class="profile-desc">
    <!-- نمایش نام کاربری -->
    <h1 class="profile-desc__username">{{ username }}</h1>

    <!-- نمایش اطلاعات درباره کاربر -->
    <ul class="profile-desc__info">
      <li>
        <span class="profile-desc__value">{{ name || 'Not provided' }}</span>
      </li>
      <li>
        <span class="profile-desc__value">{{ email || 'Not provided' }}</span>
      </li>
      <li>
        <span class="profile-desc__value">{{ about || 'No details available' }}</span>
      </li>
    </ul>

    <!-- <div class="profile-desc__friends-follow">
      Followed by
      <span> <a href="/">abdallah_hemdan</a> </span>, <span><a href="/">omar_ahmed</a></span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ProfileDescription',
  props: {
    username: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: 'No about information available.',
    },
    email: {
      type: String,
      default: 'No email provided.',
    },
    name: {
      type: String,
      default: 'No name provided.',
    }
  },
};
</script>

<style lang="scss" scoped>
.profile-desc {
  padding-left: 0.5rem;
  padding-top: 2rem;

  @media (max-width: 576px) {
    padding-left: 3rem;
  }

  @media (max-width: 420px) {
    padding-left: 2rem;
  }

  @media (max-width: 420px) {
    padding-left: 1rem;
  }

  &__username {
    font-size: 1rem;
  }

  &__link > a {
    text-decoration: none;
    font-weight: 600;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
  }

  &__friends-follow {
    color: $dark-gray;
    padding-left: 0.5rem;

    span {
      color: $darker-gray;
      font-weight: 600;

      & > a {
        text-decoration: none;
        color: $darker-gray;
      }
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
}
</style>
