<template>
  <div class="post-description">
    <span>{{ title }}</span> </br> {{ content }}
    </br><section class="post-description__post-time">
      {{ formattedTime }}
    </section>
    <hr />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PostDescription',
  props: {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    }
  },
  computed: {
    formattedTime() {
      return moment(this.created_at).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
.post-description {
  padding-left: 1rem;
  padding-right: 1rem;

  &__post-time {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: $dark-gray;
  }

  & > span {
    font-size: 17px;
    font-weight: 700;
  }

  hr {
    width: 80%;
  }
}
</style>
