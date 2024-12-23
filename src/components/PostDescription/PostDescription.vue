<template>
  <div class="post-description">
    <span>{{ title }}</span> </br> {{ content }}
    <hr />
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="scss" scoped>
.post-description {
  padding-left: 1rem;
  padding-right: 1rem;

  & > span {
    font-weight: 700;
  }

  hr {
    width: 80%;
  }
}
</style>
